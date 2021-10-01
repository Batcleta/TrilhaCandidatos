import React, { Fragment } from "react";
import { useWatch } from "react-hook-form";

const PossuiComissao = props => {

    const { control, index } = props

    const comissao = useWatch({
        control,
        name: `exp[${index}].possuiComissao`
    });

    return (
        <Fragment>
            {
                comissao ?
                    <Fragment>{props.children}</Fragment>
                    : ''
            }
        </Fragment>
    )
}

export default PossuiComissao