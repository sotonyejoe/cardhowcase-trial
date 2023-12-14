"use client";

import Image from 'next/image';
import Hero from '../components/Hero';
import SearchBar from '../components/SearchBar';
import CustomFilter from '../components/CustomFilter';
import CarCard from '../components/CarCard';
import {fetchCars} from "../utils"
import { fuels, yearsOfProduction } from '@/constants';
import ShowMore from '../components/ShowMore'
import { useEffect, useState } from 'react';

export default function Home() {
  // const allCars = await fetchCars({
  //   manufacturer: searchParams.manufacturer || '',
  //   year: searchParams.year || 2022,
  //   fuel: searchParams.fuel || '',
  //   limit: searchParams.limit || 10,
  //   model: searchParams.model || '',
  // });
  
  const [allCars, setAllCars] = useState("");
  const [loading, isLoading] = useState("");

  // search states
  const [manufacturer, setManufacturer] = useState("");
  const [model, setModel] = useState("");

  //filter states
  const [fuel, setFuel] = useState("");
  const [year, setYear] = useState(2021);

//pagnitation state
  const [limit, setLimit] = useState(10);

    const getCars = async () => {
      const result =  await fetchCars({
          manufacturer:manufacturer || '',
          year: year || 2022,
          fuel: fuel || '',
          limit: limit || 10,
          model: model || '',
      });

      setAllCars(result);
    }
  //useeffect hook
  useEffect(() => {

    //calling a function that recalls the cars
    getCars();
  }, [fuel, limit, year, manufacturer, model])
  
  const isDataEmpty = !Array.isArray(allCars) || allCars.length < 1 || !allCars;
  return (
    <main className="overflow-hidden">
         <Hero />

         <div className="mt-12 padding-x padding-y max-width" id="discover">
          <div className='home__text-container'>
            <h1 className='text-4xl font-extrabold'>Car Catalog</h1>
            <p>Explore the cars you might like</p>
          </div>

          {/* creating the filters */}
          <div className="home__filters">
            <SearchBar setManufacturer={setManufacturer} setModel={setModel}/>


            <div className='home__filter-container'>
              <CustomFilter title='fuel' options={fuels} setFilter={setFuel}/>
              <CustomFilter title='year' options={yearsOfProduction} setFilter={setYear}/>
            </div>
          </div>

          {loading && (
            <div className="mt-16 w-full flex-center">
              <Image 
              src="/loader.svg"
              alt="loader"
              width={50}
              height={50}
              />
            </div>
          )}

          {allCars.length > 0 ? (
            <section>
              <div className='home__cars-wrapper'>
                {allCars?.map((car) => <CarCard car={car}/>)}
              </div>

              <ShowMore 
              pageNumber={limit / 10}
              isNext={limit > allCars.length}
              setLimit={setLimit}
              />
            </section>
          ): (
            <div className='home__error-container'>
              <h2 className='text-black text-xl font-bold'>Oops, no results</h2>
              <p>{allCars?.message}</p>
            </div>
          )}
         </div>
     </main>
  )
}
