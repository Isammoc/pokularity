package controllers

import play.api.mvc.Controller
import services.PokemonService
import javax.inject.Inject
import play.api.mvc.Action
import play.api.libs.concurrent.Execution.Implicits._
import play.api.libs.json.Json
import models.Pokemon
import models.PokemonDetail

class PokemonController @Inject() (val pokemonService: PokemonService) extends Controller {
  def list = Action.async {
    import Pokemon.Implicits.pokemonWrite
    pokemonService.pokemons.map(l => Ok(Json.toJson(l)))
  }

  def detail(name: String) = Action.async {
    import PokemonDetail.Implicits.pokemonDetailWrite
    pokemonService.details(name).map {
      case Some(pd) => Ok(Json.toJson(pd))
      case None => NotFound
    }
  }
}