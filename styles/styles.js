import styled from '@emotion/styled';

export const ContenedorHeader = styled.div`
    max-width: 1200px;
    width: 95%;
    margin: 0 auto;
    @media (min-width:768px){
        display: flex;
        justify-content: space-between;
    }
`;

export const Logo = styled.p`
    color: var(--naranja);
    font-size: 4rem;
    line-height: 0;
    font-weight: 700;
    font-family: 'Roboto Slab', serif;
    margin-right: 2rem;
`;

export const Boton = styled.a`
    font-weight: 700;
    text-transform: uppercase;
    border: 1px solid #d1d1d1;
    margin-right: 1rem;
    padding: .8rem 2rem;
    background-color: ${props => props.bgColor ? '#DA552F' : 'white'};
    color: ${props => props.bgColor ? 'white' : '#000'};

    &:last-of-type{
        margin-right: 0;
    }
    &:hover{
        cursor: pointer;
    }
`;

export const InputText = styled.input`
    border: none;
    padding: 1rem;
    min-width: 300px;
`;
export const InputSubmit = styled.button`
    height: 3rem;
    width: 3rem;
    display: block;
    background-size: 4rem;
    background-image: url('/static/img/buscar.png');
    background-repeat: no-repeat;
    background-position: center;
    position: absolute;
    right: 1rem;
    top: 3px;
    background-color: white;
    border: none;

    &:hover{
        cursor: pointer;
    }
`;

export const NavStyle = styled.nav`
    padding-left: 2rem;

    a{
        font-size: 1.8rem;
        margin-left: 2rem;
        color: var(--gris2);
        font-family: 'PT Sans', sans-serif;

        &::last-of-type{
            margin-right: 0;
        }
    }
`;

export const Formulario = styled.form`
    max-width: 600px;
    width: 95%;
    margin: 5rem auto 0 auto;

    fieldset{
        margin: 2rem 0;
        border: 1px solid #1e1e1e;
        font-size: 2rem;
        padding: 2rem;
    }
`;

export const Campo = styled.div`
    margin-bottom: 2rem;
    display: flex;
    align-items: center;

    label{
        flex: 0 0 150px;
        font-size: 1.8rem;
    }

    input, textarea{
        flex: 1;
        padding: 1rem;
    }
`;

export const SubmitForm = styled.input`
    background-color: var(--naranja);
    width: 100%;
    padding: 1.5rem;
    text-align: center;
    color: white;
    font-size: 1.8rem;
    text-transform: uppercase;
    border: none;
    font-family: 'PT Sans', sans-serif;
    font-weight: 700;

    &:hover{
        cursor: pointer;
    }
`;

export const Error = styled.p`
    background-color: red;
    font-family: 'PT Sans', sans-serif;
    padding: 1rem;
    color: #fff;
    font-weight: 700;
    text-align: center;
    text-transform: uppercase;
    margin: 2rem 0;
    font-size: 1.4rem;
`;