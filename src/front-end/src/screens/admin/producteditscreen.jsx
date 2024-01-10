import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import Message from "../../components/message";
import Loader from "../../components/loader";
import FormContainer from "../../components/formcontainer";

import {
  useUpdateProductMutation,
  useGetProductDetailsQuery,
  useUploadImageProductMutation,
} from "../../slices/productsApiSlice";
import { toast } from "react-toastify";
const Product_Edit_Screen = () => {
  const [priceError, setPriceError] = useState(""); // New state for price validation error
  const [countInStockError, setCountInStockError] = useState(""); // New state for count in stock validation error
  const { id: productId } = useParams();
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");
  const {
    data: productData,
    isLoading,
    refetch,
    error,
  } = useGetProductDetailsQuery(productId);
  const [updateProduct, { isLoading: updateLoading }] =
    useUpdateProductMutation();
  const [uploadImage, { isLoading: uploadLoading }] =
    useUploadImageProductMutation();
  const navigate = useNavigate();
  const handleCountInStockChange = (e) => {
    const newCountInStock = e.target.value;

    if (newCountInStock >= 0) {
      setCountInStock(newCountInStock); // Update the count if it is 0 or more
      setCountInStockError(""); // Clear any existing error
    } else {
      setCountInStockError("Count in stock cannot be negative"); // Set error message for negative count
    }
  };
  const handlePriceChange = (e) => {
    const newPrice = e.target.value;

    if (newPrice >= 0) {
      setPrice(newPrice); // Update the price if it is 0 or more
      setPriceError(""); // Clear any existing error
    } else {
      setPriceError("Price cannot be negative"); // Set error message for negative price
    }
  };
  const submitFormHandler = async (e) => {
    e.preventDefault();
    // Check required fields are not empty
    if (
      name.trim() === "" ||
      price < 0 ||
      brand.trim() === "" ||
      category.trim() === "" ||
      description.trim() === "" ||
      countInStock < 0
    ) {
      toast.error("Please fill all the required fields correctly.");
      return; // Prevent the form from submitting
    }
    try {
      await updateProduct({
        productId,
        name,
        price,
        image,
        brand,
        category,
        description,
        countInStock,
      }).unwrap(); // NOTE: here we need to unwrap the Promise to catch any rejection in our catch block
      toast.success("Product updated sucessfully");
      refetch();
      navigate("/admin/productlist");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };
  useEffect(() => {
    if (productData) {
      setName(productData.name);
      setPrice(productData.price);
      setImage(productData.image);
      setBrand(productData.brand);
      setCategory(productData.category);
      setCountInStock(productData.countInStock);
      setDescription(productData.description);
    }
  }, [productData]);
  const upLoadImageHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    try {
      const res = await uploadImage(formData).unwrap();
      toast.success("Image Uploaded Successfully");
      setImage(res.image);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <>
      <Link to="/admin/productlist" className="btn btn-light my-3">
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit Product</h1>
        {updateLoading && <Loader />}
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error.data.message}</Message>
        ) : (
          <Form onSubmit={submitFormHandler}>
            <Form.Group controlId="name">
              <Form.Label>Name Product </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required={true}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="price">
              <Form.Label>Price </Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter price"
                value={price}
                onChange={handlePriceChange}
                isInvalid={!!priceError}
                required={true}
              ></Form.Control>
              {priceError && (
                <div className="invalid-feedback">{priceError}</div>
              )}
            </Form.Group>
            <Form.Group controlId="image">
              <Form.Label>Image </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter image url"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                required={true}
              ></Form.Control>
              <Form.Control
                label="Choose File"
                onChange={upLoadImageHandler}
                type="file"
              ></Form.Control>
              {uploadLoading && <Loader />}
            </Form.Group>
            <Form.Group controlId="brand">
              <Form.Label>Brand </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter brand"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                required={true}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="category">
              <Form.Label>Category </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required={true}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="countInStock">
              <Form.Label>Count In Stock </Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter countInStock"
                onChange={handleCountInStockChange}
                isInvalid={!!countInStockError}
                required={true}
              ></Form.Control>
              {countInStockError && (
                <div className="invalid-feedback">{countInStockError}</div>
              )}
            </Form.Group>
            <Form.Group controlId="description">
              <Form.Label>Description </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required={true}
              ></Form.Control>
            </Form.Group>
            <Button
              type="submit"
              variant="primary"
              style={{ marginTop: "1rem" }}
            >
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default Product_Edit_Screen;
