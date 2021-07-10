import styled from 'styled-components';

export const StyledNav = styled.li`
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    
   &:last-child{
     margin-right: 25px;
   }
    
    &::before {
      content: '';
      height: 5px;
      display: block;
      background: ${props => props.color.main};
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      transform: ${props => props.isActive ? 'scale(1, 1)' : 'scale(0, 1)'};
      transition: transform ease-in-out 250ms;

    }
    
    &:hover::before {
      transform: scale(1, 1);
    }


`