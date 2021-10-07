import React, { Fragment, useEffect, useState } from "react";
import InputMask from "react-input-mask";
import { Link } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import axios from "axios";

const CadastroEtapa1 = (props) => {
  const { register, handleSubmit, errors, setValue, watch, control } =
    useForm();

  const watchJackson = watch("possuiFilhos");
  const watchCnh = watch("possuiCnh");

  const [getCep, setGetCep] = useState("");

  // Requisição de cep

  const getCepAtBlur = (getCep) => {
    if ([...getCep.split("")].length === 8) {
      setGetCep(getCep);
    }
  };

  const getCepAtChange = (getCep) => {
    if ([...getCep.split("")].length === 8) {
      setGetCep(getCep);
    }
  };

  const calcAge = (dateString) => {
    var birthday = +new Date(dateString);
    return ~~((Date.now() - birthday) / 31557600000);
  };

  useEffect(() => {
    const teste = getCep
      ? axios.get(`https://viacep.com.br/ws/${getCep}/json/`).then((resp) => {
          const data = resp.data;

          setValue("logradouroCandidato", data.logradouro);
          setValue("bairroCandidato", data.bairro);
          setValue("municipioCandidato", data.localidade);
          setValue("ufCandidato", data.uf);
        })
      : "";

    return teste;
  }, [getCep]);

  const onSubmit = async (data) => {
    const formData = {
      ...data,
      idadeCandidato: calcAge(data.dataNascimento),
    };

    await sessionStorage.setItem("dadosPessoais", JSON.stringify(formData));
    props.history.push("/cadastro/passo03");
  };

  return (
    // {/* "handleSubmit" will validate your inputs before invoking "onSubmit" */ }
    <Fragment>
      <h2 className="main-title">Conte mais sobre você</h2>
      <h3 className="sub-title">Dados Principais </h3>

      <form className="cadastro" onSubmit={handleSubmit(onSubmit)}>
        {/* nome - nomeCandidato */}
        <div className="form-group">
          <label htmlFor="">Primeiro Nome</label>
          <input
            type="text"
            placeholder="Informe seu nome"
            name="nomeCandidato"
            ref={register({
              required: true,
            })}
          />
          <small>{errors.nomeCandidato && "Informe um nome válido "}</small>
        </div>
        {/* nome - nomeCandidato */}
        <div className="form-group">
          <label htmlFor="">Sobrenome</label>
          <input
            type="text"
            placeholder="Informe seu sobrenome"
            name="sobrenomeCandidato"
            ref={register({
              required: true,
            })}
          />
          <small>
            {errors.sobrenomeCandidato && "Informe um sobrenome válido "}
          </small>
        </div>

        {/* nascimento - dataNascimento */}
        <div className="form-group">
          <label htmlFor="">Data de nascimento</label>
          <input
            type="date"
            placeholder="Informe seu nome"
            name="dataNascimento"
            ref={register({
              required: true,
            })}
          />
          <small>{errors.dataNascimento && "Escolha uma data"}</small>
        </div>

        {/* sexo - sexoCandidato */}
        <div className="form-group">
          <label htmlFor="">Sexo</label>
          <select
            type="text"
            placeholder="Escolha uma opção"
            name="sexoCandidato"
            ref={register({ required: true })}
          >
            <option value="">Escolha uma opção</option>
            <option value="Masculino">Masculino</option>
            <option value="Feminino">Feminino</option>
            <option value="Outro">Outro</option>
            <option value="Prefiro nao declarar">Prefiro nao declarar</option>
          </select>
          <small>{errors.sexoCandidato && "Escolha uma opção válida"}</small>
        </div>

        {/* cpf - cpfCandidato */}
        <div className="form-group">
          <label htmlFor="">CPF</label>
          <input
            type="text"
            placeholder="Informe seu CPF"
            name="cpfCandidato"
            ref={register({
              required: true,
              validate: {
                cpfCheck: (strCPF) => {
                  var Soma;
                  var Resto;
                  Soma = 0;
                  if (strCPF == "00000000000") return false;

                  for (let i = 1; i <= 9; i++)
                    Soma =
                      Soma + parseInt(strCPF.substring(i - 1, i)) * (11 - i);
                  Resto = (Soma * 10) % 11;

                  if (Resto == 10 || Resto == 11) Resto = 0;
                  if (Resto != parseInt(strCPF.substring(9, 10))) return false;

                  Soma = 0;
                  for (let i = 1; i <= 10; i++)
                    Soma =
                      Soma + parseInt(strCPF.substring(i - 1, i)) * (12 - i);
                  Resto = (Soma * 10) % 11;

                  if (Resto == 10 || Resto == 11) Resto = 0;
                  if (Resto != parseInt(strCPF.substring(10, 11))) return false;
                  return true;
                },
                // hasCpf: async cpf => {

                //     const resp = await axios.get(`http://localhost:8081/candidato/${cpf}`)

                //     if (resp.data.length !== 0) {
                //         return false
                //     }

                // }
              },
            })}
          />
          <small>
            {errors.cpfCandidato?.type === "cpfCheck" &&
              "Informe um cpf válido "}
          </small>
          {/* <small>{errors.cpfCandidato?.type === "hasCpf" && "Este Cpf ja foi cadastrado"}</small> */}
        </div>

        {/* naturalidade - naturaCandidato */}
        <div className="form-group">
          <label htmlFor="">Naturalidade</label>
          <input
            type="text"
            placeholder="Estado / Cidade em que nasceu"
            name="naturaCandidato"
            ref={register({
              required: true,
            })}
          />
          <small>{errors.naturaCandidato && "Informe uma naturalidade "}</small>
        </div>

        <h3 className="sub-title">Dados Complementares </h3>

        {/* estadoCivil - estadoCivil */}
        <div className="form-group">
          <label htmlFor="">Estado civil</label>
          <select
            type="text"
            placeholder="Digite aqui seu estdo civil"
            name="estadoCivil"
            ref={register({
              required: true,
            })}
          >
            <option value="">Escolha uma opção</option>
            <option value="Solteiro">Solteiro</option>
            <option value="Casado">Casado</option>
            <option value="Viúvo">Viúvo</option>
            <option value="Divorciado">Divorciado</option>
            <option value="Separado judicialmente">
              Separado judicialmente
            </option>
          </select>
          <small>{errors.estadoCivil && "Informe um estado civil"}</small>
        </div>

        {/* religião - religiaoCandidato */}
        <div className="form-group">
          <label htmlFor="">Possui Religião? (opcional)</label>
          <input
            type="text"
            placeholder="Digite aqui sua religião"
            name="religiaoCandidato"
            ref={register()}
          />
        </div>

        {/* fumante - fumante */}
        <div className="form-group check">
          <label htmlFor=""> É fumante? </label>
          <input type="checkbox" name="fumante" ref={register()} />
        </div>

        {/* Possui filhos - possuiFilhos */}
        <div className="form-group check">
          <label htmlFor=""> Possui Filhos? </label>
          <input type="checkbox" name="possuiFilhos" ref={register()} />
        </div>

        {watchJackson === true ? (
          <Fragment>
            {/* quants filhos - quantosFilhos */}
            <div className="form-group">
              <label htmlFor="">Quantos Possui?</label>
              <select
                type="text"
                placeholder="Escolha uma opção"
                name="quantosFilhos"
                ref={register({ required: true })}
              >
                <option value="">Escolha uma opção</option>
                <option value="1 Filho">1 Filho</option>
                <option value="2 Filhos">2 Filhos</option>
                <option value="3 Filhos">3 Filhos</option>
                <option value="4 ou mais filhos">4 ou mais filhos</option>
              </select>
              <small>
                {errors.quantosFilhos && "Escolha uma opção válida"}
              </small>
            </div>

            {/* idade filhos - idadeDosFilhos */}
            <div className="form-group">
              <label htmlFor="">Idade do(s) filho(s)</label>
              <select
                type="text"
                placeholder="Escolha uma opção"
                name="idadeDosFilhos"
                ref={register({ required: true })}
              >
                <option value="">Escolha uma opção</option>
                <option value="0 a 1">0 a 1 ano</option>
                <option value="1 a 5">1 a 5 anos</option>
                <option value="5 a 10">5 a 10 anos</option>
                <option value="Outro">Outro</option>
                <option value="Mais de 10 anos">Mais de 10 anos</option>
              </select>
              <small>
                {errors.idadeDosFilhos && "Escolha uma opção válida"}
              </small>
            </div>

            {/* cuidador - possuiCuidador */}
            <div className="form-group check">
              <label htmlFor=""> Tem com quem deixar? </label>
              <input type="checkbox" name="possuiCuidador" ref={register()} />
            </div>
          </Fragment>
        ) : (
          ""
        )}

        <h3 className="sub-title">Dados Complementares 2 </h3>

        {/* pis - possuiPis */}
        <div className="form-group check">
          <label htmlFor=""> Possui Pis? </label>
          <input type="checkbox" name="possuiPis" ref={register()} />
        </div>

        {/* titulo de eleitor - possuiTitulo */}
        <div className="form-group check">
          <label htmlFor=""> Possui Título de Eleitor? </label>
          <input type="checkbox" name="possuiTitulo" ref={register()} />
        </div>

        {/* dispensa militr - possuiDispensa */}
        <div className="form-group check">
          <label htmlFor=""> Possui dispensa militar?</label>
          <input type="checkbox" name="possuiDispensa" ref={register()} />
        </div>

        {/* cnh - possuiCnh */}
        <div className="form-group check">
          <label htmlFor=""> Possui Carteira de Habilitação? </label>
          <input type="checkbox" name="possuiCnh" ref={register()} />
        </div>
        {watchCnh === true ? (
          <Fragment>
            {/* categoria cnh - categoriaCnh */}
            <div className="form-group bidade">
              <label htmlFor="">Categoria</label>
              <input
                type="text"
                placeholder="A,B,C"
                name="categoriaCnh"
                ref={register({ required: true })}
              />
              <small>{errors.categoriaCnh && "Informe uma categoria"}</small>
            </div>

            {/* validade cnh - validadeCnh */}
            <div className="form-group bdate">
              <label htmlFor="">Validade</label>
              <input
                type="date"
                name="validadeCnh"
                ref={register({ required: true })}
              />
              <small>
                {errors.validadeCnh && "Informe uma data de validade"}
              </small>
            </div>
          </Fragment>
        ) : (
          ""
        )}

        <h3 className="sub-title">Endereço </h3>

        {/* casa própria - residenciapropria */}
        <div className="form-group check">
          <label htmlFor=""> Possui residencia própria? </label>
          <input type="checkbox" name="residenciapropria" ref={register()} />
        </div>

        {/* período de moradia- tempoDeMoradia */}
        <div className="form-group">
          <label htmlFor="">A quanto tempo mora na residência atual?</label>
          <input
            type="text"
            placeholder="digite aqui"
            name="tempoDeMoradia"
            ref={register({ required: true })}
          />
          <small>{errors.tempoDeMoradia && "Informe um peíodo"}</small>
        </div>

        {/* Cep- cepCandidato */}
        <div className="form-group">
          <label htmlFor="">CEP</label>
          <input
            type="text"
            placeholder="Informe seu CEP"
            name="cepCandidato"
            onBlur={(e) => getCepAtBlur(e.target.value)}
            onChange={(e) => getCepAtChange(e.target.value)}
            ref={register({ required: true })}
          />
          <small>{errors.cepCandidato && "Informe um CEP válido"}</small>
        </div>

        {/* logradouro- logradouroCandidato */}
        <div className="form-group">
          <label htmlFor="">Logradouro</label>
          <input
            type="text"
            // placeholder="rua "
            name="logradouroCandidato"
            ref={register({ required: true })}
          />
        </div>

        {/* numero- numeroEndereco */}
        <div className="form-group">
          <label htmlFor="">Numero</label>
          <input
            type="text"
            // placeholder="rua "
            name="numeroEndereco"
            ref={register({ required: true })}
          />
          <small>
            {errors.numeroEndereco && "Informe o numero da residência"}
          </small>
        </div>

        {/* bairro- bairroCandidato */}
        <div className="form-group">
          <label htmlFor="">Bairro</label>
          <input
            type="text"
            // placeholder="rua "
            readOnly
            name="bairroCandidato"
            ref={register({ required: true })}
          />
        </div>

        {/* complemento- complementoEndereco */}
        <div className="form-group">
          <label htmlFor="">Complemento (opcional)</label>
          <input
            type="text"
            // placeholder="rua "
            name="complementoEndereco"
            ref={register()}
          />
        </div>

        {/* municipio- municipioCandidato */}
        <div className="form-group">
          <label htmlFor="">Municipio</label>
          <input
            type="text"
            // placeholder="rua "
            readOnly
            name="municipioCandidato"
            ref={register({ required: true })}
          />
        </div>

        {/* uf- ufCandidato */}
        <div className="form-group">
          <label htmlFor="">UF</label>
          <input
            type="text"
            // placeholder="rua "
            readOnly
            name="ufCandidato"
            ref={register({ required: true })}
          />
        </div>

        <p>revise seus dados antes de continuar</p>

        <div className="button-group">
          <Link to="/" className="btn btn-prev">
            Cancelar
          </Link>
          <button type="submit" className="btn btn-next">
            Proximo
          </button>
        </div>
      </form>
    </Fragment>
  );
};

export default CadastroEtapa1;
