import React, { useState, useEffect } from 'react';
import { FormGroup, ButtonGroup } from "reactstrap"
import { BsQrCodeScan, BsSearch } from "react-icons/bs";
import { Link } from "react-router-dom";
import { getAllProduct } from "../Services/productInfoServices";

import { useStateContext } from "../Context/StateContext";


const Search = () => {

    const { searchTerm, setSearchTerm } = useStateContext();
    const [products, setProducts] = useState({})
    const [nameProducts, setNameProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);

    
    useEffect(() => {
        const getNameProducts = async () => {
          const products = await getAllProduct();
          setNameProducts(products.map(product => product.name));
          setProducts(products);
        };
        getNameProducts();
    }, []);


    const handleInputChange = async (event) => {

        await setNameProducts(products.map(product => product.name));
        const searchTermTemp = event.target.value.toLowerCase();

        const filtered = [];
        const searchTermLowerCase = searchTermTemp.toLowerCase();
        for (let i = 0; i < nameProducts.length && filtered.length < 4; i++) {
            if (nameProducts[i].toLowerCase().includes(searchTermLowerCase)) {
                filtered.push(nameProducts[i]);
            }
        }
        
        setFilteredProducts(filtered);
        setSearchTerm(searchTermTemp);
    };


    const handleSubmit = (event) => {
        event.preventDefault();
    };


    return(
        <React.Fragment>
            <div className="containerSearch">
                <form onSubmit={handleSubmit}>
                    <FormGroup className="search-section">
                        <input type="text" id="code" name="search" list="products" placeholder="Escribe el nombre del producto..." autocomplete="off" required onChange={handleInputChange}/>
                        <datalist id="products">
                            {(<>{filteredProducts.map((name, index) => (<option key={index} value={name}></option>))}</>)}
                        </datalist>
                        <ButtonGroup>
                            <button className="primary-button" type="submit"> <BsSearch />  Buscar </button>
                            <Link to="/qr-section">
                                <button className="primary-button" style={{borderTopRightRadius: '15px', borderBottomRightRadius: '15px'}}> <BsQrCodeScan />  Escanear</button>
                            </Link>
                        </ButtonGroup>
                    </FormGroup>
                </form>
            </div>
        </React.Fragment>
    );

}

export default Search;