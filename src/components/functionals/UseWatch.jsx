import React, { Fragment } from "react";
import { useWatch } from "react-hook-form";

const UseWatchVagas = (props) => {
  const { control, index } = props;

  const beneficio = useWatch({
    control,
    name: `exp[${index}].toggleButton`,
  });

  return (
    <Fragment>
      {beneficio ? <Fragment>{props.children}</Fragment> : ""}
    </Fragment>
  );
};

export default UseWatchVagas;
