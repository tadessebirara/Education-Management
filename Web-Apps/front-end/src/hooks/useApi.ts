import { useState, useCallback } from "react";
import apiClient from "../services/apiClient";

type RequestConfig = {
  headers?: Record<string, string>;
  params?: Record<string, string | number | boolean>;
};

interface UseApiOptions<T = unknown> {
  onSuccess?: (data: T) => void;
  onError?: (error: Error) => void;
}

export function useApi<T = unknown>(options: UseApiOptions<T> = {}) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const execute = useCallback(
    async (requestFn: () => any) => {
      setLoading(true);
      setError(null);
      try {
        const result = await requestFn();
        const responseData = result?.data !== undefined ? result.data : result;
        setData(responseData);
        if (options.onSuccess) {
          options.onSuccess(responseData);
        }
        return responseData;
      } catch (err) {
        const errorObj = err instanceof Error ? err : new Error(String(err));
        setError(errorObj);
        if (options.onError) {
          options.onError(errorObj);
        }
        throw errorObj;
      } finally {
        setLoading(false);
      }
    },
    [options],
  );

  const get = useCallback(
    (url: string, config?: RequestConfig) => {
      return execute(() => apiClient.get(url, config));
    },
    [execute],
  );

  const post = useCallback(
    (url: string, data?: unknown, config?: RequestConfig) => {
      return execute(() => apiClient.post(url, data, config));
    },
    [execute],
  );

  const put = useCallback(
    (url: string, data?: unknown, config?: RequestConfig) => {
      return execute(() => apiClient.put(url, data, config));
    },
    [execute],
  );

  const del = useCallback(
    (url: string, config?: RequestConfig) => {
      return execute(() => apiClient.delete(url, config));
    },
    [execute],
  );

  return {
    data,
    loading,
    error,
    get,
    post,
    put,
    delete: del,
    execute,
  };
}
