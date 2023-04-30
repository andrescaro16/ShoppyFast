import { Outlet, Navigate } from "react-router-dom";

import { useStateContext } from "../Context/StateContext";


const PrivateRoutes = () => {

    const { tokenId } = useStateContext();    

    return(
        tokenId ? <Outlet/> : <Navigate to="/administrador"/>
    )
}

export default PrivateRoutes