import { Database } from "./database";
import { Product } from "./product";

export type Order = Database["public"]["Tables"]["orders"]["Row"];

export type OrderItem = Database["public"]["Tables"]["order_items"]["Row"];

export type OrderWithItems = Order & {
  order_items: OrderItem[];
};

export type ShippingAddress = {
  fullName: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
};
