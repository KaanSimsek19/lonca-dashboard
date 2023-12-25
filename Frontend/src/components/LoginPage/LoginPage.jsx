import React, { useState} from "react";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { setCookie} from "../../cookie-functions";

const LoginPage = () => {
  const [vendorId, setVendorId] = useState("");

  const [vendorName, setVendorName] = useState("");


  const navigate = useNavigate();

  function handleSubmit(event) {
    let api =
    `http://localhost:8080/dashboard/vendor/login`

    axios
      .post(api,
        {
          vendorId: vendorId,
          vendorName: vendorName,
        }
        )
      .then((response) => {
        
          if(response.status === 200){
            setCookie("vendorId", vendorId)
            navigate("/home")
          }
      })
      .catch((error) => {
        console.error("Error fetching stories:", error);
      });
    //navigate("/home")
    event.preventDefault();
  }

  return (

    <div className="Login">

      <Form onSubmit={handleSubmit}>

        <Form.Group size="lg" controlId="email">

          <Form.Label>Id</Form.Label>

          <Form.Control

            autoFocus

            type="id"

            value={vendorId}

            onChange={(e) => setVendorId(e.target.value)}

          />

        </Form.Group>

        <Form.Group size="lg" controlId="password">

          <Form.Label>Name:</Form.Label>

          <Form.Control

            type="name"

            value={vendorName}

            onChange={(e) => setVendorName(e.target.value)}

          />

        </Form.Group>

        <Button block size="lg" type="submit" >

          Login

        </Button>

      </Form>

    </div>

  );

}

export default LoginPage;