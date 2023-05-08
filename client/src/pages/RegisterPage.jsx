import {Link} from "react-router-dom";
import {useState} from "react";
import axios from "axios";
import { toast } from 'react-toastify';
import PhotosUploader from "../PhotosUploader";

export default function RegisterPage() {
  const [name,setName] = useState('');
  const [email,setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [avatar, setAvatar] = useState([]);
  const [isCheck, setIsCheck] = useState(false);
  async function registerUser(ev) {
    ev.preventDefault();
    try {
      const res = await axios.post('/register', {
        name,
        email,
        password,
        avatar: avatar[0],
        isBooker: isCheck,
        img: addedPhotos
      });
      if (res.status === 200) {
        setName('')
      setEmail('')
      setPassword('')
        setAddedPhotos([])
        setAvatar([])
      setIsCheck(false)
        toast.success('Đăng ký thành công!');
      }
    } catch (e) {
      toast.error('Đăng Ký Không Thành công vui lòng kiểm tra lại');
    }
  }

  const checkingData = () => {
    setIsCheck(!isCheck);
  }

  return (
    <>
      <div className="relative flex h-[50vh] content-center items-center justify-center">
        <div className="absolute top-0 h-full w-full bg-[url('https://images.unsplash.com/photo-1554995207-c18c203602cb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80')] bg-cover bg-center" />
        <div className="absolute top-0 h-full w-full bg-black/40 bg-cover bg-center" />
        <div className="-mt-16 max-w-8xl container relative mx-auto">
          <div className="flex flex-wrap items-center">
            <div className="mx-auto w-full px-4 text-center lg:w-8/12">
              <h1 class="mt-8 text-2xl font-bold tracking-tight leading-none text-white md:text-3xl lg:text-4xl dark:text-white">HomeUs</h1>
            </div>
          </div>
        </div>
      </div>
      <div className="relative -mt-36 px-8 flex flex-col max-w-6xl mx-auto">
        <section class="my-8">
          <div class="flex flex-col items-center justify-center px-6 mx-auto lg:py-0">
            {/* <a href="#" class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                <img class="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo"/>
                HomeUs    
            </a> */}
            <div class="w-full bg-white rounded-lg shadow-lg md:mt-0 sm:max-w-md xl:p-0">
                <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 class="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        Đăng ký
                    </h1>
                    <form class="space-y-4 md:space-y-6" onSubmit={registerUser}>
                        <div>
                            <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Họ và tên</label>
                            <input type="text"
                  placeholder="John Doe"
                  value={name}
                  onChange={ev => setName(ev.target.value)} class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""/>
                        </div>
                        <div>
                            <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                            <input type="email"
                  placeholder="your@email.com"
                  value={email}
              onChange={ev => setEmail(ev.target.value)} class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""/>
                        </div>
                        <div>
                            <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Thêm ảnh đại diện</label>
                            <PhotosUploader addedPhotos={avatar} onChange={setAvatar} />
                        </div>
                        <div>
                            <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mật khẩu</label>
                            <input type="password"
                  placeholder="••••••••"
                  value={password}
              onChange={ev => setPassword(ev.target.value)} class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""/>
                        </div>
                        <div>
                            <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Thêm ảnh nếu bạn muốn trở thành người kiểm duyệt(Không bắt buộc)</label>
                            <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />
                        </div>
                        <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer mt-4 mb-4">
                          <input type="checkbox" checked={isCheck} name="parking" onChange={checkingData}/>
                          <span>Muốn làm người kiểm duyệt</span>
                        </label>
                        <p className="quote">Chúng tôi sẽ tiến hành xem xét tài khoản của bạn trước khi đồng ý cho trở thành người kiểm duyệt hay không</p>
                        <button type="submit" class="w-full text-white bg-indigo-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Đăng ký</button>
                        <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                            Đã có tài khoản? <Link to={'/login'} class="font-medium text-primary-600 hover:underline dark:text-primary-500">Đăng nhập</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
      </section>
      </div>
    </>    
  );

  return (
    <section class="my-8">
      <div class="flex flex-col items-center justify-center px-6 mx-auto lg:py-0">
          <a href="#" class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
              {/* <img class="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo"/> */}
              HomeUs    
          </a>
          <div class="w-full bg-white rounded-lg shadow-lg md:mt-0 sm:max-w-md xl:p-0">
              <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                  <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                      Đăng ký
                  </h1>
                  <form class="space-y-4 md:space-y-6" onSubmit={registerUser}>
                      <div>
                          <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Họ và tên</label>
                          <input type="text"
                 placeholder="John Doe"
                 value={name}
                 onChange={ev => setName(ev.target.value)} class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""/>
                      </div>
                      <div>
                          <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                          <input type="email"
                 placeholder="your@email.com"
                 value={email}
            onChange={ev => setEmail(ev.target.value)} class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""/>
                      </div>
                      <div>
                          <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Thêm ảnh đại diện</label>
                          <PhotosUploader addedPhotos={avatar} onChange={setAvatar} />
                      </div>
                      <div>
                          <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mật khẩu</label>
                          <input type="password"
                 placeholder="••••••••"
                 value={password}
            onChange={ev => setPassword(ev.target.value)} class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""/>
                      </div>
                      <div>
                          <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Thêm ảnh nếu bạn muốn trở thành người kiểm duyệt(Không bắt buộc)</label>
                          <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />
                      </div>
                      <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer mt-4 mb-4">
                        <input type="checkbox" checked={isCheck} name="parking" onChange={checkingData}/>
                        <span>Muốn làm người kiểm duyệt</span>
                      </label>
                      <p className="quote">Chúng tôi sẽ tiến hành xem xét tài khoản của bạn trước khi đồng ý cho trở thành người kiểm duyệt hay không</p>
                      <button type="submit" class="w-full text-white bg-indigo-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Đăng ký</button>
                      <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                          Đã có tài khoản? <Link to={'/login'} class="font-medium text-primary-600 hover:underline dark:text-primary-500">Đăng nhập</Link>
                      </p>
                  </form>
              </div>
          </div>
      </div>
    </section>
  );

  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-64">
        <h1 className="text-4xl text-center mb-4">Register</h1>
        <form className="max-w-md mx-auto" onSubmit={registerUser}>
          <input type="text"
                 placeholder="John Doe"
                 value={name}
                 onChange={ev => setName(ev.target.value)} />
          <input type="email"
                 placeholder="your@email.com"
                 value={email}
            onChange={ev => setEmail(ev.target.value)} />
          <label className="label-upload">Thêm ảnh đại diện</label>
          <PhotosUploader addedPhotos={avatar} onChange={setAvatar} />
          <label className="label-upload">Mật khẩu</label>
          <input type="password"
                 placeholder="password"
                 value={password}
            onChange={ev => setPassword(ev.target.value)} />
          <label className="label-upload">Thêm ảnh nếu bạn muốn trở thành người kiểm duyệt(Không bắt buộc)</label>
          <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />
          <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer mt-4 mb-4">
        <input type="checkbox" checked={isCheck} name="parking" onChange={checkingData}/>
          <span>Muốn làm người kiểm duyệt</span>
          </label>
          <p className="quote">Chúng tôi sẽ tiến hành xem xét tài khoản của bạn trước khi đồng ý cho trở thành người kiểm duyệt hay không</p>
          <button className="primary">Register</button>
          <div className="text-center py-2 text-gray-500">
            Already a member? <Link className="underline text-black" to={'/login'}>Login</Link>
          </div>
        </form>
      </div>
    </div>
  );
}