import { Button, Modal, Row, Col, Form } from "react-bootstrap";
import { Navigate, useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

import '../styles/body.css'
import ItemCard from "./itmecard";
import { decryptVaultItem, encryptVaultItem, generateAuthKey, generateVaultKey, generateVaultNumber } from "../utils/encryption";
import axios from "axios";
import { words } from "../utils/passwordGeneration";
import GrowExample from "./loading";

function Body() {
  const [show, setShow] = useState(false);
  const [serviceName, setServiceName] = useState('')
  const [serviceUserName, setServiceUserName] = useState('')
  const [serviceEmail, setServiceEmail] = useState('')
  const [servicePassword, setServicePassword] = useState('')
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false)
  const [modalLoading, setModalLoading] = useState(false)

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const {email, password} = useParams()

  async function fetchVaultItems() {
    setLoading(true)
    var vaultKey = await generateVaultKey(email, password)
    var authKey = await generateAuthKey(email, password)
    var vaultNumber = await generateVaultNumber(authKey)

    var result = await axios(`https://xpass-password-manager.herokuapp.com/v1/items?vaultNumber=${vaultNumber}`)

    var itemArray = result.data.data.rows
    var temp = []

    itemArray.forEach(async (value) => {
      console.log("forEach: " + value.item);
      var item = await decryptVaultItem(value.item, vaultKey.toString())
      console.log("item: " + item);
      temp.push(item)
    })

    setItems(temp)
    setLoading(false)
  }

  async function entryItem() {
    setModalLoading(true)
    var vaultKey = await generateVaultKey(email, password)
    var authKey = await generateAuthKey(email, password)
    var vaultNumber = await generateVaultNumber(authKey)

    var data = {
      name: serviceName,
      email: serviceEmail,
      userName: serviceUserName,
      password: servicePassword,
    }

    var item = await encryptVaultItem(data, vaultKey.toString())
    console.log("EncryptItem: " + item);

    var items = await axios.post(`https://xpass-password-manager.herokuapp.com/v1/entry`, {item, vaultNumber: vaultNumber.toString()})
    console.log(items);
    setModalLoading(false)
    fetchVaultItems()
    handleClose()
    setServicePassword('')
  }

  useEffect(() => {
    if (email === undefined || password === undefined) {
      return
    } else {
      fetchVaultItems()
    }
  }, [])

  if (email === undefined || password === undefined) {
    return <Navigate to="/login" />
  } else {
    if (loading) {
      return( 
        <div className="Body align">
          <GrowExample/>
        </div>
      )
    } else {
    return (
      <div className="Body">
        <h4 style={{padding:'12px'}}>Recently</h4>
        <hr />
        <div className="itemHolder">
          {items.map((item, index) => {
            console.log(item);
            return <ItemCard
              key={index}
              title={item.name}
              email={item.email}
              imgLink={process.env.PUBLIC_URL + "/icons/Frame 1.png" }
              password={item.password}
              />
          })}
        </div>
        <Button variant="primary add" onClick={handleShow}>Add</Button>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>New Entry</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col>
                <Form>
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label>Service Name</Form.Label>
                    <Form.Control 
                      className="w-100" 
                      placeholder="Enter name" 
                      onChange={(event) => {
                        console.log(event.target.vaule)
                        setServiceName(event.target.value)
                      }}
                    />
                  </Form.Group>
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label>User Name</Form.Label>
                    <Form.Control 
                      className="w-100" 
                      placeholder="Enter user name"
                      onChange={(event) => {
                        console.log(event.target.vaule)
                        setServiceUserName(event.target.value)
                      }}
                    />
                  </Form.Group>
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control 
                      className="w-100" 
                      type="email" 
                      placeholder="Enter email" 
                      onChange={(event) => {
                        console.log(event.target.vaule)
                        setServiceEmail(event.target.value)
                      }}
                    />
                  </Form.Group>
                  <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Button 
                      variant="link gp" 
                      onClick={() => {
                        var password = words()
                        setServicePassword(password)
                      }}
                    >Generate Password</Button>
                    <Form.Control 
                      type="password" 
                      placeholder="Password"
                      value={servicePassword}
                      onChange={(event) => {
                        console.log(event.target.vaule)
                        setServicePassword(event.target.value)
                      }}
                    />
                  </Form.Group>
                </Form>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => {
              handleClose()
              setServicePassword('')
            }}>
              Close
            </Button>
            <Button 
              variant="primary" 
              onClick={entryItem}
            >
              {modalLoading ? "Loading": "Add Entry"}
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
                    }
  }
}

export default Body;
