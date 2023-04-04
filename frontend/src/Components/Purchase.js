import React, { useEffect} from "react";
import "../Assets/CSS/Purchase.css";
import { confirmPurchase, bankLogin } from '../Services/productInfoServices';
import { Link } from "react-router-dom";



const Purchase = ({ setUserValidation, userValidation, userAccount, userPurchase }) => {

    //Validamos si el usuario es válido, la compra es válida y el disponible en la cuenta del usuario
    useEffect(() => {
        const changeUserValidation = async () => {
            setUserValidation(await bankLogin(userAccount));
        };
        changeUserValidation();
    }, [userAccount]);

    const confirmation = (event) => {
        event.preventDefault(); // previene que se refresque la página

        console.log(userValidation);
        console.log(userPurchase);

        //Validation Testing - Correct
        if (userValidation.validUser && userValidation.validPurchase) {
            confirmPurchase(userPurchase);
        }else{
            console.log("Estás pobre man");
        }

    };

    return(
        <React.Fragment>
            {/*<Link to={"/pago/transaccion/invoice"}> */}
                <button type="submit" class="btn btn-primary" onClick={confirmation}>
                    Pagar
                </button>
            {/* </Link> */}
        </React.Fragment>
    );
};


export default Purchase;