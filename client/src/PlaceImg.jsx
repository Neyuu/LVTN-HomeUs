export default function PlaceImg({place,index=0,className=null}) {
  if (!place.photos?.length) {
    return '';
  }
  if (!className) {
    className = 'w-full h-48 bg-cover bg-center rounded-l-2xl';
  }
  return (
    <img className={className} src={'http://localhost:4000/'+place.photos[index]} alt=""/>
  );
}