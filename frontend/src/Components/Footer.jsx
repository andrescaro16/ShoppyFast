import React from "react";
import { AiFillInstagram, AiOutlineTwitter} from 'react-icons/ai';

function Footer() {
  return (
    <div className="footer-container">
        <p>2023 ShoppyFast Todos los Derechos Reservados</p>
        <p className="icons">
            <AiFillInstagram />
            <AiOutlineTwitter />
        </p>
    </div>
  )
}

export default Footer;