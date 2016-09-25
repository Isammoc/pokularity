import 'rxjs/add/operator/toPromise';

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';

import { PzDetailsService } from './details.service';
import { PzApiService } from '../api/api.service';

import { PokemonDetail } from '../models/pokemon-detail';
import { PokemonType } from '../models/pokemon-type';

@Component({
    selector: 'pz-details'
  , templateUrl: 'assets/app/details/details.component.html'
})
export class PzDetailsComponent implements OnInit {
  pokemon: PokemonDetail;
  types: PokemonType[];

  constructor(
      private route: ActivatedRoute
    , private router: Router
    , private detailsService: PzDetailsService
    , private apiService: PzApiService
  ) {}

  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      let name = params['name'];
      this.pokemon = null;
      this.types = [];
      this.detailsService.search(name).then(detail => {
          this.pokemon = detail;
          this.pokemon.types.forEach((type: string) => {
            this.apiService.getType(type).toPromise().then(type => {
              this.types.push(type);
            });
          });
      }).catch(error => {
        this.router.navigate(["/dashboard"]);
      });
    });
  }
}
