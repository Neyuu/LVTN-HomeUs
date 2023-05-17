import {useState} from "react";

export default function PlaceGallery({place}) {

  const [showAllPhotos,setShowAllPhotos] = useState(false);

  // if (showAllPhotos) {
  //   return (
  //     <div className="absolute inset-0 bg-black text-white min-h-screen z-50">
  //       <div className="bg-black p-8 grid gap-4">
  //         <div>
  //           <h2 className="text-3xl mr-48">Photos of {place.title}</h2>
  //           <button onClick={() => setShowAllPhotos(false)} className="fixed right-12 top-8 flex gap-1 py-2 px-4 rounded-2xl shadow shadow-black bg-white text-black">
  //             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
  //               <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clipRule="evenodd" />
  //             </svg>
  //             Close photos
  //           </button>
  //         </div>
  //         {place?.photos?.length > 0 && place.photos.map(photo => (
  //           <div>
  //             <img src={'http://localhost:4000/'+photo} alt=""/>
  //           </div>
  //         ))}
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div className="relative">
      <div className="md:grid md:grid-cols-3 md:gap-2 rounded-lg overflow-hidden">
        {(place.photos?.length > 0 && place.photos?.length < 6) && place.photos?.slice(0, 3).map(photo => (
          <a data-fancybox="gallery" href={'http://localhost:4000/'+photo}>
            <img className="h-64 w-full object-cover" src={'http://localhost:4000/'+photo} alt=""/>
          </a>
        ))}
        {(place.photos?.length > 0 && place.photos?.length < 6) && place.photos?.slice(3).map(photo => (
          <a data-fancybox="gallery" href={'http://localhost:4000/'+photo}>
          </a>
        ))}
        {(place.photos?.length > 5) && place.photos?.slice(0, 6).map(photo => (
          <a data-fancybox="gallery" href={'http://localhost:4000/'+photo}>
            <img className="h-64 w-full object-cover" src={'http://localhost:4000/'+photo} alt=""/>
          </a>
        ))}
        {(place.photos?.length > 5) && place.photos?.slice(6).map(photo => (
          <a data-fancybox="gallery" href={'http://localhost:4000/'+photo}>
          </a>
        ))}
      </div>
    </div>
  );
}