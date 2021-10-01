// Style
import "../style/GetVagas.scss";

// Dependencies
import axios from "axios";
import "font-awesome/css/font-awesome.min.css";
import { useState, useEffect, Fragment } from "react";
import { useForm } from "react-hook-form";

// Templates
import Main from "../../components/templates/Main";

// assets
import LogoTrilha from "../../assets/img/logo-trilha-tecnologia.png";
import LogoEstilok from "../../assets/img/logo-estilok-cosmeticos.png";
import LogoAron from "../../assets/img/logo-trilha-tecnologia.png";

const Vagas = (props) => {
  // States
  const [posts, setPosts] = useState([]);
  // const [loading, setLoading] = useState(false)
  // const [page, setPage] = useState(0)
  // const [totalPages, setTotalPages] = useState(1)
  // const [currentPage, setCurrentPage] = useState(0)
  // const [deleted, setDeleted] = useState(false)
  const [search, setSearch] = useState("");

  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    setSearch(data.pesquisa);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      // setLoading(true)
      const url = "http://localhost:3000/vagas";
      const res = await axios.get(
        url,
        {
          params: {
            // page: page,
            pesquisa: search,
          },
        },
        []
      );

      const teste = res.data.clients.map((item, index) => {
        const teste = { ...item };
        teste[`value${index}`] = false;
        return teste;
      });
      setPosts(teste);

      // setTotalPages(res.data.totalPages)
      // setCurrentPage(res.data.currentPage)
      // setLoading(false)
    };

    fetchPosts();
  }, [
    search,
    //page
  ]);

  // resolve o problema mas cria mais renderizações
  const testando = (index) => {
    const indexer = index;
    const poster = posts.map((item, index) => {
      const post = { ...item };
      post[`value${indexer}`] = !post[`vaue${indexer}`];
      return post;
    });
    setPosts(poster);
  };

  const testando2 = (index) => {
    const indexer = index;
    const poster = posts.map((item, index) => {
      const post = { ...item };
      post[`value${indexer}`] = false;
      return post;
    });
    setPosts(poster);
  };

  // const pages = [...Array(totalPages).keys()].map(page => page + 1)
  // const handlePageChange = num => setPage(num - 1)

  const escolherVaga = async (id, nome) => {
    const formData = {
      idVaga: id,
      nomeVaga: nome,
    };
    await localStorage.setItem("vagaEscolhida", JSON.stringify(formData));

    props.history.push("/cadastro");
  };

  return (
    <Fragment>
      <Main>
        {/* {loading ? <p className="loading">Loading...</p> : ""} */}
        <header className="main-header">
          <div className="search-wrapper">
            <div className="main-title">
              <h2>Lista de vagas</h2>
            </div>
            <div className="search-include">
              <div className="filter-wrapper">
                <form
                  className="pesquisa"
                  action="/"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <input
                    type="search"
                    name="pesquisa"
                    placeholder="Pesquise uma vaga pelo nome"
                    ref={register()}
                  />
                  <button type="submit">
                    <i className="fa fa-search ico"></i>{" "}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </header>

        <div className="card-wrapper">
          {posts
            ? posts.map((item, index) => {
                return (
                  <div className="card-vaga" key={index}>
                    <div className="card-header">
                      <div>
                        <h3 className="card-title">{item.nomeVaga}</h3>
                        <h5 className="card-subTitle">
                          Empresa: {item.vagaEmpresa}
                        </h5>
                      </div>

                      <img
                        src={
                          item.vagaEmpresa === "Trilha Tecnologia"
                            ? LogoTrilha
                            : item.vagaEmpresa === "estiloK Cosméticos"
                            ? LogoEstilok
                            : LogoAron
                        }
                        alt={`Logo ${item.vagaEmpresa}`}
                      />
                    </div>
                    {item[`value${index}`] === false ? (
                      <div className="card-section">
                        <div className="card-info">
                          {/* Joarnada de trabalho, regime de trabalho e salário inicial */}

                          <h4 className="card-subTitle marginb-1em">
                            Descrição da Vaga:
                          </h4>
                          <p>{`Jornada: ${item.vagaPeriodo}`}</p>
                          <p>{`Regime de contrato: ${item.regContrato}`}</p>
                          {item.faixaSalarial ? (
                            <p>{`${
                              item.faixaSalarialfinal
                                ? "Salario inicial entre"
                                : "Salario inicial"
                            }: R$ ${item.faixaSalarialInicial} ${
                              item.faixaSalarialfinal
                                ? `e R$ ${item.faixaSalarialfinal}`
                                : ""
                            }`}</p>
                          ) : (
                            ""
                          )}
                        </div>
                        <div className="button-group">
                          <button
                            className="btn enviar"
                            onClick={(e) => testando(index)}
                          >
                            Saiba mais...
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="card-section">
                        <div className="card-info">
                          <h4 className="card-subTitle marginb-1em">
                            Descrição da Vaga:
                          </h4>

                          <p>{item.vagaDescr}</p>

                          <p>{`Jornada: ${item.vagaPeriodo}`}</p>
                          <p>{`Regime de contrato: ${item.regContrato}`}</p>
                          {item.faixaSalarial ? (
                            <p>{`${
                              item.faixaSalarialfinal
                                ? "Salario inicial entre"
                                : "Salario inicial"
                            }: R$ ${item.faixaSalarialInicial} ${
                              item.faixaSalarialfinal
                                ? `e R$ ${item.faixaSalarialfinal}`
                                : ""
                            }`}</p>
                          ) : (
                            ""
                          )}

                          <h4 className="card-subTitle marginb-1em margint-1em">
                            Requerimentos da Vaga:
                          </h4>

                          <p>
                            {item.reqExp
                              ? `Experiência mínima de: ${item.reqExpAnos}`
                              : "Não é necessário Experiência"}
                          </p>
                          {item.reqIdade ? (
                            <p>{`${
                              item.maxIdade
                                ? "Possuir idade entre"
                                : "Idade inicial"
                            }: ${item.minIdade} anos ${
                              item.maxIdade ? `e ${item.maxIdade} anos` : ""
                            }`}</p>
                          ) : (
                            ""
                          )}

                          {item.reqCapacita ? (
                            <Fragment>
                              <h5 className="card-subTitle marginb-1em margint-1em">
                                Capacitação requerida
                              </h5>
                              <p>{item.capacitaCurso}</p>
                            </Fragment>
                          ) : (
                            ""
                          )}
                        </div>
                        <div className="button-group">
                          <button
                            className="btn minimizar"
                            onClick={(e) => testando2(index)}
                          >
                            {" "}
                            Minimizar
                          </button>
                          <button
                            className="btn enviar"
                            onClick={(e) =>
                              escolherVaga(item.id, item.nomeVaga)
                            }
                          >
                            {" "}
                            Candidatar-se
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })
            : ""}
        </div>
      </Main>
    </Fragment>
  );
};

export default Vagas;
