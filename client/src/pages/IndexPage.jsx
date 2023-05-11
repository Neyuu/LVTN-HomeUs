import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Col, Divider, Row, Typography } from 'antd';
import support from "../assets/support.png";
import homeus from "../assets/homeus.jpg";
import housebanner from "../assets/house-banner.jpg";

export default function IndexPage() {
  const { Title } = Typography;
  const [places, setPlaces] = useState([]);
  const [placesNotVip, setPlacesNotVip] = useState([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [type, setType] = useState('packageLong'); // packageShort
  const [listBooker, setListBooker] = useState([]);
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  useEffect(() => {
    new Promise(async () => {
      await getListBooker();
    });

    // axios.get("/places").then((response) => {
    //   setPlaces(response.data);
    // });

    axios.get("/places").then((response) => {
      setPlaces(response.data);
    });

    axios.get("/place-not-vip").then((response) => {
      setPlacesNotVip(response.data);
    });

  }, []);


  // useEffect(() => {
  //   if (type) {
  //     axios.get(`/filter-by-type/${type}`).then((response) => {
  //       setPlaces(response.data);
  //     });
  //   }
  // }, [type]);

  const handleSearch = async () => {
    if (!name) {
      toast.error('Vui lòng nhập thông tin để tìm kiếm');
    } else {
      navigate(`/search/${name}`, { replace: true });
    }
  }

  const getListBooker = async () => {
    try {
      const res = await axios.get('/get-all-user-booker-active');
      if (res.status === 200) {
        setListBooker(res.data.data);
      }
    } catch (error) { }
  };

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
    <>
      <div>
        <div className="relative flex h-screen content-center items-center justify-center pt-16 pb-32">
          <div className="absolute top-0 h-full w-full bg-[url('https://images.unsplash.com/photo-1554995207-c18c203602cb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80')] bg-cover bg-center" />
          <div className="absolute top-0 h-full w-full bg-black/40 bg-cover bg-center" />
          <div className="max-w-8xl container relative mx-auto">
            <div className="flex flex-wrap items-center">
              <div className="ml-auto mr-auto w-full px-4 text-center lg:w-8/12">
                <h1 class="text-3xl font-bold tracking-tight leading-none text-white md:text-4xl lg:text-5xl dark:text-white">Xây dựng tổ ấm cùng HomeUs</h1>
                <section class="mt-10 flex items-center">
                  <div class="max-w-screen-xl px-4 mx-auto lg:px-12 w-full">
                    <div class="relative dark:bg-gray-800 sm:rounded-lg">
                      <div class="flex flex-col items-center justify-between p-4 space-y-3 md:flex-row md:space-y-0 md:space-x-4">
                        <div class="w-full">
                          <h3 className="-mx-2 -my-3 flow-root">
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
                                onChange={(e) => setName(e.target.value)}
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
                          </h3>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-4 px-8 flex flex-col max-w-6xl mx-auto">
          <div className="content-center items-center justify-center">
            <Row className="">
              <Col className="" span={6}>
                <img className="center-quality my-5" src="https://s3-cdn.rever.vn/p/v2.46.14/images/icon-verify-listing.svg" alt="verify" />
                <div class="text-center support-item text-xl">Cam kết xác thực</div>
              </Col>
              <Col span={6}>
                <img className="center-quality my-5" src="https://s3-cdn.rever.vn/p/v2.46.14/images/icon-many-listing.svg" alt="verify" />
                <div class="text-center support-item text-xl">Dẫn đầu số lượng</div>
              </Col>
              <Col span={6}>
                <img className="center-quality my-5" src="https://s3-cdn.rever.vn/p/v2.46.14/images/icon-save-money.svg" alt="verify" />
                <span class="text-center support-item text-xl">An toàn giao dịch</span>
              </Col>
              <Col span={6}>
                <img className="center-quality my-5" src="https://s3-cdn.rever.vn/p/v2.46.14/images/icon-save-money-star.svg" alt="verify" />
                <span class="text-center support-item text-xl">Nhiều ưu đãi</span>
              </Col>
            </Row>
          </div>
        </div>

        <div className="mt-8 py-4 px-8 flex flex-col min-h-screen max-w-6xl mx-auto">

          <div class="flex items-center justify-between">
            <div>
              <h1 class="text-3xl font-bold tracking-tight leading-none dark:text-white">Nhà cho thuê nổi bật</h1>
            </div>
            <div>
              <a href="/search" class="inline-flex items-center font-medium text-primary-600 hover:text-blue-800 dark:text-primary-500 dark:hover:text-primary-700">
                Xem tất cả
                <svg class="ml-1 w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
              </a>
            </div>
          </div>
          <div class="my-10 space-y-8 space-x-8 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-8 md:space-y-0 md:space-x-0">
            {places.length > 0 && places.map(place => (
              <Link to={'/place/' + place._id}>
                <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 hover:shadow-xl transition duration-300 ease-in-out hover:scale-105">
                  <img class="rounded-t-lg w-full h-64 bg-cover bg-center" src={'http://localhost:4000/' + place.photos?.[0]} alt="" />
                  <div class="p-5">
                    <div class="flex items-center justify-between">
                      <div>
                        <span class="text-2xl font-bold text-gray-900 dark:text-white">{place.packageLong.price/1000000}</span><span class="text-xl font-bold text-gray-900 dark:text-white"> tr/tháng</span>
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

          <div class="flex items-center justify-between">
            <div>
              <h1 class="text-3xl font-bold tracking-tight leading-none dark:text-white">Nhà cho thuê mới nhất</h1>
            </div>
            <div>
              <a href="/search" class="inline-flex items-center font-medium text-primary-600 hover:text-blue-800 dark:text-primary-500 dark:hover:text-primary-700">
                Xem tất cả
                <svg class="ml-1 w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
              </a>
            </div>
          </div>
          <div class="my-10 space-y-8 space-x-8 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-8 md:space-y-0 md:space-x-0">
            {placesNotVip.length > 0 && placesNotVip.map(place => (
              <Link to={'/place/' + place._id}>
                <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 hover:shadow-xl transition duration-300 ease-in-out hover:scale-105">
                  <img class="rounded-t-lg w-full h-64 bg-cover bg-center" src={'http://localhost:4000/' + place.photos?.[0]} alt="" />
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

          <div class="mt-4 flex items-center justify-between">
            <div>
              <h1 class="text-3xl font-bold tracking-tight leading-none dark:text-white">Nhà môi giới nổi bật</h1>
            </div>
            <div>
              <a href="#" class="inline-flex items-center font-medium text-primary-600 hover:text-blue-800 dark:text-primary-500 dark:hover:text-primary-700">
                Xem tất cả
                <svg class="ml-1 w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
              </a>
            </div>
          </div>
          <div class="my-8 grid gap-8 lg:gap-16 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {listBooker.map((item) => (
              // <span className="text-xs text-gray-500">{item.name}</span>
              <div class="text-center text-gray-500 dark:text-gray-400">
                <img class="mx-auto mb-4 w-36 h-36 rounded-full" src={item.avatar} alt="Joseph Avatar" />
                <h3 class="mb-1 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  <Link to={`/account/profile/${item._id}`}>{item.name}</Link>
                </h3>
                <p>Chuyên viên</p>
                <ul class="flex justify-center mt-4 space-x-4">
                  <li>
                    <a href="#" class="text-[#39569c] hover:text-gray-900 dark:hover:text-white">
                      <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fill-rule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clip-rule="evenodd" /></svg>
                    </a>
                  </li>
                  <li>
                    <a href="#" class="text-[#00acee] hover:text-gray-900 dark:hover:text-white">
                      <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" /></svg>
                    </a>
                  </li>
                  <li>
                    <a href="#" class="text-gray-900 hover:text-gray-900 dark:hover:text-white dark:text-gray-300">
                      <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd" /></svg>
                    </a>
                  </li>
                  <li>
                    <a href="#" class="text-[#ea4c89] hover:text-gray-900 dark:hover:text-white">
                      <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fill-rule="evenodd" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.705zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z" clip-rule="evenodd" /></svg>
                    </a>
                  </li>
                </ul>
              </div>
            ))}

          </div>


        </div>
      </div>
      <hr className="mt-4 center" style={{ width: '60%' }} />
      <div className="my-4 py-10">
        <Row className="mx-auto" style={{ width: '80%' }}>
          <Col className="py-0" span={10}>
            <img className="center-paypal flex justify-center w-64 h-40 bg-cover bg-center float-right mr-8" src={housebanner} alt="paypal" />
          </Col>
          <Col className="py-0" span={14}>
            <Title level={2} className="support-item-title">Những gì bạn cần biết về chúng tôi</Title>
            <ul style={{ lineHeight: '3rem' }}>
              <li className="support-item text-lg font-semibold">An tâm tìm kiếm nhà cho thuê nhanh chóng</li>
              <li className="support-item text-lg font-semibold">Xem đầy đủ thông tin tất cả các nhà thuê nổi bật</li>
              <li className="support-item text-lg font-semibold">Cập nhật tin mới nhất về giá cả nhà ở</li>
            </ul>
          </Col>
        </Row>
      </div>
    </>
  );
}
