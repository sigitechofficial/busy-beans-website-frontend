"use client";

import { Drawer, Portal, CloseButton } from "@chakra-ui/react";

function PaymentModal() {
  return (
    <Dialog.Root>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Dialog Title</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <>
                <h4 className="text-3xl text-theme-black-2 font-omnes font-bold mt-3 mb-6">
                  Payment methods
                </h4>

                <div className="">
                  {paymentMethods.map((itm) => (
                    <div
                      className={`py-2 cursor-pointer h-[76px] border-b flex items-center w-full`}
                      onClick={() => {
                        handleSelect(itm?.name, itm.type);
                        setPaymentModal(false);
                      }}
                    >
                      <div className="flex items-center gap-3 justify-between w-full">
                        <div className="flex items-center gap-x-4">
                          <img
                            src={`${
                              itm?.name.includes("Cards")
                                ? "/images/credit-card.webp"
                                : itm?.name.includes("Apple")
                                ? "/images/epay.webp"
                                : itm?.name.includes("Google")
                                ? "/images/gpay.webp"
                                : itm?.name.includes("COD")
                                ? "/images/cashPay.png"
                                : ""
                            }`}
                            alt="payment-card"
                            className="w-9 h-9 object-contain"
                          />
                          <span className="text-base font-sf font-medium text-theme-black-2">
                            {itm?.name}
                          </span>
                        </div>

                        {selectedPayment.name !== itm?.name && (
                          <button className=" bg-[#37946524] text-[#379465] bg-opacity-20 flex justify-center items-center text-end rounded-md py-2 px-4 font-semibold">
                            Choose
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </>
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button variant="outline">Cancel</Button>
              </Dialog.ActionTrigger>
              <Button>Save</Button>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}

export default PaymentModal;
