export interface PokemonEggGroupInfo {
  id: number;
  name: string;
  names: Name[];
  pokemon_species: PokemonSpecy[];
}

interface Name {
  language: Language;
  name: string;
}

interface Language {
  name: string;
  url: string;
}

interface PokemonSpecy {
  name: string;
  url: string;
}
