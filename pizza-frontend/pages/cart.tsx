import { useState } from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { Container, Row, Col, ListGroup, Image, Button, Form, FloatingLabel, Spinner, Alert } from 'react-bootstrap'

import { useAppSelector, useAppDispatch } from '../redux/hooks'
import { addToCart, minusFromCart, removeFromCart } from '../redux/cartSlice'
import { orderAction } from '../redux/orderSlice'

import Header from '../components/header'
import { Item } from '../types/orders'

const Cart: NextPage = () => {

    const router = useRouter()

    const [address, setAddress] = useState('')
    const [postalCode, setPostalCode] = useState('')
    const [contactNumber, setContactNumber] = useState('')
    const [email, setEmail] = useState('')

    const dispatch = useAppDispatch()
    const cart = useAppSelector((state) => state.cart)
    const { orders, numItems } = cart
    const order = useAppSelector((state) => state.order)
    const { order_loading, order_error_message, order_error_code } = order

    const addHandler = (item: Item) => {
        dispatch(addToCart(item))
    }

    const minusHandler = (item: Item) => {
        dispatch(minusFromCart(item))
    }

    const removeHandler = (item: Item) => {
        dispatch(removeFromCart(item))
    }

    const orderHandler = async(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        const response = await dispatch(orderAction(orders, address, postalCode, contactNumber, email))
        if (response) {
            router.push(`/order/${response.id}`)
        }
    }

    return (
        <div id="other-container">
            <Head>
                <title>Cart</title>
            </Head>
            <Header />
            <Container className="h-75">
                <Row className="align-items-center justify-content-between h-100">
                    <Col sm="12" md="7">
                        <ListGroup>
                            {orders.map((order) => (
                                <ListGroup.Item key={`${order.item.pizza.id} ${order.item.size}`}>
                                    <Row>
                                        <Col xs="4" md="4">{`${order.item.pizza.pizza_name} (${order.item.size} inch)`}</Col>
                                        <Col xs="4" md="4">
                                            <Row className="text-center">
                                                <Col className="noselect" onClick={() => minusHandler(order.item)} style={{cursor: "pointer"}}>
                                                    <span>
                                                        -
                                                    </span>
                                                </Col>
                                                <Col>
                                                {order.quantity}
                                                </Col>
                                                <Col className="noselect" onClick={() => addHandler(order.item)} style={{cursor: "pointer"}}>
                                                    <span>
                                                        +
                                                    </span>
                                                </Col>
                                            </Row>
                                        </Col>
                                        <Col xs="2" md="2" className="text-center">
                                            {(Number(order.item.pizza.price) * order.quantity * Number(order.item.size) / 12).toFixed(2)}
                                        </Col>
                                        <Col xs="2" md="2" className="text-center" onClick={() => removeHandler(order.item)}>
                                            <Image alt="remove" src="/images/dustbin.png" style={{cursor: "pointer", width: "1.5rem"}}/>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            ))}
                            {numItems > 0 ?
                                <ListGroup.Item>
                                    <Row>
                                        <Col xs="4" md="4">Total</Col>
                                        <Col xs="4" md="4">
                                            <Row className="text-center">
                                                <Col>
                                                    {/*sum of pizzas using map then reduce*/}
                                                    {(orders.map((order) => order.quantity)).reduce((prev, current) => prev + current, 0)}
                                                </Col>
                                            </Row>
                                        </Col>
                                        <Col xs="2" md="2" className="text-center">
                                            {/*sum of price using map then reduce*/}
                                            {((orders.map((order) => Number(order.item.pizza.price) * order.quantity * Number(order.item.size) / 12)).reduce((prev, current) => prev + current, 0)).toFixed(2)}
                                        </Col>
                                        <Col xs="2" md="2">
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            :
                            <ListGroup.Item>
                                <Row className="text-center">
                                    <span>Cart is empty.</span>
                                </Row>
                            </ListGroup.Item>
                            }
                        </ListGroup>
                    </Col>
                    <Col xs="12" md="4">
                        { order_error_code &&
                            <Alert variant="danger">
                                {`Error ${order_error_code}: ${order_error_message}`}
                            </Alert>
                        }
                        <Form>
                            <FloatingLabel label="Address" className="mb-3">
                                <Form.Control type="email" value={address} onChange={(e) => setAddress(e.target.value)} disabled={numItems === 0}/>
                            </FloatingLabel>
                            <FloatingLabel label="Postal Code" className="mb-3">
                                <Form.Control type="text" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} disabled={numItems === 0}/>
                            </FloatingLabel>
                            <FloatingLabel label="Contact Number" className="mb-3">
                                <Form.Control type="text"  value={contactNumber} onChange={(e) => setContactNumber(e.target.value)} disabled={numItems === 0}/>
                            </FloatingLabel>
                            <FloatingLabel label="Email" className="mb-3">
                                <Form.Control type="text"  value={email} onChange={(e) => setEmail(e.target.value)} disabled={numItems === 0}/>
                            </FloatingLabel>

                            <Row className="justify-content-center text-center">
                                <Col xs="6">
                                    <Button type="submit" onClick={(e) => orderHandler(e)} disabled={numItems === 0}>Order Now</Button>
                                </Col>
                                { order_loading &&
                                    <Spinner animation="border" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </Spinner>
                                }
                            </Row>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Cart
