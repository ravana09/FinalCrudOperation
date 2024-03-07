
import React, {useState,useEffect} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import { Container, Row, Col, Button, Card } from 'react-bootstrap';

function Home() {
    const navigate=useNavigate()
    const [Profile,setProfile]=useState([]);
    // 

const getApiData = async ()=>{


    await axios.get("https://65e8396f4bb72f0a9c4ea40d.mockapi.io/crud")
    .then((res)=>{
       
        setProfile(res.data)

    })
    .catch((err)=>{
        console.log(err)
        
    })
};

const handleDelete = async (id)=>{


  await axios
  .delete(`https://65e8396f4bb72f0a9c4ea40d.mockapi.io/crud/${id}`)
  .then((res)=>{
     console.log(res);
     if(res.status === 200){
      setProfile(Profile.filter((Profile)=> Profile.id !== id));
      toast("Deleted succesfully ",{ type:"success" , autoClose: 2000})
      

     }

  })
  .catch((err)=>{
      console.log(err)
      
  })
}






    useEffect(()=>{
        getApiData()

    },[])

    const goToAddPage =()=>{
        navigate("/add");
    };

    const goToUpdatePage =(profile)=>{
      console.log("Data has been received ",profile)
        navigate("/update" ,{ state:profile});
    };







  return (
    <Container>
    <Button variant="primary" onClick={goToAddPage}>Add</Button>
    <Row xs={1} md={2} lg={4} className="g-4">
      {Profile.map((profile, index) => (
        <Col key={profile.id}>
          <Card style={{ width: '18rem' }}>
            <p>{index + 1}</p>
            <Card.Img variant="top" src={profile.avatar} className="rounded-Circle"/>
            <Card.Body>
              <Card.Title>{profile.name}</Card.Title>
              <Card.Text>{profile.email}</Card.Text>
              <Card.Text>{profile.phoneNumber}</Card.Text>
              <Card.Text>{profile.password}</Card.Text>
              <div className="d-flex gap-3">
                <Button variant="primary" onClick={()=>{
                  goToUpdatePage(profile)
                }
                  
                  }>Update</Button>
                <Button variant="primary" 
                onClick={()=>{
                  handleDelete(profile.id)
                }}
                 >Delete</Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
    <ToastContainer />
  </Container>
);
}

export default Home;