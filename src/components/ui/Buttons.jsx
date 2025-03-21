import { useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";

export default function BackButton() {
  const router =   useRouter()
  return (
    <button
    onClick={() => router.back()}
      className="flex justify-center items-center w-8 h-8 text-white bg-theme p-1 rounded-full hover:bg-white hover:text-theme duration-200"
    >
      <FaArrowLeft />
    </button>
  );
}
