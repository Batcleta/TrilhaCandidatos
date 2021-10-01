import '../style/Main.css'
import React from 'react'

const Conteudo = props => {
    return (
        <main className="conteudo">
            <div className="container">
                {props.children}
            </div>
        </main>
    )
}

export default Conteudo