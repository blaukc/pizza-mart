import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { Container, Row, Col, Button } from 'react-bootstrap'

import Header from '../components/header'

const Home: NextPage = () => {

    return (
        <div id="home-container">
            <Head>
                <title>Pizza Mart</title>
            </Head>
            <Header />
            <Container className="h-75">
                <Row className="align-items-center h-100">
                    <Col>
                        <Row className="justify-content-center">
                            <Col xs="10" md="8">
                                <h1 className="text-light text-center display-4 text-shadow-dark">Pizza Mart</h1>
                                <h3 className="text-light text-center mt-3 text-shadow-dark">We serve only the best pizza in Singapore. <br /> We dont serve bad pizza. <br />No Hawaiian.</h3>

                                <Row className="justify-content-center mt-4">
                                    <Col xs="auto">
                                        <Link href="/menu" passHref>
                                            <Button variant="outline-light">Order Now</Button>
                                        </Link>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Home
