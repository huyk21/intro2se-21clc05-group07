import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import search from "../assets/search.png";

const SearchBoxForUser = () => {
  const { keyword: urlKeyword } = useParams();
  const [keyword, setKeyword] = useState(urlKeyword || "");
  const navigate = useNavigate();

  const submitFormHandler = (e) => {
    e.preventDefault();
    if (keyword) {
      navigate(`/search/${keyword.trim()}`);
      setKeyword("");
    } else {
      navigate("/");
    }
  };

  return (
    <Form onSubmit={submitFormHandler} className="d-flex">
      <div className="input-group">
        <Form.Control
          type="text"
          name="q"
          onChange={(e) => setKeyword(e.target.value)}
          value={keyword}
          placeholder="Search product..."
          className="mr-sm-2 ml-sm-5"
          style={{ borderRadius: "25px" }}
        />
        <div
          className="input-group-append"
          style={{ position: "absolute", right: "10px", top: "5px" }}
        >
          <Button
            type="submit"
            className="p-1"
            title="Search"
            style={{
              backgroundColor: "#3C4C5D",
              borderRadius: "30px",
              border: "none",
            }}
          >
            <img src={search} alt="searchGlass" />
          </Button>
        </div>
      </div>
    </Form>
  );
};

export default SearchBoxForUser;
