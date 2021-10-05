import "../style/Main.css";
import React from "react";

const Conteudo = (props) => {
  const { className } = props;

  return (
    <main className="conteudo">
      <div className={className}>{props.children}</div>
    </main>
  );
};

export default Conteudo;
