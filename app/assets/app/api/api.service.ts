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
      return this.http
          .get('/api/pokemon')
          .map(response => response.json() as Pokemon[]);
    }

    getType(name: string): Observable<PokemonType> {
      return this.getRawType(name)
          .map(response => response.json() as PokemonType);
    }

    private getRawType(name: string): Observable<Response> {
      return this.http
          .get('/api/types/' + name)
          .switchMap((response: Response) => {
            if(response.status === 503) {
              return this.getRawType(name);
            } else {
              return  Observable.of(response);
            }
          });
    }

    getDetail(name: string): Observable<PokemonDetail> {
      return this.http.get('/api/pokemon/' + name).map(response => response.json() as PokemonDetail);
    }
}
