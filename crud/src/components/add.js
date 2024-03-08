import React, { useState } from "react";
import axios from "axios";

import { Button, Container, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Add() {
  const navigate = useNavigate();

  const [Name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [Phone, setPhone] = useState("");
  const [Avatar, setAvatar] = useState("");
  const [showOTP, setShowOTP] = useState(false); // State to manage OTP input visibility
  const [OTP, setOTP] = useState(""); // State to store OTP entered by the user


  const Data = {
    name: Name,
    email: email,
    password: Password,
    phoneNumber: Phone,
    avatar: Avatar,
  };

  // console.log("Data:",Data)

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!Name || !email || !Password || !Phone || !Avatar) {
      toast("Enter All Details", { type: "error", autoClose: 2000 });
    } else {
      try {
        const response = await axios.post("http://localhost:5000/create", Data);
        if (response.data.success) {
          toast("Registered successfully", {
            type: "success",
            autoClose: 2000,
          });
        }
      } catch (error) {
        console.error("Error:", error);
        toast("Error in registration", { type: "error", autoClose: 2000 });
      }
    }
  };

  const goToHome = () => {
    navigate("/");
  };

  ///validation of email

  const emailValidation = async (e) => {
    e.preventDefault();

    if (!Name || !email || !Password || !Phone || !Avatar) {
      toast("Enter All Details", { type: "error", autoClose: 2000 });
    } else {
      try {
        // Send email to the server for OTP verification
        const response = await axios.post("http://localhost:5000/send-otp", {
          email,
        });

        if (response.data.success) {
          // Show OTP input field
          setShowOTP(true);
          toast("OTP sent successfully", { type: "success", autoClose: 2000 });
        }
      } catch (error) {
        console.error("Error:", error);
        toast("Error in sending OTP", { type: "error", autoClose: 2000 });
      }
    }
  };

  const handleOTPVerification = async (e) => {
    e.preventDefault();

    try {
      // Verify OTP entered by the user
      const response = await axios.post("http://localhost:5000/verify-otp", {
        email,
        otp: OTP,
      });

      if (response.data.valid) {
        // If OTP is valid, proceed with registration
        const registerResponse = await axios.post(
          "http://localhost:5000/create",
          Data
        );

        if (registerResponse.data.success) {
          toast("Registered successfully", {
            type: "success",
            autoClose: 2000,
          });
          navigate("/"); // Redirect to home page
        }
      } else {
        toast("Invalid OTP", { type: "error", autoClose: 2000 });
      }
    } catch (error) {
      console.error("Error:", error);
      toast("Error in OTP verification", { type: "error", autoClose: 2000 });
    }
  };

  return (
    <Container>
      <h1 className="pb-3 text-center">Register Form</h1>
      <Form onSubmit={handleRegister} >
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
          />x
          <Button onClick={handleRegister} variant="primary" type="submit" onSubmit={showOTP ? handleOTPVerification : handleRegister} >
            Verify
          </Button>
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        {showOTP && (
          <Form.Group className="mb-3" controlId="formBasicOTP">
            <Form.Label>OTP</Form.Label>
            <Form.Control
              onChange={(e) => setOTP(e.target.value)}
              type="text"
              placeholder="Enter OTP"
            />
          </Form.Group>
        )}

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
