export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  discountedPrice?: number;
  imageUrl: string;
  category?: string;
  tags?: string[];
  available?: boolean;
}