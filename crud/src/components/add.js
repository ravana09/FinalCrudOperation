
import React , {useState}from "react";
import axios from "axios"

import {Button,Container,Form} from 'react-bootstrap';
import { useHref } from "react-router-dom";

function Add() {

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

    console.log("Data:",Data)


    const handleRegister = async (e)=>{
        e.preventdefault()
        await axios
        .post("https://65e8396f4bb72f0a9c4ea40d.mockapi.io/crud", Data)
        .then((res)=>{
            console.log(res)
        })
        .catch((err)=>{
            console.log("Error :",err)
        })

    };









  return (
    
    <Container>
        <h1 className="pb-3 text-center">Register Form</h1>
    <Form className="">

    <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Name</Form.Label>
        <Form.Control onChange={(e)=>{
            setName(e.target.value)


        }

        }
         type="text"
          placeholder="Enter Name"
           />
      </Form.Group>



      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
        onChange={(e)=>{
            setEmail(e.target.value)


        }

        }
        
        type="email" placeholder="Enter email" />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control  onChange={(e)=>{
            setPassword(e.target.value)


        }

        }
        
        type="password" placeholder="Password" />
      </Form.Group>


      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Phone number </Form.Label>
        <Form.Control 
        onChange={(e)=>{
            setPhone(e.target.value)


        }

        }
        
        type="tel" placeholder="Enter Phone Number " />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Avatar </Form.Label>
        <Form.Control
        onChange={(e)=>{
            setAvatar(e.target.value)


        }

        }
        
        type="avatar" placeholder="Enter Avatar " />
      </Form.Group>


      <Button onClick={handleRegister} variant="primary" type="submit">
      Register
      </Button>
    </Form>
    </Container>
  );
}

export default Add;