import React, { useState } from "react";
import { Dialog, Portal } from "@chakra-ui/react";
import { RiSubtractFill } from "react-icons/ri";
import { BiPlus } from "react-icons/bi";
import { success_toaster } from "@/utilities/Toaster";

const ProdModal = ({ productModalData, productModal, setProductModal }) => {
  const { productId, image, name, description, qty, discount, price, unit } =
    productModalData;

  const [modalScroll, setModalScroll] = useState(0);
  const [headerShadow, setHeaderShadow] = useState(false);

  const handleModalScroll = (event) => {
    const scrollTop = event.target.scrollTop;
    setModalScroll(scrollTop);
    setHeaderShadow(scrollTop > 100);
  };

  if (typeof window !== "undefined") {
    var existingCartItems = localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [];
  }

  const [orderStatus, setOrderStatus] = useState({
    image: image,
    name: name,
    description: description,
    qty: 1,
    discount: discount,
    price: price,
    unit: unit,
  });

  const handleCart = () => {
    if (existingCartItems) {
      const checkItemIndex = existingCartItems.findIndex(
        (item) => item?.productId === productId
      );
      if (checkItemIndex !== -1) {
        const updatedItem = {
          ...existingCartItems[checkItemIndex],
          qty: orderStatus?.qty,
          weight: orderStatus?.qty * existingCartItems[checkItemIndex]?.price,
        };
        existingCartItems[checkItemIndex] = updatedItem;
        localStorage.setItem("cartItems", JSON.stringify(existingCartItems));
        success_toaster("Product updated successfully");
      } else {
        existingCartItems.push({
          productId: productId,
          name: name,
          description: description,
          qty: orderStatus?.qty,
          discount: discount,
          price: price,
          weight: price * orderStatus?.qty,
          unit: unit,
        });
        localStorage.setItem("cartItems", JSON.stringify(existingCartItems));
        success_toaster("Product Added successfully");
      }
    } else {
      localStorage.setItem(
        "cartItems",
        JSON.stringify([
          {
            productId: productId,
            name: name,
            description: description,
            qty: orderStatus?.qty,
            discount: discount,
            price: price,
            weight: price * orderStatus?.qty,
            unit: unit,
          },
        ])
      );
      success_toaster("Product added successfully");
    }
    setProductModal(false);
  };

  return (
    <>
      <Dialog.Root
        size={{
          base: "fullscreen",
          sm: "md",
        }}
        placement={{ sm: "center" }}
        open={productModal}
        onOpenChange={(e) => setProductModal(e.open)}
        motionPreset="slide-in-bottom"
      >
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content
              borderRadius="20px"
              borderBottomRadius={{
                base: "0px",
                sm: "20px",
              }}
              overflow={"hidden"}
              height="max"
              position={{ base: "absolute", sm: "fixed" }}
              bottom={{ base: "0", sm: "auto" }}
              left={{ base: "0", sm: "50%" }}
              transform={{ sm: "translateX(-50%)" }}
            >
              <Dialog.Header
                p={0}
                boxShadow={
                  modalScroll > 200 ? "0px 4px 10px rgba(0, 0, 0, 0.1)" : "none"
                }
                transition="all 0.3s ease"
                position="absolute"
                top={modalScroll > 200 ? "0" : "-60px"}
                left="0"
                right="0"
                backgroundColor="#fff"
                zIndex={10}
                opacity={modalScroll > 200 ? 1 : 0}
                visibility={modalScroll > 200 ? "visible" : "hidden"}
                height="70px"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Dialog.Title>
                  {" "}
                  {false ? (
                    <div></div>
                  ) : (
                    <h3
                      className={`${
                        modalScroll > 192 ? "block" : "hidden"
                      } text-base text-center capitalize my-5 font-sf font-medium text-theme-black-2`}
                    >
                      {name}
                    </h3>
                  )}
                </Dialog.Title>
              </Dialog.Header>
              <Dialog.Body p={0} borderRadius="20px">
                <div
                  onScroll={handleModalScroll}
                  className="w-full h-max overflow-auto font-sf custom-scrollbar pb-10"
                >
                  <div className="w-full h-[292px] mb-3">
                    <img
                      className="w-full h-full object-cover"
                      src={image}
                      alt=""
                    />
                  </div>
                  <div className=" px-4">
                    <h4 className="!text-[32px] max-w-[400px]  text-theme-black-2 font-omnes font-bold capitalize  leading-10">
                      {name}
                    </h4>
                    <p className="font-sf text-lg my-5 text-red-600">
                      {price} {unit}
                    </p>
                    <p className="capitalize text-sm font-sf text-theme-black-2  font-normal mt-3">
                      {description}
                    </p>
                  </div>
                </div>
              </Dialog.Body>
              <Dialog.Footer p={0}>
                <div className="flex flex-col w-full">
                  <div className="px-5 py-5 flex justify-center items-center  gap-3 w-full">
                    <div className="shadow-smButtonShadow  w-40 h-14 rounded-full flex items-center justify-around text-[#707175] bg-white">
                      <button
                        disabled={orderStatus?.qty === 1}
                        onClick={() =>
                          setOrderStatus({
                            ...orderStatus,
                            qty: orderStatus?.qty - 1,
                          })
                        }
                        className={`${
                          (orderStatus?.qty === 0 &&
                            existingCartItems?.find(
                              (ele) => ele?.productId === productId
                            )) ||
                          (orderStatus?.qty === 1 &&
                            !existingCartItems?.find(
                              (ele) => ele?.productId === productId
                            ))
                            ? "cursor-not-allowed bg-theme text-white text-opacity-20 border border-theme"
                            : "hover:bg-white hover:text-theme border border-theme bg-theme text-white duration-300"
                        } w-10 h-10 flex justify-center items-center rounded-full outline-none`}
                      >
                        <RiSubtractFill />
                      </button>
                      <span className="text-lg font-sf">
                        {orderStatus?.qty}
                      </span>
                      <button
                        onClick={() =>
                          setOrderStatus({
                            ...orderStatus,
                            qty: orderStatus?.qty + 1,
                          })
                        }
                        className="w-10 h-10 flex justify-center items-center rounded-full bg-theme text-white hover:bg-white hover:text-theme border border-theme duration-300"
                      >
                        <BiPlus />
                      </button>
                    </div>
                    <button
                      onClick={handleCart}
                      className={`shadow-lgButtonShadow bg-[#86644c] w-full flex items-center text-white rounded-full h-14 hover:opacity-80 ${
                        qty > 0 ? "justify-between" : "center"
                      }`}
                    >
                      <div className="text-md text-center font-sf font-bold w-full">
                        {qty > 0
                          ? existingCartItems?.find(
                              (ele) => ele?.productId === productId
                            )
                            ? "Update Cart"
                            : "Add to Cart"
                          : "Remove from cart"}
                      </div>
                      {/* {qty > 0 ? (
                        <div className="text-md font-sf font-semibold">
                          {(
                            qty *
                            (parseFloat(discount) +
                              addOnsData.reduce((accumulator, ele) => {
                                return (
                                  accumulator +
                                  (parseFloat(ele?.total) || 0) *
                                    (ele?.qty || 1)
                                );
                              }, 0))
                          ).toFixed(2)}{" "}
                          {unit}
                        </div>
                      ) : (
                        <></>
                      )} */}
                    </button>
                  </div>
                </div>
              </Dialog.Footer>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </>
  );
};

export default ProdModal;
