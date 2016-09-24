import 'rxjs/add/operator/toPromise';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { PokemonType } from './pokemon-type';

@Injectable()
export class PzTypesService {

  constructor(private http: Http) { }

  search(name: string): Promise<PokemonType> {
    return this.http.get('/api/types/' + name).toPromise().then(response => response.json() as PokemonType);
  }
}
