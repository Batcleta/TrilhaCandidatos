// Dependencias
import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { useForm, useFieldArray } from "react-hook-form";

// Components
import PossuiComissao from "../../components/functionals/PossuiComisao";
import PossuiBeneficio from "../../components/functionals/PossuiBeneficio";
import PossuiBonus from "../..//components/functionals/PossuiBonus";

const ExpProfissional = (props) => {
  const { register, control, handleSubmit, watch, errors } = useForm({
    defaultValues: { exp: [{ name: "" }] },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "exp",
  });

  const watchExperiencia = watch("possuiExperiencias", false);

  const onSubmit = async (data) => {
    // console.log(data);
    await sessionStorage.setItem("exProfissional", JSON.stringify(data));
    props.history.push("/cadastro/passo04");
  };

  const deleteExp = (index) => remove(index);

  return (
    <Fragment>
      <h2 className="main-title">
        Conte sobre suas experiências profissionais
      </h2>
      <p className="secondary-title">( 3 ultimas se houver )</p>
      <form className="cadastro" onSubmit={handleSubmit(onSubmit)}>
        {/* experiencia - possuiExperiencia */}
        <div className="form-group check">
          <label htmlFor=""> Possui Experiência?</label>
          <input
            type="checkbox"
            name="possuiExperiencias"
            ref={register()}
            onClick={() => (!watchExperiencia ? deleteExp() : "")}
          />
        </div>

        {watchExperiencia ? (
          <div className="exp-container">
            {fields.map((item, index) => (
              <div key={item.id} className="exp-form">
                <div className="field-wrap-title">
                  <h3>Empresa {index === 0 ? "" : index + 1}</h3>
                  <button type="button" onClick={() => deleteExp(index)}>
                    Delete
                  </button>
                </div>

                {/* empresa - nomeEmpresa */}
                <div className="form-group">
                  <label htmlFor="">Nome da empresa</label>
                  <input
                    type="text"
                    placeholder="Informe a ultima empresa"
                    name={`exp[${index}].nomeEmpresa`}
                    ref={register({ required: true })}
                    defaultValue={item.nomeEmpresa}
                  />
                </div>

                {/* cargo - nomeCargo */}
                <div className="form-group">
                  <label htmlFor="">Cargo</label>
                  <input
                    type="text"
                    placeholder="Informe um cargo"
                    name={`exp[${index}].nomeCargo`}
                    ref={register({ required: true })}
                    defaultValue={item.nomeCargo}
                  />
                  <small>
                    {errors?.["exp"]?.[index]?.["nomeCargo"] &&
                      "Informe um cargo"}
                  </small>
                </div>

                {/* salario - UltimoSalario */}
                <div className="form-group">
                  <label htmlFor="">Ultimo Salário</label>
                  <input
                    type="text"
                    placeholder="Informe um salario"
                    name={`exp[${index}].UltimoSalario`}
                    ref={register({ required: true })}
                    defaultValue={item.UltimoSalario}
                  />
                  <small>
                    {errors?.["exp"]?.[index]?.["UltimoSalario"] &&
                      "Informe uma Salario"}
                  </small>
                </div>

                {/* data de entrd - dataEntrada */}
                <div className="form-group">
                  <label htmlFor="">Data de entrada</label>
                  <input
                    type="date"
                    name={`exp[${index}].dataEntrada`}
                    ref={register({ required: true })}
                    defaultValue={item.dataEntrada}
                  />
                  <small>
                    {errors?.["exp"]?.[index]?.["dataEntrada"] &&
                      "Informe uma data"}
                  </small>
                </div>

                {/* data de saida - dataSaida */}
                <div className="form-group">
                  <label htmlFor="">Data de saída</label>
                  <input
                    type="date"
                    name={`exp[${index}].dataSaida`}
                    ref={register({ required: true })}
                    defaultValue={item.dataSaida}
                  />
                  <small>
                    {errors?.["exp"]?.[index]?.["dataSaida"] &&
                      "Informe uma data"}
                  </small>
                </div>

                {/* sida - motivoSaida */}
                <div className="form-group">
                  <label htmlFor="">Motivo da saida</label>
                  <input
                    type="text"
                    placeholder="Informe o motivo"
                    name={`exp[${index}].motivoSaida`}
                    ref={register({ required: true })}
                    defaultValue={item.motivoSaida}
                  />
                  <small>
                    {errors?.["exp"]?.[index]?.["motivoSaida"] &&
                      "Informe uma motivo"}
                  </small>
                </div>

                {/* cidade - cidadeEmpresa */}
                <div className="form-group">
                  <label htmlFor="">Cidade</label>
                  <input
                    type="text"
                    placeholder="Informe a cidade da empresa"
                    name={`exp[${index}].cidadeEmpresa`}
                    ref={register({ required: true })}
                    defaultValue={item.cidadeEmpresa}
                  />
                  <small>
                    {errors?.["exp"]?.[index]?.["cidadeEmpresa"] &&
                      "Informe uma Cidade"}
                  </small>
                </div>

                {/* UF - ufEmpresa */}
                <div className="form-group">
                  <label htmlFor="">UF</label>
                  <input
                    type="text"
                    placeholder="Informe o estado da empresa"
                    name={`exp[${index}].ufEmpresa`}
                    ref={register({ required: true })}
                    defaultValue={item.ufEmpresa}
                  />
                  <small>
                    {errors?.["exp"]?.[index]?.["ufEmpresa"] &&
                      "Informe um UF vpalido"}
                  </small>
                </div>

                {/* telefone - telefoneEmpresa */}
                <div className="form-group">
                  <label htmlFor="">Telefone da empresa</label>

                  <input
                    type="text"
                    placeholder="Informe um telefone da empresa"
                    name={`exp[${index}].telefoneEmpresa`}
                    ref={register({ required: true })}
                    defaultValue={item.telefoneEmpresa}
                  />

                  <small>
                    {errors?.["exp"]?.[index]?.["telefoneEmpresa"] &&
                      "Informe um telefone válido"}
                  </small>
                </div>

                {/* comissão - possuiComissao */}
                <div className="form-group check">
                  <label htmlFor=""> Recebia Comissão?</label>

                  <input
                    type="checkbox"
                    name={`exp[${index}].possuiComissao`}
                    ref={register()}
                    defaultChecked={false}
                  />
                </div>
                <PossuiComissao control={control} index={index}>
                  {/* comissão media - comissaoMedia */}
                  <div className="form-group">
                    <label htmlFor="">Valor médio da comissão</label>

                    <input
                      type="text"
                      placeholder="Digite aqui"
                      name={`exp[${index}].comissaoMedia`}
                      ref={register({ required: true })}
                      defaultValue={item.comissaoMedia}
                    />

                    <small>
                      {errors?.["exp"]?.[index]?.["comissaoMedia"] &&
                        "Informe uma comissão"}
                    </small>
                  </div>

                  {/* tipo de comissão - tipoComissao */}
                  <div className="form-group">
                    <label htmlFor="">
                      Sob o que era comissionado? (opcional)
                    </label>

                    <input
                      type="text"
                      placeholder="Digite aqui"
                      name={`exp[${index}].tipoComissao`}
                      ref={register()}
                      defaultValue={item.tipoComissao}
                    />
                  </div>
                </PossuiComissao>

                {/* beneficio - possuiBeneficio */}
                <div className="form-group check">
                  <label htmlFor=""> Recebia algum beneficio?</label>

                  <input
                    type="checkbox"
                    name={`exp[${index}].possuiBeneficio`}
                    ref={register()}
                    defaultChecked={false}
                  />
                </div>
                <PossuiBeneficio control={control} index={index}>
                  {/* valor do beneficio - valorBeneficio */}
                  <div className="form-group">
                    <label htmlFor="">Valor médio do beneficio</label>

                    <input
                      type="text"
                      placeholder="Digite aqui"
                      name={`exp[${index}].valorBeneficio`}
                      ref={register({ required: true })}
                      defaultValue={item.valorBeneficio}
                    />
                  </div>

                  {/* tipo do beneficio - tipoBeneficio */}
                  <div className="form-group">
                    <label htmlFor="">Quais os benefícios? (Opcional)</label>

                    <input
                      type="text"
                      placeholder="Digite aqui"
                      name={`exp[${index}].tipoBeneficio`}
                      ref={register()}
                      defaultValue={item.tipoBeneficio}
                    />
                  </div>
                </PossuiBeneficio>

                {/* bonus adicional - possuiBonus */}
                <div className="form-group check">
                  <label htmlFor=""> Possui bonus adicional?</label>

                  <input
                    type="checkbox"
                    name={`exp[${index}].possuiBonus`}
                    ref={register()}
                    defaultChecked={false}
                  />
                </div>
                <PossuiBonus control={control} index={index}>
                  {/* valor do beneficio - valorBonus */}
                  <div className="form-group">
                    <label htmlFor="">Valor médio do bonus</label>

                    <input
                      type="text"
                      placeholder="Digite aqui"
                      name={`exp[${index}].valorBonus`}
                      ref={register({ required: true })}
                      defaultValue={item.valorBonus}
                    />
                  </div>

                  {/* tipo do beneficio - tipoBonus */}

                  <div className="form-group">
                    <label htmlFor="">Quais os bonus? (Opcional)</label>

                    <input
                      type="text"
                      placeholder="Digite aqui"
                      name={`exp[${index}].tipoBonus`}
                      ref={register()}
                      defaultValue={item.tipoBonus}
                    />
                  </div>
                </PossuiBonus>
              </div>
            ))}
            <div className="button-group">
              <button
                type="button"
                className="plus-button"
                onClick={() => append("")}
              >
                +
              </button>
            </div>
          </div>
        ) : (
          ""
        )}

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

export default ExpProfissional;
