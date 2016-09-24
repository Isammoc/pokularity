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


class PokemonService @Inject() (ws: WSClient, cache: CacheApi) {
  import Pokemon.Implicits.pokemonReads
  val cacheDuration = 1.hour

  val apiBase = "http://pokeapi.co/api/v2"

  private def get(url: String)(implicit executionContext: ExecutionContext): Future[Option[JsValue]] = ws.url(url).withHeaders("Accept" -> "application/json").get.map { response =>
    response.status match {
      case 200 => Some(response.json)
      case _ => None
    }
  }

  private def loadPart(url: String)(implicit executionContext: ExecutionContext): Future[(Option[String], List[Pokemon])] = {
    println(s"url = $url")
    get(url)
      .map {
        case Some(response) =>
          ((response \ "next").asOpt[String], (response \ "results").as[List[Pokemon]])
        case None => (None, List.empty)
      }
  }

  private def load(implicit executionContext: ExecutionContext): Future[List[Pokemon]] = {
    def loop(current: Future[(Option[String], List[Pokemon])], result: List[Pokemon]): Future[List[Pokemon]] = current.flatMap {
      case (None, last) => {
        Future.successful(result ++ last)
      }
      case (Some(url), last) => loop(loadPart(url), result ++ last)
    }
    loop(loadPart(apiBase / "pokemon" ? ("limit" -> 1000)), Nil)
  }

  private def loadDetail(name: String)(implicit executionContext: ExecutionContext): Future[Option[PokemonDetail]] = {
    get(apiBase / "pokemon" / name)
      .flatMap {
        case Some(baseResponse) =>
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
          get(((baseResponse \ "forms").apply(0) \ "url").as[String]).map {
            case Some(response) =>
              val image = (response \ "sprites" \ "front_default").as[String]
              Some(PokemonDetail(name, image :: Nil, stats, types))
            case None => None
          }
        case None => Future.successful(None)
      }
  }

  def pokemons(implicit executionContext: ExecutionContext): Future[List[Pokemon]] = cache.getOrElse("service.pokemon.all", cacheDuration)(load)

  def details(name: String)(implicit executionContext: ExecutionContext): Future[Option[PokemonDetail]] = cache.getOrElse("service.pokemon.details." + name, cacheDuration)(loadDetail(name))
}
