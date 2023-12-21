import {Nav, NavItem, Navbar, NavbarBrand, NavLink } from "reactstrap"
import logo from "../../logo/logo.png"

export const Navigation = () => {
    return (
        <Navbar color="black" dark expand="sm">
            <Nav navbar style={{alignItems:"center"}}>
                <NavbarBrand href="/">
                    <img style={{width:125, border:"solid", borderColor:"white"}} id="nav-logo" src={logo} alt="logo"/>
                </NavbarBrand>
                <NavItem style={{marginLeft:20}}>
                    <NavLink href="/customers"><h5>Customers</h5></NavLink>
                </NavItem>
                <NavItem style={{marginLeft:30}}>
                    <NavLink href="/stylists"><h5>Stylists</h5></NavLink>
                </NavItem>
                <NavItem style={{marginLeft:30}}>
                    <NavLink href="/appointments"><h5>Appointments</h5></NavLink>
                </NavItem>
            </Nav>
        </Navbar>
    )
}