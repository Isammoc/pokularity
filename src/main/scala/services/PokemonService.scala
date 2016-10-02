package services

import scala.concurrent.ExecutionContext
import scala.concurrent.Future
import scala.concurrent.duration.DurationInt

import com.google.inject.Inject
import com.netaporter.uri.dsl.stringToUriDsl
import com.netaporter.uri.dsl.uriToString
import com.netaporter.uri.dsl.uriToUriOps

import play.api.cache.CacheApi
import play.api.libs.json.JsArray
import play.api.libs.json.JsDefined
import play.api.libs.json.JsLookupResult.jsLookupResultToJsLookup
import play.api.libs.json.JsValue
import play.api.libs.json.JsValue.jsValueToJsLookup
import play.api.libs.ws.WSClient
import models.Pokemon
import models.PokemonDetail
import models.PokemonType
import play.api.libs.json.JsObject
import play.api.libs.json.Json
import scala.concurrent.duration.Duration

class PokemonService @Inject() (ws: WSClient) {
  import Pokemon.Implicits.pokemonReads

  val apiBase = "http://pokeapi.co/api/v2"

  private def get(url: String)(implicit executionContext: ExecutionContext): Future[Option[JsValue]] = ws.url(url).withHeaders("Accept" -> "application/json").get.map { response =>
    println(s"url = $url")
    response.status match {
      case 200 => Some(response.json)
      case _ => {
        println(s"Not OK but status = ${response.status}")
        None
      }
    }
  }

  private def loadPart(url: String)(implicit executionContext: ExecutionContext): Future[(Option[String], List[Pokemon])] = {
    get(url)
      .map {
        case Some(response) =>
          ((response \ "next").asOpt[String], (response \ "results").as[List[Pokemon]])
        case None => (None, List.empty)
      }
  }

  private def loadDetailFromUrl(url: String)(implicit executionContext: ExecutionContext): Future[Option[PokemonDetail]] = {
    get(url)
      .flatMap {
        case Some(baseResponse) =>
          val name = ((baseResponse \ "forms")(0) \ "name").asOpt[String]
          val stats = (baseResponse \ "stats") match {
            case JsDefined(JsArray(a)) =>
              a.map(js => ((js \ "stat" \ "name").as[String], (js \ "base_stat").as[Int])).toMap
            case _ => Map.empty[String, Int]
          }
          val types = (baseResponse \ "types") match {
            case JsDefined(JsArray(a)) =>
              a.map(js => (js \ "type" \ "name").as[String])
            case _ => List.empty
          }
          val formUrl = ((baseResponse \ "forms")(0) \ "url").asOpt[String]
          get(formUrl.get).map(_.flatMap { response =>
            val images = (response \ "sprites") match {
              case JsDefined(JsObject(a)) =>
                a.seq.mapValues { _.asOpt[String] }
              case _ => Map.empty
            }
            name.map { name => PokemonDetail(name, images.values.flatten.toList, stats, types) }
          })
        case None => Future.successful(None)
      }
  }

  def pokemons(implicit executionContext: ExecutionContext): Future[List[Pokemon]] = {
    def loop(current: Future[(Option[String], List[Pokemon])], result: List[Pokemon]): Future[List[Pokemon]] = current.flatMap {
      case (None, last) => {
        Future.successful(result ++ last)
      }
      case (Some(url), last) => loop(loadPart(url), result ++ last)
    }
    loop(loadPart(apiBase / "pokemon" ? ("limit" -> 1000)), Nil).map(_.filterNot(_.name.contains("-")))
  }

  def details(name: String)(implicit executionContext: ExecutionContext): Future[Option[PokemonDetail]] = loadDetailFromUrl(apiBase / "pokemon" / name)

  def types(name: String)(implicit executionContext: ExecutionContext): Future[Option[PokemonType]] = get(apiBase / "type" / name / "")
    .flatMap {
      case Some(response) =>
        println("got a response")
        ((response \ "pokemon") match {
          case JsDefined(JsArray(a)) =>
            Future.sequence(
              a
                .map { js =>
                  (js \ "pokemon" \ "name").as[String]
                }.filterNot(name => name.contains("-"))
                .map { name =>
                  println(s"name => $name")
                  details(name)
                })
          case _ => Future.successful(List.empty)
        }).map(_.flatten).map { details =>
          val stats = details.map(_.stats)
          val keys = stats.flatMap(_.keys).toSet
          Some(PokemonType(name, (for (key <- keys) yield (key, stats.flatMap(_.get(key)).sum / stats.size)).toMap))
        }
      case None =>
        Future.successful(None)
    }
}
