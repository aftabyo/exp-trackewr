import { useState } from "react";
import SideBar from "../../components/common/SideBar";
import Cookies from "js-cookie";
import usePutData from "../../hooks/usePutData";

export default function UserProfile() {
  const [user] = useState(JSON.parse(Cookies.get("user")));
  console.log(user);

  const updateData = usePutData(`/user/${user?._id}`);

  const [password, setPassword] = useState("");
  const [enablePassword, setEnablePassword] = useState(false);

  const UpdatePass = async () => {
    console.log(password);
    const { message } = await updateData({ password });
    alert(message);
    setEnablePassword(false);
  };

  return (
    <>
      <SideBar />
      <div className="addForm">
        <h3 className="text-4xl font-semibold text-center pt-10 ">
          User Profile
        </h3>
        <div className="flex flex-col justify-center items-center gap-5 h-[90vh]">
          <p className="text-xl font-semibold">Name: {user?.name}</p>
          <p className="text-xl font-semibold">Email: {user?.email}</p>
          <button
            className="px-3 py-2 bg-[#51D289] w-fit mx-auto "
            onClick={() => setEnablePassword((prev) => !prev)}
          >
            Update Password
          </button>
          {enablePassword && (
            <div className="flex flex-col gap-3">
              <label className="font-semibold">Password:</label>
              <input
                type="password"
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
                className="bg-black text-white py-0.5 px-1.5 border-2 focus:border-white focus:outline-none rounded-lg h-[2.5rem] w-[18rem]"
                placeholder="******"
              />
              <button
                className="px-3 py-2 bg-[#51D289] w-fit mx-auto "
                onClick={UpdatePass}
              >
                Submit New Password
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
