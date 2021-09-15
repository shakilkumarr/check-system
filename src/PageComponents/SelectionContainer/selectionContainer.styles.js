import styled, { css } from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  opacity: ${props => props.isDisabled ? 0.5 : 1};
  font-size: 1.8rem;
  letter-spacing: 0.08rem;
  margin-bottom: 2.8rem;
`;

export const Label = styled.div`
  margin-bottom: 1.2rem;
  font-size: 2rem;
`;

export const RadioContainer = styled.div`
  display: flex;
  width: 12rem;
  height: 4rem;
  border-radius: 5px;
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
