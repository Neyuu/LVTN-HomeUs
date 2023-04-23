import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import PlaceGallery from "../../PlaceGallery";
import AddressLink from "../../AddressLink";
import BookingWidget from "../../BookingWidget";


const AdminDetailRoom = () => {
    const {id} = useParams();
    const [place,setPlace] = useState(null);
    useEffect(() => {
      if (!id) {
        return;
      }
      axios.get(`/places/${id}`).then(response => {
        setPlace(response.data);
      });
    }, [id]);
  
    if (!place) return '';

    return (
      <>
        <h2 className="font-semibold text-black-300 mx-6 mb-1 text-2xl">{place.title}</h2>
        <div className="bg-gray-100 mx-6">
          <h1 className="text-3xl"></h1>
          <AddressLink>{place.address}</AddressLink>
          <PlaceGallery place={place} />

          <div className="bg-white -mx-8 px-8 py-8 border-t">
            <div>
              <h2 className="font-semibold text-2xl">Thông Tin Khác</h2>
            </div>
            <div className="mb-4 mt-2 text-sm text-gray-700 leading-5">{place.extraInfo}</div>
          </div>
        </div>
      </>        
    )
}

export default AdminDetailRoom