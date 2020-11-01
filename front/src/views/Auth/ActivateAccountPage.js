import React from 'react';
import styled from 'styled-components';
import Label from 'components/atoms/Label';
import Input from 'components/molecules/Input';
import Button from 'components/atoms/Button';
import AuthTemplate from 'templates/AuthTemplate';
import ErrorMessageForm from 'components/atoms/ErrorMessageForm';
import InputContainer from 'components/atoms/InputContainerForm';
import ValidateInvalidData from 'components/atoms/ValidateInvalidData';
import {
  Formik, Field, Form,
} from 'formik';
import * as Yup from 'yup';
import Center from 'components/atoms/Center';
import Paragraph from 'components/atoms/Paragraph';
import Checkbox from 'components/atoms/Checkbox';
import { routes } from 'utils/routes';

const initialValues = {
  name: '',
  phone: '',
  password: '',
  confirmPassword: '',
  privacy: false,
};

const onSubmit = (values) => {
  console.log('values', values);
};

const name = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/;
const phoneRegex = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/;
const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,32}$/gm;

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .matches(name)
    .required('Uzupełnij imię i nazwisko'),
  phone: Yup.string()
    .matches(phoneRegex),
  password: Yup.string()
    .matches(passwordRegex, 'Hasło musi spełniać powyższy warunek')
    .max(32, 'Hasło nie może zawierać wiecej niz 32 znaki !')
    .required(),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Podane hasła nie są takie same !')
    .required('Powtórz hasło'),
  privacy: Yup.boolean()
    .required('Musisz zaakceptować regulamin, aby aktywować konto')
    .oneOf([true], 'Musisz zaakceptować regulamin, aby aktywować konto'),
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
  cursor: pointer;

  &:visited{
    color: ${({ theme }) => theme.colorPrimaryDefault};
  }
`;

const CheckboxContainer = styled.div`
  margin-top: .8rem;
  margin-right: .5rem;
`;

const ActivateAccountPage = () => (
  <AuthTemplate>
    <Heading>Aktywacja konta</Heading>
    <Paragraph type="body-2-regular">Do logowania będzie wykorzystywany adres e-mail na który otrzymałeś zaproszenie.</Paragraph>
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit} validateOnChange={false}>
      {({ errors, touched, values }) => (
        <Center place="auth">
          <Form>
            <InputContainer>
              <Label type="top" text="Podaj swoje imię i nazwisko" required>
                <Field type="text" name="name" as={Input} error={errors.name && touched.name} />
              </Label>
              <ValidateInvalidData errors={errors} touched={touched} text="Imię i Nazwisko musi być oddzielone spacją" inputName="name" />
            </InputContainer>
            <StyledInputPhoneContainer>
              <Label type="top" text="Podaj numer telefonu">
                <Field type="text" name="phone" as={Input} error={errors.phone && touched.phone} />
              </Label>
            </StyledInputPhoneContainer>
            <StyledInputContainer>
              <Label type="top" text="Podaj nowe hasło" required>
                <Field type="password" name="password" as={Input} error={errors.password && touched.password} />
              </Label>
              <ValidateInvalidData errors={errors} touched={touched} text="Hasło musi mieć conajmniej 8 znaków w tym jedną dużą literę i jeden znak specjalny" inputName="password" />
            </StyledInputContainer>
            <InputContainer>
              <Label type="top" text="Powtórz nowe hasło" required>
                <Field type="password" name="confirmPassword" as={Input} error={errors.confirmPassword && touched.confirmPassword} />
              </Label>
              <ErrorMessageForm name="confirmPassword" />
            </InputContainer>
            <Container>
              <CheckboxContainer>
                <Checkbox
                  checkboxType="formik"
                  type="checkbox"
                  name="privacy"
                  checked={values.privacy}
                />
              </CheckboxContainer>
              <ValidateInvalidData
                errors={errors}
                touched={touched}
                text="Zakładając konto akceptujesz naszą
                politykę prywatności - poznasz ją "
                inputName="privacy"
              />
              <Link href={routes.privacy}>tutaj.</Link>
            </Container>
            <Button type="submit" buttonType="primary" size="lg" buttonPlace="auth">Zapisz</Button>
          </Form>
        </Center>
      )}
    </Formik>
  </AuthTemplate>
);

export default ActivateAccountPage;
