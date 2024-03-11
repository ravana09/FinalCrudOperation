
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
    const [Avatar, setAvatar] = useState(null);

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
            const response = await axios.post("http://localhost:5000/create", Data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
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

  const handleAvatarChange = (e) => {
    const file = e.target.files[0]; // Get the selected file
    setAvatar(URL.createObjectURL(file)); // Create a local URL for the selected file and set it as Avatar state
};


 
  return (
    <Container>
        <h1 className="pb-3 text-center">Register Form</h1>
        <Form onSubmit={handleRegister}> 
          {Avatar && (
          <div>
            <img src={Avatar} alt="Avatar" style={{ width: "200px", height: "200px" }} />
          </div>
        )}
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
                    <Form.Label>Avatar</Form.Label>
                    <Form.Control
                        onChange={handleAvatarChange} // Handle file change
                        type="file" // Change input type to file\
                        
                    />
                    
                </Form.Group>
                  {/* Display the image */}
      

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