# Introdução

Criando formulário com Formik e Yup para entender melhor como funciona essas ferramentas.

### Começando projeto

Vamos começar criando uma projeto com Vite e depois vamos instalar as bibliotecas:

    yarn add formik yup styled-components

### Criação dos componentes

App.jsx:

    import React from "react";
    import { Form, Formik } from "formik";
    import { Input } from "./components/Input";
    import * as Yup from "yup";
    import styled from "styled-components";

    const Container = styled.div`
    padding: 60px 0;
    display: flex;
    justify-content: center;
    `;

    const Content = styled.div`
    width: 80%;
    max-width: 600px;
    display: flex;
    justify-content: center;
    box-shadow: 0 1px 2px;
    padding: 30px 0;
    `;

    const Row = styled.div`
    display: flex;
    gap: 20px;

    @media (max-width: 550px) {
        display: block;
    }
    `;

    const Footer = styled.div`
    text-align: end;
    `;

    const Button = styled.button`
    padding: 8px;
    font-size: 20px;
    cursor: pointer;
    background-color: #0081cf;
    color: white;
    border: none;
    border-radius: 5px;
    `;

    const App = () => {
    const initialValues = {
        nome: "",
        sobrenome: "",
        dataNascimento: "",
        naturalidade: "",
        endereço: "",
        cidade: "",
        email: "",
        celular: "",
    };

    const validationSchema = Yup.object().shape({
        nome: Yup.string()
        .min(3, "O campo deve ter no mínimo 3 caracteres")
        .required("Campo obrigatório"),
        sobrenome: Yup.string().required("Campo obrigtório"),
        email: Yup.string().email("E-mail inválido").required("Campo obrigatório"),
        dataNascimento: Yup.date()
        .max(new Date(), "Não é possível colocar uma data futura")
        .required("Campo obrigatório"),
        celular: Yup.string()
        .max(13, "O campo deve ter no máximo 13 caracteres")
        .required("Campo obrigatório"),
    });

    const handleSubmit = (values, { setSubmitting }) => {
        console.log(values);

        setSubmitting(false);
    };

    return (
        <Container>
        <Content>
            <Formik
            onSubmit={handleSubmit}
            initialValues={initialValues}
            validationSchema={validationSchema}
            >
            {({ values, isSubmitting }) => (
                <Form style={{ width: "90%" }}>
                <Row>
                    <Input name="nome" required />
                    <Input name="sobrenome" required />
                </Row>

                <Row>
                    <Input
                    name="dataNascimento"
                    type="date"
                    label="Data de Nascimento"
                    required
                    />
                    <Input name="naturalidade" />
                </Row>

                <Row>
                    <Input name="endereço" />
                    <Input type="text" name="cidade" disabled={!values.endereço} />
                </Row>

                <Row>
                    <Input name="email" type="email" required />
                    <Input name="celular" type="tel" required />
                </Row>

                <Footer>
                    <Button type="submit" disabled={isSubmitting}>
                    Salvar
                    </Button>
                </Footer>
                </Form>
            )}
            </Formik>
        </Content>
        </Container>
    );
    };

export default App;

Componentes Input:

    import { Field, ErrorMessage } from "formik";
    import styled from "styled-components";

    const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2px;
    margin-bottom: 15px;
    width: 100%;
    `;

    const FieldStyled = styled.input`
    padding: 10px;
    border-radius: 5px;
    border: 1px solid;
    outline: none;
    font-size: 18px;
    width: 90%;
    `;

    const Label = styled.label`
    text-transform: capitalize;
    `;

    const RequiredLabel = styled.span`
    color: red;
    `;

    const ErrorStyled = styled.span`
    color: red;
    font-size: 14px;
    `;

    export const Input = ({ type = "", name, label, required, ...props }) => {
        return (
            <Container>
            <Label>
                {label || name}
                {required && <RequiredLabel>*</RequiredLabel>}
            </Label>
            <Field as={FieldStyled} name={name} type={type} {...props} />
            <ErrorMessage name={name} component={ErrorStyled} />
            </Container>
        );
    };

Como vimos criamos o estilo e lógica tudo em um mesmo arquivo, mas o ideal é separá-los.

# App.jsx informações

O styled components não são tão importantes assim, pois são só estilização.

O primeiro ponto importante é falar sobre a biblioteca Formik:

### Formik

O Formik é o primeiro componente da biblioteca formik que devemos uitlizar e nele devemos passar três parâmetros. O primeiro são os valores iniciais que nesse nosso projeto decidimos colocá-los em uma const separada para melhor organização, mas podemos separá-los em um arquivo a parte e depois fazer a importação deles. O segundo parâmetro são os validationSchema, que nada mais é o como vamos validar cada input nosso e utilizamos a biblioteca Yup para nos auxiliar. E o terceiro parâmetro é o OnSubmit que podemos passar uma função e com isso obter os valores do input pra salvá-los em um banco de dados por exemplo.

Validação Yup:

    const validationSchema = Yup.object().shape({
    nome: Yup.string()
        .min(3, "O campo deve ter no mínimo 3 caracteres")
        .required("Campo obrigatório"),
    sobrenome: Yup.string().required("Campo obrigtório"),
    email: Yup.string().email("E-mail inválido").required("Campo obrigatório"),
    dataNascimento: Yup.date()
        .max(new Date(), "Não é possível colocar uma data futura")
        .required("Campo obrigatório"),
    celular: Yup.string()
        .max(13, "O campo deve ter no máximo 13 caracteres")
        .required("Campo obrigatório"),
    });

Valores iniciais do nosso projeto:

    const initialValues = {
        nome: "",
        sobrenome: "",
        dataNascimento: "",
        naturalidade: "",
        endereço: "",
        cidade: "",
        email: "",
        celular: "",
    };

Função do onSubmit:

    const handleSubmit = (values, { setSubmitting }) => {
        console.log(values);

        setSubmitting(false);
    };

Dentro do componente Formik temos que utilizar o componente Form, e dentro do Form utilizamos Field, ErrorMessage. O Field nada mais é do que a tag input e o ErrorMessage como o nome já diz, serve para mostrar os erros para o usuário.

Exemplos:

    <Container>
        <Label>
            {label || name}
            {required && <RequiredLabel>*</RequiredLabel>}
        </Label>
        <Field as={FieldStyled} name={name} type={type} {...props} />
        <ErrorMessage name={name} component={ErrorStyled} />
    </Container>

Nesse caso utilizamos um styled component para a tag label e nas outras duas tags eu passei alguns parâmetros como o as={FieldStyled} e o component={ErrorStyled}, que servem para alterar o estilo dos componentes que vem da bilbioteca do formik.

É basicamente isso, ambas as bibliotecas servem para nos auxiliar e ajudar na criação de formulários.
