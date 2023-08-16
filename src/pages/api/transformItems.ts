interface CartItem {
  id: string;
  name: string;
  image?: string;
  price: number;
  quantity: number;
}

export const transformItems = (cartItems: CartItem[]) => {
  return cartItems.map((cartItem: CartItem) => ({
    price: cartItem.id,
    quantity: 1,
  }));
};
