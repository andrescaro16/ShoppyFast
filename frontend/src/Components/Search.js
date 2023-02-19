import React, { useState } from "react";
import '../Assets/CSS/Search.css';
import { FormGroup, Label } from "reactstrap"
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";



const Search = () => {

    // Yup con valores predefinidos para los errores de validación en el input
    const userSchema = yup.object().shape({
        code: yup
            .number("Ingresa un valor numérico")
            .typeError("Ingresa un código válido")
            .positive("Ingresa un número positivo")
            .integer("Ingresa un número entero")
        });

    //useForm para manejar el formulario y recibe el validador Yup
    const {register,handleSubmit,formState: { errors },} = useForm({
        resolver:yupResolver(userSchema)
    });

    //Verificamos recibir el número de código bien
    const getInput = (code) => {
        console.log(code);
    };

    return(
        <React.Fragment>
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