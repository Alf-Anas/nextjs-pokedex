export interface ListParams {
  limit: number;
  offset: number;
}

export interface GetAllPokemon {
  count: number;
  next: any;
  previous: any;
  results: Result[];
}

export interface Result {
  name: string;
  url: string;
}
