import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Container, Row, Col, Button, Card } from "react-bootstrap";

function Home() {
  const navigate = useNavigate();
  const [profiles, setProfiles] = useState([]);

  const getApiData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/");
      setProfiles(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/delete/${id}`);
      setProfiles(profiles.filter((profile) => profile._id !== id));
      toast("Deleted successfully", { type: "success", autoClose: 2000 });
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  useEffect(() => {
    getApiData();
  }, []);

  const goToAddPage = () => {
    navigate("/add");
  };

  const goToUpdatePage = (profile) => {
    navigate("/update", { state: profile });
  };

  return (
    <Container>
      <Button  variant="primary" onClick={goToAddPage} style={{}}>
        Add
      </Button>
      <Row xs={1} md={2} lg={4} className="g-4">
        {profiles.map((profile, index) => (
          <Col key={profile._id}>
            <Card style={{ width: "18rem" }}>
              <p>{index + 1}</p>
              <Card.Img
                variant="top"
                src={profile.avatar}
                className="rounded-Circle"
                style={{ height: "200px", width: "200px",margin:"0 auto" }} // Adjust the height and width as needed
              />

              <Card.Body style={{margin:"0 auto"}}>
                <Card.Title>{profile.name}</Card.Title>
                <Card.Text>{profile.email}</Card.Text>
                <Card.Text>{profile.phoneNumber}</Card.Text>
                <Card.Text>{profile.password}</Card.Text>
                <div className="d-flex gap-3">
                  <Button
                    variant="primary"
                    onClick={() => goToUpdatePage(profile)}
                  >
                    Update
                  </Button>
                  <Button
                    variant="primary"
                    onClick={() => handleDelete(profile._id)}
                  >
                    Delete
                  </Button>
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
