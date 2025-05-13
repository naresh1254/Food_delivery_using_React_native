export interface Restaurant {
  id: string;
  name: string;
  imageUrl: string;
  cuisines: string[];
  rating: number;
  reviewCount: number;
  distance: number;
  deliveryTime: number;
  featured?: boolean;
  freeDelivery?: boolean;
  minOrder?: number;
  description?: string;
  address?: string;
}