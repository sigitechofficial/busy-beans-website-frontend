"use client"
import axios from "axios";
import { BASE_URL } from "./URL";
import { error_toaster } from "./Toaster";

export const PostAPI = async (url, postData) => {
  let config = {
    headers: {
      accessToken: localStorage.getItem("accessToken"),
    },
  };
  try {
    let response = await axios.post(BASE_URL + url, postData, config);
    return response;
  } catch (error) {}
};


export const SignupAPI = async (url, postData) => {
  try {
    let response = await axios.post(BASE_URL + url, postData);
    return response;
  } catch (error) {
    error_toaster(error)
  }
};


export const loginAPI = async (url, postData) => {
  try {
    const res = await axios.post(BASE_URL + url, postData);
    return res;
  } catch (err) {}
};
