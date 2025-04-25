"use client";
import { useEffect, useState } from "react";
import { error_toaster, info_toaster } from "./Toaster";
import axios from "axios";
import { BASE_URL } from "./URL";

const GetAPI = (url) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    var config = {
      headers: {
        accessToken: localStorage.getItem("accessToken"),
      },
    };
    const fetchData = () => {
      try {
        axios.get(BASE_URL + url, config).then((dat) => {
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
      },
    };
    try {
      axios.get(BASE_URL + url, config).then((dat) => {
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
