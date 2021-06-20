import { Carousel } from "react-responsive-carousel";
import useRemoteSingleProduct from "../hooks/useRemoteSingleProduct";
import "react-responsive-carousel/lib/styles/carousel.css";

const CarouselImagenes = () => {
  const [product] = useRemoteSingleProduct();

  let arrayImgs;
  product.imgs
    ? (arrayImgs = product.imgs.map((img, index) => (
        <div>
          <img
            alt="foto de producto"
            src={`http://localhost:3300/uploads/imgs/${img.img}`}
          ></img>
        </div>
      )))
    : (arrayImgs = "No hay imágenes");

  return product.imgs ? (
    <Carousel showThumbs={false}>{arrayImgs}</Carousel>
  ) : (
    <h2>No hay imágenes para mostrar</h2>
  );
};

export default CarouselImagenes;
