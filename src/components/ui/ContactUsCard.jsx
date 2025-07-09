import { FaLocationDot, FaMessage } from "react-icons/fa6";
import { IoCallSharp } from "react-icons/io5";

export default function ContactUsCard({ phoneNumber, userEmail, address }) {
  return (
    <div className="bg-transparent max-w-96 bg-blur-[24px] shadow-contactUsShadow border border-theme rounded-xl space-y-8 py-6 px-6">
      <p className="font-inter font-semibold text-4xl">We’re here</p>
      <p className="text-white/60 font-inter text-lg leading-tight">
        Our door is always open for our <br /> customers.
      </p>
      <div className="space-y-6 [&>p]:flex [&>p]:items-center [&>p]:gap-x-4 [&>p]:text-lg [&>p]:text-white">
        <p>
          <span>
            <IoCallSharp color="#F8E4BECC" size={26} />
          </span>{" "}
          <span>{phoneNumber}</span>
        </p>
        <p>
          <span>
            <FaMessage color="#F8E4BECC" size={26} />
          </span>{" "}
          <span>{userEmail}</span>
        </p>
        <p>
          <span>
            <FaLocationDot color="#F8E4BECC" size={26} />
          </span>{" "}
          <span>{address}</span>
        </p>
      </div>
    </div>
  );
}
