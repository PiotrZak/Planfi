import React from 'react';
import styled from 'styled-components';
import Label from 'components/atoms/Label';
import Input from 'components/molecules/Input';
import Button from 'components/atoms/Button';
import AuthTemplate from 'templates/AuthTemplate';
import ValidationHint from 'components/atoms/ErrorMessageForm';
import InputContainer from 'components/atoms/InputContainerForm';
import {
  Formik, Field, Form,
} from 'formik';
import * as Yup from 'yup';
import Center from 'components/atoms/Center';
import Paragraph from 'components/atoms/Paragraph';
import Checkbox from 'components/atoms/Checkbox';

const initialValues = {
  name: '',
  phone: '',
  password: '',
  confirmPassword: '',
};

const onSubmit = (values) => {
  console.log('values', values);
};

const phoneRegex = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/;
const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,32}$/gm;

const validationSchema = Yup.object().shape({
  accept: Yup.bool().oneOf([true], 'Musisz zaakceptować regulamin, aby utworzyć konto'),
  password: Yup.string()
    .matches(passwordRegex, 'Hasło musi spełniać powyższy warunek')
    .min(8, 'Hasło musi zawieniać minimum 8 znaków !')
    .max(32, 'Hasło nie może zawierać wiecej niz 32 znaki !')
    .required('Uzupełnij wszystkie pola'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Podane hasła nie są takie same !')
    .required('Uzupełnij wszystkie pola!'),
});

const StyledInputContainer = styled(InputContainer)`
  height: 13rem;
`;

const StyledInputPhoneContainer = styled(InputContainer)`
  margin-top: 2rem;
`;

const Heading = styled.h3`
  margin: 2.5rem 0 0 0;
`;

const Container = styled.div`
  display: flex;
`;

const Link = styled.a`
  color: ${({ theme }) => theme.colorPrimaryDefault};
  text-decoration: none;
  text-align: center;
  margin-top: 1.4rem;

  &:visited{
    color: ${({ theme }) => theme.colorPrimaryDefault};
  }
`;

const ActivateAccountPage = () => (
  <AuthTemplate>
    <Heading>Aktywacja konta</Heading>
    <Paragraph type="body-2-regular">Do logowania będzie wykorzystywany adres e-mail na który otrzymałeś zaproszenie.</Paragraph>
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit} validateOnChange={false}>
      <Center place="auth">
        <Form>
          <InputContainer>
            <Label type="top" text="Podaj swoje imię i nazwisko" required>
              <Field type="text" name="name" as={Input} />
            </Label>
            <Paragraph type="body-3-regular">Imię i Nazwisko musi być oddzielone spacją</Paragraph>
          </InputContainer>
          <StyledInputPhoneContainer>
            <Label type="top" text="Podaj numer telefonu">
              <Field type="text" name="phone" as={Input} />
            </Label>
          </StyledInputPhoneContainer>
          <StyledInputContainer>
            <Label type="top" text="Podaj nowe hasło" required>
              <Field type="password" name="password" as={Input} />
            </Label>
            <Paragraph type="body-3-regular">Hasło musi mieć conajmniej 8 znaków w tym jedną dużą literę i jeden znak specjalny</Paragraph>
          </StyledInputContainer>
          <InputContainer>
            <Label type="top" text="Powtórz nowe hasło" required>
              <Field type="password" name="confirmPassword" as={Input} />
            </Label>
            <ValidationHint name="password" />
            <ValidationHint name="confirmPassword" />
          </InputContainer>
          <Container>
            <Field type="checkbox" name="accept" component={Checkbox} />
            <Paragraph type="body-3-regular">
              Zakładając konto akceptujesz naszą
              politykę prywatności - poznasz ją
              <Link href="#"> tutaj.</Link>
            </Paragraph>
          </Container>
          <Button type="submit" buttonType="primary" size="lg" buttonPlace="auth">Zapisz</Button>
        </Form>
      </Center>
    </Formik>
  </AuthTemplate>
);

export default ActivateAccountPage;
