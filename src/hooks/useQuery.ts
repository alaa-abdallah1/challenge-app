import { useState, useEffect, useCallback } from "react";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { api } from "@/services";

export const useQuery = <T = any>(url: string, config?: AxiosRequestConfig) => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  // Add a state to trigger refetch
  const [trigger, setTrigger] = useState(0);

  // Wrap fetchData in useCallback to prevent unnecessary recreations
  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const response: AxiosResponse<T> = await api.get<T>(url, config);
      setData(response.data);
      setError("");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error.message);
      } else {
        setError("An unexpected error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  }, [url, config]);

  useEffect(() => {
    fetchData();
  }, [fetchData, trigger]); // Add trigger as a dependency

  // Define the refetch function
  const refetch = () => setTrigger((prev) => prev + 1);

  return { data, error, isLoading, refetch };
};

export default useQuery;
