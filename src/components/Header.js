import React from 'react'
import { Navbar, NavbarBrand } from 'reactstrap'

function Header() {
    return (
        <div>
            <Navbar dark color="dark">
                <NavbarBrand href="/">BetterSplit</NavbarBrand>
            </Navbar>
        </div>
    )
}

export default Header
