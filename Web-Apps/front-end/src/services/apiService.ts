import apiClient from "./apiClient";

export interface ApiResponse<T = any> {
  data: T;
  message?: string;
  status: number;
}

class ApiService {
  // GET request
  async get<T>(url: string, config?: any): Promise<T> {
    const response = await apiClient.get(url, config);
    return response.data;
  }

  // POST request
  async post<T>(url: string, data?: any, config?: any): Promise<T> {
    const response = await apiClient.post(url, data, config);
    return response.data;
  }

  // PUT request
  async put<T>(url: string, data?: any, config?: any): Promise<T> {
    const response = await apiClient.put(url, data, config);
    return response.data;
  }

  // DELETE request
  async delete<T>(url: string, config?: any): Promise<T> {
    const response = await apiClient.delete(url, config);
    return response.data;
  }

  // PATCH request
  async patch<T>(url: string, data?: any, config?: any): Promise<T> {
    const response = await apiClient.patch(url, data, config);
    return response.data;
  }
}

export const apiService = new ApiService();
export default apiService;