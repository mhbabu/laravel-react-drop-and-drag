import axios from "axios";
import toast  from "react-hot-toast";

axios.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response &&
    error.response.status >= 422 &&
    error.response.status < 500;

  if (!expectedError) {
    console.log(error);
    toast.error("An unexpected error occurred");
  }
  return Promise.reject(error);
});

function setBearerToken(bearerToken) {
  axios.defaults.headers.common["Authorization"] = bearerToken;
}

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  setBearerToken
};
