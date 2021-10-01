import React, { Fragment } from "react"
import { Link } from 'react-router-dom'
import { useForm } from "react-hook-form";

const ContadoCandidato = props => {

    const { register, handleSubmit, errors, watch } = useForm();
    const watchTelFixo = watch('possuiTelFixo', false)
    const watchLinkedin = watch('possuiLinkedin', false)
    const watchFacebook = watch('possuiFacebook', false)
    const watchInstagram = watch('possuiInstagram', false)
    const watchTwitter = watch('possuiTwitter', false)

    const onSubmit = async data => {
        const formData = {
            ...data
        }
        await localStorage.setItem('contato', JSON.stringify(formData));
        props.history.push('/cadastro/passo07');
    }

    return (

        // {/* "handleSubmit" will validate your inputs before invoking "onSubmit" */ }

        <Fragment>
            <h2 className="main-title" >Estamos quase lá</h2>
            <h3 className="sub-title">Informe seus contatos </h3>

            < form className="cadastro" onSubmit={handleSubmit(onSubmit)}>

                {/* Pretenção salarial- candCelular */}
                < div className="form-group">
                    <label htmlFor="">Informe um telefone celular</label>
                    <input type="tel" placeholder="Digite aqui um número celular"
                        name='candCelular' ref={register({ required: true })} />
                    <small>{errors.candCelular && "Informe um número válido"}</small>
                </div>

                {/* Numero é whatsapp ? - isWhatsapp */}
                <div className="form-group check">
                    <label htmlFor=""> O numero acima é whatsapp? </label>
                    <input type="checkbox" name="isWhatsapp" ref={register()} />
                </div>

                {/* Endereço de email- candEmail */}
                < div className="form-group">
                    <label htmlFor="">Informe seu e-mail</label>
                    <input type="email" placeholder="Digite aqui seu E-Mail"
                        name='candEmail' ref={register({ required: true })} />
                    <small>{errors.candEmail && "Informe umemail válido"}</small>
                </div>

                {/* Possui Fixo? - possuiTelFixo */}
                <div className="form-group check">
                    <label htmlFor=""> Possui telefone fixo?</label>
                    <input type="checkbox" name="possuiTelFixo" ref={register()} />
                </div>

                {
                    watchTelFixo ?

                        /* Número do telefone fixo- telefoneFixo */
                        < div className="form-group">
                            <input type="tel" placeholder="Digite aqui seu número de telefone fixo"
                                name='telefoneFixo' ref={register({ required: true })} />
                            <small>{errors.telefoneFixo && "Informe um telefone válido"}</small>
                        </div>
                        : ''
                }


                <h3 className="sub-xtitle mainC">Redes Sociais</h3>

                {/* Possui Linekdin ? - possuiLinkedin */}
                <div className="form-group check">
                    <label htmlFor=""> Possui Linkedin?</label>
                    <input type="checkbox" name="possuiLinkedin" ref={register()} />
                </div>

                {
                    watchLinkedin ?

                        /* Endereço do Linkedin- candLinkedin */
                        < div className="form-group">
                            <input type="text" placeholder="Digite aqui seu endereço Linkedin"
                                name='candLinkedin' ref={register({ required: true })} />
                        </div>
                        : ''
                }


                {/* Possui Facebook ? - possuiFacebook */}
                <div className="form-group check">
                    <label htmlFor=""> Possui Facebook?</label>
                    <input type="checkbox" name="possuiFacebook" ref={register()} />
                </div>

                {
                    watchFacebook ?

                        /* Endereço do facebook- candFacebook */
                        < div className="form-group">
                            <input type="text" placeholder="Digite aqui seu endereço do Facebook"
                                name='candFacebook' ref={register({ required: true })} />
                        </div>
                        : ''
                }

                {/* Possui instagram ? - possuiInstagram */}
                <div className="form-group check">
                    <label htmlFor=""> Possui Instagram?</label>
                    <input type="checkbox" name="possuiInstagram" ref={register()} />
                </div>

                {
                    watchInstagram ?

                        /* Endereço do instagram- candInstagram */
                        < div className="form-group">
                            <input type="text" placeholder="Digite aqui seu endereço do Instagram"
                                name='candInstagram' ref={register({ required: true })} />
                        </div>
                        : ''
                }


                {/* Possui Twitter - possuiTwitter */}
                <div className="form-group check">
                    <label htmlFor=""> Possui Twitter?</label>
                    <input type="checkbox" name="possuiTwitter" ref={register()} />
                </div>

                {
                    watchTwitter ?

                        /* Endereço do twitter - candTwitter */
                        < div className="form-group">
                            <input type="text" placeholder="Digite aqui seu endereço do Twitter"
                                name='candTwitter' ref={register({ required: true })} />
                        </div>
                        : ''
                }
                <div className="button-group">
                    <Link to="/" className="btn btn-prev">Cancelar</Link>
                    <button type="submit" className="btn btn-next">Proximo</button>
                </div>


            </form>



        </Fragment >
    );
}


export default ContadoCandidato