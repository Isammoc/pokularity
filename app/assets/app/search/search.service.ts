import 'rxjs/add/operator/toPromise';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Pokemon } from '../models/pokemon';

@Injectable()
export class PzSearchService {
  pokemons: Pokemon[];
  private myPromise: Promise<Pokemon[]>;

  constructor(private http: Http) {
    this.myPromise = this.http
      .get('/api/pokemon')
      .toPromise()
      .then((r: Response) => r.json() as Pokemon[]);
    this.myPromise.then((pokemons: Pokemon[]) => {this.pokemons = pokemons;});
  }

  search(term: string): Pokemon[] {
    return this.pokemons.filter(item => item.name.startsWith(term));
  }

  random(): Promise<Pokemon> {
    return this.myPromise.then((pokemons: Pokemon[]) => {
      return pokemons[Math.floor(Math.random() * pokemons.length)];
    });
  }
}
