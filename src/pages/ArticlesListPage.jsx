import {Collapse, Container,Button, Card, Col, Row, Form, Alert} from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import axios from 'axios';
import React from "react";
import domain from "../serversettings"

const ArticleListPage = (props) => {
    const [collapseArticles, setCollapseArticles] = React.useState(true);
    const [page, setPage] = React.useState(0);
    const [creating, setCreatingstate] = React.useState(false);
    const [btncrtext, setBtncrtext] = React.useState('создать статью');
    const [createend, setCreateEnd] = React.useState(false);
    const [searchreq, setSearchreq] = React.useState('');
    var navigate = useNavigate();


    const [title, setTitle] = React.useState('');
    const [text, setText] = React.useState('');
    const [mes, setMas] = React.useState('');
    
    const [searchData, setsearchData] = React.useState([]);
    const [searchend, setSearchEnd] = React.useState(false);

    const [countArt, setPageArt] = React.useState(10);
    
    const [dataArticles, SetDataArticles] = React.useState([]);
    const params = useParams();
    function pagezero(){
        if(page === 0)
        return true;
        else
        return false;
    }
    function setCreating(val){
        if(val === false)
        setBtncrtext('создать статью');
        else
            setBtncrtext('отменить');
        setCreatingstate(val);

    }
    React.useEffect(()=> {
        if(page >= 0){
        axios.request(
        {url: domain+'/articles/page'+page+'/'+countArt,
        method: 'get', 
        headers:
        {'Access-Control-Allow-Origin': '*',
         'Accept': 'application/json',
        }}).then((resp)=>{
            const articles = resp.data;
            SetDataArticles(articles);
        })}        
    },[page,countArt])

    function onChangeTitle(e) {
        setTitle(e.target.value);
    }
    function onChangeText(e) {
        setText(e.target.value);
    }
    const post = (e) => {

        e.preventDefault();
        console.log(e)
            axios.request(
                {url: domain+'/articles',
                method: "POST",
                headers: {
                    "Authorization": 'bearer '+window.localStorage.getItem('token'),
                    "Accept": 'application/json',
                    "Content-Type": "application/json"

                },
                data: {
                    "Title": title,
                    "Text" : text
                }}
            ).then((req)=> {setMas(req)})
        setCreateEnd(true);

    }
    const CreateAlert = ()=>{
        if(createend == true)
        return(<Alert>{mes.data}</Alert>);
        else
        return(<div></div>);
    }
    const FindArticle = (e)=>{
        e.preventDefault();
        console.log(e)
        axios.request(
            {url: domain+'/articles/search/'+searchreq,
            method: "GET",
            headers: {
                "Accept": 'application/json',
                "Content-Type": "application/json"

            }}
        ).then((req)=> {setsearchData(req.data)})
    setSearchEnd(true);

    }
    function CreateArticleButton(){
        if(window.localStorage.getItem('role') === 'admin' || window.localStorage.getItem('role') === 'publisher')
        return (<Button onClick={()=>setCreating(!creating)}>{btncrtext}</Button>)
        else
        return (<div></div>);
    }
    return (
        <Container>
                    <CreateArticleButton/>
                    <Collapse  in = {creating}>
                        <Form onSubmit={(e)=>post(e)}>
                            <Form.Group as={Row} controlId="formPlaintextTitle">
                                <Form.Label column sm="2">
                                Title
                                </Form.Label>
                                <Col sm="10">
                                <Form.Control value = {title} onChange={onChangeTitle} placeholder="Article Title" />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} controlId="formPlaintextText">
                                <Form.Label column sm="2">
                                Text
                                </Form.Label>
                                <Col sm="10">
                                <Form.Control value = {text} onChange={onChangeText} as="textarea" rows={10} placeholder="Article Text" />
                                </Col>
                            </Form.Group>
                            <Button variant="primary" type="submit"> создать
                            </Button>
                            <CreateAlert></CreateAlert>
                        </Form>
                    </Collapse>
            <Form onSubmit={(e)=>FindArticle(e)}>
                <Form.Group as={Row}>
                    <Form.Label column sm="2">
                        поиск
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control value={searchreq} onChange={(e)=>setSearchreq(e.target.value)} placeholder="search...">
                        </Form.Control>
                    </Col>
                </Form.Group>
                <Button variant="primary" type="submit"> поиск</Button>
            </Form>
            <Collapse in = {searchend}>
            <Row xs={1} md={2} lg={3} xl = {4} className={"g-4 mt-1"}>
                {searchData.map(event =>
                    <Col key = {event.id}>
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
            <Row xs={1} md={2} lg={3} xl = {4} className={"g-4 mt-1"}>
                {dataArticles.map(event =>
                    <Col key = {event.id}>
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
            <Button onClick={()=> setPage(page - 1)}>назад</Button>
            <Button onClick={()=>setPage(page + 1)}>следующая</Button>
            
        </Container>
    );
}

export default ArticleListPage;