"use client"
import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
const FloatingLabelInput = ({
  id,
  type,
  name,
  value,
  onChange,
  placeholder,
  isPassword = false,
  cursor = "cursor-pointer",
}) => {
  const [visible, setVisible] = useState(false);

  console.log(value,"valuevaluevalue")
  return (
    <div className="relative w-full font-sf font-normal text-base text-black cursor-text">
      <input
        id={id}
        type={isPassword ? (visible ? "text" : "password") : type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder=" "
        className={`rounded-lg py-3  px-4 peer block w-full  pt-[22px] pb-1 text-smw-full resize-none  text-white  bg-themeLight border-2 focus:border-3 border-theme-gray-12 placeholder:text-theme-black-2 placeholder:text-opacity-40 focus:outline-none focus:border-2 focus:border-goldenLight hover:border-2 hover:border-goldenLight hover:${cursor}`}
      />
      <label
        htmlFor={id}
        className="absolute left-4 top-[6px] text-white text-xs transition-all peer-placeholder-shown:top-[16px] peer-placeholder-shown:text-base peer-placeholder-shown:text-white peer-placeholder-shown:text-opacity-40 peer-focus:top-[7px] peer-focus:text-xs peer-focus:text-goldenLight pointer-events-none"
      >
        {placeholder}
      </label>

      {isPassword && (
        <button
          type="button"
          onClick={() => setVisible(!visible)}
          className="text-black text-opacity-40 absolute right-4 top-1/2 -translate-y-1/2"
        >
          {visible ? (
            <AiOutlineEye size={20} />
          ) : (
            <AiOutlineEyeInvisible size={20} />
          )}
        </button>
      )}
    </div>
  );
};

export default FloatingLabelInput;
