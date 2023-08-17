export type Configuration = {
  title: string;
  banner: string;
};

export type Item = {
  id: number;
  name: string;
  description: string;
  price: number;
  image__image: string[];
};

export type User = {
  id: number;
};

export type QueryParams = Record<string, string | string[] | undefined>;
