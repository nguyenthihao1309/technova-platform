export type PublicUser = {
  id: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
};

export type Product = {
  _id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  stock: number;
  createdAt: string;
  updatedAt: string;
};
