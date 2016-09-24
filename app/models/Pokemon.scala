package models

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
        (__ \ "name").read[String]
      )(Pokemon.apply _)

    implicit val pokemonWrite: Writes[Pokemon] = (
        (__ \ "id").write[Int] and
        (__ \ "name").write[String]
      )(unlift(Pokemon.unapply))
  }
}
