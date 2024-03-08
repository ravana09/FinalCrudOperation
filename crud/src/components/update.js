import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { Button, Container, Form } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Update() {
  const navigate = useNavigate();
  const location = useLocation();
  const recData = location.state;

  const [Name, setName] = useState(recData.name);
  const [email, setEmail] = useState(recData.email);
  const [Password, setPassword] = useState(recData.password);
  const [Phone, setPhone] = useState(recData.phoneNumber);
  const [Avatar, setAvatar] = useState(recData.avatar);

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(`http://localhost:5000/update`, {
        id: recData._id, // Pass the ID of the profile being updated
        name: Name,
        email: email,
        password: Password,
        phoneNumber: Phone,
        avatar: Avatar,
      });

      if (response.status === 200) {
        toast("Update successful", { type: "success", autoClose: 2000 });
      }
    } catch (error) {
      console.error("Error:", error);
      toast("Error updating profile", { type: "error", autoClose: 2000 });
    }
  };

  const goToHome = () => {
    navigate("/");
  };

  return (
    <Container>
      <h1 className="pb-3 text-center">Update Form</h1>
      <Form onSubmit={handleUpdate}>


        <div>
          <img src={recData.avatar} alt="" className="rounded-Circle " />
        </div>

        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Name"
            value={Name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={Password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicNumber">
          <Form.Label>Phone number</Form.Label>
          <Form.Control
            type="tel"
            placeholder="Enter Phone Number"
            value={Phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicAvatar">
          <Form.Label>Avatar</Form.Label>
          <Form.Control
            type="avatar"
            placeholder="Enter your Avatar URL"
            value={Avatar}
            onChange={(e) => setAvatar(e.target.value)}
          />
        </Form.Group>

        <div className="d-flex gap-3">
          <Button variant="primary" type="submit">
            Update
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

export default Update;

