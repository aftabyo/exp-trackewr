import { useNavigate } from "react-router-dom";
import LoginImg from "../assets/Login.svg";
import LoginForm from "../components/Forms/LoginForm";
import usePostData from "../hooks/usePostData";
import Cookies from "js-cookie";

export default function LoginPage() {
  const fetchData = usePostData("/auth/login");
  const navigate = useNavigate();

  const sendUserData = async (sendData) => {
    console.log(sendData);
    const { data, err, message, at } = await fetchData(sendData);
    if (err) {
      alert(message);
    } else {
      Cookies.set("at", data?.accessToken, { expires: 1 });
      Cookies.set("rt", data?.refreshToken);
      Cookies.set("user", JSON.stringify(data?.user));
      alert(`Logging in user with email: ${data?.user?.email}`);
      console.log("Response: ", { data, err, message, at });
      navigate("/user");
    }
  };

  return (
    <div className="flex items-center justify-center flex-wrap flex-col lg:flex-row ">
      <img
        src={LoginImg}
        alt=""
        draggable={false}
        className="max-h-screen hidden lg:block"
      />
      <div className="flex flex-col justify-center gap-10 mx-auto w-[50%] h-screen">
        <h3 className="text-5xl font-bold cursor-default text-center">
          Sign In
        </h3>
        <LoginForm sendUserData={sendUserData} />
      </div>
    </div>
  );
}
