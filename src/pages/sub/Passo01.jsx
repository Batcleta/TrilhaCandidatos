import React, { Fragment } from "react";
import { Link } from 'react-router-dom'
import { useForm } from "react-hook-form";

const CadastroEtapa1 = props => {

    const { register, handleSubmit, errors, watch } = useForm();

    const watchIndicacao = watch('comoSoube')

    const onSubmit = async data => {
        const formData = { ...data }

        await localStorage.setItem('comoSoube', JSON.stringify(formData));

        props.history.push('/cadastro/passo02');
    }

    return (
        // {/* "handleSubmit" will validate your inputs before invoking "onSubmit" */ }
        <Fragment>

            <h2 className="main-title" >Antes de começarmos</h2>
            <h3 className="sub-title">Gostaríamos de saber:</h3>

            < form className="cadastro" onSubmit={handleSubmit(onSubmit)} >


                <div className="form-group">
                    <label htmlFor=""> Como soube sobre a vaga? </label>
                    <select
                        type="text" placeholder="Escolha uma opção"
                        name="comoSoube" ref={register({ required: true })}>

                        <option value="">Escolha uma opção</option>
                        <option value="Indicação de funcionário">Indicação de funcionário</option>
                        <option value="Indicação de amigos">Indicação de amigos</option>
                        <option value="Whatsapp">Whatsapp</option>
                        <option value="Internets">Internet</option>
                        <option value="outros">Outros</option>

                    </select>
                    <small>{errors.comoSoube && "Escolha uma opção válida"}</small>
                </div>

                {watchIndicacao === 'Indicação de funcionário' ? (

                    <div className="form-group">
                        <label htmlFor="">Qual o nome do funionário?</label>
                        <input
                            type="text"
                            placeholder="Digite aqui o nome do funcionário"
                            name="nomeFuncionario"
                            ref={register({ required: true })} />
                        <small>{errors.nomeFuncionario && "Informe o nome do funcionário "}</small>
                    </div>
                ) : ''}

                <div className="button-group">
                    <Link to="/" className="btn btn-prev">Cancelar</Link>
                    <button type="submit" className="btn btn-next">Proximo</button>
                </div>

            </form >
        </Fragment>
    );
}


export default CadastroEtapa1