import "server-only";
import axios from "axios";

const strapiClient = axios.create({
  // Keep the public variable as a fallback while deployments migrate.
  baseURL:
    (process.env.STRAPI_URL || process.env.NEXT_PUBLIC_STRAPI_URL)?.replace(/\/$/, "") +
    "/api",
  headers: {
    "Content-Type": "application/json",
    ...(process.env.STRAPI_API_TOKEN
      ? { Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}` }
      : {}),
  },
});

// Axios errors contain request headers (including Authorization). Strip those
// before callers log errors or serialize them into an API response.
strapiClient.interceptors.response.use(
  (response) => response,
  (error: unknown) => {
    if (axios.isAxiosError(error)) {
      const safeError = new axios.AxiosError(
        `Strapi request failed${error.response ? ` (${error.response.status})` : ""}`,
        error.code,
      );
      safeError.status = error.response?.status;
      return Promise.reject(safeError);
    }
    return Promise.reject(new Error("Strapi request failed"));
  },
);

export default strapiClient;
