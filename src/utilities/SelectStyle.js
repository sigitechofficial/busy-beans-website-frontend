const selectStyles = {
  control: (provided, state) => ({
    ...provided,
    background: "transparent",
    outline: "none",
    boxShadow: state.isFocused ? `0 0 0 1px lightGray` : "none",
    cursor: "pointer",
    border: "1px solid #E2E8F0",
    borderRadius: "6px",
    paddingTop: "3px",
    paddingBottom: "3px",
    outerWidth: "300px",
    "&:hover": {
      border: "1px solid #E2E8F0",
    },
  }),
  dropdownIndicator: (provided, state) => ({
    ...provided,
    color: state.isFocused ? "lightGray" : "lightGray",
    "&:hover": {
      color: "lightGray",
    },
  }),
};

export const selectStyles2 = {
  control: (provided, state) => ({
    ...provided,
    background: "transparent",
    outline: "none",
    boxShadow: state.isFocused ? `0 0 0 1px lightGray` : "none",
    cursor: "pointer",
    border: "1px solid #E2E8F0",
    borderRadius: "4px",
    paddingTop: "0.375rem",
    paddingBottom: "0.375rem",
    color: "#64748B",
    "&:hover": {
      border: "1px solid #E2E8F0",
    },
  }),
  placeholder: (provided) => ({
    ...provided,
    color: "#64748B",
  }),
  singleValue: (provided) => ({
    ...provided,
    color: "#64748B",
  }),
  dropdownIndicator: (provided, state) => ({
    ...provided,
    color: state.isFocused ? "lightGray" : "lightGray",
    "&:hover": {
      color: "lightGray",
    },
  }),
};


export const drawerSelectStyles = {
  control: (provided, state) => ({
    ...provided,
    background: "#ffffff",
    outline: "none",
    boxShadow: state.isFocused ? `0 0 0 1px #3e342c` : "none",
    cursor: "pointer",
    border: "1px solid #3e342c",
    borderRadius: "4px",
    paddingTop: "0.375rem",
    paddingBottom: "0.375rem",
    color: "#3e342c",
    "&:hover": {
      border: "1px solid #3e342c",
    },
  }),
  placeholder: (provided) => ({
    ...provided,
    color: "#3e342c",
  }),
  singleValue: (provided) => ({
    ...provided,
    color: "#3e342c",
  }),
  dropdownIndicator: (provided, state) => ({
    ...provided,
    color: state.isFocused ? "#3e342c" : "#3e342c",
    "&:hover": {
      color: "#3e342c",
    },
  }),
  menu: (provided) => ({
    ...provided,
    backgroundColor: "#6f4e37",
  }),

  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isFocused ? "#322a23" : "#6f4e37",
    color: "#ffffff",
    cursor: "pointer",
  }),
};

export const drawerSelectStyles2 = {
  control: (provided, state) => ({
    ...provided,
    background: "#3B3B3B",
    outline: "none",
    boxShadow: state.isFocused ? `0 0 0 1px #3e342c` : "none",
    cursor: "pointer",
    border: "1px solid #3e342c",
    borderRadius: "12px",
    paddingTop: "4px",
    paddingBottom: "4px",
    color: "#ffffff",
    "&:hover": {
      border: "1px solid #3e342c",
    },
  }),
  placeholder: (provided) => ({
    ...provided,
    color: "#9CA3AF",
  }),
  singleValue: (provided) => ({
    ...provided,
    color: "#ffffff",
  }),
  dropdownIndicator: (provided, state) => ({
    ...provided,
    color: state.isFocused ? "#9CA3AF" : "#9CA3AF",
    "&:hover": {
      color: "#9CA3AF",
    },
  }),
  menu: (provided) => ({
    ...provided,
    backgroundColor: "#6f4e37",
  }),

  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isFocused ? "#322a23" : "#6f4e37",
    color: "#ffffff",
    cursor: "pointer",
  }),
};
export const drawerSelectStyles3 = {
  control: (provided, state) => ({
    ...provided,
    background: "#ffffff", // Change background to white
    outline: "none",
    boxShadow: state.isFocused ? `0 0 0 1px #3e342c` : "none",
    cursor: "pointer",
    border: "1px solid #3e342c",
    borderRadius: "12px",
    paddingTop: "4px",
    paddingBottom: "4px",
    color: "#000000", // Change text color to black
    "&:hover": {
      border: "1px solid #3e342c",
    },
  }),
  placeholder: (provided) => ({
    ...provided,
    color: "#9CA3AF", // You can keep the placeholder color as it is
  }),
  singleValue: (provided) => ({
    ...provided,
    color: "#000000", // Text color for single selected value (black)
  }),
  dropdownIndicator: (provided, state) => ({
    ...provided,
    color: state.isFocused ? "#9CA3AF" : "#9CA3AF",
    "&:hover": {
      color: "#9CA3AF",
    },
  }),
  menu: (provided) => ({
    ...provided,
    backgroundColor: "#ffffff", // Change menu background to white
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isFocused ? "#f2f2f2" : "#ffffff", // Background color when option is focused
    color: "#000000", // Text color for options (black)
    cursor: "pointer",
  }),
};



export default selectStyles;
