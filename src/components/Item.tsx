import { FetchedData } from "@/pages";

type ItemProps = {
  item: FetchedData;
  index: number;
  onDelete: (id: number) => void;
};

const Item = ({ item, index, onDelete }: ItemProps) => {
  return (
    <p
      className={`flex items-center justify-between border-2 border-black p-2 m-2" rounded-md ${
        item.completed ? "bg-green-500" : "bg-blue-200"
      }`}
      key={item.id}
    >
      <span>{`Item número ${index}`}</span>
      {item.title}
      {item.completed ? (
        <button
          onClick={(e) => {
            console.log(e);
            onDelete(item.id);
          }}
          className="border-2 border-black p-2 ronded-md bg-slate-400 hover:bg-slate-600 hover:text-white"
        >
          Delete
        </button>
      ) : null}
    </p>
  );
};

export default Item;
