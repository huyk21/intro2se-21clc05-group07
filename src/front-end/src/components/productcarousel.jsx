import { Link } from "react-router-dom";
import { Carousel, Image } from "react-bootstrap";
import Message from "./message";
import Loader from "./loader";
import { useGetTopRatedProductsQuery } from "../slices/productsApiSlice";
const Product_Carousel = () => {
  const { data: products, error, isLoading } = useGetTopRatedProductsQuery();
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <Carousel pause="hover" className="bg-dark">
          {products.map((product) => (
            <Carousel.Item key={product._id}>
              <Link to={`/product/${product._id}`}>
                <Image src={product.image} alt={product.name} fluid />
                <Carousel.Caption className="carousel-caption">
                  <h2>
                    {product.name} (${product.price})
                  </h2>
                </Carousel.Caption>
              </Link>
            </Carousel.Item>
          ))}
        </Carousel>
      )}
    </>
  );
};
export default Product_Carousel;
