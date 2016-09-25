import 'rxjs/add/operator/toPromise';
import { Injectable } from '@angular/core';

import { PzApiService } from '../api/api.service';

import { PokemonDetail } from '../models/pokemon-detail';

@Injectable()
export class PzDetailService {
  pokemon: PokemonDetail;

  constructor(private apiService: PzApiService) { }

  search(name: string): Promise<PokemonDetail> {
    return this.apiService.getDetail(name).toPromise();
  }
}
