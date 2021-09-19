import {FaCloudSunRain} from 'react-icons/fa'
import styled from 'styled-components'

const Nav = styled.header`
    color: white;
    background-color: #333;
    padding: 4pt; 
`

const Header = () => {
    return <Nav><FaCloudSunRain color='#04AA6D' /> Meteora</Nav>
}

export default Header
