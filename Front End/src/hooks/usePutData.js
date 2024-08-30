import axios from "axios";
import Cookies from "js-cookie";

export default function usePutData(url = "/") {
  const at = Cookies.get("at");
  const preUrl = "http://localhost:5001/api/v1";

  const fetchData = async (postData) => {
    console.log("executing post...");
    try {
      axios.defaults.headers.common.Authorization = `Bearer ${at}`;
      const res = await axios.put(`${preUrl}${url}`, postData);
      console.log(res);
      const response = await res;
      console.log(response);

      if (response?.data?.success === true) {
        return {
          data: response?.data?.payload,
          err: false,
          message: response?.data?.message,
          at,
        };
      } else return { data: null, err: true, message: response?.data?.message };
    } catch (err) {
      console.log(err);
      return {
        data: null,
        err: true,
        message: "Some error occured. Try again!!!",
      };
    }
  };

  return fetchData;
}
