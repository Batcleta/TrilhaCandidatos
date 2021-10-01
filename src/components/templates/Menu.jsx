import React from 'react'

const Menu = props => {
    return (
        <header className="menu-area">
            <>
                {props.children}
            </>
        </header>
    )
}

export default Menu