import { Component, Input } from '@angular/core';

import { PokemonDetail } from '../models/pokemon-detail';

@Component({
    selector: 'pz-card'
  , templateUrl: 'assets/app/cards/card.component.html'
})
export class PzCardComponent {
  @Input()
  pokemon: PokemonDetail;
}
