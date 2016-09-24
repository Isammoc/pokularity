import 'rxjs/add/operator/toPromise';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Pokemon } from '../pokemon/pokemon';

@Injectable()
export class PzSearchService {
  pokemons: Pokemon[] = [];

  constructor(private http: Http) {
    this.http
      .get('/api/pokemon')
      .toPromise()
      .then((r: Response) => this.pokemons = r.json() as Pokemon[]);
  }

  search(term: string): Pokemon[] {
    return this.pokemons.filter(item => item.name.startsWith(term));
  }
}
