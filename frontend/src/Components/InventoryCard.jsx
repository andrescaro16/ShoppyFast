import React from 'react';
import { Button } from 'reactstrap';
import { styled } from '@mui/material/styles';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import TextField from '@mui/material/TextField';
import swal from 'sweetalert';

import { useStateContext } from "../Context/StateContext";
import { sendProductInfo } from '../Services/productInfoServices';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function RecipeReviewCard({ product }) {
  const { tokenId } = useStateContext();
  const [expanded, setExpanded] = React.useState(false);
  const [productInfo, setProductInfo] = React.useState(product);
  const [cardWidth, setCardWidth] = React.useState("200px");
  const [cardHeight, setCardHeight] = React.useState("auto");

  const handleExpandClick = () => {
    setExpanded(!expanded);
    if (!expanded) {
      setCardWidth("auto");  
      setCardHeight("auto"); 
    } else {
      setCardWidth("auto");  
      setCardHeight("auto");  // Cambia el alto de la card cuando no está expandida
    }
  };
  const cardExpandedStyle = {
    maxHeight: "100%",
    marginBottom: "16px",
    width: cardWidth,
    height: cardHeight,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  };

  const handleUpdate = async () => {
    try {
      console.log("datos enviados: ", productInfo)
      if (!productInfo.name || productInfo.name.length === 0) {
          swal({
            title: "error",
            text: "el campo nombre es obligatorio",
            icon: "error",
            button:"Aceptar",
            timer: "3500"
          });
      return;
    }
    else if (!productInfo.price || productInfo.price.length === 0){
      swal({
        title: "error",
        text: "el campo precio es obligatorio",
        icon: "error",
        button:"Aceptar",
        timer: "3500"
      });
  return;
    }
    else if (!productInfo.stock || productInfo.stock.length === 0){
      swal({
        title: "error",
        text: "el campo existencia es obligatorio",
        icon: "error",
        button:"Aceptar",
        timer: "3500"
      });
  return;
    }

      const response = await sendProductInfo(tokenId, productInfo);
      swal({
        title: "Guardado",
        text: "El producto se ha actualizado de manera exitosa",
        icon: "success",
        button:"Aceptar",
        timer: "3500"
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={`product-card ${expanded ? "expanded" : ""}`}>
      <img src={product.imgURL} alt="Product Image" />
      <div className='card-content-container'>
      <CardContent style={expanded ? cardExpandedStyle : {}}>
          <h5 className='product-name'>{product.name}</h5>
          <br />
        </CardContent>
        <CardActions disableSpacing className='cart-actions'>
          <Button onClick={handleExpandClick} aria-expanded={expanded} aria-label="edit" className="primary-button" style={{ backgroundColor: "#009EC9" }}>Editar</Button>
          <IconButton onClick={handleExpandClick} aria-expanded={expanded} aria-label="edit">
            <EditRoundedIcon />
          </IconButton>
        </CardActions>
      </div>
      {expanded && (
        <CardContent style={cardExpandedStyle}>
          <form style={{ display: "flex" }}>
            <div style={{ width: "100%", marginBottom: "20px", marginTop:"5px" }}>
              <TextField
                label="Codigo"
                color='primary'
                variant='outlined'
                value={productInfo.id}
                style={{ marginBottom: "25px",  width: "100%" }}
                InputLabelProps={{
                  shrink: true,
                  style: { fontSize: 20 , color: "#333", fontWeight: "bold"},
                }}
                onChange={(e) => setProductInfo({ ...productInfo, id: e.target.value })}
              />
              <TextField
                label="nombre"
                value={productInfo.name}
                style={{ marginBottom: "25px",  width: "100%" }}
                InputLabelProps={{
                  shrink: true,
                  style: { fontSize: 20 , color: "#333", fontWeight: "bold"},
                }}
                InputProps={{
                  style: { fontSize: 16, minHeight: "100px" },
                }}
                multiline
                rows={2}
                onChange={(e) => setProductInfo({ ...productInfo, name: e.target.value })}
              />
              <TextField
                label="Marca"
                value={productInfo.marca}
                style={{ marginBottom: "25px",  width: "100%" }}
                InputLabelProps={{
                  shrink: true,
                  style: { fontSize: 20 , color: "#333", fontWeight: "bold"},
                }}
                onChange={(e) => setProductInfo({ ...productInfo, marca: e.target.value })}
              />
              <TextField
                label="Descripción"
                value={productInfo.description}
                style={{ marginBottom: "25px",  width: "100%" }}
                InputLabelProps={{
                  shrink: true,
                  style: { fontSize: 20 , color: "#333", fontWeight: "bold"},
                }}
                InputProps={{
                  style: { fontSize: 16, minHeight: "100px" },
                }}
                multiline
                rows={5}
                onChange={(e) => setProductInfo({ ...productInfo, description: e.target.value })}
              />
           
              <TextField
                label="Precio"
                value={productInfo.price}
                style={{ marginBottom: "25px",  width: "100%" }}
                InputLabelProps={{
                  shrink: true,
                  style: { fontSize: 20 , color: "#333", fontWeight: "bold"},
                }}
                onChange={(e) => setProductInfo({ ...productInfo, price: e.target.value })}
              />
              <TextField
                label="Existencia"
                value={productInfo.stock}
                style={{ marginBottom: "25px",  width: "100%" }}
                InputLabelProps={{
                  shrink: true,
                  style: { fontSize: 20 , color: "#333", fontWeight: "bold"},
                }}
                onChange={(e) => setProductInfo({ ...productInfo, stock: e.target.value })}
              />
              <TextField
                label="URL de imagen"
                value={productInfo.imgURL}
                style={{ marginBottom: "25px" ,  width: "100%"}}
                InputLabelProps={{
                  shrink: true,
                  style: { fontSize: 20 , color: "#333", fontWeight: "bold"},
                }}
                onChange={(e) => setProductInfo({ ...productInfo, imgURL: e.target.value })}
              />
              <TextField
                label="Categoria"
                value={productInfo.category}
                style={{ marginBottom: "10px" ,  width: "100%"}}
                InputLabelProps={{
                  shrink: true,
                  style: { fontSize: 20 , color: "#333", fontWeight: "bold"},
                }}
                onChange={(e) => setProductInfo({ ...productInfo, category: e.target.value })}
              />
            </div>
            
          </form>
          <CardActions disableSpacing>
            <Button className="primary-button" style={{ backgroundColor: "#009EC9" }} onClick={handleUpdate}>Guardar</Button>
          </CardActions>
        </CardContent>
      )}
    </div>
  );
}