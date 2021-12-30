import type { NextPage } from 'next'
import { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Container, Row, Col, Button, Form, FloatingLabel, Alert } from 'react-bootstrap'

import Header from '../../components/header'

const Home: NextPage = () => {

    const [orderID, setOrderID] = useState('')

    const router = useRouter()


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
                            <Col xs="10" md="8">
                                { router.query.redirect === 'invalidOrder' &&
                                    <Alert variant="danger">
                                        Order not found!
                                    </Alert>
                                }

                                <Form>
                                    <FloatingLabel label="Order ID" className="mb-3">
                                    <Form.Control type="text" value={orderID} onChange={(e) => setOrderID(e.target.value)} />
                                    </FloatingLabel>

                                    <Row className="justify-content-center mt-4">
                                        <Col xs="auto">
                                            <Link href={`/order/${orderID}`} passHref>
                                                <Button>Track Order</Button>
                                            </Link>
                                        </Col>
                                    </Row>
                                </Form>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Home
