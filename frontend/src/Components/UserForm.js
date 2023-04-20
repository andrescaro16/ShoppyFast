import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStateContext } from "../Context/StateContext";
import "../Assets/CSS/UserForm.css";


const UserForm = () => {
  const [emailChecked, setEmailChecked] = useState(false);
  const [emailDisabled, setEmailDisabled] = useState(true);
  const [formIncomplete, setFormIncomplete] = useState(true); 
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();
  const { setUserData } = useStateContext();

  const handleEmailOptionChange = (event) => {
    setEmailChecked(event.target.checked);
    setEmailDisabled(!event.target.checked);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    if (form.checkValidity()) {
      setUserData({
        name: form.name.value,
        document_id: form.document_id.value,
        email: emailChecked ? form.email.value : "",
      });
      navigate("/pago/transaccion/confirmacion");
      setFormIncomplete(false);
      console.log('Navigating to /pago/transaccion/confirmacion');
    } else {
      setFormIncomplete(true);
      setErrorMessage("Debe llenar todos los campos.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-containerUserForm">
      <div className="form-group">
        <label htmlFor="name">Nombre y apellido:</label>
        <input type="text" id="name" name="name" required />
      </div>

      <div className="form-group">
        <label htmlFor="document_id">Documento:</label>
        <input type="text" id="document_id" name="document_id" required />
      </div>

      <div className="checkbox-container">
        <input
          type="checkbox"
          id="email-option"
          name="email-option"
          checked={emailChecked}
          onChange={handleEmailOptionChange}
        />
        <label htmlFor="email-option">¿Desea factura por correo electrónico?</label>
        <input
          type="email"
          id="email"
          name="email"
          disabled={emailDisabled}
          required={emailChecked}
        />
      </div>
      <button type="submit" class="sacarFactura" disabled={!formIncomplete}>
         Sacar factura
      </button>
    </form>
  );
};

export default UserForm;