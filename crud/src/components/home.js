
import React, {useState,useEffect} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { useHref } from "react-router-dom";

function Home() {
    const navigate=useNavigate()
    const [Profile,setProfile]=useState([]);
    console.log("profile",Profile)

const getApiData = async ()=>{


    await axios.get("https://65e8396f4bb72f0a9c4ea40d.mockapi.io/crud")
    .then((res)=>{
        // console.log(res.data);
        setProfile(res.data)

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

    const goToUpdatePage =()=>{
        navigate("/update");
    };







  return (
    <Container>
    <Button variant="primary" onClick={goToAddPage}>Add</Button>
    <Row xs={1} md={2} lg={4} className="g-4">
      {Profile.map((profile, index) => (
        <Col key={profile.id}>
          <Card style={{ width: '18rem' }}>
            <p>{index + 1}</p>
            <Card.Img variant="top" src={profile.avatar} />
            <Card.Body>
              <Card.Title>{profile.name}</Card.Title>
              <Card.Text>{profile.email}</Card.Text>
              <Card.Text>{profile.phoneNumber}</Card.Text>
              <Card.Text>{profile.password}</Card.Text>
              <div className="d-flex gap-3">
                <Button variant="primary" onClick={goToUpdatePage}>Update</Button>
                <Button variant="primary" >Delete</Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  </Container>
);
}

export default Home;