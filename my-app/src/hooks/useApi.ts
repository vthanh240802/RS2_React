import React, { useEffect, useState } from "react";
import { fetchData } from "../utils/fectData";

const useApi = (url: string, initiaData?: any) => {
  const [data, setData] = useState(initiaData); // internal state 
  useEffect(() => {
    const fectDataDetail = async () => {
      try {
        const dataReponse = await fetchData(url);
        setData(dataReponse);
      } catch (err) {
        console.error("Error fecthing posts: ", err);
      }
    };
    fectDataDetail();
  }, []);
  return { data, setData };
};

export default useApi;
