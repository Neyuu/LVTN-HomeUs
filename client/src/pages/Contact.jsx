import { useState, useEffect,  } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Contact = () => {
    const [profile, setProfile] = useState({
        avatar: '',
    name: '',
    email: '',
    address: '',
    phone: '',
    cmnd: '',
    issuedBy: '',
    dateEx: '',
    })
    const { id } = useParams();

    useEffect(() => {
        fetch();
      },[])
    
      const fetch = async () => {
        const res = await axios.get("/profile-show");
        if (res.status === 200) {
              setProfile({
          avatar: res.data.avatar,
          name: res.data.name,
          email: res.data.email,
          address: res.data.address,
          phone: res.data.phone,
          cmnd: res.data.cmnd,
          issuedBy: res.data.issuedBy,
          dateEx: res.data.dateEx,
        })
        }
      }


    return (
                  <div className="mt-10 sm:mt-0">
            <div className="md:grid"> 
              <div className="flex justify-center items-center">
                <img
                  className="h-32 w-32 bg-white p-2 rounded-full shadow mb-4"
                  src={profile.avatar}
                  alt=""
                />
                </div>  
                <div className="md:col-span-1 mt-10">
                <div className="px-4 sm:px-0">
                    <h3 className="text-lg font-medium leading-6 text-gray-900">Thông tin người bán</h3>
                    <p className="mt-1 text-sm text-gray-600">
                    Hãy liên hệ với chúng tôi bằng thông tin ở dưới
                    </p>
                </div>
                </div>

              <div className="mt-5 md:mt-0 md:col-span-2">
                  <div className="shadow overflow-hidden sm:rounded-md">
                    <div className="px-4 py-5 bg-white sm:p-6">
                      <div className="grid grid-cols-6 gap-6">
                        <div className="col-span-6 sm:col-span-3">
                          <label
                            htmlFor="first_name"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Tên
                          </label>
                          <input
                            type="text"
                            name="first_name"
                            id="first_name"
                            value={profile.name}
                            disabled
                            autoComplete="given-name"
                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          />
                        </div>
                        <div className="col-span-6 sm:col-span-3">
                          <label
                            htmlFor="last_name"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Email
                          </label>
                          <input
                            type="text"
                            name="last_name"
                            id="last_name"
                            value={profile.email}
                            disabled
                            autoComplete="family-name"
                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          />
                        </div>
                        <div className="col-span-6 sm:col-span-4">
                          <label
                            htmlFor="email_address"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Địa chỉ
                          </label>
                          <input
                            type="text"
                            name="email_address"
                            id="email_address"
                            value={profile.address}
                            disabled
                            autoComplete="email"
                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          />
                        </div>
                        <div className="col-span-6">
                          <label
                            htmlFor="street_address"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Số điện thoại
                          </label>
                          <input
                            type="text"
                            name="street_address"
                            id="street_address"
                            value={profile.phone}
                            disabled
                            autoComplete="street-address"
                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          />
                        </div>
                      </div>
                    </div>
                    {/* <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                      <button
                        onClick={handleUpdateProfile}
                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Cập nhật
                      </button>
                    </div> */}
                  </div>
              </div>
            </div>
          </div>
    )
}

export default Contact;