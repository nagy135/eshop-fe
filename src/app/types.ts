export type Configuration = {
  title: string;
  banner: string;
};

export type Item = {
  name: string;
  description: string;
  price: number;
  image__image: string[];
};

export type QueryParams = Record<string, string | string[] | undefined>;
