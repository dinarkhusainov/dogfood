import React from "react";
import classNames from "classnames";

const ButtonMy = ({onClick, className, outline,children}) => {
    return (
        <button 
            onClick={onClick}
            className={classNames('button', className, {
                'button--outline' : outline,
            })}>
            {children}
        </button>
    );
};

export default ButtonMy;