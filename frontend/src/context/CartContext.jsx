import { createContext, useContext, useEffect, useMemo, useState } from "react";

const cartContext = createContext();

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState(() => {
    const saved = localStorage.getItem("app_cart");
    return saved ? JSON.parse(saved) : [];
  });

  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (product, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.product._id === product._id);
      if (existing) {
        return prev.map((item) =>
          item.product._id === product._id
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        );
      }
      return [...prev, { product, quantity }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (prodId) => {
    setItems((prev) => prev.filter((item) => item.product._id !== prodId));
  };

  const updateQuantity = (prodId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(prodId);
      return;
    }
    setItems((prev) =>
      prev.map((item) =>
        item.product._id === prodId ? { ...item, quantity } : item,
      ),
    );
  };

  const clearCart = () => {
    setItems([]);
    setIsCartOpen(false);
  };

  const cartCount = useMemo(() => {
    items.reduce((sum, item) => sum + item.quantity, 0);
  }, [items]);

  const cartTotal = useMemo(() => {
    items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  }, [items]);

  // const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);
  // const cartTotal = items.reduce(
  //   (sum, item) => sum + item.product.price * item.quantity,
  //   0,
  // );

  useEffect(() => {
    localStorage.setItem("app_cart", JSON.stringify(items));
  }, [items]);

  const value = {
    items,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartCount,
    cartTotal,
    isCartOpen,
    setIsCartOpen,
  };

  return <cartContext.Provider value={value}>{children}</cartContext.Provider>;
};

export const useCartContext = () => useContext(cartContext);
