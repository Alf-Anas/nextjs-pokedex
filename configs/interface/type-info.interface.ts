export interface PokemonTypeInfo {
  damage_relations: DamageRelations;
  game_indices: Index[];
  generation: Generation2;
  id: number;
  move_damage_class: MoveDamageClass;
  moves: Mfe[];
  name: string;
  names: Name[];
  past_damage_relations: any[];
  pokemon: Pokemon[];
}

interface DamageRelations {
  double_damage_from: DoubleDamageFrom[];
  double_damage_to: any[];
  half_damage_from: any[];
  half_damage_to: HalfDamageTo[];
  no_damage_from: NoDamageFrom[];
  no_damage_to: NoDamageTo[];
}

interface DoubleDamageFrom {
  name: string;
  url: string;
}

interface HalfDamageTo {
  name: string;
  url: string;
}

interface NoDamageFrom {
  name: string;
  url: string;
}

interface NoDamageTo {
  name: string;
  url: string;
}

interface Index {
  game_index: number;
  generation: Generation;
}

interface Generation {
  name: string;
  url: string;
}

interface Generation2 {
  name: string;
  url: string;
}

interface MoveDamageClass {
  name: string;
  url: string;
}

interface Mfe {
  name: string;
  url: string;
}

interface Name {
  language: Language;
  name: string;
}

interface Language {
  name: string;
  url: string;
}

interface Pokemon {
  pokemon: Pokemon2;
  slot: number;
}

interface Pokemon2 {
  name: string;
  url: string;
}
