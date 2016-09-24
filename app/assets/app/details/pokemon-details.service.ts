import 'rxjs/add/operator/toPromise';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { PokemonDetail } from './pokemon-detail';

@Injectable()
export class PzDetailsService {
  pokemon: PokemonDetail;

  constructor(private http: Http) { }

  search(name: string): Promise<PokemonDetail> {
    return this.http.get('/api/pokemon/' + name).toPromise().then(response => response.json() as PokemonDetail);
  }
}
