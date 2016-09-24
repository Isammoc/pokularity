package models

import play.api.libs.json._
import play.api.libs.functional.syntax._

case class PokemonType(name: String, stats: Map[String, Int])

object PokemonType {
  object Implicits {
    implicit val pokemonTypeWrite = (
        (__ \ "name").write[String] and
        (__ \ "stats").write[Map[String, Int]]
      )(unlift(PokemonType.unapply))
  }
}