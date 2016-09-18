import '../rxjs-extensions';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { Pokemon } from '../pokemon/pokemon';

import { PzSearchService } from './search.service';


@Component({
  selector: 'pz-search',
  templateUrl: 'assets/app/search/search.component.html'
})
export class PzSearchComponent implements OnInit {
  pokemons: Observable<Pokemon[]>;
  private searchTerms = new Subject<string>();

  constructor(private searchService: PzSearchService) {}

  ngOnInit() {
    this.pokemons = this.searchTerms
      .debounceTime(400)
      .distinctUntilChanged()
      .switchMap(term => Observable.of(term ? this.searchService.search(term) : []));
  }

  search(term: string) {
    this.searchTerms.next(term ? term.toLowerCase() : '');
  }

  print(pokemon: Pokemon) {
    console.log(pokemon);
  }
}
