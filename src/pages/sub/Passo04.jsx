import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { useForm, useFieldArray } from "react-hook-form";

const CapacitacaoProf = (props) => {
  const { register, control, handleSubmit, watch, errors } = useForm({
    defaultValues: { sup: [{ name: "" }], cur: [{ name: "" }] },
  });

  // firlds superior e curso

  const {
    fields: cursoField,
    append: cursoAppend,
    remove: cursoRemove,
  } = useFieldArray({ control, name: "cur" });

  const watchPossuiFundamental = watch("ensinoFundamental", false);
  const watchPossuiMedio = watch("ensinoMedio", false);
  const watchPossuiCurso = watch("ensinoComplementar", false);

  const onSubmit = async (data) => {
    const formData = {
      ...data,
    };
    await sessionStorage.setItem("capacitacao", JSON.stringify(formData));
    props.history.push("/cadastro/passo05");
  };

  return (
    // {/* "handleSubmit" will validate your inputs before invoking "onSubmit" */ }

    <Fragment>
      <h2 className="main-title">Conte sobre sua capacitação</h2>

      <form className="cadastro" onSubmit={handleSubmit(onSubmit)}>
        <h3 className="sub-title"> Grau de ensino </h3>

        {/* ensino fundamental - ensinoFundamental */}
        <div className="form-group check">
          <label htmlFor=""> Ensino fundamental completo? </label>
          <input type="checkbox" name="ensinoFundamental" ref={register()} />
        </div>

        {watchPossuiFundamental === false ? (
          /* Grau completo fundamental- grauFundamentalCompleto */
          <div className="form-group">
            <input
              type="text"
              placeholder="Informe o ultimo grau completo"
              name="grauFundamentalCompleto"
              ref={register({ required: true })}
            />
            <small>
              {errors.grauFundamentalCompleto && "Informe uma série"}
            </small>
          </div>
        ) : (
          <Fragment>
            <div className="form-group check">
              <label htmlFor=""> Ensino médio completo? </label>
              <input type="checkbox" name="ensinoMedio" ref={register()} />
            </div>

            {watchPossuiMedio === false ? (
              /* Grau completo médio- grauMedioCompleto */
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Informe o ultimo grau completo"
                  name="grauMedioCompleto"
                  ref={register({
                    required: true,
                  })}
                />
                <small>{errors.grauMedioCompleto && "Informe uma série"}</small>
              </div>
            ) : (
              ""
            )}
          </Fragment>
        )}

        <div className="complementar-wrap">
          <h3 className="sub-title"> Ensino Complementar </h3>

          {/* ensino Complementar - possuiWord */}
          <div className="form-group check">
            <label htmlFor=""> Possui conhecimentos em Word? </label>
            <input type="checkbox" name="possuiWord" ref={register()} />
          </div>

          {/* ensino Complementar - possuiExcel */}
          <div className="form-group check">
            <label htmlFor=""> Possui conhecimentos em Excel? </label>
            <input type="checkbox" name="possuiExcel" ref={register()} />
          </div>

          {/* ensino Complementar - possuiVendasOnline */}
          <div className="form-group check">
            <label htmlFor=""> Possui conhecimentos em Vendas online? </label>
            <input type="checkbox" name="possuiVendasOnline" ref={register()} />
          </div>

          {/* ensino Complementar - possuiDigitacao */}
          <div className="form-group check">
            <label htmlFor=""> Possui prática em digitação? </label>
            <input type="checkbox" name="possuiDigitacao" ref={register()} />
          </div>

          {/* ensino Complementar - ensinoComplementar */}
          <div className="form-group check">
            <label htmlFor=""> Possui curso complementar? </label>
            <input type="checkbox" name="ensinoComplementar" ref={register()} />
          </div>

          {/* map cursos */}

          {watchPossuiCurso ? (
            <div>
              {cursoField
                ? cursoField.map((item, index) => {
                    return (
                      <div>
                        <div className="field-wrap-title">
                          <h3>
                            Curso complementar {index === 0 ? "" : index + 1}
                          </h3>
                          <button
                            type="button"
                            onClick={() => cursoRemove(index)}
                          >
                            Delete
                          </button>
                        </div>

                        <div className="form-group">
                          <label htmlFor=""> Tipo do curso </label>
                          <select
                            type="text"
                            placeholder="Escolha uma opção"
                            name={`cur[${index}].tipoDoCurso`}
                            ref={register({ required: true })}
                          >
                            <option value="">Escolha uma opção</option>
                            <option value="curso superior">
                              Curso Superior
                            </option>
                            <option value="curso tecnico">Curso Técnico</option>
                            <option value="curso complementar">
                              Curso Complementar
                            </option>
                          </select>
                          <small>
                            {errors.comoSoube && "Escolha uma opção válida"}
                          </small>
                        </div>

                        {/* Nome Curso Complementar- nomeCursoComplementar */}
                        <div className="form-group">
                          <label htmlFor="">Qual o curso?</label>

                          <input
                            type="text"
                            placeholder="Digite aqui seu curso"
                            name={`cur[${index}].nomeCurso`}
                            ref={register({ required: true })}
                            // defaultValue={curso.nomeCurso}
                          />

                          <small>
                            {errors?.["sup"]?.[index]?.["nomeCurso"] &&
                              "Informe um curso"}
                          </small>
                        </div>

                        {/* Nome Instituição Complementar- instituicaoComplementar */}
                        <div className="form-group">
                          <label htmlFor="">
                            Qual o instituição de ensino??
                          </label>

                          <input
                            type="text"
                            placeholder="Digite aqui uma instituição"
                            name={`cur[${index}].instituicaoCurso`}
                            ref={register({ required: true })}
                            // defaultValue={curso.instituicaoCurso}
                          />

                          <small>
                            {errors?.["sup"]?.[index]?.["instituicaoCurso"] &&
                              "Informe uma instituição"}
                          </small>
                        </div>

                        {/* Data Inicio Complementar - dataInicioComplementar */}
                        <div className="form-group">
                          <label htmlFor="">Data de Inicio</label>

                          <input
                            type="date"
                            name={`cur[${index}].dataInicioCurso`}
                            ref={register({ required: true })}
                            // defaultValue={curso.dataInicioCurso}
                          />

                          <small>
                            {errors?.["sup"]?.[index]?.["dataInicioCurso"] &&
                              "Informe uma data"}
                          </small>
                        </div>

                        {/* Data conclusão Complementar - dataConclusaoComplementar */}
                        <div className="form-group">
                          <label htmlFor="">Data de conclusão</label>

                          <small className="input-info">
                            {" "}
                            Ou data esperada de conclusão
                          </small>

                          <input
                            type="date"
                            name={`cur[${index}].dataConclusaoCurso`}
                            ref={register({ required: true })}
                            // defaultValue={curso.dataConclusaoCurso}
                          />

                          <small>
                            {errors?.["sup"]?.[index]?.["dataConclusaoCurso"] &&
                              "Informe uma data"}
                          </small>
                        </div>
                      </div>
                    );
                  })
                : ""}
              <div className="button-group">
                <button
                  type="button"
                  className="plus-button"
                  onClick={() => cursoAppend("")}
                >
                  +
                </button>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>

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

export default CapacitacaoProf;
