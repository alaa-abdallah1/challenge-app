import { useState } from "react";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import { api } from "@/services";

interface UseMutationResponse<T> {
  isLoading: boolean;
  mutate: (config: AxiosRequestConfig) => Promise<AxiosResponse>;
}

export const useMutation = <T = any>(): UseMutationResponse<T> => {
  const [isLoading, setIsLoading] = useState(false);

  const mutate = async (config: AxiosRequestConfig) => {
    setIsLoading(true);
    try {
      const response: AxiosResponse<T> = await api(config);
      return response;
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, mutate };
};

export default useMutation;
