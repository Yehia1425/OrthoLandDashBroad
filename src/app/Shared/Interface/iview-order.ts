
export interface IViewOrder{
  id: number;
  userName: string;
  userNumber: string;
  orderDate: string;
  totalPrice: number;
  orderConfirmation: boolean;
  address: string;
  notes: string;
  items: Item[]
}

interface Item {
  name: string;
  price: number;
  quantity: number;
  description: string;
  itemTotalPrice: number;
  offerApplied: boolean;
  productId: number;
}