import {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";
export default function IndexPage() {
  const [places,setPlaces] = useState([]);
  useEffect(() => {
    axios.get('/places').then(response => {
      setPlaces(response.data);
    });
  }, []);
  return (
    <div>      
      <div className="relative flex h-screen content-center items-center justify-center pt-16 pb-32">
        <div className="absolute top-0 h-full w-full bg-[url('https://images.unsplash.com/photo-1554995207-c18c203602cb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80')] bg-cover bg-center" />
        <div className="absolute top-0 h-full w-full bg-black/40 bg-cover bg-center" />
        <div className="max-w-8xl container relative mx-auto">
          <div className="flex flex-wrap items-center">
            <div className="ml-auto mr-auto w-full px-4 text-center lg:w-8/12">
              <h1 class="text-3xl font-bold tracking-tight leading-none text-white md:text-4xl lg:text-5xl dark:text-white">Xây dựng tổ ấm cùng HomeUs</h1>
              <div>                
                <form>
                    <div class="mt-10 flex">
                        <label for="search-dropdown" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Your Email</label>
                        <button id="dropdown-button" data-dropdown-toggle="dropdown" class="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-l-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600" type="button">All categories <svg aria-hidden="true" class="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg></button>
                        <div id="dropdown" class="z-20 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                            <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdown-button">
                            <li>
                                <button type="button" class="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Mockups</button>
                            </li>
                            <li>
                                <button type="button" class="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Templates</button>
                            </li>
                            <li>
                                <button type="button" class="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Design</button>
                            </li>
                            <li>
                                <button type="button" class="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Logos</button>
                            </li>
                            </ul>
                        </div>
                        <div class="relative w-full">
                            <input type="search" id="search-dropdown" class="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-r-lg border-l-gray-50 border-l-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-l-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500" placeholder="Tìm kiếm căn hộ khu vực TP.HCM" required/>
                            <button type="submit" class="absolute top-0 right-0 p-2.5 text-sm font-medium text-white bg-blue-700 rounded-r-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                <svg aria-hidden="true" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                                <span class="sr-only">Tìm kiếm</span>
                            </button>
                        </div>
                    </div>
                </form>

              </div>
            </div>
          </div>
        </div>
      </div>      

      <div className="py-4 px-8 flex flex-col min-h-screen max-w-6xl mx-auto">
        <div class="mt-8 space-y-8 space-x-8 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-6 md:space-y-0 md:space-x-0">
          {places.length > 0 && places.map(place => (
            <Link to={'/place/'+place._id}>              
              <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <img class="rounded-t-lg w-full h-64 bg-cover bg-center" src={'http://localhost:4000/'+place.photos?.[0]} alt="" />
                <div class="p-5">
                  <h3 class="truncate text-l font-semibold tracking-tight text-gray-900 dark:text-white">{place.title}</h3>
                  <div class="flex items-center justify-between">
                    <div>
                      <span class="text-2xl font-bold text-gray-900 dark:text-white">{place.price}</span><span class="text-xl font-bold text-gray-900 dark:text-white"> tr/tháng</span>
                    </div>
                    <div>
                      <span class="mr-5 text-l font-semibold text-gray-900 dark:text-white"><i class="fa-solid fa-bed mr-2"></i>1</span>
                      <span class="text-l font-semibold text-gray-900 dark:text-white"><i class="fa-solid fa-table-cells mr-2"></i>50m<sup>2</sup></span>
                    </div>
                  </div>
                  <p class="truncate font-normal text-gray-700 dark:text-gray-400">{place.address}</p>
                </div>
              </div>
              {/* <div className="bg-gray-500 mb-2 rounded-2xl flex">
                {place.photos?.[0] && (
                  <img className="rounded-2xl object-cover aspect-square" src={'http://localhost:4000/'+place.photos?.[0]} alt=""/>
                )}
              </div>
              <h2 className="font-bold">{place.address}</h2>
              <h3 className="text-sm text-gray-500">{place.title}</h3>
              <div className="mt-1">
                <span className="font-bold">{place.price.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}</span>/ tháng
              </div> */}
            </Link>
          ))}
        </div>
        {/* <div className="mt-8 grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
        </div> */}
      </div>      
    </div>    
  );
}
