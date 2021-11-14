import styled from 'styled-components';
// import '../assets/styles/setup/_mixins.scss'
export const StyledPlanetPreview = styled.section`
.planet-preview {
    height: 270px;
    display: flex;
    align-items: center;
    justify-content: center;
    animation: ${props => props.isActive ? 'float 3s ease-in-out infinite': ''};
    transition: all .3s ease-in-out;
    
    &:hover {
        animation: ${props => props.isActive ? 'scale 6s ease-in-out infinite': ''};
        ${props => !props.isActive ? 'transform: scale(1.2)' : ''};
   } 

    
    .planet-img-container {
        width: 200px;
        height: 200px;

        img {
            width: 200px;

        }


    }

}
`
