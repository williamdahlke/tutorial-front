import { Inter } from "next/font/google";
import Link from "next/link";
import React from "react";
import { useEffect, useState } from "react";

const inter = Inter({subsets: ["latin"]});

type WeatherData = {
  city: string;
  numberOfDays: number;
}

const Weather = () => {

    const apiKey = "b54ed9388d17434e9fe141250241705";

    const [weatherData, setWeatherData] = useState<WeatherData>({city: "", numberOfDays: 1});
    const [fetchedWeatherData, setFetchedWeatherData] = useState<any>();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    
      async function fetchWeather(city: string, numberOfDays: number){

        try{
          const response = await fetch("http://api.weatherapi.com/v1/forecast.json?key=" +
          apiKey +
          `&q=${city}` +
          `&days=${numberOfDays}`);

          const result = await response.json();          
          
          return result;

        } catch(err)
        {
          console.log(err);
        }                             
      }

      async function submitHandler(e: React.MouseEvent<HTMLButtonElement, MouseEvent>){
        setIsLoading(true);
        e.preventDefault();
        const result = await fetchWeather(weatherData.city, weatherData.numberOfDays);
        setFetchedWeatherData(result);
        console.log(result);
        setIsLoading(false);
      }      
        
    return (
        <main
      className={`flex min-h-screen flex-col items-center justify-center gap-4 p-24 ${inter.className}`}
    >      
      <h1 className="text-3xl font-bold mb-4">Tutorial Front End</h1>
      <Link href="/" className="text-2xl border-black border-2 rounded-md p-2 m-2">Home</Link>     

      <div>
        <form className="border-2 border-black rounded-md p-2 m-2 bg-slate-500 flex flex-col">
          <h2 className="text-2xl p-4 text-center">Veja o clima da sua cidade</h2>
          <div className="flex justify-between gap-2">
            <label>Cidade</label>
            <input className="border-2 border-black rounded-md" type="text" value = {weatherData.city}
            onChange={(e) => {setWeatherData((prev) => {return {city: e.target.value, numberOfDays: prev.numberOfDays};})}}/>
          </div>

          <div className="flex justify-between gap-2">
            <label>Quantidade de dias</label>
            <input className="border-2 border-black rounded-md" type="number" value = {weatherData.numberOfDays}
            onChange={(e) => {setWeatherData((prev) => {return {city: prev.city, numberOfDays: Number(e.target.value)};})}}/>
          </div>

          <button type="submit" className="border-2 border-black p-2 rounded-md bg-slate-200 mt-4" onClick={submitHandler} disabled={isLoading}>Procurar</button>
        </form>        
      </div>
      {fetchedWeatherData && !fetchedWeatherData.error ? (
        <div className="mt-4 border-2 border-black rounded-md p-4 bg-white flex flex-col justify-center gap-4">
          <div>
            <span>Cidade: {fetchedWeatherData.location.name}</span>
            <img src={fetchedWeatherData.current.condition.icon} alt={""} width={50} height={50}/>            
          </div>
          <span>Hora e data local: {fetchedWeatherData.location.localtime}</span>
          <span>Temperatura agora: {fetchedWeatherData.current.temp_c} °C</span>

          <div className="flex flex-col">
            {/* <p className="mb-2">Próximos dias</p>             */}
          </div>
        </div>
      ) : <p>A busca não resultou dados</p>}
    </main>
    )
}
export default Weather;