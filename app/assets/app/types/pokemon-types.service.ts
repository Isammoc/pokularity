import 'rxjs/add/operator/toPromise';
import { Injectable } from '@angular/core';

import { PzApiService } from '../api/api.service';

import { PokemonType } from '../models/pokemon-type';

@Injectable()
export class PzTypesService {

  constructor(private apiService: PzApiService) { }

  search(name: string): Promise<PokemonType> {
    return this.apiService
        .getType(name)
        .toPromise();
  }
}
