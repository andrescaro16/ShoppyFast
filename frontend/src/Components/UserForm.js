import React, { useState } from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';


const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 500px;
  margin: 0 auto;
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
`;

const Label = styled.label`
  font-size: 1rem;
  margin-bottom: 0.25rem;
`;

const Input = styled.input`
  padding: 0.5rem;
  font-size: 1rem;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`;

const Checkbox = styled.input`
  margin-right: 0.5rem;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  font-size: 1rem;
  background-color: #0077cc;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #005ea6;
  }
`;

const UserForm = () => {
  const [emailChecked, setEmailChecked] = useState(false);
  const [emailDisabled, setEmailDisabled] = useState(true);

  const handleEmailOptionChange = (event) => {
    setEmailChecked(event.target.checked);
    setEmailDisabled(!event.target.checked);
  };

  return (
    <FormContainer>
      <FormGroup>
        <Label htmlFor="name">Nombre:</Label>
        <Input type="text" id="name" name="name" required />
      </FormGroup>

      <FormGroup>
        <Label htmlFor="doc">Documento:</Label>
        <Input type="text" id="doc" name="doc" required />
      </FormGroup>

      <FormGroup>
        <Label htmlFor="phone">Celular:</Label>
        <Input type="text" id="phone" name="phone" required />
      </FormGroup>

      <CheckboxContainer>
        <Checkbox
          type="checkbox"
          id="email-option"
          name="email-option"
          checked={emailChecked}
          onChange={handleEmailOptionChange}
        />
        <Label htmlFor="email-option">¿Desea factura por correo electrónico?</Label>
        <Input
          type="email"
          id="email"
          name="email"
          disabled={emailDisabled}
          required={emailChecked}
        />
      </CheckboxContainer>
      <NavLink to="/pago/transaccion/confirmacion" exact>
      <Button type="submit">Sacar factura</Button>
      </NavLink>
    </FormContainer>
  );
};

export default UserForm;