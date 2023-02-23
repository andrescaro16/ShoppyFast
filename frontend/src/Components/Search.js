import React from "react";
import '../Assets/CSS/Search.css';
import { FormGroup, Label, Button, Badge } from "reactstrap"
import { BsFillCartFill } from "react-icons/bs";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {Link, useNavigate} from "react-router-dom";




const Search = ({cantidad}) => {

    const redireccion = useNavigate();

    // Yup con valores predefinidos para los errores de validación en el input
    const userSchema = yup.object().shape({
        code: yup
            .number("Ingresa un valor numérico")
            .typeError("Ingresa un código válido")
            .positive("Ingresa un número positivo")
            .integer("Ingresa un número entero")
        });

    //useForm para manejar el formulario y recibe el validador Yup
    const {register,handleSubmit,formState: { errors }} = useForm({
        resolver:yupResolver(userSchema)
    });

    //Verificamos recibir el número de código bien
    const getInput = ({code}) => {
        console.log(code);
        redireccion('/producto/' + code)
    };


    return(
        <React.Fragment>
            <div className="car">
                <Link to="/carrito">
                    <Button ><Label>Carrito</Label> <BsFillCartFill />
                        <Badge>{cantidad}</Badge>
                    </Button>
                </Link>
            </div>
            <div className="containerSearch">
                <form onSubmit={handleSubmit(getInput)}>
                    <FormGroup>
                        <input type="number" id="search" name="search" placeholder="Escribe el código del producto..." required {...register("code")}/>
                        <button type="submit">Buscar</button>
                        <Label style={{ color: "red", display: "block", margin: "10px" }}> {errors["code"] ? errors["code"].message : ""}</Label>
                    </FormGroup>
                </form>
            </div>
        </React.Fragment>
    );

}

export default Search;