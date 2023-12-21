import {Nav, NavItem, Navbar, NavbarBrand, NavLink } from "reactstrap"
import logo from "../../logo/logo.png"

export const Navigation = () => {
    return (
        <Navbar color="black" dark expand="sm" style={{alignItems:"center", padding:2, margin:0}}>
            <Nav navbar style={{alignItems:"center", padding:0, margin:0}}>
                <NavbarBrand href="/">
                    <img style={{width:125, border:"solid", borderColor:"white"}} id="nav-logo" src={logo} alt="logo"/>
                </NavbarBrand>
                <NavItem style={{marginLeft:20}}>
                    <NavLink href="/customers">
                        <h5 style={{margin:0}}>Customers</h5>
                    </NavLink>
                </NavItem>
                <NavItem style={{marginLeft:30}}>
                    <NavLink href="/stylists">
                        <h5 style={{margin:0}}>Stylists</h5>
                    </NavLink>
                </NavItem>
                <NavItem style={{marginLeft:30}}>
                    <NavLink href="/appointments">
                        <h5 style={{margin:0}}>Appointments</h5>
                    </NavLink>
                </NavItem>
            </Nav>
        </Navbar>
    )
}