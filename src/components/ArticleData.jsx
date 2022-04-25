import React from "react";
import {Row, Col, Container, Badge, Form, Button, Collapse, Alert} from "react-bootstrap";
import domain from "../serversettings"
import axios from "axios";

const ArticleData = (props) => {
    const [loading, setLoading] = React.useState(true);
    const [jsonContent, setJsonContent] = React.useState([]);
    const [upd, setUpd] = React.useState(false);
    const [updend, setUpdEnd] = React.useState(false);

    const [title, setTitle] = React.useState('');
    const [text, setText] = React.useState('');
    const [mes, setMas] = React.useState('');
    const UpdBtn = ()=>{
        if(window.localStorage.getItem('name') !== null && window.localStorage.getItem('name') === jsonContent.username && upd === false)
        return (
            <Container>
        <Button onClick={()=>setUpd(!upd)}>
            редактировать
        </Button>
        </Container>
        
        );
        else
        return(<Button onClick={()=>setUpd(!upd)}>
        отмена
    </Button>);

    }
        const UpdAlert = ()=>{
            if(updend == true)
            return(<Alert>{mes}</Alert>);
            else
            return(<div></div>);
        }
    const post = (e) => {
        console.log(window.localStorage.getItem('token'));

        e.preventDefault();
        console.log(e)
            axios.request(
                {url: domain+'/articles/'+props.id,
                method: "PUT",
                headers: {
                    "Authorization": 'bearer '+window.localStorage.getItem('token'),
                    "Accept": 'application/json',
                    "Content-Type": "application/json"

                },
                data: {
                    "Title": title,
                    "Text" : text
                }}
            ).then((req)=> {setMas(req.data)})
        setUpdEnd(true);

    }
    function onChangeTitle(e) {
        setTitle(e.target.value);
    }
    function onChangeText(e) {
        setText(e.target.value);
    }
    React.useEffect(()=> 
    {
        document.title = "загрузка статьи...";
        axios.request(
            {url: domain+'/articles/'+props.id,
            method: 'get', 
            headers:
            {'Access-Control-Allow-Origin': '*',
             'Accept': 'application/json',
            }}).then((resp)=>{
                 setJsonContent(resp.data);
            })
        setLoading(false);
        document.title = jsonContent.title;
    },[]);
    return (
        loading ? (<span className="visually-hidden">Загрузка...</span>) : (
            <Container style={{borderWidth: "0px"}}>
                <Collapse in = {!upd}>
                    <Container>
                        <h2>{jsonContent.title}</h2>
                        <span>{jsonContent.username}</span>
                        <p>{jsonContent.text}</p>
                        <Badge pill bg="dark"></Badge>
                    </Container>
                </Collapse>
                <Collapse  in = {upd}>
                    <Container>
                    <Form onSubmit={(e)=>post(e)}>
                        <Form.Group as={Row} controlId="formPlaintextTitle">
                            <Form.Label column sm="2">
                            Title
                            </Form.Label>
                            <Col sm="10">
                            <Form.Control value = {title} onChange={onChangeTitle} placeholder="введите своё имя" />
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
                        <Button variant="primary" type="submit"> редактировать
                        </Button>
                    </Form>
                    </Container>
                </Collapse>
                <UpdBtn/>
                <UpdAlert></UpdAlert>
            </Container>
        )
    );
}

export default ArticleData;