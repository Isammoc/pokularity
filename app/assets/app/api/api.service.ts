import '../rxjs-extensions';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { Pokemon } from '../models/pokemon';
import { PokemonDetail } from '../models/pokemon-detail';
import { PokemonType } from '../models/pokemon-type';

@Injectable()
export class PzApiService {
  constructor(private http: Http) { }

  listAll(): Observable<Pokemon[]> {
    return this.without503(() => this.http
        .get('/api/pokemon'))
        .map(response => response.json() as Pokemon[]);
  }

  getType(name: string): Observable<PokemonType> {
    return this.without503(() => this.http
          .get('/api/types/' + name))
        .map(response => response.json() as PokemonType);
  }

  getDetail(name: string): Observable<PokemonDetail> {
    return this.without503(() => this.http.get('/api/pokemon/' + name))
        .map(response => response.json() as PokemonDetail);
  }

  private without503(orig: () => Observable<Response>): Observable<Response> {
    return orig()
      .switchMap((response: Response) => {
        if(response.status === 503) {
          return this.without503(orig);
        } else {
          return Observable.of(response);
        }
      })
    ;
  }
}
