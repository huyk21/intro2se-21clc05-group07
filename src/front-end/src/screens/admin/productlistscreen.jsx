import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Row, Col } from "react-bootstrap";
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import { useParams } from "react-router-dom";
import Message from "../../components/message";
import Loader from "../../components/loader";

import {
  useGetProductsQuery,
  useDeleteProductMutation,
  useCreateProductMutation,
  useUpdateProductMutation,
} from "../../slices/productsApiSlice";
import { toast } from "react-toastify";
const Product_List_Screen = () => {
  const { pageNumber } = useParams();
  const {
    data: { products, pages, page } = {},
    isLoading,
    error,
    refetch,
  } = useGetProductsQuery();
  const [deleteProduct, { isLoading: loadingDelete }] =
    useDeleteProductMutation();

  const deleteProductHandler = (id) => async (product_id) => {
    if (window.confirm("Are you sure to delete this product?")) {
      try {
        await deleteProduct(id).unwrap();
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };
  const [createProduct, { isLoading: loadingCreateProduct }] =
    useCreateProductMutation();
  const createProductHandler = async () => {
    if (window.confirm("Are you sure to create new product?")) {
      try {
        await createProduct();
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };
  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className="text-end">
          <Button className="my-3" onClick={createProductHandler}>
            <FaPlus /> Create Product
          </Button>
        </Col>
      </Row>

      {loadingCreateProduct && <Loader />}
      {loadingDelete && <Loader />}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name </th>
              <th>Price</th>
              <th>Category</th>
              <th>Brand</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>$ {product.price}</td>
                <td>{product.category}</td>
                <td>{product.brand}</td>
                <td>
                  <LinkContainer to={`/admin/product/${product._id}/edit`}>
                    <Button className="btn-sm mx-2" variant="light">
                      <FaEdit />
                    </Button>
                  </LinkContainer>
                  <Button
                    className="btn-sm"
                    variant="danger"
                    onClick={deleteProductHandler(product._id)}
                  >
                    <FaTrash />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default Product_List_Screen;