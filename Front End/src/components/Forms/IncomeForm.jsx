import { useState } from "react";

export default function IncomeForm({ submitFormData }) {
  const [expenseDate, setExpenseDate] = useState("");
  const [spent, setSpent] = useState("");
  const [desc, setDesc] = useState("");
  const [source, setSource] = useState("");

  const submitForm = (e) => {
    e.preventDefault();
    submitFormData({ incomeDate: expenseDate, received: spent, desc, source });
    setExpenseDate("");
    setSpent("");
    setDesc("");
    setSource("");
  };

  return (
    <form
      onSubmit={submitForm}
      className="flex flex-col gap-5  text-black w-full min-h-screen justify-center items-center"
    >
      <h3 className="text-3xl text-[#FCF8D9] my-5 font-semibold">
        Create Income
      </h3>
      <input
        type="date"
        className="p-1 border-2 outline-none w-[18rem]"
        value={expenseDate}
        onChange={(e) => setExpenseDate(e.target.value)}
        required
      />
      <input
        type="number"
        min={0}
        placeholder="Type the amount spent"
        className="p-1 border-2 outline-none w-[18rem]"
        value={spent}
        onChange={(e) => setSpent(e.target.value)}
        required
      />
      <input
        type="text"
        className="p-1 border-2 outline-none w-[18rem]"
        value={source}
        onChange={(e) => setSource(e.target.value)}
        placeholder="Add source"
        required
      />
      <textarea
        className="resize-none h-[8rem] p-1 border-2 outline-none w-[18rem]"
        placeholder="Add your reason here..."
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
      />
      <button type="submit" className="px-3 py-2 bg-[#51D289] w-fit mx-auto ">
        Add Income
      </button>
    </form>
  );
}
