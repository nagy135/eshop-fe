type CategoryItem = {
  data: {
    name: string;
  };
  id: number;
  children?: CategoryItem[];
};

export type Categories = CategoryItem[];
