import { useState } from "react";
import GraphGenerator from "../../components/Charts/GraphGenerator";
import SideBar from "../../components/common/SideBar";
import { FaRupeeSign } from "react-icons/fa";
import Cookies from "js-cookie";
import useGetData from "../../hooks/useGetData";

export default function Dashboard() {
  const [userName] = useState(JSON.parse(Cookies.get("user"))?.name);

  const {
    data: balance,
    error: balanceError,
    message: balanceMessage,
  } = useGetData("/balance", []);
  const {
    data: income,
    error: incomeError,
    message: incomeMessage,
  } = useGetData("/income", []);
  const {
    data: expense,
    error: expenseError,
    message: expenseMessage,
  } = useGetData("/expense", []);

  // console.log({
  //   balance: { balanceError, balanceMessage },
  //   income: { incomeError, incomeMessage },
  //   expense: { expenseError, expenseMessage },
  // });

  const transactions = [
    { label: "Total Income", value: income || 0 },
    { label: "Total Expense", value: expense || 0 },
    { label: "Total Balance", value: balance || 0 },
  ];

  return (
    <>
      <SideBar />
      <div className="py-16 cursor-default ml-[5rem]">
        <h3 className="text-4xl font-semibold">Hello, {userName}</h3>

        <div className="flex flex-wrap items-center justify-around gap-10 w-[75vw] md:w-[89vw] my-10">
          {transactions.map((transaction, index) => (
            <div className="w-[15rem] py-10 bg-[#2D2D2D] mx-auto" key={index}>
              <h4 className="text-3xl font-semibold text-center">
                {transaction.label}
              </h4>
              <h5 className="text-2xl font-semibold pt-5 flex items-center justify-center">
                <FaRupeeSign />
                {transaction.value}
              </h5>
            </div>
          ))}
        </div>
        {balanceError && (
          <p className="text-center text-red-500 font-semibold`">
            {balanceMessage}
          </p>
        )}
        {incomeError && (
          <p className="text-center text-red-500 font-semibold`">
            {incomeMessage}
          </p>
        )}
        {expenseError && (
          <p className="text-center text-red-500 font-semibold`">
            {expenseMessage}
          </p>
        )}
        <GraphGenerator
          data={[...transactions]}
          type="Bar"
          x="Transanctions"
          y="Amount"
          title="Transaction Analysis"
        />
        <GraphGenerator
          data={[...transactions]}
          type="Doughnut"
          x="Transanctions"
          y="Amount"
          title="Transaction Analysis"
        />
        {/* <GraphGenerator
          data={[
            { label: "First", value: 5 },
            { label: "Second", value: 10 },
            { label: "Third", value: 7 },
          ]}
          type="Line"
          x="X axis"
          y="Y axis"
          title="Doughnut"
        />
        <GraphGenerator
          data={[
            { label: "First", value: 5 },
            { label: "Second", value: 10 },
            { label: "Third", value: 7 },
          ]}
          type="Pie"
          x="X axis"
          y="Y axis"
          title="Doughnut"
        />
        <GraphGenerator
          data={[
            { label: "First", value: 5 },
            { label: "Second", value: 10 },
            { label: "Third", value: 7 },
          ]}
          type="PolarArea"
          x="X axis"
          y="Y axis"
          title="Doughnut"
        />
        <GraphGenerator
          data={[
            { label: "First", value: 5 },
            { label: "Second", value: 10 },
            { label: "Third", value: 7 },
          ]}
          type="Radar"
          x="X axis"
          y="Y axis"
          title="Doughnut"
        />
        <GraphGenerator
          data={[
            { label: "First", value: 5 },
            { label: "Second", value: 10 },
            { label: "Third", value: 7 },
          ]}
          type="Scatter"
          x="X axis"
          y="Y axis"
          title="Doughnut"
        /> */}
      </div>
    </>
  );
}
