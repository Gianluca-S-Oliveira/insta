import React from 'react';

import "./botao.scss"

const BotaoCustomizado = ({
    type, onClick, to, children
}

) => {
    return (<button type={
        type
    }

        onClick={
            onClick
        }

        className="custom-button"> {
            children
        }

    </button>);
}

    ;

export default BotaoCustomizado;