import React, { Fragment } from "react";
import { useWatch } from "react-hook-form";

const PossuiBonus = props => {

    const { control, index } = props

    const PossuiBonus = useWatch({
        control,
        name: `exp[${index}].possuiBonus`
    });

    return (
        <Fragment>
            {
                PossuiBonus ?
                    <Fragment>{props.children}</Fragment>
                    : ''
            }
        </Fragment>
    )
}

export default PossuiBonus