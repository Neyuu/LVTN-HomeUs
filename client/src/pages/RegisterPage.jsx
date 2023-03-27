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