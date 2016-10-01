import { Component, OnInit } from '@angular/core';

import { PzDetailService } from '../../detail/detail.service';
import { PzSearchService } from '../../search/search.service';

import { Pokemon } from '../../models/pokemon';
import { PokemonDetail } from '../../models/pokemon-detail';

@Component({
    selector: 'pz-random'
  , templateUrl : 'assets/app/dashboard/random/random.component.html'
})
export class PzRandomComponent implements OnInit {
  pokemons: PokemonDetail[] = [];

  constructor(
      private detailService: PzDetailService
    , private searchService: PzSearchService
  ) { }

  ngOnInit() {
    for(let i = 0; i < 6; i++) {
      this.fetchRandomPokemon();
/*      this.searchService
          .random()
          .then((result: Pokemon) => this.detailService.search(result.name))
          .then((pokemon: PokemonDetail) => {
            this.pokemons.push(pokemon);
          });*/
    }
  }

  private fetchRandomPokemon(): Promise<void> {
    return this.searchService
        .random()
        .then((result: Pokemon) => {
          if(result.name.indexOf('-') > -1) {
            throw new Error('no special in random');
          }
          return this.detailService.search(result.name);
        }).then((pokemon: PokemonDetail) => {
          if(pokemon.images.length === 0) {
            throw new Error('not enough image for random');
          } else {
            this.pokemons.push(pokemon);
          }
        }).catch(err => {
          console.log("err = " + err);
          this.fetchRandomPokemon();
        });
  }
}
