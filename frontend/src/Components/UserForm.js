import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStateContext } from "../Context/StateContext";


const UserForm = () => {
  const [emailChecked, setEmailChecked] = useState(false);
  const [emailDisabled, setEmailDisabled] = useState(true);
  const [formIncomplete, setFormIncomplete] = useState(true); 

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
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-containerUserForm">
      <div className="form-group">
        <label htmlFor="name">Nombre y apellido:</label>
        <input type="text" id="name" name="name" placeholder='Nombre...' required />
      </div>

      <div className="form-group">
        <label htmlFor="document_id">Documento:</label>
        <input type="text" id="document_id" name="document_id" placeholder='Número de identificación...' required />
      </div>

      <div className="checkbox-group">
        <input
          type="checkbox"
          id="email-option"
          name="email-option"
          checked={emailChecked}
          onChange={handleEmailOptionChange}
        />
        <label htmlFor="email-option">¿Desea factura por correo electrónico?</label>
      </div>
      <input
        type="email"
        id="email"
        name="email"
        placeholder='Correo electrónico...'
        disabled={emailDisabled}
        required={emailChecked}
      />

      <button className="primary-button" type="submit" disabled={!formIncomplete}>
         Sacar factura
      </button>
    </form>
  );
};

export default UserForm;