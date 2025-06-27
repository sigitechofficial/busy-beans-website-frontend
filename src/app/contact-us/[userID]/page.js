"use client";
import ContactUsCard from "@/components/ui/ContactUsCard";
import PhoneInput from "react-phone-input-2";
import SwiperSider from "@/components/ui/SwiperSlider";
import { useParams } from "next/navigation";

export default function ContactUs() {
  const { userID } = useParams()
  console.log("🚀 ~ ContactUs ~ userID:", userID)
  return (
    <div className="w-full">
      <div className=" bg-contactUsGradient pt-[140px] relative">
        <h2 className="font-playfairDisplay text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-bold text-center text-white mb-10">
          Contact Us
        </h2>

        <div className="flex justify-center pb-14">
          <ContactUsCard />
        </div>
      </div>
      <div className="bg-themeExtraDark py-20 space-y-16">
        <div className="font-robotoSerif space-y-4">
          <p className="text-xl sm:text-4xl lg:text-6xl  2xl:text-7xl text-white text-center font-robotoSerif font-bold mx-auto">
            Get in touch
          </p>
          <p className="font-medium text-lg text-center">
            How can we help you today?
          </p>
        </div>
        <div className="space-y-10 max-w-[900px] mx-auto">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-y-2">
              <label className="text-white font-medium">Full Name</label>
              <input
                type="text"
                name="companyInfo"
                // onChange={handleInfo}
                // value={userData?.info?.companyInfo}
                placeholder="Enter Company Info"
                className="border border-inputBorder rounded-xl outline-none px-3 py-2 bg-white"
              />
            </div>
            <div className="flex flex-col gap-y-2">
              <label htmlFor="phone" className="text-white font-medium">
                Phone Number
              </label>
              <div className="grid grid-cols-12 gap-x-2">
                <PhoneInput
                  focusBorderColor="none"
                  borderWidth="none"
                  className="chakra_input col-span-3"
                  inputStyle={{
                    width: "110px",
                    height: "100%",
                    borderRadius: "12px",
                    border: "1px solid #ffffff",
                    backgroundColor: "#ffffff",
                    color: "#3B3B3B",
                    opacity: "20",
                  }}
                  buttonStyle={{
                    backgroundColor: "#ffffff",
                    // border: "1px solid #86644C",
                  }}
                  containerStyle={{
                    borderRadius: "12px",
                    // backgroundColor: "#6f4e37",
                  }}
                  dropdownStyle={{
                    // backgroundColor: "#6f4e37",
                    borderRadius: "8px",
                  }}
                  country={"pk"}
                  // onChange={(phone) =>
                  //   setUserData({
                  //     ...userData,
                  //     info: {
                  //       ...userData?.info,
                  //       countryCode: phone,
                  //     },
                  //   })
                  // }
                />
                <input
                  type="number"
                  name="phoneNumber"
                  // onChange={handleInfo}
                  // value={userData?.info?.phoneNumber}
                  placeholder="Enter Phone Number"
                  className="border border-inputBorder rounded-xl outline-none ms-2 col-span-9 px-3 py-2 w-full  bg-white"
                />
              </div>
            </div>
            <div className="flex flex-col gap-y-2">
              <label className="text-white font-medium">Email</label>
              <input
                type="email"
                name="email"
                // onChange={handleInfo}
                // value={userData?.info?.companyInfo}
                placeholder="Enter Email"
                className="border border-inputBorder rounded-xl outline-none px-3 py-2 bg-white"
              />
            </div>
            <div className="flex flex-col gap-y-2">
              <label className="text-white font-medium">Subject</label>
              <input
                type="text"
                name="companyInfo"
                // onChange={handleInfo}
                // value={userData?.info?.companyInfo}
                placeholder="Enter Subject"
                className="border border-inputBorder rounded-xl outline-none px-3 py-2 bg-white"
              />
            </div>
            <div className="flex flex-col gap-y-2 col-span-2">
              <label className="text-white font-medium">Message</label>
              <textarea
                type="text"
                name="messgae"
                // onChange={handleInfo}
                // value={userData?.info?.companyInfo}
                rows="6"
                placeholder="Enter Subject"
                className="border border-inputBorder rounded-xl outline-none px-3 py-2 bg-white"
              />
            </div>
          </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="font-medium rounded-xl bg-theme text-white w-2/4  py-3"
              >
                Send Message
              </button>
          </div>
        </div>
      </div>

      <div className="w-full bg-themeLight py-10 sm:pt-10 sm:pb-14 max-lg:px-5">
        <h4 className="text-xl sm:text-4xl lg:text-6xl  2xl:text-7xl text-white text-center font-robotoSerif font-bold mx-auto">
          Our Mission and Promise to You
        </h4>

        <p className="font-robotoSerif sm:text-xl font-semibold text-white text-center py-6 sm:py-10">
          "Message From Our Founders"
        </p>
        <p className="text-center text-sm sm:text-lg text-white max-w-[1000px] mx-auto font-switzer font-extralight sm:leading-9">
          Hello and thank you for visiting. We would love to welcome you to the
          Busy Bean Coffee Family.  Busy Bean Coffee is a manufacturer of
          Specialty Coffee Equipment for the Foodservice Industry.  ​Since 2014,
          we have been helping hotels, restaurants, Cafes, and bakeries
          implement successful <br /> and very profitable specialty coffee
          programs. ​I would like to personally invite you to try Busy Bean
          Coffee and see what we can do for you. You can stop by one of our demo
          centers around the country or better yet we will come to you.
          <br />
          ​Sincerely,
        </p>
        <p className="text-center text-lg text-white max-w-[1000px] mx-auto font-switzer font-extralight leading-9">
          ​Travis Estes, Co-Founder
        </p>
      </div>

      {/* ==Customer says== */}

      <div className="w-full bg-themeDark pt-10 sm:pt-24 pb-10 max-lg:px-5">
        <h4 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl xl:6xl text-white text-center font-robotoSerif font-bold mx-auto">
          What Our Customers Say About Our Products
        </h4>
        <div className="w-full xl:w-[90%] 2xl:w-[78%] mx-auto">
          <SwiperSider />
        </div>
      </div>
    </div>
  );
}
