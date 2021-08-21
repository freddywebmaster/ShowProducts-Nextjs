import React from 'react';
import {css} from '@emotion/react';

const Error404 = ({mensaje}) => {
    return ( 
        <>
            <h1
            css={css`
                margin-top: 4rem;
                text-align: center;
                font-size: 5rem;
            `}
            >Error 404</h1>
            <p
                css={css`
                margin-top: 2rem;
                text-align: center;
                font-size: 2rem;
                font-weight: 700;
                `}
            >{mensaje}</p>
        </>
     );
}
 
export default Error404;