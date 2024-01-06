import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import Message from "../../components/message";
import Loader from "../../components/loader";
import FormContainer from "../../components/formcontainer";
import { toast } from "react-toastify";
import {
  useGetProductDetailsQuery,
  useUpdateProductMutation,
} from "../../slices/productsApiSlice";
const User_Edit_Screen = () => {
  const { id: userId } = useParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const {
    data: userData,
    isLoading,
    refetch,
    error,
  } = useGetProductDetailsQuery(userId);
  const [updateUser, { isLoading: updateLoading }] = useUpdateProductMutation();
  const navigate = useNavigate();
  const submitFormHandler = async (e) => {
    e.preventDefault();
    try {
      await updateUser({ userId, name, email, isAdmin }).unwrap(); // NOTE: here we need to unwrap the Promise to catch any rejection in our catch block
      toast.success("User updated sucessfully");
      refetch();
      navigate("/admin/userlist");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };
  useEffect(() => {
    if (userData) {
      setName(userData.name);
      setEmail(userData.email);
      setIsAdmin(userData.isAdmin);
    }
  }, [userData]);
  return (
    <>
      <Link to="/admin/userlist" className="btn btn-light my-3">
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit User</h1>
        {updateLoading && <Loader />}
        {error && (
          <Message variant="danger">
            {error?.data?.message || error.error}
          </Message>
        )}
        {isLoading ? (
          <Loader />
        ) : (
          <Form onSubmit={submitFormHandler}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="email" className="my-3">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="isadmin" className="my-3">
              <Form.Check
                type="checkbox"
                label="Is Admin"
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
              />
            </Form.Group>
            <Button type="submit" variant="primary" className="my-3">
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};
export default User_Edit_Screen;