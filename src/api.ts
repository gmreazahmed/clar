import axios from "axios";

const api = axios.create({
  baseURL: "https://shop.sprwforge.com/api/v1",
});

// Token automatically attach
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const CatalogAPI = {
  categories: () => api.get("/categories"),
  products: (params?: any) => api.get("/products", { params }),
  productById: (id: string) => api.get(`/products/${id}`),
};

export const AuthAPI = {
  login: (email: string, password: string) =>
    api.post("/auth/login", { email, password }),
  profile: () => api.get("/user/profile"),
};

export default api;


export const UserAPI = {
  profile: () => api.get("/user/profile"),
  addresses: () => api.get("/user/addresses"),
  addAddress: (data: any) => api.post("/user/addresses", data),
  checkout: (data: any) => api.post("/checkout", data),
};
