import styled from 'styled-components'

export const Wrapper = styled.div`
    display: flex;
    justfify-content: space-between;
    flex-direction: column;
    width: 100%;
    height: 100%
    border-radius: 20px;

    button {
        border-radius: 0 0 20px 20px;
    }
    img {
        max-height: 250px;
        object-fit: contain;
        border-radius: 20px 20px 0 0;
    }
c
    div {
        font-family: Arial, Helvetica, sans-serif;
        padding: 1rem;
        height: 100%;
    }
`