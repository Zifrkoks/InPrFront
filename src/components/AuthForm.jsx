import React from "react";
import {observer} from "mobx-react";
import {Col, Container, Row, Form, Collapse, Button, Alert} from "react-bootstrap";
import domain from "../serversettings"
import axios from "axios";

const AuthForm = observer(() => {
    const [logining, SetLogining] = React.useState(true);
    const [name, setName] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [age, setAge] = React.useState('');
    const [role, setRole] = React.useState('reader');
    const [mes, setMas] = React.useState('');
    const [authend, setAuthEnd] = React.useState(false);


    const AuthAlert = ()=>{
        if(authend == true)
        return(<Alert>message: {mes}</Alert>);
        else
        return(<div></div>);
    }
    function LoginButton(){
        if(logining == true)
        return 'регистрация';
        else
        return 'вход';
    }
    function LoginButton2(){
        if(logining == true)
        return 'войти';
        else
        return 'зарегистрироваться';
    }
    const post = (e) => {
        e.preventDefault();
        console.log(e)
        if(logining != true){
            axios.request({
                url: domain+'/auth/registration',
                    method: "POST",
                    headers: {
                        "Accept": 'application/json',
                        "Content-Type": "application/json"
                    },
                    data: {
                        "Name": name,
                        "Password": password,
                        "Email": email,
                        "Age": age,
                        "role": role
                    },
            }).then((resp)=>{
                window.localStorage.clear();
                window.localStorage.setItem('token',resp.data.token);
                window.localStorage.setItem('name',resp.data.name);
                window.localStorage.setItem('role',resp.data.role);
                setMas(resp.data.mes);
                setAuthEnd(true);
           })
        }
        else{
            axios.request({
                url: domain+'/auth/login',
                method: 'POST',
                headers: {
                    "Accept": 'application/json',
                    "Content-Type": "application/json"
                    
                    },
                    data: {
                        "Name": name,
                        "Password": password,
                    },
                }).then((resp)=>{
                    window.localStorage.clear();
                    window.localStorage.setItem('token',resp.data.token);
                    window.localStorage.setItem('name',resp.data.name);
                    window.localStorage.setItem('role',resp.data.role);
                    setMas(resp.data.mes);
                    setAuthEnd(true);
               })
        }
        

        console.log(window.localStorage.getItem('token'));
        console.log(window.localStorage.getItem('name'));
        console.log(window.localStorage.getItem('role'));
    }
    
    function onChangeName(e) {
        setName(e.target.value);
    }
    function onChangePassword(e) {
        setPassword(e.target.value);
    }
    function onChangeEmail(e) {
        setEmail(e.target.value);
    }
    function onChangeAge(e) {
        setAge(e.target.value);
    }
    function onChangeRole(e) {
        setRole(e.target.value);
    }

    return (
        <Container>
            <Button onClick={()=>SetLogining(!logining)} aria-controls="example-collapse-text" aria-expanded={!logining}>{LoginButton()}</Button>
            <Form onSubmit={(e)=>post(e)}>
                <Form.Group as={Row} className="mb-3" controlId="formPlaintextName">
                    <Form.Label column sm="2">
                    Name
                    </Form.Label>
                    <Col sm="10">
                    <Form.Control value={name} onChange={onChangeName} type="Name" placeholder="введите своё имя" />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                    <Form.Label column sm="2">
                    Password
                    </Form.Label>
                    <Col sm="10">
                    <Form.Control type="Password" value={password} onChange={onChangePassword} placeholder="" />
                    </Col>
                </Form.Group>
                <Collapse in={!logining}>
                    <div style={{merginRight:"0px",merginLeft:"0px",peddingRight:"0px",peddingLeft:"0px"}}>
                <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                    <Form.Label column sm="2">Email</Form.Label>
                    <Col sm="10">
                    <Form.Control type="Age" value={email} onChange={onChangeEmail} placeholder="введите свой почтовый адрес" />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3" controlId="formPlaintextAge">
                    <Form.Label column sm="2">Age</Form.Label>
                    <Col sm="10">
                    <Form.Control type="text" value={age} onChange={onChangeAge} placeholder="введите свой возраст" />
                    </Col>
                </Form.Group>
                <Form.Group as={Row}>
                <Form.Label column sm="2">role</Form.Label>
                <Col sm="10">
                    <Form.Select  sm="10" value={role} onChange={onChangeRole}>
                        <option value="reader">reader</option>
                        <option value="publisher">publisher</option>
                    </Form.Select>
                </Col>
                </Form.Group>
                </div>
                </Collapse>
                <Button variant="primary" type="submit">
                {LoginButton2()}
                </Button>
            </Form>
            <AuthAlert/>
        </Container>
    );
});

export default AuthForm;