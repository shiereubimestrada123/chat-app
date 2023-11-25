import { AxiosError } from "axios";
import { axiosInstance } from ".";
import { User } from "@/types";

export const LoginUser = async (user: User) => {
  try {
    const response = await axiosInstance.post("/api/users/login", user);
    return response.data;
  } catch (error) {
    console.error('Error in LoginUser:', error);
    return (error as AxiosError)?.response?.data || 'An error occurred';
  }
};

export const RegisterUser = async (user: User) => {
  try {
    const response = await axiosInstance.post("/api/users/register", user);
    return response.data;
  } catch (error) {
    console.error('Error in RegisterUser:', error);
    return (error as AxiosError)?.response?.data || 'An error occurred';
  }
};