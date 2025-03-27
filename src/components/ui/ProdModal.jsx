import React, { useState } from "react";
import { Button, CloseButton, Dialog, Portal } from "@chakra-ui/react";
import { RiSubtractFill } from "react-icons/ri";
import { BiPlus } from "react-icons/bi";

const ProdModal = ({ productModal, setProductModal }) => {
  const [modalData, setModalData] = useState({
    image:
      "https://static.vecteezy.com/system/resources/thumbnails/037/236/579/small/ai-generated-beautuful-fast-food-background-with-copy-space-free-photo.jpg",
    name: "Product Name",
    description: "This is the description of the product.",
    discountPrice: "99.99",
    price: "99.00",
  });
  const [modalScroll, setModalScroll] = useState(0);
  const [headerShadow, setHeaderShadow] = useState(false);

  const handleModalScroll = (event) => {
    const scrollTop = event.target.scrollTop;
    setModalScroll(scrollTop);
    setHeaderShadow(scrollTop > 100);
  };

  return (
    <>
      <Dialog.Root
        size="md"
        placement="center"
        open={productModal}
        onOpenChange={(e) => setProductModal(e.open)}
      >
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content borderRadius="20px" overflow={"hidden"}>
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
                      {modalData?.name}
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
                      src={modalData.image}
                      alt=""
                    />
                  </div>
                  <div className=" px-4">
                    <h4 className="!text-[32px] max-w-[400px]  text-theme-black-2 font-omnes font-bold capitalize  leading-10">
                      {modalData?.name}
                    </h4>
                    <p className="font-sf text-lg my-5 text-red-600">
                      {modalData?.price} CHF
                    </p>
                    <p className="capitalize text-sm font-sf text-theme-black-2  font-normal mt-3">
                      {modalData?.description}
                    </p>
                    {console.log(modalData)}
                  </div>
                </div>
              </Dialog.Body>
              <Dialog.Footer p={0}>
                <div className="flex flex-col w-full">
                  <div className="px-5 py-5 flex justify-center items-center  gap-3 w-full">
                    <div className="shadow-smButtonShadow  w-40 h-14 rounded-full flex items-center justify-around text-[#707175] bg-white">
                      <button
                        className={`${
                          (modalData.quantity === 0 &&
                            existingCartItems?.find(
                              (ele) => ele?.RPLinkId === modalData.r_pId
                            )) ||
                          (modalData.quantity === 1 &&
                            !existingCartItems?.find(
                              (ele) => ele?.RPLinkId === modalData.r_pId
                            ))
                            ? "cursor-not-allowed text-black text-opacity-20"
                            : "hover:bg-black hover:text-white duration-300"
                        } w-10 h-10 flex justify-center items-center rounded-full`}
                      >
                        <RiSubtractFill />
                      </button>
                      <span className="text-lg font-sf">
                        {modalData.quantity || 1}
                      </span>
                      <button className="w-10 h-10 flex justify-center items-center rounded-full hover:bg-black hover:text-white duration-300">
                        <BiPlus />
                      </button>
                    </div>
                    <Button
                      bgColor="black"
                      display="flex"
                      color="white"
                      justifyContent={
                        modalData.quantity > 0 ? "space-between" : "center"
                      }
                      borderRadius="full"
                      width="300px"
                      height="56px"
                      _hover={{
                        opacity: ".8",
                      }}
                      className="shadow-lgButtonShadow"
                    >
                      <div className="text-md font-sf font-bold">
                        {modalData.quantity > 0
                          ? existingCartItems?.find(
                              (ele) => ele?.RPLinkId === modalData.r_pId
                            )
                            ? "Update Cart"
                            : "Add to Cart"
                          : "Remove from cart"}
                      </div>
                      {modalData.quantity > 0 ? (
                        <div className="text-md font-sf font-semibold">
                          {(
                            modalData.quantity *
                            (parseFloat(modalData.discountPrice) +
                              addOnsData.reduce((accumulator, ele) => {
                                return (
                                  accumulator +
                                  (parseFloat(ele?.total) || 0) *
                                    (ele?.quantity || 1)
                                );
                              }, 0))
                          ).toFixed(2)}{" "}
                          CHF
                        </div>
                      ) : (
                        <></>
                      )}
                    </Button>
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
