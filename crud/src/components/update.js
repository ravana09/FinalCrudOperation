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
  const [avatarFile, setAvatarFile] = useState(null);

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("id", recData._id);
      formData.append("name", Name);
      formData.append("email", email);
      formData.append("password", Password);
      formData.append("phoneNumber", Phone);
      formData.append("avatar", avatarFile); // Append the avatar file

      const response = await axios.put(`http://localhost:5000/update`, formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Set the content type to multipart/form-data
        },
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

  const handleFileChange = (e) => {
    setAvatarFile(e.target.files[0]);
    setAvatar(URL.createObjectURL(e.target.files[0]));
  };

  return (
    <Container>
      <h1 className="pb-3 text-center">Update Form</h1>
      <Form onSubmit={handleUpdate}>
        <div>
          <img src={Avatar} alt="" className="rounded-Circle" style={{ width: "100px", height: "100px" }} />
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
            type="file"
            accept="image/*" // accept only image files
            onChange={handleFileChange}
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

