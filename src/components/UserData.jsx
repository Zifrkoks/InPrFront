import {Navbar, Container, Col, Row, Card, Button, Collapse} from "react-bootstrap";
import React from "react";
import domain from "../serversettings";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserData = () => {
    const [loading, setLoading] = React.useState(true);
    const [jsonContentUser, setJsonContentUser] = React.useState([]);
    const [jsonContentArticles, setJsonContentArticles] = React.useState([]);
    const [loadedArticles,setLoadedArticles] = React.useState(false);
    var navigate = useNavigate();
    React.useEffect(()=> 
    {
        document.title = "загрузка данных...";
        axios.request(
            {
                url: domain+'/'+window.localStorage.getItem('name'),
             method: 'get', 
            headers:
            {'Access-Control-Allow-Origin': '*',
             'Accept': 'application/json',
            }}).then((resp)=>{
                 setJsonContentUser(resp.data);
            })
            setLoading(false);
            document.title = jsonContentUser.name;

    },[]);
    function LoadArticlesUser(){
        axios.request(
            {
                url:'https://localhost:7257/'+window.localStorage.getItem('name')+'/articles',
                method: 'get',
                headers:
                {'Access-Control-Allow-Origin': '*',
                'Accept': 'application/json',
                }})
        .then((resp) => setJsonContentArticles(resp.data));
        setLoadedArticles(true);
    }
    
    return (
        <Container>
            <h2>usename: {jsonContentUser.name}</h2>
            <span>email: {jsonContentUser.email}</span>
            <p>age: {jsonContentUser.age}</p>
            <p>age: {jsonContentUser.role}</p>

            <Collapse in = {!loadedArticles}>
            <Button onClick={LoadArticlesUser}>загрузить статьи</Button>
            </Collapse>
            <Collapse in = {loadedArticles}>
            <Row xs={1} md={2} lg={3} xl = {4} className={"g-4 mt-1"}>
                    {jsonContentArticles.map(event =>
                        <Col>
                            <Card>
                                <Card.Header>
                                дата создания: {event.date}
                                </Card.Header>
                                <Card.Body>
                                <Card.Title>{event.title}</Card.Title>
                                <Button onClick={()=>navigate('/Article/'+event.id)}>читать</Button>
                                </Card.Body>
                                <Card.Footer>Издатель: {event.username}</Card.Footer>
                            </Card>
                        </Col>
                    )}
                </Row>
            </Collapse>
            
        </Container>
    );
}

export default UserData;