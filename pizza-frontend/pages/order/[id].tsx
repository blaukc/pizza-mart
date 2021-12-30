import type { NextPage } from 'next'
import { useState, useEffect } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { Container, Row, Col, ListGroup, ProgressBar } from 'react-bootstrap'

import Header from '../../components/header'

interface ItemDetails {
    pizza: string
    price: string
    size: string
    quantity: number
}

const Home: NextPage = () => {

    const router = useRouter()
    const { id } = router.query

    const orderDetailsTmp = {
        orders: [],
        preparing: false,
        delivering: false,
        received: false,
        address: '',
        postal_code: '',
        contact_number: '',
        email: '',
    }
    const [orderDetails, setOrderDetails] = useState(orderDetailsTmp)

    const getOrder = async() => {
        if (id === undefined) {
            return
        }

        try {
            const response = await fetch(`https://blaukc-pizza-mart.herokuapp.com/api/order/${id}/`, {
                method: "GET"
            })
            const parseRes = await response.json()

            if (!response.ok) {
                router.push('/order?redirect=invalidOrder')
            }

            setOrderDetails(parseRes)

        } catch (error) {
            router.push('/order?redirect=invalidOrder')
        }
    }

    useEffect(() => {
        getOrder()
    }, [id])

    return (
        <div id="other-container">
            <Head>
                <title>Pizza Mart</title>
            </Head>
            <Header />
            <Container className="h-75">
                <Row className="align-items-center h-100">
                    <Col>
                        <Row className="justify-content-center">
                            <Col xs="12" md="8">
                                <ListGroup>
                                        <ListGroup.Item>
                                            <h3 className="text-center text-shadow-light">Order ID: {id}</h3>
                                        </ListGroup.Item>
                                    {orderDetails.orders.map((item: ItemDetails) => (
                                        <ListGroup.Item key={`${item.pizza} ${item.size}`}>
                                            <Row>
                                                <Col xs="8" md="8">{`${item.pizza} (${item.size} inch)`}</Col>
                                                <Col xs="2" md="2" className="text-center">
                                                    {item.quantity}
                                                </Col>
                                                <Col xs="2" md="2" className="text-center">
                                                    {(Number(item.price) * item.quantity * Number(item.size) / 12).toFixed(2)}
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    ))}
                                        <ListGroup.Item>
                                            <Row>
                                                <Col xs="8" md="8">Total</Col>
                                                <Col xs="2" md="2">
                                                    <Row className="text-center">
                                                        <Col>
                                                            {/*sum of pizzas using map then reduce*/}
                                                            {(orderDetails.orders.map((item: ItemDetails) => item.quantity)).reduce((prev: number, current: number) => prev + current, 0)}
                                                        </Col>
                                                    </Row>
                                                </Col>
                                                <Col xs="2" md="2" className="text-center">
                                                    {/*sum of price using map then reduce*/}
                                                    {((orderDetails.orders.map((item: ItemDetails) => Number(item.price) * item.quantity * Number(item.size) / 12)).reduce((prev: number, current: number) => prev + current, 0)).toFixed(2)}
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <ProgressBar variant="success" animated={true} className="mt-3"
                                                now={orderDetails.received ? 100 :
                                                        orderDetails.delivering ? 75 :
                                                            orderDetails.preparing ? 50 : 25}/>
                                            <h4 className="text-center mt-3 text-shadow-light">
                                                {orderDetails.received ? "Order Delivered" :
                                                    orderDetails.delivering ? `Delivering to: ${orderDetails.address} ${orderDetails.postal_code}` :
                                                        orderDetails.preparing ? "Preparing Your Order" : "We've received your Order"}
                                            </h4>
                                        </ListGroup.Item>
                            </ListGroup>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Home
