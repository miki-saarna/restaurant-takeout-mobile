import React, { useState, useEffect, createContext } from "react";
import { locationRequest, locationTransform } from "./location.service";

export const LocationContext = createContext();

export const LocationContextProvider = ({ children }) => {
  const [keyword, setKeyword] = useState("san francisco");
  const [location, setLocation] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const onSearch = (searchKeyword) => {
    setIsLoading(true);
    setKeyword(searchKeyword);
  };

  useEffect(() => {
    if (!keyword.length) return;

    locationRequest(keyword.toLowerCase())
      .then(locationTransform)
      .then((res) => {
        setLocation(res);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err);
        setIsLoading(false);
      });
  }, [keyword]);

  return (
    <LocationContext.Provider
      value={{
        keyword,
        onSearch,
        location,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};
