import { Component, OnInit } from '@angular/core';

import { PzDetailsService } from '../../details/pokemon-details.service';
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
      private detailsService: PzDetailsService
    , private searchService: PzSearchService
  ) { }

  ngOnInit() {
    for(let i = 0; i < 6; i++) {
      this.searchService.random().then((result: Pokemon) => {
        this.detailsService.search(result.name).then((pokemon: PokemonDetail) => {
          this.pokemons.push(pokemon);
        });
      });
    }
  }
}
