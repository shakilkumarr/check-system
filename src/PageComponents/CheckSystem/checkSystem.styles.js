import styled, { css } from 'styled-components';

export const Container = styled.div`
  width: 50%;
  background-color: white;
  border-radius: 0.5rem;
  min-height: 48.8rem;
  height: 80%;
  overflow: hidden;
  outline: none;
`;

export const Header = styled.div`
  // position: sticky;
  height: 2.4rem;
  font-size: 1.8rem;
  padding: 2rem 2.4rem;
  border-bottom: 0.1rem solid #888;
  box-sizing: content-box;
`;

export const BodyContainer = styled.div`
  min-height: 36rem;
  height: calc(100% - 12.8rem);
  overflow: auto;
  padding: 1.2rem 1.6rem;
`;

export const Footer = styled(Header)`
  border-bottom: 0;
  border-top: 0.1rem solid #888;
  bottom: 0;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const disableButton = css`
  cursor: not-allowed;
  pointer-events: none;
  background-color: grey;
  color: #000;
  opacity: 0.6;
`;

const enableButton = css`
  cursor: pointer;
  background-color: #004F5F;
  color: #FFF;
`;

export const Button = styled.div`
  font-weight: 500;
  font-size: 1.4rem;
  line-height: 4rem;
  letter-spacing: 0.04rem;
  user-select: none;
  border: 0.1rem solid transparent;
  height: 4rem;
  padding: 0 1.6rem;
  border-radius: 0.4rem;
  ${props => props.isDisabled ? disableButton : enableButton};
`;

export const TertiaryButton = styled.div`
  color: #1890FF;
  cursor: ${props => props.isError ? 'not-allowed' : 'pointer'};
  margin-left: 1.2rem;
  opacity: ${props => props.isError && 0.6};
`;

export const EmptyMessage = styled.div`

`;
