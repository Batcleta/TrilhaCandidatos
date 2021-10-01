import React from 'react'

const Conteudo = props => {

    const redirect = _ => {
        setTimeout(() => {
            window.location = 'http://www.trilhatecnologia.com'
        }, 15000)
    }

    redirect()

    return (

        <div className="greetings">
            <h2 className="main-title">Obrigado por escolher trabalhar conosco</h2>
            <p>Em poucos dias, analisaremos o seu cadastro e entraremos em contato para maiores detalhes</p>
        </div>
    )
}

export default Conteudo