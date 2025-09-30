const defaultApi = 'http://localhost:3000/api/v1';
const apiUrl = import.meta.env.VITE_API_URL || defaultApi;
const assetsBaseUrl = apiUrl.replace(/\/api\/.*/, '');

export const config = {
  apiUrl,
  assetsBaseUrl,
  isDevelopment: import.meta.env.DEV,
  isProduction: import.meta.env.PROD,
};

export default config;
