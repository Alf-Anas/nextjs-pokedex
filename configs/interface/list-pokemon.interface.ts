export interface GetAllPokemon {
  count: number;
  next: any;
  previous: any;
  results: Result[];
}

interface Result {
  name: string;
  url: string;
}
