import { FetchedData } from "@/pages";
import Item from "./Item";

//O que é um payload?
type ItemsListProps = {
  data: FetchedData[];
  onDelete: (id: number) => void;
};

//export default é para acessarmos o elemento em outra parte do código
export default function ItemsList({ data, onDelete }: ItemsListProps) {
  return (
    <div className="flex flex-col gap-2">
      {data.length ? (
        data.map((item, index) => (
          <Item key={item.id} item={item} index={index} onDelete={onDelete} />
        ))
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
