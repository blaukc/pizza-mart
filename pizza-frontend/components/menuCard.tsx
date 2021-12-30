import {Card, Button, Row, Col, Form} from 'react-bootstrap'
import { useState } from 'react'

import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { addToCart } from '../redux/cartSlice'

interface Pizza {
    id: number
    pizza_name: string
    price: string
    description: string
    image: string
    inStock: boolean
    category: string
    allergyTags: string
}

const MenuCard = ({pizza}: {pizza: Pizza}) => {

    const [size, setSize] = useState('12')

    const dispatch = useAppDispatch()
    const cart = useAppSelector((state) => state.cart)
    const { orders } = cart

    const addToCartHandler = () => {
        if (pizza.inStock) {
            const item = {
                pizza: pizza,
                size: size
            }
            dispatch(addToCart(item));

            // //make copy of orders state
            // const ordersCopy = JSON.parse(JSON.stringify(orders))
            // //get list of items
            // for (let i=0; i<ordersCopy.length; i++) {
            //     if (ordersCopy[i].item.pizza.id === pizza.id && ordersCopy[i].item.size === size) {
            //         ordersCopy[i].quantity += 1
            //         localStorage.setItem('orders', JSON.stringify(ordersCopy))
            //         console.log(ordersCopy)
            //         return
            //     }
            // }
            // ordersCopy.push({
            //     item: item,
            //     quantity: 1
            // });
            // localStorage.setItem('orders', JSON.stringify(ordersCopy))
        } else {
            alert('pizza not in stock u ho')
        }
    }

    return (
        <Card style={{ width: '20rem', height: '35rem' }} className={pizza.inStock ? "mb-5 mx-5 bg-primary text-white" : "mb-5 mx-5 bg-dark text-white"}>
            <Card.Img variant="top" src={`https://blaukc-pizza-mart.herokuapp.com${pizza.image}`}/>
            <Card.Body className="w-100">
                <Card.Title>{pizza.pizza_name}</Card.Title>
                {pizza.allergyTags}
                <div className="d-flex justify-content-between flex-column" style={{height: "80%"}}>
                    <Row className="flex-grow-1">
                        <Card.Text>
                            {pizza.description}
                        </Card.Text>
                    </Row>
                    <Row className="align-items-center">
                        <Col xs="4">
                        <Card.Text>
                            ${(Number(pizza.price) * Number(size) / 12).toFixed(2)}
                        </Card.Text>
                        </Col>
                        <Col xs="8">
                        <Form.Select
                            value={size}
                            onChange={(e) => setSize(e.target.value)}
                            disabled={!pizza.inStock}
                        >
                            <option value="12">{'12"'}</option>
                            <option value="14">{'14"'}</option>
                            <option value="16">{'16"'}</option>
                        </Form.Select>
                        </Col>
                    </Row>
                    <Row className="align-self-center mt-3">
                        <Button
                            variant="outline-light"
                            disabled={!pizza.inStock}
                            onClick={() => addToCartHandler()}
                        >
                            {pizza.inStock ? "Add to Cart" : "Out of Stock"}
                        </Button>
                    </Row>
                </div>
            </Card.Body>
        </Card>
    )
}

export default MenuCard
