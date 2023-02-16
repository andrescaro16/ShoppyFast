import React, {Component} from "react";
import '../Assets/CSS/Search.css';


class Search extends Component{

    render(){

        return(
            <React.Fragment>
                <div className="containerSearch">
                    <form>
                        <input type="text" id="search" name="search" placeholder="Escribe el código del producto..." required/>
                        <button type="submit">Buscar</button>
                    </form>  
                </div>
            </React.Fragment>
        );

    }

}

export default Search;