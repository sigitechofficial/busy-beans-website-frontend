import { createContext, useContext, useEffect, useState } from "react";
import { PostAPI } from "./PostAPI";
import { error_toaster, success_toaster } from "./Toaster";
import ErrorHandler from "./ErrorHandler";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [shippingChargesStatus, setShippingChargesStatus] = useState("");

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("cartItems")) || [];
    setCartItems(stored);
  }, []);

  const fetchCharges = async (updatedCart) => {
    let totalWeight = 0;
    totalWeight = updatedCart?.reduce((a, b) => {
      return a + b?.weight * b?.qty;
    }, 0);
    try {
      const res = await PostAPI("api/v1/admin/shipping-charges-on-weight", {
        weight: totalWeight,
      });
      if (res?.data?.status === "success") {
        success_toaster("Charges Added Successfully");
        // setOrder((prevOrder) => ({
        //   ...prevOrder,
        //   shippingCharges: res?.data?.data?.charges,
        // }));
        setShippingChargesStatus(res?.data?.data?.charges);
        // localStorage.setItem("shippingCharges", res?.data?.data?.charges);
      } else if (res?.data?.status === "fail") {
        setShippingChargesStatus("");
        error_toaster("Invalid Weight")
      } else {
        throw new Error(res?.data?.message || "An unexpected error occurred.");
      }
    } catch (error) {
      ErrorHandler(error);
    }
  };

  const syncToStorage = (items) => {
    localStorage.setItem("cartItems", JSON.stringify(items));
    setCartItems(items);
  };

  const addOrUpdateCartItem = (item) => {
    let updatedCart;
    const existingIndex = cartItems.findIndex(
      (i) => i.productId === item.productId
    );

    if (existingIndex !== -1) {
      // const perUnitWeight = item.weight || 1;
      if (item?.qty == 0) {
        updatedCart = cartItems.filter(
          (items) => Number(items.productId) !== Number(item?.productId)
        );
      } else {
        updatedCart = [...cartItems];
        updatedCart[existingIndex] = {
          ...updatedCart[existingIndex],
          qty: item.qty,
          // weight: item.qty * perUnitWeight,
        };
      }
    } else {
      updatedCart = [
        ...cartItems,
        {
          ...item,
          // weight: item.qty * (item.weight || 1),
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
    fetchCharges(updatedCart);
    syncToStorage(updatedCart);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        setCartItems,
        addOrUpdateCartItem,
        handleItemClick,
        shippingChargesStatus,
        setShippingChargesStatus,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
