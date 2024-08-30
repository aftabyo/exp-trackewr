import { useEffect, useState } from "react";
import SideBar from "../../components/common/SideBar";
import TransactionCard from "../../components/common/TransactionCard";
import useGetData from "../../hooks/useGetData";

export default function Transactions() {
  const [search, setSearch] = useState("");
  // eslint-disable-next-line no-unused-vars

  const { data, error, message } = useGetData("/balance/transactions", []);

  // console.log({ error, message, data });
  // Sample Data
  // {
  //   _id: "",
  //   amount: 5000,
  //   category: "Rent",
  //   description: "Rent",
  //   date: "2024-03-15",
  // },

  const [transactionList, setTransactionList] = useState(data || []);

  useEffect(() => {
    // console.clear();
    console.log(data);
    data && setTransactionList(data);
  }, [data, transactionList]);

  const [transactions, setTransactions] = useState(transactionList);

  useEffect(() => {
    const list = transactionList.filter((transaction) => {
      return (
        transaction?.category
          ?.toLocaleLowerCase()
          ?.startsWith(search?.toLocaleLowerCase()) ||
        transaction?.description
          ?.toLocaleLowerCase()
          ?.startsWith(search?.toLocaleLowerCase())
      );
    });
    setTransactions(list);
  }, [search, transactionList, setTransactionList]);

  return (
    <>
      <SideBar />
      <div className=" ml-[5rem]">
        <h3 className="text-3xl text-[#FCF8D9] mb-5 font-semibold ml-[10%] pt-10">
          View Transactions
        </h3>
        <div className="ml-[10%] w-[80%] flex justify-between flex-wrap mb-16 items-center">
          <h5 className="text-xl text-[#FFE600]">Description</h5>
          <input
            type="search"
            value={search}
            placeholder="search..."
            onChange={(e) => setSearch(e.target.value)}
            className="py-2 px-3 text-black outline-none rounded-full"
          />
        </div>
        {error && (
          <p className="text-center font-bold font-lg text-red-500 ">
            {message}
          </p>
        )}
        {transactions.length > 0 ? (
          transactions?.map((transaction) => (
            <TransactionCard
              key={transaction?._id}
              description={transaction?.description}
              date={transaction?.date}
              category={transaction?.category}
              amount={transaction?.amount}
            />
          ))
        ) : (
          <p className="text-center font-bold font-lg ">
            No records to display
          </p>
        )}
      </div>
    </>
  );
}
