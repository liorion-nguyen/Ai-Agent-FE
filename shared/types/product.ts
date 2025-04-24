// export interface Product {
//   id: string;
//   name: string;
//   price: number;
//   imageUrl?: string;
//   description?: string;
//   inStock: boolean;
// }
export interface ProductDetail {
  id: string;
  name: string;
  description: string;
  basePrice: number;
  baseSku: string;
  baseImageUrl: string;
  createdAt: string; // ISO string
  updatedAt: string;
  productVariants: ProductVariant[];
  categories: ProductCategory[];
}

export interface ProductVariant {
  id: string;
  sku: string;
  price: number;
  stockQuantity: number;
  thumbnailUrl: string;
  imageUrls: string[];
  productId: string;
  product: string; // Consider replacing with `Product` if needed
  createdAt: string;
  updatedAt: string;
}

export interface ProductCategory {
  id: string;
  createdAt: string;
  updatedAt: string;
  productId: string;
  product: string; // Consider replacing with `Product` if needed
  categoryId: string;
  category: Category;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  parentId: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
  products: string[]; // or Product[] if you store full product objects here
}
