import { useNavigate } from "react-router-dom";
import SideBar from "../../components/common/SideBar";
import ExpenseForm from "../../components/Forms/ExpenseForm";
import useGetData from "../../hooks/useGetData";
import usePostData from "../../hooks/usePostData";
import { useState } from "react";

export default function InputExpense() {
  const navigate = useNavigate();
  const {
    data: getCategoryData,
    error: getCategoryError,
    message: getCategoryMessage,
  } = useGetData("/category", []);
  console.log({ getCategoryData, getCategoryError, getCategoryMessage });

  // eslint-disable-next-line no-unused-vars
  const [categoryResponse, setCategoryResponse] = useState({
    data: null,
    err: null,
    message: null,
  });

  // eslint-disable-next-line no-unused-vars
  const [expenseResponse, setExpenseResponse] = useState({
    data: null,
    err: null,
    message: null,
  });

  const CreateCategory = usePostData("/category");
  const SubmitExpense = usePostData("/expense");

  function addCategory(sendData) {
    CreateCategory({ name: sendData.category })
      .then(
        (res) => {
          setCategoryResponse(res);
          addExpense1(sendData, res?.data?._id);
        },
        (rsn) => {
          console.warn(rsn);
        }
      )
      .catch((err) => {
        console.log(err);
        setCategoryResponse({
          data: null,
          err: true,
          message: "Not able to create such category. Try again!",
        });
        alert("Not able to create such category. Try again!");
      });
  }

  const addExpense1 = (sendData, id) => {
    console.log(sendData);
    SubmitExpense({
      category: id,
      date: sendData?.expenseDate,
      amount: sendData?.spent,
      description: sendData?.desc,
    })
      .then(
        (res) => {
          setExpenseResponse(res);
          alert(res?.message);
          navigate("/user/transaction");
        },
        (rsn) => console.warn(rsn)
      )
      .catch((err) => {
        console.log(err);
        setExpenseResponse({
          data: null,
          err: true,
          message: "Not able to create such expense. Try again!",
        });
        alert("Not able to create such expense. Try again!");
      });
  };

  const submitFormData = (sendData) => {
    if (sendData?.newCategory) {
      addCategory(sendData);
    } else {
      console.log(sendData);
      SubmitExpense({
        category: sendData?.category?.value,
        date: sendData?.expenseDate,
        amount: sendData?.spent,
        description: sendData?.desc,
      })
        .then(
          (res) => {
            setExpenseResponse(res);
            alert(res?.message);
            navigate("/user/transaction");
          },
          (rsn) => console.warn(rsn)
        )
        .catch((err) => {
          console.log(err);
          setExpenseResponse({
            data: null,
            err: true,
            message: "Not able to create such expense. Try again!",
          });
          alert("Not able to create such expense. Try again!");
        });
    }
  };

  return (
    <div className=" ml-[5rem] addForm">
      <SideBar />
      <ExpenseForm
        submitFormData={submitFormData}
        getCategoryData={getCategoryData}
      />
    </div>
  );
}
