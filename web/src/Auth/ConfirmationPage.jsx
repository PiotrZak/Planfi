import styled from 'styled-components'
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom'
import AuthTemplate from './AuthTemplate';
import { translate } from './Translation'

const ConfirmationWrapper = styled.div`
  position: absolute;
  bottom: 50%;
  width: calc(100% - 40px);
  left: 0;
  margin: 0 20px 0 20px;
  text-align: center;
`

const ConfirmationPage = (props) => {
  const navigate = useNavigate()
  const { message } = props.location.state

  const redirectToLogin = () => {
    navigate({
      pathname: '/login',
    })
  }

  const renderConfirmation = () => {
    if (message === 'Activation') {
      return (
        <ConfirmationWrapper>
          <h2>{translate('AccountActivated')}</h2>
          <Button
          >
            {translate('ReturnToLogin')}
          </Button>
        </ConfirmationWrapper>
      )
    }
    if (message === 'ResetPassword') {
      return (
        <ConfirmationWrapper>
          <h2>{translate('PasswordResetted')}</h2>
          <Button
            onClick={() => redirectToLogin()}
            type="submit"
            buttonType="primary"
            size="lg"
            buttonPlace="auth"
          >
            {translate('ReturnToLogin')}
          </Button>
        </ConfirmationWrapper>
      )
    }
  }

  return <AuthTemplate>{renderConfirmation()}</AuthTemplate>
}

export default ConfirmationPage
