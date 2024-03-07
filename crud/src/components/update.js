

import React , {useState}from "react";
import axios from "axios";
import { useNavigate ,useLocation } from "react-router-dom";

import {Button,Container,Form} from 'react-bootstrap';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Update() {
    const navigate = useNavigate();
    const location = useLocation();
    const recData =location.state;

    // console.log(location)


    const [Name,setName]= useState(recData.name);
    const [email,setEmail]= useState(recData.email);
    const [Password,setPassword]= useState(recData.password);
    const [Phone,setPhone]= useState(recData.phoneNumber);
    const [Avatar,setAvatar]= useState(recData.avatar);

    const Data ={
        name:Name,
        email:email,
        password:Password,
        phoneNumber:Phone,
        avatar:Avatar
    }

    console.log("Data:",Data)


    const handleRegister = async (e)=>{
        e.preventDefault();

        if(!Name || !email || !Password || !Phone || !Avatar){
          toast(" Enter All Details ",{ type:"error" , autoClose: 2000})

        }else{
        await axios
        .put(`https://65e8396f4bb72f0a9c4ea40d.mockapi.io/crud/${recData.id}`, Data)
        .then((res)=>{
            console.log(res)
            if(res.status === 200){
                toast(" Update  succesfully ",{ type:"success" , autoClose: 2000})

            }
        })
        .catch((err)=>{
            console.log("Error :",err)
            if(err.response.status !== 200){
                toast(" Error in Update ",{ type:"error" , autoClose: 2000})

            }
        });

      }

    };

    const goToHome=()=>{
        navigate("/")
    }



  return (
    
    <Container>
        <h1 className="pb-3 text-center">Update Form</h1>
    <Form className="">
        <div>
    <img src={recData.avatar} alt="" className="rounded-Circle "></img>
    </div>

    <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Name</Form.Label>
        <Form.Control onChange={(e)=>{
            setName(e.target.value)
        }
        }
         type="text"
          placeholder="Enter Name"
          value={Name}
           />
      </Form.Group>



      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
        onChange={(e)=>{
            setEmail(e.target.value)


        }

        }
        
        type="email" placeholder="Enter email"
        value={email} />
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
        
        type="password" placeholder="Password"
        value={Password} />
      </Form.Group>


      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Phone number </Form.Label>
        <Form.Control 
        onChange={(e)=>{
            setPhone(e.target.value)


        }

        }
        
        type="tel" placeholder="Enter Phone Number "
        value={Phone} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Avatar </Form.Label>

        
        <Form.Control
        onChange={(e)=>{
            setAvatar(e.target.value)


        }

        }

        type="file" name="avatar" placeholder="Enter Avatar"
        
        
        
        // type="avatar" placeholder="Enter Avatar " 
        
        />
        
      </Form.Group>


    <div className="d-flex gap-3">
      <Button onClick={handleRegister} variant="primary" type="submit">
      Update
      </Button>

      <Button onClick={goToHome} variant="primary" type="submit">
      Back
      </Button>
      </div>
    </Form>
    
    <ToastContainer />


    </Container>
  );
}

export default Update;
