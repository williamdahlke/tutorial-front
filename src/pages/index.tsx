import Image from "next/image";
import { Inter } from "next/font/google";
import { useEffect, useState } from "react";
import ItemsList from "@/components/ItemsList";
import NewItemForm from "@/components/NewItemForm";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export type FetchedData = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

export default function Home() {
  //useState e useEffect são hooks
  //useState renderiza a página
  const [data, setData] = useState<FetchedData[]>([]);

  //link da API
  //https://jsonplaceholder.typicode.com/todos
  //Usado quando o component é modificado. Roda toda vez que vc modificar algum componente
  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/todos"
      );
      const apiData = await response.json();
      //console.log(apiData);
      setData(apiData);
    }
    fetchData();
  }, []);

  function deleteItem(id: number) {
    setData((previousData) => {
      return previousData.filter((item) => item.id !== id);
    });
  }

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <h1 className="text-3xl font-bold mb-4">Tutorial Front End</h1>
      <Link
        href="/weather"
        className="text-2xl border-black border-2 rounded-md p-2 m-2"
      >
        Weather App
      </Link>
      <NewItemForm setData={setData} />
      <ItemsList data={data} onDelete={deleteItem} />
    </main>
  );
}
