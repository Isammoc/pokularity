package services

import scala.concurrent.Future
import scala.concurrent.ExecutionContext
import com.google.inject.Inject
import play.api.libs.ws._
import com.netaporter.uri.dsl._
import play.api.libs.json._
import play.api.libs.functional.syntax._
import play.api.cache.CacheApi
import scala.concurrent.duration._

case class PokemonDetail(name: String, images: List[String])
object PokemonDetail {
  object Implicits {
    implicit val pokemonDetailWrite = (
        (__ \ "name").write[String] and
        (__ \ "images").write[List[String]]
      )(unlift(PokemonDetail.unapply))
  }
}

case class Pokemon(id: Int, name: String)
object Pokemon {
  object Implicits {
    implicit val pokemonReads: Reads[Pokemon] = (
        (__ \ "url").read[String].map { s =>
          val r = s.split("/")
          r(r.size - 1).toInt
        } and
        (__ \ "name").read[String]
      )(Pokemon.apply _)

    implicit val pokemonWrite: Writes[Pokemon] = (
        (__ \ "id").write[Int] and
        (__ \ "name").write[String]
      )(unlift(Pokemon.unapply))
  }
}

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
        case Some(response) =>
          get(((response \ "forms")(0) \ "url").as[String])
        case None => Future.successful(None)
      }.map {
        case Some(response) =>
          val image = (response \ "sprites" \ "front_default").as[String]
          Some(PokemonDetail(name, image :: Nil))
        case None => None
      }
  }

  def pokemons(implicit executionContext: ExecutionContext): Future[List[Pokemon]] = cache.getOrElse("service.pokemon.all", cacheDuration)(load)

  def details(name: String)(implicit executionContext: ExecutionContext): Future[Option[PokemonDetail]] = cache.getOrElse("service.pokemon.details." + name, cacheDuration)(loadDetail(name))
}
