"use client";
import axios from "axios";


export const useAxiosInstance = () => {


  return axios.create({
    baseURL: "https://bamjiye-agent-production.up.railway.app/",
    
  });
};
