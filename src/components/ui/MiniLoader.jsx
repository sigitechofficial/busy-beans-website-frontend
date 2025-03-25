import { CirclesWithBar } from "react-loader-spinner";

export default function MiniLoader() {
  return (
    <div className="bg-transparent w-full py-5 flex items-center justify-center">
      <CirclesWithBar
        height="120"
        width="120"
        color="#86644C"
        outerCircleColor="#86644C"
        innerCircleColor="#86644C"
        barColor="#86644C"
        ariaLabel="circles-with-bar-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div> 
  );
}
