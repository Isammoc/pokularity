import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';

import { PzDetailsService } from './pokemon-details.service';
import { PzTypesService } from '../types/pokemon-types.service';

import { PokemonDetail } from './pokemon-detail';
import { PokemonType } from '../types/pokemon-type';

@Component({
    selector: 'pz-details'
  , templateUrl: 'assets/app/details/pokemon-details.component.html'
})
export class PzDetailsComponent implements OnInit {
  pokemon: PokemonDetail;
  types: PokemonType[];

  constructor(
      private route: ActivatedRoute
    , private router: Router
    , private detailsService: PzDetailsService
    , private typesService: PzTypesService
  ) {}

  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      let name = params['name'];
      this.pokemon = null;
      this.types = [];
      this.detailsService.search(name).then(detail => {
          this.pokemon = detail;
          this.pokemon.types.forEach((type: string) => {
            this.typesService.search(type).then(type => {
              this.types.push(type);
            });
          });
      }).catch(error => {
        this.router.navigate(["/dashboard"]);
      });
    });
  }
}
