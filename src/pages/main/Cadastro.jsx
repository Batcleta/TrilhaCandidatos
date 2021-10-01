import React from 'react'
import '../style/Cadastro.scss'

import Main from '../../components/templates/Main'

// sub

const Cadastro = props => {
    return (
        <Main>
            {props.children}
        </Main>
    )
}

export default Cadastro