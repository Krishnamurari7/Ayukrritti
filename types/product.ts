import { Database } from "./database";

export type Product = Database["public"]["Tables"]["products"]["Row"] & {
  category?: Category;
  images?: ProductImage[];
};

export type ProductImage = Database["public"]["Tables"]["product_images"]["Row"];

export type Category = Database["public"]["Tables"]["categories"]["Row"];

export type ProductWithDetails = Product & {
  category: Category;
  images: ProductImage[];
};
