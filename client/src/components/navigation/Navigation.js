import {Nav, NavItem, Navbar, NavbarBrand, NavLink } from "reactstrap"
import logo from "../../logo/logo.png"
import "./Navigation.css"

export const Navigation = () => {
    return (
    <div className="nav-container">
        <Navbar color="none" dark expand="sm">
            <Nav navbar vertical>
                <NavbarBrand href="/">
                    <img style={{width:180, border:"solid", borderColor:"white"}} id="nav-logo" src={logo} alt="logo"/>
                </NavbarBrand>
                <NavItem>
                    <NavLink href="/customers">
                        <h4 style={{marginTop:10}}>Customers</h4>
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="/stylists">
                        <h4 style={{marginTop:10}}>Stylists</h4>
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="/appointments">
                        <h4 style={{marginTop:10}}>Appointments</h4>
                    </NavLink>
                </NavItem>
            </Nav>
        </Navbar>
    </div>
    )
}