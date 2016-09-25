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
      this.searchService.random().then((result: Pokemon) => {
        this.detailService.search(result.name).then((pokemon: PokemonDetail) => {
          this.pokemons.push(pokemon);
        });
      });
    }
  }
}
