import axios from "axios";
import React from "react";
import {Col, Container, Card, Row} from "react-bootstrap";
import {domain, authheaders} from "../serversettings"

const Dashboard = () => {
    const [JsonContentUserCount, setJsonContentUserCount] = React.useState([]);
    const [JsonContentArticleCount, setJsonContentArticleCount] = React.useState([]);
    const [JsonContentCount, setJsonContentCount] = React.useState([]);

    const [loading, setLoading] = React.useState(true);
    React.useEffect(()=> 
    {
        axios.request({
            url: domain+'/admin/users/count',
            method: 'get',
            headers: authheaders,
        })
        .then(res => setJsonContentUserCount(res.data))

        axios.request({
            url: domain+'/admin/articles/count',
            method: 'get',
            headers: authheaders,
        })        
        .then(res => setJsonContentArticleCount(res.data))

    },[]);
    /*function FindUser(Name){
        fetch('${domain}/admin/users/count')
        .then((res) => res.json())
        .then(data => setJsonContentUserCount(data))
    }
    function FindArticle(Title){
        fetch('${domain}/admin/users/count')
        .then((res) => res.json())
        .then(data => setJsonContentUserCount(data))
    }*/
    return (
        <Container>
            <Row xs={1} md={2} className={"g-4 mt-1"}>
                <Col>
                    <Card>
                        <Card.Title> всего пользователей: {JsonContentUserCount}</Card.Title>
                    </Card>
                </Col>
                <Col>
                    <Card>
                        <Card.Title>всего статей: {JsonContentArticleCount}</Card.Title>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default Dashboard;