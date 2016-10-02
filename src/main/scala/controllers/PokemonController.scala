package controllers

import play.api.mvc.Controller
import services.PokemonService
import javax.inject.Inject
import play.api.mvc.Action
import play.api.libs.concurrent.Execution.Implicits._
import play.api.libs.json.Json
import models.Pokemon
import models.PokemonDetail
import models.PokemonType
import play.api.cache.CacheApi
import scala.concurrent.Future
import scala.concurrent.duration.Duration

class PokemonController @Inject() (val pokemonService: PokemonService, val cache: CacheApi) extends Controller {
  val cacheDuration = Duration.Inf

  def fromCacheOrElse(key: String)(f: => Future[Option[String]]): Future[Option[String]] = cache.get[String](key) match {
    case Some(s) => Future.successful(Some(s))
    case None => f.map(_.map { s =>
      cache.set(key, s, cacheDuration)
      s
    })
  }

  def list = Action.async {
    import Pokemon.Implicits.pokemonWrite
    fromCacheOrElse("pokemonController.list")(pokemonService.pokemons.map(l => Some(Json.toJson(l).toString)))
      .map(s => Ok(Json.parse(s.get)))
  }

  def detail(name: String) = Action.async {
    import PokemonDetail.Implicits.pokemonDetailWrite
    fromCacheOrElse("pokemonController.detail." + name)(pokemonService.details(name).map(_.map(pd => Json.toJson(pd).toString))).map {
      case Some(s) => Ok(Json.parse(s))
      case None => NotFound
    }
  }

  def types(name: String) = Action.async {
    import PokemonType.Implicits.pokemonTypeWrite
    fromCacheOrElse("pokemonController.types." + name)(pokemonService.types(name).map { _.map(pt => Json.toJson(pt).toString) }).map {
      case Some(s) => Ok(Json.parse(s))
      case None => NotFound
    }
  }
}