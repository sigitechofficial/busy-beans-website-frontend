"use client";
import { Drawer, Portal, CloseButton } from "@chakra-ui/react";
import React, { useRef, useState } from "react";
import DrawerItem from "./DrawerItem";
import {
  MdOutlineSupportAgent,
  MdOutlineTableRestaurant,
  MdPayment,
  MdLogout,
} from "react-icons/md";
import {
  FaBicycle,
  FaChevronLeft,
  FaRegAddressBook,
  FaUser,
} from "react-icons/fa";
import { RxCounterClockwiseClock } from "react-icons/rx";
import { TbUserCircle } from "react-icons/tb";
import { IoCardOutline, IoNotificationsOutline } from "react-icons/io5";
import { GrUserAdmin } from "react-icons/gr";
import { FiLogOut } from "react-icons/fi";
import { info_toaster } from "@/utilities/Toaster";
import Link from "next/link";
import { LiaUserFriendsSolid } from "react-icons/lia";
import { useRouter } from "next/navigation";

const ProfileDrawer = ({ profileDrawer, setProfileDrawer }) => {
  const router = useRouter();
  const getProfile = [];
  const [drawerScroll, setDrawerScroll] = useState(0);
  const [inviteFriend, setInviteFriend] = useState(0);
  const drawerBodyRef = useRef(null);
  const handleDrawerScroll = (event) => {
    const scrollTop = event.target.scrollTop;
    setDrawerScroll(scrollTop);
  };

  function extractFirstLetters(str) {
    if (str) {
      const firstLetter = str.charAt(0);
      const spaceIndex = str.indexOf(" ");
      const secondLetter =
        spaceIndex !== -1 ? str.charAt(spaceIndex + 1) : null;
      return { firstLetter, secondLetter };
    }
  }

  const logoutFunc = () => {
    localStorage.clear();
    router.push("/");
    setProfileDrawer(false);
    info_toaster("Successfully Logged Out!");
  };

  if (typeof window !== "undefined") {
    var userName = localStorage.getItem("userName");
    var phoneNumber = localStorage.getItem("phoneNumber");
    var userEmail = localStorage.getItem("userEmail");
    var loginStatus = localStorage.getItem("loginStatus");
  }

  return (
    <>
      <Drawer.Root
        size="md"
        placement={"end"}
        open={profileDrawer}
        onOpenChange={(e) => setProfileDrawer(e.open)}
      >
        <Portal>
          <Drawer.Backdrop />
          <Drawer.Positioner>
            <Drawer.Content className="rounded-tl-xl rounded-bl-xl bg-theme text-white">
              <Drawer.Header
                className="rounded-tl-xl"
                p={0}
                boxShadow={
                  drawerScroll > 100
                    ? "0px 4px 10px rgba(0, 0, 0, 0.1)"
                    : "none"
                }
                transition="all 0.3s ease"
                position="absolute"
                top={drawerScroll > 100 ? "0" : "-60px"}
                left="0"
                right="0"
                backgroundColor="#86644c"
                zIndex={10}
                opacity={drawerScroll > 100 ? 1 : 0}
                visibility={drawerScroll > 100 ? "visible" : "hidden"}
                height="70px"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <p className="font-medium text-base">Profile</p>
              </Drawer.Header>

              <Drawer.Body
                ref={drawerBodyRef}
                className="w-full !pb-0 custom-scrollbar"
                px={0}
                onScroll={handleDrawerScroll}
              >
                {inviteFriend === 0 ? (
                  <section className="font-sf md:px-6 px-4 ">
                    <div className="space-y-6">
                      <div className="flex justify-between items-center mt-2">
                        <button
                          onClick={() => {
                            setProfileDrawer(false);
                          }}
                        >
                          <FaChevronLeft />
                        </button>
                        <div>
                          <IoNotificationsOutline size={26} />
                        </div>
                      </div>

                      <h1 className="font-omnes font-bold text-[32px] capitalize text-theme-black-2 ">
                        <span className="me-2">Howdy</span>
                        {userName ? userName : "User"}
                      </h1>
                      <div className="flex  items-start justify-start gap-7">
                        <div
                          className={` h-[120px] uppercase font-bold text-3xl  rounded-full w-[120px] md:h-[120px] flex justify-center items-center ${
                            false
                              ? "bg-theme-red bg-opacity-20 text-theme-red"
                              : "bg-theme-gray-6 bg-opacity-60 text-white"
                          }`}
                        >
                          {false ? (
                            false ? (
                              <img
                                src={``}
                                alt="image"
                                className="w-[120px]  h-[120px] object-cover rounded-full"
                              />
                            ) : (
                              <span className="initials">
                                {`${
                                  extractFirstLetters(
                                    localStorage.getItem("userName") ?? ""
                                  )?.firstLetter
                                }${
                                  extractFirstLetters(
                                    localStorage.getItem("userName") ?? ""
                                  )?.secondLetter
                                }`}
                              </span>
                            )
                          ) : (
                            <FaUser />
                          )}
                        </div>
                        <div className="flex flex-col gap-2 text-theme-black-2">
                          <h2 className="text-2xl font-semibold font-omnes mt-3 capitalize">
                            Hi,
                            {userName ? userName?.split(" ")[0] : "User"}
                          </h2>
                          <p className="font-sf  text-sm font-normal text-theme-black-2 text-opacity-60">
                            {userName ? <>{phoneNumber ?? ""}</> : <></>}
                          </p>
                          <p className="font-sf  text-sm font-normal text-theme-black-2 text-opacity-60">
                            {userEmail ?? "user@gmail.com"}
                          </p>
                          <div className="flex gap-10">
                            {/* <div>
                              <p className="text-base font-bold  font-sf  capitalize">
                                {5}
                              </p>
                              <p className="text-theme-black-2 text-opacity-60 font-normal">
                                Orders
                              </p>
                            </div> */}
                            {/* <div>
                              <p className="text-base font-bold font-sf  capitalize">
                                {19}
                              </p>
                              <p className="text-theme-black-2 text-opacity-60 font-normal">
                                Tokens
                              </p>
                            </div> */}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-6 my-2 mt-6">
                      <div>
                        <div className="text-theme-black-2 font-omnes text-2xl font-semibold mb-3">
                          {"Settings"}
                        </div>
                        <DrawerItem
                          Icon={LiaUserFriendsSolid}
                          text={"Invite Friends"}
                        />
                        <DrawerItem
                          Icon={MdOutlineSupportAgent}
                          text={"Support"}
                        />

                        <DrawerItem
                          Icon={RxCounterClockwiseClock}
                          text={"Order history"}
                          onClick={() => {
                            router.push("/order-history");
                            setProfileDrawer(false);
                          }}
                        />

                        <DrawerItem Icon={TbUserCircle} text={"Account"} />
                        <DrawerItem Icon={MdPayment} text={"Payment methods"} />
                        <DrawerItem
                          Icon={FaRegAddressBook}
                          text={"My addresses"}
                        />
                      </div>

                      <div>
                        <div className="text-theme-black-2 font-omnes text-2xl font-semibold mb-3">
                          {"Quick links"}
                        </div>
                        <div className="md:hidden">
                          <DrawerItem
                            Icon={LiaUserFriendsSolid}
                            text={"Our Story"}
                            onClick={() => {
                              router.push("/our-story");
                              setProfileDrawer(false);
                            }}
                          />
                          <DrawerItem
                            Icon={LiaUserFriendsSolid}
                            text={"Financing"}
                            onClick={() => {
                              router.push("/Financing");
                              setProfileDrawer(false);
                            }}
                          />
                          <DrawerItem
                            Icon={LiaUserFriendsSolid}
                            text={"Resources"}
                            onClick={() => {
                              router.push("/recepies");
                              setProfileDrawer(false);
                            }}
                          />
                          <DrawerItem
                            Icon={LiaUserFriendsSolid}
                            text={"Products"}
                            onClick={() => {
                              router.push("/product");
                              setProfileDrawer(false);
                            }}
                          />
                        </div>

                        <div className="">
                          <DrawerItem
                            Icon={LiaUserFriendsSolid}
                            text={"Payment details"}
                            onClick={() => {
                              router.push("/profile/payment-details");
                              setProfileDrawer(false);
                            }}
                          />
                          <DrawerItem
                            Icon={LiaUserFriendsSolid}
                            text={"Personal details"}
                            onClick={() => {
                              router.push("/profile/personal-details");
                              setProfileDrawer(false);
                            }}
                          />
                          <DrawerItem
                            Icon={LiaUserFriendsSolid}
                            text={"Preferences"}
                            onClick={() => {
                              router.push("/profile/preferences");
                              setProfileDrawer(false);
                            }}
                          />
                          <DrawerItem
                            Icon={LiaUserFriendsSolid}
                            text={"Security"}
                            onClick={() => {
                              router.push("/profile/security");
                              setProfileDrawer(false);
                            }}
                          />
                        </div>

                        {loginStatus === "true" ? (
                          <>
                            <DrawerItem
                              onClick={logoutFunc}
                              Icon={MdLogout}
                              text={"Logout"}
                            />
                          </>
                        ) : (
                          <>
                            <DrawerItem
                              Icon={GrUserAdmin}
                              onClick={() => {
                                router.push("/sign-in");
                                setProfileDrawer(false);
                              }}
                              text="Log in"
                            />
                            <DrawerItem
                              Icon={FiLogOut}
                              onClick={() => {
                                router.push("/sign-up");
                                setProfileDrawer(false);
                              }}
                              text="Sign up"
                            />
                          </>
                        )}
                      </div>
                    </div>
                  </section>
                ) : inviteFriend === 1 ? (
                  <div className="py-2 space-y-6 font-tt ">
                    <div className="font-black font-tt text-2xl">
                      <h5>Invite friends, get fomino credits</h5>
                    </div>
                    <div className="space-y-7">
                      <div className="flex gap-x-4">
                        <div>
                          <div className="min-w-[40px] min-h-[40px] bg-theme-red bg-opacity-20 text-theme-red font-bold text-xl flex justify-center items-center rounded-fullest">
                            1
                          </div>
                        </div>
                        <div className="space-y-2">
                          <h6 className="font-bold text-xl">Share your code</h6>
                          <p className="font-normal text-base text-black text-opacity-60 leading-tight">
                            Your friends will get $ 4 in Fomino credits for
                            eachof their first 3 delivery orders when they use
                            your code to sign up for Fomino.
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-x-4">
                        <div>
                          <div className="min-w-[40px] min-h-[40px] bg-theme-red bg-opacity-20 text-theme-red font-bold text-xl flex justify-center items-center rounded-fullest">
                            2
                          </div>
                        </div>
                        <div className="space-y-2">
                          <h6 className="font-bold text-xl">Earn credits</h6>
                          <p className="font-normal text-base text-black text-opacity-60 leading-tight">
                            You'll get $ 2 Fomino credits every time a friend
                            completes one of their first 3 delivery orders.{" "}
                            <br />
                            <br />
                            You can earn a maximum of $ 18 in credits by
                            inviting your friends to join Fomino.
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col gap-y-3 items-center">
                        <div className="py-3 px-5 w-full flex justify-center uppercase bg-theme-gray-10 rounded font-extrabold text-base">
                          {getProfile?.data?.data?.referalCode}
                        </div>
                        <button
                          onClick={() => {
                            info_toaster("Copied to clipboard");
                          }}
                          className="py-3 px-5 w-full bg-theme-red text-white rounded font-bold text-base"
                        >
                          Share your code
                        </button>
                        <button
                          onClick={() => setInviteFriend(2)}
                          className="font-medium text-base text-theme-red"
                        >
                          How does this work?
                        </button>
                      </div>
                    </div>
                  </div>
                ) : inviteFriend === 2 ? (
                  <div className="py-2 space-y-6 font-tt">
                    <div className="font-extrabold text-2xl">
                      <h5>How does this work?</h5>
                    </div>
                    <div className="space-y-4">
                      <div className="space-y-1">
                        <h6 className="font-bold text-xl">Share your code</h6>
                        <p className="font-normal text-base text-black text-opacity-60 leading-tight">
                          Your friends will get $ 4 in Fomino credits for eachof
                          their first 3 delivery orders when they use your code
                          to sign up for Fomino.
                        </p>
                      </div>
                      <div className="space-y-1">
                        <h6 className="font-bold text-xl">Earn credits</h6>
                        <p className="font-normal text-base text-black text-opacity-60 leading-tight">
                          You'll get $ 2 Fomino credits every time a friend
                          completes one of their first 3 delivery orders. <br />
                          <br />
                          You can earn a maximum of $ 18 in credits by inviting
                          your friends to join Fomino.
                        </p>
                      </div>
                      <div className="space-y-1">
                        <h6 className="font-bold text-xl">Please note</h6>
                        <p className="font-normal text-base text-black text-opacity-60 leading-tight">
                          Credit can be used for delivery orders only. When your
                          friends gets credits, they'll expire 30 days after
                          signing up to Fomino. Your credits will expire30 days
                          after your friend makes their first order. <br />
                          <br />
                          Stay tuned! Happy sharing!
                        </p>
                      </div>
                      <div className="flex justify-center">
                        <button className="font-medium text-base text-theme-red">
                          Terms and Conditions
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <></>
                )}
              </Drawer.Body>

              {/* <Drawer.Footer px={0} py={2}>
         
              </Drawer.Footer> */}
            </Drawer.Content>
          </Drawer.Positioner>
        </Portal>
      </Drawer.Root>
    </>
  );
};

export default ProfileDrawer;
