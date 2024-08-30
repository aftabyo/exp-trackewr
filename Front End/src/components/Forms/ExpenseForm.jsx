import { useState } from "react";
import Select from "react-select";

export default function ExpenseForm({ submitFormData, getCategoryData }) {
  const [expenseDate, setExpenseDate] = useState("");
  const [spent, setSpent] = useState("");
  const [desc, setDesc] = useState("");
  const [category, setCategory] = useState("");

  const [checked, setChecked] = useState(false);
  const [createCategory, setCreateCategory] = useState("");

  const options = getCategoryData?.map((cat) => {
    return { value: cat?._id, label: cat?.name };
  });
  console.log(options);
  //  [
  //   { value: "chocolate", label: "Chocolate" },
  //   { value: "strawberry", label: "Strawberry" },
  //   { value: "vanilla", label: "Vanilla" },
  // ];

  const submitForm = (e) => {
    e.preventDefault();
    if (checked)
      submitFormData({
        expenseDate,
        spent,
        desc,
        category: createCategory,
        newCategory: true,
      });
    else
      submitFormData({
        expenseDate,
        spent,
        desc,
        category,
        newCategory: false,
      });

    setExpenseDate("");
    setSpent("");
    setDesc("");
    setCategory("");
    setCreateCategory("");
  };

  return (
    <form
      onSubmit={submitForm}
      className="flex flex-col gap-5  text-black w-full min-h-screen justify-center items-center"
    >
      <h3 className="text-3xl text-[#FCF8D9] my-5 font-semibold">
        Create Expense
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
      <div className="flex gap-5">
        <input
          type="checkbox"
          value={checked}
          onChange={() => setChecked(!checked)}
        />
        <label className="text-white">Create Catergory</label>
      </div>
      {!checked ? (
        <Select
          options={options}
          className="w-[18rem]"
          value={category}
          onChange={(state) => setCategory(state)}
        />
      ) : (
        <input
          type="text"
          value={createCategory}
          onChange={(e) => setCreateCategory(e.target.value)}
          placeholder="Type tyour category here"
          className="p-1 border-2 outline-none w-[18rem]"
        />
      )}
      <textarea
        className="resize-none h-[8rem] p-1 border-2 outline-none w-[18rem]"
        placeholder="Add your reason here..."
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
      />
      <button type="submit" className="px-3 py-2 bg-[#51D289] w-fit mx-auto ">
        Add Expense
      </button>
    </form>
  );
}
