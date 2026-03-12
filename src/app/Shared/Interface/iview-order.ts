export interface IViewOrder{
  id: number;
  userName: string;
  userNumber: string;
  paymentWay: number;
  orderDate: string;
  totalPrice: number;
  transferredAmount: number; // 👈 المبلغ المحول
  orderConfirmation: boolean;
  address: string;
  notes: string;
  items: Item[];
}

export interface Item {
  name: string;
  price: number;
  quantity: number;
  description: string;
  itemTotalPrice: number;
  offerApplied: boolean;
  productId: number;
}