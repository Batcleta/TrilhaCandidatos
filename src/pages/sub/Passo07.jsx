// import axios from "axios"
import axios from "axios";
// import http from '../../main/httpRequest'
import React, { Fragment, useState } from "react";
// import { Link } from 'react-router-dom'

const ConfirmaCand = (props) => {
  const [sending, setSending] = useState(true);

  const ls = (item) => {
    const lsJack = JSON.parse(sessionStorage.getItem(item));
    return lsJack;
  };

  const vagaEscolhida = ls("vagaEscolhida") ? ls("vagaEscolhida") : null;
  const comoSoube = ls("comoSoube") ? ls("comoSoube") : null;
  const dadosPessoais = ls("dadosPessoais") ? ls("dadosPessoais") : null;
  const experienciaProfissional = ls("exProfissional")
    ? ls("exProfissional")
    : null;
  const capacitacao = ls("capacitacao") ? ls("capacitacao") : null;
  const dadosFinais = ls("motivoDaCandidat") ? ls("motivoDaCandidat") : null;
  const gravacao = ls(dadosFinais.gravacao) ? ls(dadosFinais.gravacao) : null;
  const contato = ls("contato") ? ls("contato") : null;

  const onSubmit = async (e) => {
    setSending(false);

    let candidato_id;

    // Cadastro de Candidatos

    const candidatos = {
      ...dadosPessoais,
      ...comoSoube,
      ...dadosFinais,
      ...contato,
      possuiExperiencias: experienciaProfissional.possuiExperiencias,
      ensinoComplementar: capacitacao.ensinoComplementar,
      ensinoFundamental: capacitacao.ensinoFundamental,
      ensinoMedio: capacitacao.ensinoMedio,
      possuiDigitacao: capacitacao.possuiDigitacao,
      possuiExcel: capacitacao.possuiExcel,
      possuiVendasOnline: capacitacao.possuiVendasOnline,
      possuiWord: capacitacao.possuiWord,
    };

    const vaga_id = vagaEscolhida.idVaga;

    axios
      .post(`http://localhost:3000/vagas/${vaga_id}/candidatos`, candidatos, {
        headers: { "Content-Type": "application/json" },
      })
      .then((resp) => {
        candidato_id = resp.data.id;

        axios.post(
          `http://localhost:3000/candidatos/${candidato_id}/capacitacao`,
          capacitacao.cur,
          {
            headers: { "Content-Type": "application/json" },
          }
        );
      })
      .then((resp) => {
        axios.post(
          `http://localhost:3000/candidatos/${candidato_id}/experiencia`,
          experienciaProfissional.exp,
          {
            headers: { "Content-Type": "application/json" },
          }
        );
      })
      .then((msg) => {
        sessionStorage.removeItem("vagaEscolhida");
        sessionStorage.removeItem("comoSoube");
        sessionStorage.removeItem("dadosPessoais");
        sessionStorage.removeItem("exProfissional");
        sessionStorage.removeItem("capacitacao");
        sessionStorage.removeItem("motivoDaCandidat");
        sessionStorage.removeItem("contato");
      })
      .then((msg) => {
        console.log("usu??rio enviado com sucesso");
        props.history.push("/cadastro/final");
      })
      .catch((err) => {
        console.log(err.message);

        if (err.message !== "Request failed with status code 400") {
          setSending(true);
        }
      });
  };

  // Calcula o tempo de servi??o
  const tempoDeServi??o = (dataInicio, dataFim) => {
    const entrada = new Date(dataInicio);
    const saida = new Date(dataFim);
    const dias = 1000 * 60 * 60 * 24;

    const dataFinal = (saida - entrada) / dias / 365;

    return dataFinal.toFixed(0);
  };
  // Verifica se a data informada ?? menor ou manor que a data atual
  const conclusaoCurso = (dataConclus??o) => {
    let retorno = false;
    const conclusao = new Date(dataConclus??o);
    const atual = Date.now();

    if (conclusao < atual) {
      retorno = true;
    } else {
      retorno = false;
    }

    return retorno;
  };
  //  Arruma o sistema de datas do JS
  const shuffleData = (data) => {
    return data ? `${data.split("-").reverse().join("/")}` : "";
  };

  return (
    <Fragment>
      <h2 className="main-title">Parab??ns!!</h2>
      {dadosPessoais ? (
        <>
          <h3 className="sub-xtitle mainC">
            {`
                ${
                  dadosPessoais.sexoCandidato === "Masculino"
                    ? "Sr. "
                    : dadosPessoais.sexoCandidato === "Feminino"
                    ? dadosPessoais.estadoCivil === "Solteiro" ||
                      dadosPessoais.estadoCivil === "Solteira"
                      ? "Srta. "
                      : "Sra."
                    : ""
                }
                ${dadosPessoais.nomeCandidato}`}
          </h3>
          <h3 className="sub-xtitle mainC">Voc?? concluiu o seu cadastro </h3>
          <p className="secondary">
            Antes de nos enviar suas informa????es, pedimos que as confira abaixo{" "}
          </p>

          <div>
            <h3 className="sub-title mainC">Sobre voc?? </h3>
            <p>
              <strong>Nome: </strong> {dadosPessoais.nomeCandidato}{" "}
              {dadosPessoais.sobrenomeCandidato}
            </p>
            <p>
              <strong>Idade: </strong> {dadosPessoais.idadeCandidato} anos
            </p>
            <p>
              <strong>Sexo: </strong> {dadosPessoais.sexoCandidato}{" "}
            </p>

            <p>
              <strong>Nascido em: </strong>{" "}
              {shuffleData(dadosPessoais.dataNascimento)}{" "}
            </p>
            <p>
              <strong>Estado Civil: </strong> {dadosPessoais.estadoCivil}{" "}
            </p>
            <p>{dadosPessoais.fumante ? "?? Fumante" : "N??o fumante"}</p>
            {dadosPessoais.possuiFilhos ? (
              <>
                <p>{`Possui ${dadosPessoais.quantosFilhos} filhos`}</p>
                <p>{`Com idade(s) entre: ${dadosPessoais.idadeDosFilhos} anos`}</p>
                <p>
                  {dadosPessoais.possuiCuidador
                    ? "Tem com quem deixar"
                    : "N??o tem com quem deixar"}
                </p>
              </>
            ) : (
              "N??o Possui Filhos"
            )}
          </div>

          <div>
            <h3 className="sub-title mainC">Documenta????o </h3>
            <p>
              <strong>CPF: </strong>
              {dadosPessoais.cpfCandidato}{" "}
            </p>
            <p>
              {dadosPessoais.possuiPis ? "Possui PIS" : "Ainda n??o Possui PIS"}{" "}
            </p>
            <p>
              {" "}
              {dadosPessoais.possuiTitulo
                ? "Possui T??tulo de Eleitor"
                : "Ainda nao possui T??tulo de Eleitor"}{" "}
            </p>
            <p>
              {dadosPessoais.possuiDispensa
                ? "Possui Dispensa Militar"
                : "Ainda nao possui Dispensa Militar"}{" "}
            </p>
            {dadosPessoais.possuiCnh ? (
              <>
                <p>
                  Possui CNH categoria{" "}
                  <strong>{dadosPessoais.categoriaCnh}</strong>
                </p>
                <p>
                  {`Com vencimento em: ${shuffleData(
                    dadosPessoais.validadeCnh
                  )}`}{" "}
                </p>
              </>
            ) : (
              "N??o Pussui CNH"
            )}
          </div>

          <div>
            <h3 className="sub-title mainC">Endere??o </h3>
            <p>
              {dadosPessoais.residenciapropria
                ? "Possui resid??ncia Pr??pria"
                : "N??o Possui Resid??ncia Pr??pria"}{" "}
            </p>
            <p>
              {" "}
              {`Mora a ${dadosPessoais.tempoDeMoradia} na resid??ncia atual`}{" "}
            </p>
            <p>
              <strong>CEP: </strong> {dadosPessoais.cepCandidato}
            </p>
            <p>
              <strong>Rua : </strong>
              {dadosPessoais.logradouroCandidato}
            </p>
            <p>
              <strong>N??mero: </strong> {dadosPessoais.numeroEndereco}
            </p>
            {dadosPessoais.complementoEndereco ? (
              <p>
                <strong>Complemento: </strong>{" "}
                {dadosPessoais.complementoEndereco}
              </p>
            ) : (
              ""
            )}
            <p>
              <strong>Bairro: </strong> {dadosPessoais.bairroCandidato}{" "}
            </p>
            <p>{`${dadosPessoais.municipioCandidato}, ${dadosPessoais.ufCandidato}`}</p>
          </div>
        </>
      ) : (
        "Erro no preenchimento dos dados favor voltar e preencher os dados necess??rios"
      )}

      <div>
        <h3 className="sub-title main">Experi??ncias Profissionais </h3>
        {experienciaProfissional
          ? experienciaProfissional.exp.map((item, index) => {
              return (
                <div key={index} className="exp-empresa-wrapper">
                  <p>
                    Trabalhou por{" "}
                    <strong>{`${tempoDeServi??o(
                      item.dataEntrada,
                      item.dataSaida
                    )} anos`}</strong>
                  </p>
                  <p>
                    Na empresa <strong>{item.nomeEmpresa}</strong>
                  </p>
                  <p>em {item.cidadeEmpresa}</p>
                  <p>
                    Atuando como <strong>{item.nomeCargo}</strong>
                  </p>
                  <p>
                    Ganhando em m??dia <strong>{item.UltimoSalario}</strong>
                  </p>
                  {item.possuiComissao ? (
                    <>
                      <p>
                        {`Recebia comiss??o no valor de: R$${item.comissaoMedia} reais`}{" "}
                      </p>
                      <p>Por: {item.tipoComissao}</p>
                    </>
                  ) : (
                    <p> N??o era comissionado </p>
                  )}
                  {item.possuiBeneficio ? (
                    <>
                      <p>
                        {`Recebia comiss??o no valor de: R$${item.valorBeneficio} reais`}{" "}
                      </p>
                      <p>Por: {item.tipoBeneficio}</p>
                    </>
                  ) : (
                    <p> N??o Recebia Beneficios </p>
                  )}
                  {item.possuiBonus ? (
                    <>
                      <p>
                        {`Recebia comiss??o no valor de: R$${item.valorBonus} reais`}{" "}
                      </p>
                      <p>Por: {item.tipoBonus}</p>
                    </>
                  ) : (
                    <p> N??o Recebia Bonus </p>
                  )}
                  <p>motivos da saida: {item.motivoSaida}</p>
                </div>
              );
            })
          : ""}
      </div>

      {capacitacao ? (
        <div>
          <h3 className="sub-title mainC">Capacita????o </h3>

          <p>
            {capacitacao.ensinoFundamental
              ? "Possui Ensino fundamental completo"
              : `Cursou o ensino fundamental at?? a ${capacitacao.grauFundamentalCompleto}`}
          </p>
          <p>
            {capacitacao.ensinoMedio
              ? "Possui Ensino m??dio completo"
              : `Cursou o ensino m??dio at?? o ${capacitacao.grauMedioCompleto}`}
          </p>

          <p>
            {capacitacao.possuiWord
              ? "Possui conhecimentos em word"
              : "N??o possui conhecimentos em word"}
          </p>
          <p>
            {capacitacao.possuiExcel
              ? "Possui conhecimentos em Excel"
              : "N??o possui conhecimentos em excel"}
          </p>
          <p>
            {capacitacao.possuiDigitacao
              ? "Possui pr??tica em digita????o"
              : "N??o possui pr??tica em digita????o"}
          </p>
          <p>
            {capacitacao.possuiVendasOnline
              ? "Possui conhecimentos Vendas online"
              : "N??o possui conhecimentos em Vendas Online"}
          </p>

          {capacitacao.cur
            ? capacitacao.cur.map((item, index) => {
                return (
                  <div key={index} className="capacitacao-complementar-wrapper">
                    {index === 0 ? (
                      <h3 className="sub-title">Capacita????o complementar</h3>
                    ) : (
                      ""
                    )}
                    <p>
                      {`possui curso ${item.tipoDoCurso} em: `}
                      <strong>{item.nomeCurso}</strong>
                    </p>
                    <p>
                      {conclusaoCurso(item.dataConclusaoCurso)
                        ? "cursado"
                        : "cursando"}{" "}
                      na institui????o: <strong>{item.instituicaoCurso}</strong>
                    </p>
                    <p>{`${
                      conclusaoCurso(item.dataConclusaoCurso)
                        ? "concluido em: "
                        : "Com data prevista para conclus??o em: "
                    }: ${shuffleData(item.dataConclusaoCurso)}`}</p>
                  </div>
                );
              })
            : ""}
        </div>
      ) : (
        ""
      )}

      {dadosFinais ? (
        <div>
          <h3 className="sub-title mainC">Dados Finais</h3>
          {/* {
                            gravacao ?
                                <>
                                    <p>Gostaria de entrar na empresa pelos motivos abaixo</p>
                                    <audio controls src={gravacao.data}></audio>
                                </>
                                : 'Erro ao reproduzir o audio da grava????o, malz ae'
                        } */}

          <p>Motivo da vaga</p>
          <p>{dadosFinais.motivoDaVaga}</p>
          <p>
            Vaga escolhida <strong>{vagaEscolhida.nomeVaga}</strong>{" "}
          </p>
          <p>
            Preten????o salarial de:{" "}
            <strong>R$ {dadosFinais.pretencaoSalarial}</strong>
          </p>
        </div>
      ) : (
        ""
      )}

      {contato ? (
        <div>
          <h3 className="sub-title">Informa????es de contato</h3>
          <p>
            <strong>
              {contato.isWhatsapp ? "Whatsapp" : "Numero do celular"}
            </strong>{" "}
            {contato.candCelular || "N??o Possui"}{" "}
          </p>
          <p>
            <strong>email </strong>
            {contato.candEmail}
          </p>

          {contato.possuiTelFixo ? (
            <p>
              <strong>Telefone fixo </strong> {contato.telefoneFixo}
            </p>
          ) : (
            ""
          )}

          {contato.possuiLinkedin ? (
            <p>
              <strong>Linkedin </strong> {contato.candLinkedin}
            </p>
          ) : (
            ""
          )}

          {contato.possuiFacebook ? (
            <p>
              <strong>Facebook </strong> {contato.candFacebook}
            </p>
          ) : (
            ""
          )}
          {contato.possuiInstagram ? (
            <p>
              <strong>Instagram </strong> {contato.candInstagram}
            </p>
          ) : (
            ""
          )}
          {contato.possuiTwitter ? (
            <p>
              <strong>Twitter </strong> {contato.candTwitter}
            </p>
          ) : (
            ""
          )}
        </div>
      ) : (
        ""
      )}

      <div className="button-group">
        <button
          className="sending_button"
          type="submit"
          disabled={!sending}
          onClick={(e) => onSubmit(e)}
          className="btn btn-next"
        >
          Proximo
        </button>
      </div>
    </Fragment>
  );
};

export default ConfirmaCand;
