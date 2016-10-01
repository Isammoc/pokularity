import 'rxjs/add/operator/toPromise';
import { Injectable } from '@angular/core';

import { PzApiService } from '../api/api.service';

import { Pokemon } from '../models/pokemon';

@Injectable()
export class PzSearchService {
  pokemons: Pokemon[];
  private myPromise: Promise<Pokemon[]>;

  constructor(private apiService: PzApiService) {
    this.myPromise = this.apiService
        .listAll()
        .toPromise();
    this.myPromise
        .then((pokemons: Pokemon[]) => {
          this.pokemons = pokemons;
        });
  }

  search(term: string): Pokemon[] {
    return this.pokemons
        .filter(item => item.name.startsWith(term));
  }

  random(): Promise<Pokemon> {
    return this.myPromise
        .then((pokemons: Pokemon[]) => pokemons[Math.floor(Math.random() * pokemons.length)]);
  }
}
