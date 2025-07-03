import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("cartItems")) || [];
    setCartItems(stored);
  }, []);

  const syncToStorage = (items) => {
    localStorage.setItem("cartItems", JSON.stringify(items));
    setCartItems(items);
  };

  const addOrUpdateCartItem = (item) => {
    const existingIndex = cartItems.findIndex(
      (i) => i.productId === item.productId
    );
    let updatedCart;

    if (existingIndex !== -1) {
         const perUnitWeight = item.weight||1;


      updatedCart = [...cartItems];
      updatedCart[existingIndex] = {
        ...updatedCart[existingIndex],
        qty: item.qty,
        weight: item.qty * perUnitWeight,
      };
    } else {

      updatedCart = [
        ...cartItems,
        {
          ...item,
          weight: item.qty * (item.weight || 1),
        },
      ];
    }

    syncToStorage(updatedCart);
  };

  const handleItemClick = (type, id) => {
    let updatedCart = [];

    if (type === "plus") {
      updatedCart = cartItems.map((item) => {
        if (Number(item.productId) === Number(id)) {
          return {
            ...item,
            qty: item.qty + 1,
          };
        }
        return item;
      });
    } else if (type === "minus") {
      updatedCart = cartItems.map((item) => {
        if (Number(item.productId) === Number(id) && item.qty > 1) {
          return {
            ...item,
            qty: item.qty - 1,
          };
        }
        return item;
      });
    } else if (type === "delete") {
      updatedCart = cartItems.filter(
        (item) => Number(item.productId) !== Number(id)
      );
    }

    syncToStorage(updatedCart);
  };

  return (
    <CartContext.Provider
      value={{ cartItems, setCartItems, addOrUpdateCartItem, handleItemClick }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
