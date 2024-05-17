import { FetchedData } from "@/pages";
import { Dispatch, SetStateAction, useState } from "react";

type FormData = {
  userId: number;
  title: string;
  completed: boolean;
};

type NewItemFormsProps = {
  setData: Dispatch<SetStateAction<FetchedData[]>>;
};

const NewItemForm = ({ setData }: NewItemFormsProps) => {
  const [formData, setFormData] = useState<FormData>({
    userId: 0,
    title: "",
    completed: false,
  });

  console.log(formData);

  function onSubmitHandler(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    //colocar este cara para não recarregar a página quando der o submit
    event.preventDefault();

    setData((previousData) => {
      const newData = [
        {
          id: Math.random() * 1000,
          ...formData,
        },
        ...previousData,
      ];
      return newData;
    });

    setFormData({
      userId: 0,
      title: "",
      completed: false,
    });
  }

  return (
    <div className="p-2 border-2 border-black rounded-md bg-grey-300">
      <form className="flex flex-col items-center justify-center gap-4">
        <div className="flex gap-2 justify-between items-center">
          <label htmlFor="userId">User ID</label>
          <input
            id="userId"
            className="border-2 border-black rounded-md"
            type="text"
            value={formData.userId == 0 ? "" : formData.userId.toString()}
            onChange={(e) => {
              setFormData({ ...formData, userId: Number(e.target.value) });
            }}
          />
        </div>

        <div className="flex gap-2 justify-between items-center">
          <label htmlFor="title">Title</label>
          <input
            id="title"
            className="border-2 border-black rounded-md"
            type="text"
            value={formData.title}
            onChange={(e) => {
              setFormData({ ...formData, title: e.target.value });
            }}
          />
        </div>

        <div className="flex gap-2 justify-between items-center">
          <label htmlFor="completed">Completed</label>
          <input
            id="completed"
            className="border-2 border-black rounded-md"
            type="radio"
            checked={formData.completed}
            onClick={() => {
              setFormData((prev) => {
                return { ...formData, completed: !prev.completed };
              });
            }}
          />
        </div>

        <button
          type="submit"
          className="border-2 border-black p-2 rounded-md bg-white"
          onClick={onSubmitHandler}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default NewItemForm;
