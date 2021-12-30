import type { NextPage } from 'next'
import Head from 'next/head'
import {Container, Row} from 'react-bootstrap'
import { useState, useEffect } from 'react'

import Header from '../components/header'
import MenuCard from '../components/menuCard'

import { Pizza } from '../types/orders'

const Menu: NextPage = () => {

    const [pizzas, setPizzas] = useState([])

    const getPizzas = async(): Promise<object | unknown> => {
        try{
            const response = await fetch("https://blaukc-pizza-mart.herokuapp.com/api/pizza", {
                method: 'GET'
            });
            const data = await response.json();
            setPizzas(data)
            console.log(data)
            return data
        } catch (error: unknown) {
            if (error instanceof Error) {
                return error
            }
        }
    }

    useEffect(() => {
        getPizzas()
    }, [])

    return (
        <div>
            <Head>
                <title>Menu</title>
            </Head>
            <Header />
            <Container>
                <Row className="my-3">
                    <h1 className="text-center text-shadow-light">Classics</h1>
                </Row>
                <Row className="justify-content-around">
                    {pizzas.filter((pizza: Pizza) => pizza.category === 'Classic').map((pizza: Pizza) => (
                        <MenuCard pizza={pizza} key={pizza.id}/>
                    ))}
                </Row>
            </Container>
            <Container>
                <Row className="my-3">
                    <h1 className="text-center text-shadow-light">Premium</h1>
                </Row>
                <Row className="justify-content-around">
                    {pizzas.filter((pizza: Pizza) => pizza.category === 'Premium').map((pizza: Pizza) => (
                        <MenuCard pizza={pizza} key={pizza.id}/>
                    ))
                    }
                </Row>
            </Container>
        </div>
    )
}

export default Menu
