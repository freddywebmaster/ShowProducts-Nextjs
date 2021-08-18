import React from 'react'
import Header from './Header';
import {Global, css} from '@emotion/react';
import SEO from '../SEO';

const Layout = (props) => {
    return ( 
        <>
            <Global
                styles={css`
                    :root{
                        --gris: #3d3d3d;
                        --grid2: #6f6f6f;
                        --gris3:  #e1e1e1;
                        --naranja: #DA5522;
                    }
                    html{
                        font-size: 62.5%;
                        box-sizing: border-box;
                    }
                    *, *:before, *:after {
                        box-sizing: inherit;
                    }
                    body{
                        font-size: 1.6rem;
                        line-height: 1.5;
                        font-family: 'PT Sans', sans-serif;
                        /* font-family: 'Roboto Slab', serif; */
                    }
                    h1,h2,h3{
                        margin: 0 0 2rem 0;
                        line-height: 1.5;
                    }
                    h1, h2{
                        font-family: 'Roboto Slab', serif;
                    }
                    h3{
                        font-family: 'PT Sans', sans-serif;
                    }
                    ul{
                        list-style: none;
                        margin: 0;
                        padding: 0;
                    }
                    a{
                        text-decoration: none;
                    }
                    img{
                        max-width: 100%;
                        min-width: 100%;
                    }
                `}
            />
            <SEO/>
            <Header/>
            <main>
                {props.children}
            </main>
        </>
     );
}
 
export default Layout;