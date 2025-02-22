export type ProductCategory = 'garrafa' | 'pack' | 'botella';

export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: ProductCategory;
  createdAt: string;
  updatedAt: string;
}

export interface CreateProductDto {
  name: string;
  description: string;
  price: number;
  stock: number;
  category: ProductCategory;
}

export interface UpdateProductDto extends Partial<CreateProductDto> {}