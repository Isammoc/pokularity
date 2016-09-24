import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { Pokemon } from '../pokemon/pokemon';

@Component({
    selector: 'pz-details'
  , templateUrl: 'assets/app/details/pokemon-details.component.html'
})
export class PzDetailsComponent implements OnInit {
  pokemon: Pokemon = {id:-1, name: ''};

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      let name = params['name'];
      this.pokemon.name = name;
    });
  }
}
