const api = {
  baseURL: process.env.NODE_ENV === 'production' 
    ? "https://api-5kdwrkjxe-dev-pablohs-projects.vercel.app/api"
    : "http://localhost:3334/api"
};

export default api;
