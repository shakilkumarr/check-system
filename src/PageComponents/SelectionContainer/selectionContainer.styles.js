import styled, { css } from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  opacity: ${props => props.isDisabled ? 0.5 : 1};
  pointer-events: ${props => props.isDisabled ? 'none' : 'auto'};
  letter-spacing: 0.08rem;
  font-size: 1.6rem;
  padding: 1.6rem 0.8rem;
  background-color:${props => props.isActive && '#005f3859'};
  &:hover {
    background-color: ${props => !props.isActive && '#80808021'};
  }
`;

export const Label = styled.div`
  margin-bottom: 1.2rem;
`;

export const RadioContainer = styled.div`
  display: flex;
  width: 12rem;
  height: 4rem;
  border-radius: 0.5rem;
  border: 0.2rem solid #004F5F;
  cursor: pointer;
  color: #004F5F;
`;

const selectCss = css`
  background-color: #004F5F;
  color: white;
`;

export const CheckColumns = styled.div`
  border-right: ${props => props.isBorderNeeded && '0.2rem solid #004F5F'};
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  ${props => props.isSelected && selectCss};
`;

export const CheckText = styled.div`
  display: flex;
`;

