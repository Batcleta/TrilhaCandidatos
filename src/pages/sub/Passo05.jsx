// Dependencias
import React, { Fragment } from "react";
import { Link } from 'react-router-dom'
import { useForm } from "react-hook-form";

// componentes
// import GravadorAudio from '../../components/functionals/GravadorAudio'

const MotivoDaCandidat = props => {

    const { register, handleSubmit, errors } = useForm();

    // const gravaData = {}
    // const getGravacao = blob => {
    //     gravaData.gravacao = blob
    // }
    const vagas = JSON.parse(localStorage.getItem('vagaEscolhida'))

    const onSubmit = async data => {
        const formData = {
            ...data
            // ...gravaData
        }
        await localStorage.setItem('motivoDaCandidat', JSON.stringify(formData));
        props.history.push('/cadastro/passo06');
    }

    return (
        <Fragment>
            {/* <div className="gravador">
                <GravadorAudio enviando={getGravacao} />
            </div> */}

            <div>
                <h4 className="sub-title">Vaga escolhida </h4>
                <p>{vagas.nomeVaga}</p>
            </div>

            < form className="cadastro" onSubmit={handleSubmit(onSubmit)} >
                <h3 className="sub-title"> Qual a sua pretenção salarial? </h3>

                {/* Grau completo fundamental- grauFundamentalCompleto */}
                < div className="form-group">
                    <input type="text" placeholder="Digite aqui quanto espera receber"
                        name='pretencaoSalarial' ref={register({ required: true })} />
                    <small>{errors.pretencaoSalarial && "Informe uma série"}</small>
                </div>

                < div className="form-group">
                    <label>Informe em poucas palavras, por que deseja trabalhar conosco</label>
                    <textarea placeholder="Digite aqui"
                        name='motivoDaVaga' ref={register({ required: true })} />
                    <small>{errors.motivoDaVaga && "Informe um motivo"}</small>
                </div>

                <div className="button-group">
                    <Link to="/" className="btn btn-prev">Cancelar</Link>
                    <button type="submit" className="btn btn-next">Proximo</button>
                </div>

            </form>

        </Fragment>
    )

}

export default MotivoDaCandidat