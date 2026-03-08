export interface ISearchProduct {


  id: number;
  name: string;
  description: string;
  price: number;
  picturesUrls: string[];
  size: string | null;
  color: string | null;
  rate: number;
  type: string | null;
  stock: number;
  categoryId: number;
  soldNumber: number;
}

