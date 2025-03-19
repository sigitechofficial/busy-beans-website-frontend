import CoffeSolution from "@/components/ui/CoffeSolution";
import ProductCard from "@/components/ui/ProductCard";

const page = () => {
  return (
    <div className="w-full ">
      <div className=" bg-themeLight pt-[140px] relative">
        <h2 className="font-playfairDisplay text-[7.2rem] font-bold text-center text-white mb-10">
          Products
        </h2>

        <div className="h-96 bg-[#FFF3DDCC]"></div>
        <div className="flex justify-center gap-4 text-white mt-14 [&>button]:border [&>button]:border-[#FFF3DDCC] [&>button]:rounded-full [&>button]:px-4 [&>button]:py-1.5">
          <button>Coffee Bean</button>
          <button>Coffee Bean</button>
          <button>Coffee Bean</button>
          <button>Coffee Bean</button>
          <button>Coffee Bean</button>
        </div>

        <div className="w-[75%] mx-auto bg-themeLight pt-14 pb-10 grid grid-cols-3 gap-x-2 gap-y-16 text-white">
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </div>

        <CoffeSolution />
      </div>
    </div>
  );
};

export default page;
