import React from 'react'
import { Link } from 'react-router-dom'

const MenuItem = props => {
    return (
        <div className="nav-item">
            <Link to={props.link}>{props.nameLink}</Link>
        </div>
    )
}

export default MenuItem