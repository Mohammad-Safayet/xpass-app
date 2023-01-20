import React, { useState } from 'react';
import axios from "axios";
import {Button, Card, Col, Container, Form, Row} from "react-bootstrap";
import { useNavigate } from 'react-router-dom';

import logo from "../assets/logo.png"
import "../styles/login.css";
import { hashPassword } from '../utils/encryption';

const Register = ({logUser})=> {

    const [isFieldFilled, setIsFieldFilled] = useState(false)
    const [userName, setUserName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    async function registerUser() {
        console.log("register button: " + email, password);

        if (password !== confirmPassword) {
            return;
        }

        if(email === "" || password === "" || userName === "") return

        setLoading(true)
        var hasedPassword = await hashPassword(password)

        const user = await axios.post(
            `https://xpass-password-manager.herokuapp.com/v1/register`, {
                email,
                password: hasedPassword.toString(),
                name: userName
            }
        )

        console.log(user);
        if (user.status === 200) {
            setLoading(false)
            console.log(`user: ${user.data.data}`);
            logUser(user.data.data)
            navigate(
                `/login`
            )
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
                            <Form.Group controlId="userName">
                                <Form.Label>Enter Full Name</Form.Label>
                                <Form.Control 
                                    className="w-100" type="text" 
                                    placeholder="Enter Full Name" 
                                    value={userName}
                                    onChange={e => setUserName(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group controlId="userEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control 
                                    className="w-100" 
                                    type="email" 
                                    placeholder="Enter email" 
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group controlId="userMasterPassword">
                                <Form.Label>Master Password</Form.Label>
                                <Form.Control 
                                    type="password" 
                                    placeholder="Master Password" 
                                    value={password}
                                    onChange={e => {
                                        setPassword(e.target.value)
                                        setIsFieldFilled(true)
                                        console.log(e.target.value)
                                    }}
                                />
                            </Form.Group>
                            <Form.Group controlId="userConfirmMasterPassword">
                                <Form.Label>Confirm Master Password</Form.Label>
                                <Form.Control 
                                    type="password" 
                                    disabled={!isFieldFilled} 
                                    placeholder="Confirm Master Password" 
                                    onChange={e => {
                                        setConfirmPassword(e.target.value)
                                    }}
                                />
                            </Form.Group>
                        </Form>
                            {/* <Link onClick={registerUser} 
                                to='/login'> */}
                                <Button 
                                    onClick={registerUser}
                                    className="w-100 mt-4"
                                    variant="primary" 
                                    type="submit">
                                    {loading ? 'Loading...' : 'Register'}
                                </Button>
                            {/* </Link> */}
                            <div className='mt-4 align-self-center'>
                                <p class="text-center">Already have an account? <a href="./login" id="toLogin"> Login Now!</a> </p>
                            </div>
                    </Col>
                </Row>
                </Card.Body>
            </Card>
        </Container>
        </>
    );
};

export default Register;