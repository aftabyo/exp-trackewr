import { useState } from "react";
import SideBar from "../../components/common/SideBar";
import IncomeForm from "../../components/Forms/IncomeForm";
import usePostData from "../../hooks/usePostData";
import { useNavigate } from "react-router-dom";

export default function InputIncome() {
  const navigate = useNavigate();
  const SubmitIncome = usePostData("/income");

  // eslint-disable-next-line no-unused-vars
  const [income, setIncome] = useState({
    data: null,
    err: null,
    message: null,
  });

  const submitForm = (sendData) => {
    // eslint-disable-next-line no-unused-vars
    var data;
    SubmitIncome({
      category: sendData?.source,
      date: sendData?.incomeDate,
      amount: sendData?.received,
      description: sendData?.desc,
    })
      .then((res) => {
        setIncome(res);
        data = res;
        alert(res?.message);
      })
      .catch((err) => {
        console.log(err);
        setIncome({
          data: null,
          err: true,
          message: "Not able to create such income. Try again!",
        });
        alert("Not able to create such income. Try again!");
      });
    // console.log(income, data);
    navigate("/user/transaction");
  };

  return (
    <div className=" ml-[5rem] addForm">
      <SideBar />
      <IncomeForm submitFormData={submitForm} />
    </div>
  );
}
