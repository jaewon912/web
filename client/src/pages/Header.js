import React from 'react';
import { Link } from "react-router-dom";
import { Navbar, Nav, Container, NavDropdown, Form, FormControl, Button} from "react-bootstrap";

function Header(props) {
    return (
        <>
        <div className='header-right'>
            <ul>
                <li><a href="#">로그인</a></li>
                <li><a href="#">회원가입</a></li>
                <li><a href="#">마이페이지</a></li>
            </ul>
        </div>
        <div className='hearder-logo'>
            <a href="/" style={{textDecoration:"none", color:"rgb(80, 188, 223"}}>에 시 케 어</a>
                <div className="header-desc">
                    <p>ACCIDENT CARE ONLINE COMMUNITY</p>
                </div>
        </div>
        <div id="Header" style={{ backgroundColor: 'rgb(240,240,240)'}}>
            <Navbar variant='light'>
                <Container fluid>
                    <Navbar.Brand className="Header-home" href="/">Home</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="me-auto my-2 my-lg-0"
                            style={{ maxHeight: '100px'}}
                            navbarScroll
                        >
                            <Nav.Link href="#">공지사항</Nav.Link>
                            <Nav.Link href="#">베스트 게시판</Nav.Link>
                            <Nav.Link href="#">자유 게시판</Nav.Link>
                            
                            <NavDropdown className='Header-drop' title="사고게시판" id="navbarScrollingDropdown">
                                <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                                <NavDropdown.Item href="#action4">Another action</NavDropdown.Item>
                                <NavDropdown.Item href="#action4">Another action</NavDropdown.Item>
                                <NavDropdown.Item href="#action4">Another action</NavDropdown.Item>
                                <NavDropdown.Item href="#action4">Another action</NavDropdown.Item>
                                <NavDropdown.Item href="#action4">Another action</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action5">
                                    기타
                                </NavDropdown.Item>
                            </NavDropdown>
                            <Nav.Link href="#">질문&답변 게시판</Nav.Link>
                            <Nav.Link href="#" disabled>
                                Link
                            </Nav.Link>
                        </Nav>
                        <Form className="d-flex">
                            <FormControl
                                type="search"
                                placeholder="Search"
                                className="me-2"
                                aria-label="Search"
                            />
                            <Button variant="outline-success">Search</Button>
                        </Form>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
        </>
    );
};

export default Header;