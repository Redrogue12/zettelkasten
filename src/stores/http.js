import xior from "xior";

export const http = xior.create({
  baseURL: process.env.VUE_APP_SERVER || '',
});

http.interceptors.request.use((config) => {
  const token = localStorage.getItem("zettelkasten_token");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});
