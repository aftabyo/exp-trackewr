import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

export default function useGetData(url, dependencies = []) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  const at = Cookies.get("at");
  const preUrl = "http://localhost:5001/api/v1";

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      setMessage(null);
      setError(null);
      try {
        console.log("Making request to:", url);
        axios.defaults.headers.common.Authorization = `Bearer ${at}`;
        const response = await axios.get(`${preUrl}${url}`, {
          signal: controller.signal,
        });
        console.log("Response data:", response.data);
        if (response?.data?.success) {
          setData(response?.data?.payload); // Set the data state
          setError(false);
          setMessage(response?.data?.message);
        }
      } catch (err) {
        if (axios.isCancel(err)) {
          console.warn("Request canceled:", err);
          setError(true);
          setMessage(err?.message);
        } else {
          console.error("Fetch error:", err);
          setError(true);
          setMessage("Some error occured. Trying Again!!!");
        }
      }
    };

    fetchData();

    return () => {
      controller.abort("Fetch canceled by component unmount.");
    };
  }, [url, at, ...dependencies]); // Re-run effect when any dependency changes

  return { data, message, error };
}
