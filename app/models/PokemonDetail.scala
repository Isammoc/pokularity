package models

import play.api.libs.json._
import play.api.libs.functional.syntax._

case class PokemonDetail(name: String, images: List[String], stats: Map[String, Int], types: Seq[String])

object PokemonDetail {
  object Implicits {
    implicit val pokemonDetailWrite = (
        (__ \ "name").write[String] and
        (__ \ "images").write[List[String]] and
        (__ \ "stats").write[Map[String, Int]] and
        (__ \ "types").write[Seq[String]]
      )(unlift(PokemonDetail.unapply))
  }
}
