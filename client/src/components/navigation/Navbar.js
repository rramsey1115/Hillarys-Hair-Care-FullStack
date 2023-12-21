import { NavLink } from "react-router-dom"
import {NavItem, Navbar, NavbarBrand} from "reactstrap"

export const Nav = () => {
    return (
    <Navbar color="light" expand="sm">
        <Nav navbar>
            <NavbarBrand href="/home">Hillarys</NavbarBrand>
            <NavItem>
                <NavLink href="/stylists">Stylists</NavLink>
            </NavItem>
            <NavItem>
                <NavLink href="/customers">Customers</NavLink>
            </NavItem>
            <NavItem>
                <NavLink href="/appointments">Appointments</NavLink>
            </NavItem>
        </Nav>
    </Navbar>
    )
}