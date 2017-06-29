# Pokularity [![Build Status](https://travis-ci.org/Isammoc/pokularity.svg?branch=master)](https://travis-ci.org/Isammoc/pokularity) [![Project Status: Concept – Minimal or no implementation has been done yet, or the repository is only intended to be a limited example, demo, or proof-of-concept.](http://www.repostatus.org/badges/latest/concept.svg)](http://www.repostatus.org/#concept)

Exercise project to test my abilities to create a full stack web site.

## Getting started

### Requirements

 * java 8

### First launch

```
$ ./bin/activator run
```

## TODO list

### Required

 * [x] A user should be able to search for a pokémon by name.
 * [x] The user can choose one pokémon from the search results to show more informations about that pokémon.
 * [x] The pokémon detail page should contain some basic info about the pokémon, its picture and a representation of the following statistics: For each of that pokémon types (e.g: fire, grass), how well this pokémon’s base stats (e.g speed, defense) compare to the average base stats of the other pokémons of that type.
 * [x] Additionally, the pokémon detail page should show a live list of the most recent tweets related to that pokémon.
 * [x] The detail page can be bookmarked for later direct access.

### Bonus
 * [ ] Expose a REST API to save and read the pokémon likes/dislikes given by the visitors of every detail page. Persist this information as you like (RDBMS, ES, etc)
 * [ ] Implement a representation of the like stats using a client side chart, Kibana/Grafana, etc
 * [ ] Do whatever you think is cool and differentiating!

## Links
 * [PokéAPI](http://pokeapi.co/) - Reach data for pokémon
 * [Angular2 Typescript todomvc](https://github.com/tastejs/todomvc/tree/master/examples/angular2) - template used
 * [Revisiting Realtime Angular 2](https://blog.pusher.com/revisiting-realtime-angular-2/) - component used for live tweets
 * [Pokestadium](http://www.pokestadium.com/) - for some sprites
