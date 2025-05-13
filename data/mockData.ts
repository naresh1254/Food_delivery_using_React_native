import { Restaurant } from '@/types/Restaurant';
import { Category } from '@/types/Category';
import { MenuItem } from '@/types/MenuItem';

export const restaurants: Restaurant[] = [
  {
    id: '1',
    name: 'Burger Palace',
    imageUrl: 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    cuisines: ['American', 'Burgers'],
    rating: 4.7,
    reviewCount: 324,
    distance: 0.8,
    deliveryTime: 25,
    featured: true,
    freeDelivery: true,
    minOrder: 15,
    description: 'The best burgers in town with a wide variety of toppings and sides. Our beef is 100% grass-fed and our vegetables are locally sourced.',
    address: '123 Main St, Anytown, USA'
  },
  {
    id: '2',
    name: 'Pizza Heaven',
    imageUrl: 'https://images.pexels.com/photos/905847/pexels-photo-905847.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    cuisines: ['Italian', 'Pizza'],
    rating: 4.5,
    reviewCount: 216,
    distance: 1.2,
    deliveryTime: 35,
    freeDelivery: false,
    minOrder: 20,
    description: 'Authentic Italian pizza made in a wood-fired oven. We use traditional recipes and the finest ingredients imported from Italy.',
    address: '456 Oak St, Anytown, USA'
  },
  {
    id: '3',
    name: 'Sushi Express',
    imageUrl: 'https://images.pexels.com/photos/1148086/pexels-photo-1148086.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    cuisines: ['Japanese', 'Sushi'],
    rating: 4.8,
    reviewCount: 189,
    distance: 1.5,
    deliveryTime: 40,
    featured: true,
    freeDelivery: true,
    minOrder: 25,
    description: 'Fresh and delicious sushi prepared by expert chefs. We source our fish daily to ensure the highest quality.',
    address: '789 Maple Ave, Anytown, USA'
  },
  {
    id: '4',
    name: 'Taco Fiesta',
    imageUrl: 'https://images.pexels.com/photos/2087748/pexels-photo-2087748.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    cuisines: ['Mexican', 'Tacos'],
    rating: 4.3,
    reviewCount: 156,
    distance: 0.9,
    deliveryTime: 30,
    freeDelivery: false,
    minOrder: 15,
    description: 'Authentic Mexican street food with a modern twist. Our recipes have been passed down through generations.',
    address: '101 Pine St, Anytown, USA'
  },
  {
    id: '5',
    name: 'Green Garden',
    imageUrl: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    cuisines: ['Vegetarian', 'Healthy'],
    rating: 4.6,
    reviewCount: 142,
    distance: 1.8,
    deliveryTime: 35,
    featured: false,
    freeDelivery: true,
    minOrder: 18,
    description: 'Delicious and nutritious vegetarian and vegan options. We use organic produce and sustainable practices.',
    address: '202 Elm St, Anytown, USA'
  },
  {
    id: '6',
    name: 'Noodle House',
    imageUrl: 'https://images.pexels.com/photos/2347311/pexels-photo-2347311.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    cuisines: ['Chinese', 'Noodles'],
    rating: 4.4,
    reviewCount: 178,
    distance: 1.3,
    deliveryTime: 25,
    featured: false,
    freeDelivery: false,
    minOrder: 15,
    description: 'Authentic Chinese noodles and dumplings made from scratch. Our recipes are inspired by regional Chinese cuisine.',
    address: '303 Cedar St, Anytown, USA'
  }
];

export const categories: Category[] = [
  {
    id: '1',
    name: 'All',
  },
  {
    id: '2',
    name: 'Pizza',
    iconUrl: 'https://img.icons8.com/color/48/000000/pizza.png',
  },
  {
    id: '3',
    name: 'Burgers',
    iconUrl: 'https://img.icons8.com/color/48/000000/hamburger.png',
  },
  {
    id: '4',
    name: 'Sushi',
    iconUrl: 'https://img.icons8.com/color/48/000000/sushi.png',
  },
  {
    id: '5',
    name: 'Italian',
    iconUrl: 'https://img.icons8.com/color/48/000000/pasta.png',
  },
  {
    id: '6',
    name: 'Mexican',
    iconUrl: 'https://img.icons8.com/color/48/000000/taco.png',
  },
  {
    id: '7',
    name: 'Chinese',
    iconUrl: 'https://img.icons8.com/color/48/000000/noodles.png',
  },
  {
    id: '8',
    name: 'Vegetarian',
    iconUrl: 'https://img.icons8.com/color/48/000000/vegetarian-food-symbol.png',
  }
];

export const menuItems: Record<string, MenuItem[]> = {
  '1': [
    {
      id: '101',
      name: 'Classic Cheeseburger',
      description: 'Juicy beef patty with cheddar cheese, lettuce, tomato, and special sauce on a toasted bun.',
      price: 9.99,
      imageUrl: 'https://images.pexels.com/photos/1633578/pexels-photo-1633578.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      category: 'Burgers',
      tags: ['Bestseller', 'Spicy']
    },
    {
      id: '102',
      name: 'Double Bacon Burger',
      description: 'Two beef patties with crispy bacon, American cheese, onions, and BBQ sauce.',
      price: 12.99,
      imageUrl: 'https://images.pexels.com/photos/1251198/pexels-photo-1251198.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      category: 'Burgers',
      tags: ['Popular']
    },
    {
      id: '103',
      name: 'Veggie Burger',
      description: 'Plant-based patty with avocado, sprouts, tomato, and vegan mayo on a whole grain bun.',
      price: 10.99,
      imageUrl: 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      category: 'Burgers',
      tags: ['Vegetarian']
    },
    {
      id: '104',
      name: 'French Fries',
      description: 'Crispy golden fries seasoned with sea salt.',
      price: 3.99,
      imageUrl: 'https://images.pexels.com/photos/1583884/pexels-photo-1583884.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      category: 'Sides'
    },
    {
      id: '105',
      name: 'Onion Rings',
      description: 'Crispy battered onion rings served with dipping sauce.',
      price: 4.99,
      imageUrl: 'https://images.pexels.com/photos/1893555/pexels-photo-1893555.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      category: 'Sides'
    },
    {
      id: '106',
      name: 'Chocolate Milkshake',
      description: 'Rich and creamy chocolate milkshake topped with whipped cream.',
      price: 5.99,
      imageUrl: 'https://images.pexels.com/photos/103566/pexels-photo-103566.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      category: 'Drinks'
    }
  ],
  '2': [
    {
      id: '201',
      name: 'Margherita Pizza',
      description: 'Classic pizza with tomato sauce, fresh mozzarella, and basil on a thin crust.',
      price: 12.99,
      imageUrl: 'https://images.pexels.com/photos/1146760/pexels-photo-1146760.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      category: 'Pizza',
      tags: ['Classic']
    },
    {
      id: '202',
      name: 'Pepperoni Pizza',
      description: 'Tomato sauce, mozzarella, and spicy pepperoni on a traditional crust.',
      price: 14.99,
      imageUrl: 'https://images.pexels.com/photos/708587/pexels-photo-708587.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      category: 'Pizza',
      tags: ['Bestseller', 'Spicy']
    },
    {
      id: '203',
      name: 'Vegetarian Supreme',
      description: 'Loaded with bell peppers, mushrooms, onions, olives, and tomatoes on a whole wheat crust.',
      price: 15.99,
      imageUrl: 'https://images.pexels.com/photos/825661/pexels-photo-825661.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      category: 'Pizza',
      tags: ['Vegetarian']
    },
    {
      id: '204',
      name: 'Garlic Breadsticks',
      description: 'Warm breadsticks brushed with garlic butter and herbs.',
      price: 5.99,
      imageUrl: 'https://images.pexels.com/photos/1438515/pexels-photo-1438515.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      category: 'Sides'
    },
    {
      id: '205',
      name: 'Caesar Salad',
      description: 'Crisp romaine lettuce with Caesar dressing, croutons, and parmesan cheese.',
      price: 7.99,
      imageUrl: 'https://images.pexels.com/photos/1059905/pexels-photo-1059905.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      category: 'Salads'
    }
  ],
  '3': [
    {
      id: '301',
      name: 'California Roll',
      description: 'Crab, avocado, and cucumber rolled in sushi rice and seaweed.',
      price: 8.99,
      imageUrl: 'https://images.pexels.com/photos/359993/pexels-photo-359993.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      category: 'Rolls',
      tags: ['Popular']
    },
    {
      id: '302',
      name: 'Tuna Nigiri',
      description: 'Fresh tuna slices over pressed sushi rice.',
      price: 9.99,
      imageUrl: 'https://images.pexels.com/photos/2098085/pexels-photo-2098085.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      category: 'Nigiri',
      tags: ['Fresh']
    },
    {
      id: '303',
      name: 'Salmon Sashimi',
      description: 'Thinly sliced fresh salmon served with wasabi and soy sauce.',
      price: 12.99,
      imageUrl: 'https://images.pexels.com/photos/8986793/pexels-photo-8986793.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      category: 'Sashimi',
      tags: ['Premium']
    },
    {
      id: '304',
      name: 'Dragon Roll',
      description: 'Shrimp tempura, avocado, and cucumber topped with eel and avocado.',
      price: 14.99,
      imageUrl: 'https://images.pexels.com/photos/2098143/pexels-photo-2098143.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      category: 'Rolls',
      tags: ['Specialty', 'Spicy']
    },
    {
      id: '305',
      name: 'Miso Soup',
      description: 'Traditional Japanese soup with tofu, seaweed, and green onions.',
      price: 3.99,
      imageUrl: 'https://images.pexels.com/photos/539451/pexels-photo-539451.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      category: 'Sides'
    },
    {
      id: '306',
      name: 'Edamame',
      description: 'Steamed young soybeans lightly salted.',
      price: 4.99,
      imageUrl: 'https://images.pexels.com/photos/9404245/pexels-photo-9404245.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      category: 'Sides',
      tags: ['Vegetarian']
    }
  ]
};