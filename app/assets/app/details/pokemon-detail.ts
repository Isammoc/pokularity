class PokemonStat {
  hp: number;
  speed: number;
  attack: number;
  defense: number;
  'special-attack': number;
  'special-defense': number;
}

export class PokemonDetail {
  name: string;
  images: string[];
  stats: PokemonStat;
  types: string[];
}
