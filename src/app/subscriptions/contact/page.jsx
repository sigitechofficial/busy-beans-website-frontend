"use client";
import { useState, useEffect } from "react";
import Select from "react-select";
import GetAPI from "@/utilities/GetAPI";
import { BASE_URL } from "@/utilities/URL";
import api from "../../../utilities/StatusErrorHandler";
import { drawerSelectStyles } from "@/utilities/SelectStyle";
import { useRouter } from "next/navigation";

export default function ContactPage() {
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    companyName: "",
    jobTitle: "",
    addressLineOne: "",
    addressLineTwo: "",
    city: "",
    state: "",
    country: "",
    zipCode: "",
    email: "",
    phone: "",
    businessType: "",
    numberOfLocations: "",
  });
  const [allCountriesData, setAllCountriesData] = useState([]);
  const [allStates, setAllStates] = useState([]);
  const [allCities, setAllCities] = useState([]);
  const router = useRouter();

  const { data: countriesData } = GetAPI("api/v1/admin/address-management/country");

  useEffect(() => {
    if (countriesData?.data?.data) {
      const countries = countriesData?.data?.data.map((country) => ({
        value: country?.isoCode,
        label: country?.name,
      }));
      setAllCountriesData(countries);
    }
  }, [countriesData]);

  const handleSelectedCountryStates = async (countryName) => {
    const selectedCountry = countriesData?.data?.data.find(
      (country) => country?.name === countryName
    );
    try {
      const res = await api.get(
        `${BASE_URL}api/v1/admin/address-management/state?countryInSystemId=${selectedCountry?.id}`
      );
      if (res?.data?.status === "success") {
        const states = res?.data?.data?.data.map((state) => ({
          value: state?.id,
          label: state?.name,
        }));
        setAllStates(states);
      } else {
        throw new Error(res?.data?.message || "An error occurred.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSelectedCountryStatesCities = async (stateID) => {
    try {
      const res = await api.get(
        `${BASE_URL}api/v1/admin/address-management/city?stateInSystemId=${stateID}`
      );
      if (res?.data?.status === "success") {
        const cities = res?.data?.data?.data.map((city) => ({
          value: city?.name,
          label: city?.name,
        }));
        setAllCities(cities);
      } else {
        throw new Error(res?.data?.message || "An error occurred.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = () => {
    console.log(userData);
  };

  return (
    <div className="relative bg-themeLight pt-[140px]">
      <h1 className="text-3xl font-bold text-center">Contact Form</h1>
      <p className="text-center text-lg mb-6">Fill out the form below to get in touch with us.</p>
      
      <div className="max-w-xl mx-auto">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="md:grid md:grid-cols-2 gap-x-4 max-md:space-y-4">
            <div className="flex flex-col gap-y-2">
              <label className="font-medium">First Name</label>
              <input
                type="text"
                value={userData.firstName}
                onChange={(e) => setUserData({ ...userData, firstName: e.target.value })}
                className="px-4 py-2 border rounded"
              />
            </div>
            <div className="flex flex-col gap-y-2">
              <label className="font-medium">Last Name</label>
              <input
                type="text"
                value={userData.lastName}
                onChange={(e) => setUserData({ ...userData, lastName: e.target.value })}
                className="px-4 py-2 border rounded"
              />
            </div>
          </div>

          <div className="flex flex-col gap-y-2">
            <label className="font-medium">Company Name</label>
            <input
              type="text"
              value={userData.companyName}
              onChange={(e) => setUserData({ ...userData, companyName: e.target.value })}
              className="px-4 py-2 border rounded"
            />
          </div>

          <div className="flex flex-col gap-y-2">
            <label className="font-medium">Job Title</label>
            <input
              type="text"
              value={userData.jobTitle}
              onChange={(e) => setUserData({ ...userData, jobTitle: e.target.value })}
              className="px-4 py-2 border rounded"
            />
          </div>

          <div className="flex flex-col gap-y-2">
            <label className="font-medium">Address Line 1</label>
            <input
              type="text"
              value={userData.addressLineOne}
              onChange={(e) => setUserData({ ...userData, addressLineOne: e.target.value })}
              className="px-4 py-2 border rounded"
            />
          </div>

          <div className="flex flex-col gap-y-2">
            <label className="font-medium">Address Line 2</label>
            <input
              type="text"
              value={userData.addressLineTwo}
              onChange={(e) => setUserData({ ...userData, addressLineTwo: e.target.value })}
              className="px-4 py-2 border rounded"
            />
          </div>

          <div className="flex flex-col gap-y-2">
            <label className="font-medium">Business Email</label>
            <input
              type="email"
              value={userData.email}
              onChange={(e) => setUserData({ ...userData, email: e.target.value })}
              className="px-4 py-2 border rounded"
            />
          </div>

          <div className="flex flex-col gap-y-2">
            <label className="font-medium">Business Phone Number</label>
            <input
              type="text"
              value={userData.phone}
              onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
              className="px-4 py-2 border rounded"
            />
          </div>

          <div className="md:grid md:grid-cols-2 gap-x-4 max-md:space-y-4">
            <div className="flex flex-col gap-y-2">
              <label className="font-medium">Country</label>
              <Select
                placeholder="Select Country"
                value={
                  userData?.country
                    ? { value: userData?.country, label: userData?.country }
                    : null
                }
                options={allCountriesData}
                onChange={(e) => {
                  setUserData({
                    ...userData,
                    country: e.label,
                    state: "",
                    city: "",
                  });
                  handleSelectedCountryStates(e.label);
                }}
                styles={drawerSelectStyles}
                className="w-full"
              />
            </div>
            <div className="flex flex-col gap-y-2">
              <label className="font-medium">State</label>
              <Select
                placeholder="Select State"
                value={
                  userData?.state ? { value: userData.state, label: userData.state } : null
                }
                options={allStates}
                onChange={(e) => {
                  setUserData({ ...userData, state: e.label });
                  handleSelectedCountryStatesCities(e.value);
                }}
                styles={drawerSelectStyles}
                className="w-full"
              />
            </div>
          </div>

          <div className="flex flex-col gap-y-2">
            <label className="font-medium">City</label>
            <Select
              placeholder="Select City"
              value={userData?.city ? { value: userData.city, label: userData.city } : null}
              options={allCities}
              onChange={(e) => setUserData({ ...userData, city: e.label })}
              className="w-full"
              styles={drawerSelectStyles}
            />
          </div>

          <div className="flex flex-col gap-y-2">
            <label className="font-medium">Zip Code</label>
            <input
              type="text"
              value={userData.zipCode}
              onChange={(e) => setUserData({ ...userData, zipCode: e.target.value })}
              className="px-4 py-2 border rounded"
            />
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="bg-theme text-white py-2 px-6 rounded-md font-semibold text-lg"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
