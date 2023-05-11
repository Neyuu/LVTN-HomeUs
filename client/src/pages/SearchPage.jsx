import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

export default function SearchPage() {
  const [places, setPlaces] = useState([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
    const [type, setType] = useState('packageLong'); // packageShort
    
    const { text } = useParams();

    
    
    useEffect(() => {
        if (text) {
            try {
             axios.get(`/filter-by-name/${text}`).then((response) => {
                    setPlaces(response?.data?.data)
                  });
                
              } catch (error) {
              } 
        }
    },[])

  useEffect(() => {
    if (price) {
      axios.get(`/filter-by-price/${price}/${type}`).then((response) => {
        setPlaces(response?.data?.data);
      });
    }
  }, [price]);

  // useEffect(() => {
  //   if (type) {
  //     axios.get(`/filter-by-type/${type}`).then((response) => {
  //       setPlaces(response.data);
  //     });
  //   }
  // }, [type]);

  const handleSearch = async () => {
    if (!name) {
      axios.get("/place-not-vip").then((response) => {
        setPlaces(response.data);
      });
    }
    else {
      try {
        const res = await axios.get(`/filter-by-name/${name}`);
        if (res.status === 200) {
          setName('');
          setPlaces(res?.data?.data)
        }
      } catch (error) {
        
      }
    }
  }

  const checking = (time) => {
    const today = new Date(time);
    const timeExpired = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000)
    
    if (today < timeExpired) {
      console.log('conf han');
    } else {
      console.log('het han');
    }
  }

  return (
    <div className="py-8 px-8 flex flex-col min-h-[75vh] max-w-6xl mx-auto mb-16">
      <div className="grid grid-cols-4 gap-8">
        <div className="col-span-2">
        <label
                htmlFor="default-search"
                className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
              >
                Search
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5 text-gray-500 dark:text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
                <input
                  type="search"
                  id="default-search"
                  className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Nhập tên cần lọc"
              value={name}
              onChange={(e)=> setName(e.target.value)}
                  required
                />
                <button
              type="submit"
              onClick={handleSearch}
                  className="text-white absolute right-2.5 bottom-2.5 bg-primary focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-4 py-2"
                >
                  Tìm kiếm
                </button>
              </div>
        </div>
        <div>
          <select
            onChange={(e) => setPrice(e.target.value)}
            className="block w-full p-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <option value=""></option>
            <option value="small">2-5tr</option>
            <option value="medium">5-10tr</option>
            <option value="large">trên 10tr</option>
          </select>
        </div>
        <div>
        <div className="" id="filter-section-mobile-1">
          <div className="space-y-2">
            <div className="flex items-center">
              <input
                id="filter-mobile-category-0"
                type="radio"
                checked={type === 'packageShort' ? true : false}
                onClick={() => setType('packageShort')}
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <label
                htmlFor="filter-mobile-category-0"
                className="ml-3 min-w-0 flex-1 text-gray-500"
              >
                Ngắn hạn
              </label>
            </div>
            <div className="flex items-center">
              <input
                id="filter-mobile-category-1"
                type="radio"
                checked={type === 'packageLong' ? true : false}
                onClick={() => setType('packageLong')}
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <label
                htmlFor="filter-mobile-category-1"
                className="ml-3 min-w-0 flex-1 text-gray-500"
              >
                Dài hạn
              </label>
            </div>
          </div>
        </div>
        </div>
      </div>
      <div class="mt-4 text-base font-semibold md:text-base lg:text-base">Tìm thấy {places.length} kết quả.</div>
      <div class="mt-6 space-y-8 space-x-8 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-8 md:space-y-0 md:space-x-0">
        {places.length > 0 &&
          places.map((place) => (
            <Link to={'/place/'+place._id}>              
            <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 hover:shadow-xl transition duration-300 ease-in-out hover:scale-105">
              <img class="rounded-t-lg w-full h-64 bg-cover bg-center" src={'http://localhost:4000/'+place.photos?.[0]} alt="" />
              <div class="p-5">
                <div class="flex items-center justify-between">
                  <div>
                    <span class="text-2xl font-bold text-gray-900 dark:text-white">{(place.packageLong.price/1000000).toFixed(0)}</span><span class="text-xl font-bold text-gray-900 dark:text-white"> tr/tháng</span>
                  </div>
                  <div>
                    <span class="mr-5 text-l font-semibold text-gray-900 dark:text-white"><i class="fa-solid fa-bed mr-2"></i>{place.numberBed}</span>
                    <span class="text-l font-semibold text-gray-900 dark:text-white"><i class="fa-solid fa-table-cells mr-2"></i>{place.areas}m<sup>2</sup></span>
                  </div>
                </div>
                <h3 class="truncate text-l font-semibold tracking-tight text-gray-900 dark:text-white">{place.title}</h3>
                <p class="truncate font-normal text-gray-700 dark:text-gray-400">{place.address}</p>
              </div>
            </div>
          </Link>
        ))}
        {places.length == 0 &&
          <div className="mt-16 md:col-span-2 lg:col-span-3">
            <div class="text-center text-gray-500 text-xl font-semibold tracking-tight leading-none md:text-2xl lg:text-3xl">Nhập từ khóa để tìm kiếm nhà thuê.</div>
          </div>
        }
      </div>
    </div>

  );
}
