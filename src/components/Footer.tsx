import styled from 'styled-components'

const Nav = styled.footer`
    // position: fixed;
    // left: 0;
    // bottom: 0;
    // width: 100%;
    color: white;
    text-align: center;
    background-color: #333;
    padding: 20px;
    margin-top: 20px;
    margin-bottom: 0px;
    // height: 30px; 
`

const Footer = () => {
    return <Nav>&copy; Eden Massalonga</Nav>
}

export default Footer
