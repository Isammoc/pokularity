import { Component, Input } from '@angular/core';

import { PokemonDetail } from '../details/pokemon-detail';

@Component({
    selector: 'pz-card'
  , templateUrl: 'assets/app/cards/pokemon-card.component.html'
})
export class PzCardComponent {
  @Input()
  pokemon: PokemonDetail;
}
