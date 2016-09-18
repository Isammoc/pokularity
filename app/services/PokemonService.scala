package services

import scala.concurrent.Future
import scala.concurrent.ExecutionContext
import com.google.inject.Inject
import play.api.libs.ws._
import com.netaporter.uri.dsl._
import play.api.libs.json._
import play.api.libs.functional.syntax._

case class Pokemon(id: Int, name: String)
object Pokemon {
  object Implicits {
    implicit val pokemonReads: Reads[Pokemon] = (
      (__ \ "url").read[String].map { s =>
        val r = s.split("/")
        r(r.size - 1).toInt
      } and
      (__ \ "name").read[String])(Pokemon.apply _)
     
      implicit val pokemonWrite: Writes[Pokemon] = (
          (__ \ "id").write[Int] and
          (__ \ "name").write[String]
          )(unlift(Pokemon.unapply))
  }
}
class PokemonService @Inject() (ws: WSClient) {
  import Pokemon.Implicits.pokemonReads

  val apiBase = "http://pokeapi.co/api/v2"

  private def loadPart(url: String)(implicit executionContext: ExecutionContext): Future[(Option[String], List[Pokemon])] = {
    println(s"url = $url")
    ws
      .url(url)
      .withHeaders("Accept" -> "application/json")
      .get
      .map { response =>
        ((response.json \ "next").asOpt[String], (response.json \ "results").as[List[Pokemon]])
      }
  }
  private def load(implicit executionContext: ExecutionContext): Future[List[Pokemon]] = {
    def loop(current: Future[(Option[String], List[Pokemon])], result: List[Pokemon]): Future[List[Pokemon]] = current.flatMap {
      case (None, last) => {
        Future.successful(result ++ last)
      }
      case (Some(url), last) => loop(loadPart(url), result ++ last)
    }
    loop(loadPart(apiBase / "pokemon" ? ("limit" -> 100)), Nil)
  }

  val pokemons: Future[List[Pokemon]] = load(play.api.libs.concurrent.Execution.defaultContext)
}