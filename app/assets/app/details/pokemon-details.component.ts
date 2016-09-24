import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';

import { PzDetailsService } from './pokemon-details.service';
import { PokemonDetail } from './pokemon-detail';

@Component({
    selector: 'pz-details'
  , templateUrl: 'assets/app/details/pokemon-details.component.html'
})
export class PzDetailsComponent implements OnInit {
  pokemon: PokemonDetail;

  constructor(
      private route: ActivatedRoute
    , private router: Router
    , private detailsService: PzDetailsService) {}

  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      let name = params['name'];
      this.pokemon = null;
      this.detailsService.search(name).then(detail => {
          this.pokemon = detail;
      }).catch(error => {
        this.router.navigate(["/dashboard"]);
      });
    });
  }
}
