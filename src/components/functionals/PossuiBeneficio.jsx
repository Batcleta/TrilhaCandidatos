import React, { Fragment } from "react";
import { useWatch } from "react-hook-form";

const PossuiBeneficio = props => {

    const { control, index } = props

    const beneficio = useWatch({
        control,
        name: `exp[${index}].possuiBeneficio`
    });

    return (
        <Fragment>
            {
                beneficio ?
                    <Fragment>{props.children}</Fragment>
                    : ''
            }
        </Fragment>
    )
}

export default PossuiBeneficio