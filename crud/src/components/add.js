
import React , {useState}from "react";
import axios from "axios"

import {Button,Container,Form} from 'react-bootstrap';
import { useNavigate } from "react-router-dom";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Add() {
    const navigate = useNavigate();


    const [Name,setName]= useState("");
    const [email,setEmail]= useState("");
    const [Password,setPassword]= useState("");
    const [Phone,setPhone]= useState("");
    const [Avatar,setAvatar]= useState("");

    const Data ={
        name:Name,
        email:email,
        password:Password,
        phoneNumber:Phone,
        avatar:Avatar
    }

    // console.log("Data:",Data)


    const handleRegister = async (e) => {
      e.preventDefault();

      if (!Name || !email || !Password || !Phone || !Avatar) {
          toast("Enter All Details", { type: "error", autoClose: 2000 });
      } else {
          try {
              const response = await axios.post("http://localhost:5000/create", Data);
              if (response.data.success) {
                  toast("Registered successfully", { type: "success", autoClose: 2000 });
              }
          } catch (error) {
              console.error("Error:", error);
              toast("Error in registration", { type: "error", autoClose: 2000 });
          }
      }
  };

  const goToHome = () => {
      navigate("/");
  }



 
  return (
    <Container>
        <h1 className="pb-3 text-center">Register Form</h1>
        <Form onSubmit={handleRegister}> 
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Name</Form.Label>
                <Form.Control
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    placeholder="Enter Name"
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    placeholder="Enter email"
                />
                <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    placeholder="Password"
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Phone number </Form.Label>
                <Form.Control
                    onChange={(e) => setPhone(e.target.value)}
                    type="tel"
                    placeholder="Enter Phone Number "
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Avatar </Form.Label>
                <Form.Control
                    onChange={(e) => setAvatar(e.target.value)}
                    type="avatar"
                    placeholder="Enter your avatar url"
                />
            </Form.Group>

            <div className="d-flex gap-3">
          <Button variant="primary" type="submit">
            Register
          </Button>

          <Button onClick={goToHome} variant="primary" type="button">
            Back
          </Button>
        </div>
        </Form>
        <ToastContainer />
    </Container>
);
}

export default Add;