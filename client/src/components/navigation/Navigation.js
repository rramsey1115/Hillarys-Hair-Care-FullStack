import {Nav, NavItem, Navbar, NavbarBrand, NavLink, Button, Offcanvas, OffcanvasHeader, OffcanvasBody} from "reactstrap"

export const Navigation = () => {
    return (
        <Navbar color="black" dark expand="sm">
            <Nav navbar>
                <NavbarBrand href="/">💈👱🏻‍♀️ Hillary's 💇🏻🪮 </NavbarBrand>
                <NavItem>
                    <NavLink href="/customers">Customers</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="/stylists">Stylists</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="/appointments">Appointments</NavLink>
                </NavItem>
            </Nav>
        </Navbar>
    )
}