import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import {Button, Card, Col, Container, Form, Row} from "react-bootstrap";
import { useNavigate } from 'react-router-dom';

import logo from "../assets/logo.png"
import "../styles/login.css";
import { hashPassword } from "../utils/encryption.js";

const LogIn = (logUser, user) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();

    async function fetchUser() {
        setLoading(true)
        console.log(email, password);

        const hashedPassword = await hashPassword(password)

        console.log(`password: ${password} -> ${hashedPassword}`);

        const user = await axios(
            `https://xpass-password-manager.herokuapp.com/v1/user?email=${email}&password=${hashedPassword}`)

        console.log(user.data.data);
        if (user.status === 200) {
            console.log(user);
            console.log(`user: ${user.data.data}`);
            if (user.data.data === null) {
                return
            } else {
                setLoading(false)
                var data = user.data.data
                console.log(`?id='${data.id}'&name='${data.name}'&email='${data.email}'&password='${data.password}'`);
                navigate(
                    `/:email=${data.email}/:password=${data.password}`
                )
                
            }
        } else {
            return
        }
    }
    
    return (
        <>
        <Container className="d-flex align-items-center justify-content-center" style={{height: '100vh'}}>
            <Card style={{ width: '50%', height: 'auto'}}>
                <Card.Img 
                    variant="top" src={logo} 
                    style={{height: '50px', width: '120px', display: 'flex', alignSelf: 'center'}}
                    className="mt-5"/>
                <Card.Body className="mt-3 mb-3 ml-5 mr-5">
                <Row>
                    <Col>
                        <Form>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control 
                                className="w-100" 
                                type="email" 
                                placeholder="Enter email"
                                value={email}
                                onChange={(event) => {
                                    console.log(event.target.vaule);
                                    setEmail(event.target.value)
                                }}  />
                            </Form.Group>
                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                 type="password" 
                                 placeholder="Password"
                                 value={password}
                                 onChange={(event) => {
                                    setPassword(event.target.value)
                                 }} />
                            </Form.Group>
                        </Form>
                            {/* <Link
                                onClick={fetchUser} 
                                to={isLoaded ? '/' : "/login"}
                            > */}
                                <Button 
                                onClick={fetchUser}
                                className="w-100 mt-4" 
                                variant="primary" 
                                type="submit">
                                    {loading ? "Loading": "Log In"}
                                </Button>
                            {/* </Link> */}
                            <div className='mt-4 align-self-center'>
                                <p class="text-center">Don't have an account? <a href="./register" id="toReg"> Register Now!</a> </p>
                            </div>
                    </Col>
                </Row>
                </Card.Body>
            </Card>
        </Container>
        </>
    );
};

export default LogIn;