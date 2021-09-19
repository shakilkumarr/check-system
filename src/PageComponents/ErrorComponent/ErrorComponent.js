import PropTypes from 'prop-types';
import {
  Container,
  Error,
  TertiaryButton,
} from './errorComponent.styles';

const ErrorComponent = ({ updateCheckList, isOnRequest }) => (
  <Container>
    {
      isOnRequest ? <div>Loading...</div> : (
        <>
          <Error>There is some issue in fetching data</Error>
          <TertiaryButton onClick={updateCheckList}>Please try again</TertiaryButton>
        </>
      )
    }
  </Container>
);

ErrorComponent.propTypes = {
  updateCheckList: PropTypes.func.isRequired,
  isOnRequest: PropTypes.bool.isRequired,
};

export default ErrorComponent;
