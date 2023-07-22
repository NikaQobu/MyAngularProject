export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string[];
  images: string[];
}

export interface GetProductsResponse {
  products: Product[];
  total: string;
  skip: 0;
  limit: 30;
}

export interface cartProduct {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string[];
  images: string[];
  count: number;
}
