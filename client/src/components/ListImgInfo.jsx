import { useState } from "react"

const ListImgInfo = (props) => {
    const {listImg} = props
    const [showAllPhotos, setShowAllPhotos] = useState(false);
    
    if (showAllPhotos) {
        return (
          <div className="absolute inset-0 bg-black text-white min-h-screen z-50">
            <div className="bg-black p-8 grid gap-4">
              <div>
                <h2 className="text-3xl mr-48">Chi tiết hình ảnh</h2>
                <button onClick={() => setShowAllPhotos(false)} className="fixed right-12 top-8 flex gap-1 py-2 px-4 rounded-2xl shadow shadow-black bg-white text-black">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                    <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clipRule="evenodd" />
                  </svg>
                  Close photos
                </button>
              </div>
              {listImg.length > 0 && listImg.map(photo => (
                <div>
                  <img src={'http://localhost:4000/'+photo} alt=""/>
                </div>
              ))}
            </div>
          </div>
        );
      }

    return (
        <div className="bg-white shadow mt-6  rounded-lg p-6">
        <h3 className="text-gray-600 text-sm font-semibold mb-4">Hình Ảnh Thông Tin Liên Quan</h3>
        <ul className="flex items-center justify-center space-x-2">
          
                {
                    listImg?.length > 0 &&
                    listImg.map((item , index) => (
                        <li className="flex flex-col items-center space-y-2" onClick={() => setShowAllPhotos(true)}>
                            {/* Ring */}
                            <a className="block bg-white p-1 rounded-full" href="#">
                            <img className="w-16 rounded-full" src={'http://localhost:4000/'+item} />
                            </a>
                            {/* Username */}
                            <span className="text-xs text-gray-500">
                                {`Hình ảnh ${index+1}`}
                            </span>
                        </li>
                    ))
                }

        </ul>
      </div>
    )
}

export default ListImgInfo