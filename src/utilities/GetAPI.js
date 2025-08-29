"use client";
import { useEffect, useState } from "react";
import { error_toaster } from "./Toaster";
import api from "./StatusErrorHandler";

const GetAPI = (url) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    if (!url) return; 

    var config = {
      headers: {
        // accessToken: localStorage.getItem("accessToken"),
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    };
    const fetchData = () => {
      try {
        api.get(url, config).then((dat) => {
          setData(dat.data);
        });
      } catch (error) {
        if (error.response) {
          const errorMessage =
            error.response.data?.message ||
            error.response.statusText ||
            "Server Error";
          error_toaster(
            `HTTP Error: ${error.response.status} - ${errorMessage}`
          );
        } else if (error.request) {
          error_toaster("Network Error: No response received from the server.");
        } else {
          error_toaster(`Error: ${error.message}`);
        }
      }
    };
    fetchData();
  }, [url]);

  const reFetch = async () => {
    var config = {
      headers: {
        accessToken: localStorage.getItem("accessToken"),
        // Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    };
    try {
      api.get(url, config).then((dat) => {
        setData(dat.data);
      });
    } catch (error) {
      if (error.response) {
        const errorMessage =
          error.response.data?.message ||
          error.response.statusText ||
          "Server Error";
        error_toaster(`HTTP Error: ${error.response.status} - ${errorMessage}`);
      } else if (error.request) {
        error_toaster("Network Error: No response received from the server.");
      } else {
        error_toaster(`Error: ${error.message}`);
      }
    }
  };

  return { data, reFetch };
};

export default GetAPI;
