import { Navbar, Nav, Container } from 'react-bootstrap'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

import { useAppSelector, useAppDispatch } from '../redux/hooks'
import { setCart } from '../redux/cartSlice'

const Header = () => {

    const router = useRouter()

    const cart = useAppSelector((state) => state.cart)
    const { numItems } = cart

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(setCart(localStorage.getItem('orders') ? JSON.parse(localStorage.getItem('orders') || '') : []))
    }, [dispatch])

    return (
        <Navbar bg="primary" className="navbar-dark" expand="lg">
            <Container>
                <Link href="/">
                    <a>
                        <Navbar.Brand>
                            <Image
                                alt=""
                                src="/images/logo.png"
                                width="20"
                                height="20"
                                className="d-inline-block align-top"
                            />
                            {' '}Pizza Mart
                        </Navbar.Brand>
                    </a>
                </Link>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Link href="/menu" passHref>
                            <Nav.Link className="mx-1" active={router.pathname === "/menu"}>
                                <Image
                                    alt=""
                                    src="/images/menu.png"
                                    width="20"
                                    height="20"
                                    className="d-inline-block align-top"
                                />
                                <span className="mx-1">Menu</span>
                            </Nav.Link>
                        </Link>
                        <Link href="/cart" passHref>
                            <Nav.Link className="mx-1" active={router.pathname === "/cart"}>
                                <Image
                                    alt=""
                                    src="/images/cart.png"
                                    width="20"
                                    height="20"
                                    className="d-inline-block align-top"
                                />
                                <span className="mx-1">{numItems > 0 ? `Cart(${numItems})` : 'cart'}</span>
                            </Nav.Link>
                        </Link>
                        <Link href="/order" passHref>
                            <Nav.Link className="mx-1" active={router.pathname.split('/')[1] === "order"}>
                                <Image
                                    alt=""
                                    src="/images/trackorder.png"
                                    width="20"
                                    height="20"
                                    className="d-inline-block align-top"
                                />
                                <span className="mx-1">Track Order</span>
                            </Nav.Link>
                        </Link>
                        {/*<NavDropdown title="Dropdown" id="basic-nav-dropdown">
                        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                        </NavDropdown>*/}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Header
