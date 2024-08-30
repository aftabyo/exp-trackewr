import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import useGetData from "../hooks/useGetData";
import { useEffect, useState } from "react";

export default function ProtectedRoute({ children }) {
  const at = Cookies.get("at");
  const res = Cookies.get("user");

  const [loggedIn, setLoggedIn] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (at && res) {
      const userData = JSON.parse(res);
      setUser(userData);
      setLoggedIn(true);
    } else {
      Cookies.remove("at");
      Cookies.remove("rt");
      Cookies.remove("user");
      setLoggedIn(false);
      console.warn("Please Login!");
    }
  }, [at, res]);

  const { data, error } = useGetData(user ? `/user/${user._id}` : null, [user]);

  if (loggedIn && !error) {
    console.log({ status: "logged In", user: data?.user });
    // Cookies.set("user", JSON.stringify(data?.user));
    return <>{children}</>;
  } else {
    return (
      <div className="w-full h-screen m-auto text-center ">
        <div className="h-1/2" />
        <p>User not logged-in. Please Login In!</p>
        <Link to={"/"}>Go to Login page</Link>
      </div>
    );
  }
}
