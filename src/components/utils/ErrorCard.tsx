import styled from "styled-components";

const ErorMessage = styled.div`
color: #FFF;
background-color: #FFC400;
padding: 5px;
margin: 0px 0px 0px 0px;
`

export const ErrorCard = (prop: {message: string}) => {
    return <ErorMessage>{prop.message}</ErorMessage>
}


export default ErrorCard;