export interface ProductModel {
  id: number;
  name: string;
  available: number;
  sold: number;
  categoryId: number;
  colorIds: number[];
  price: number;
}

type Product = ProductModel & {
  name?: string;
};

export type ProductDataObject = {
  [key: Product["id"]]: Product;
};

export type ProductState = {
  ids: Array<Product["id"]>;
  data: ProductDataObject;
  loading: "idle" | "loading" | "succeed" | "failed";
  error?: string;
};
