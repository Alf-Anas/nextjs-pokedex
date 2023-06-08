export interface ListType {
  count: number;
  next: any;
  previous: any;
  results: ListPokemon[];
}

export interface ListPokemon {
  name: string;
  url: string;
}
