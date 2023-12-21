import {Nav, NavItem, Navbar, NavbarBrand, NavLink } from "reactstrap"
import logo from "../../logo/logo.png"
import "./Navigation.css"

export const Navigation = () => {
    return (
    <div className="nav-container">
        <Navbar color="none" dark expand="sm">
            <Nav navbar vertical>
                <NavbarBrand href="/">
                    <img style={{width:125, border:"solid", borderColor:"white"}} id="nav-logo" src={logo} alt="logo"/>
                </NavbarBrand>
                <NavItem>
                    <NavLink href="/customers">
                        <h5 style={{margin:0}}>Customers</h5>
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="/stylists">
                        <h5 style={{margin:0}}>Stylists</h5>
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="/appointments">
                        <h5 style={{margin:0}}>Appointments</h5>
                    </NavLink>
                </NavItem>
            </Nav>
        </Navbar>
    </div>
    )
}