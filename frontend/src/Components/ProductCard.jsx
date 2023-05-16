import * as React from 'react';
import { Button, Badge, ButtonGroup } from 'reactstrap';
import { styled } from '@mui/material/styles';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddShoppingCartRoundedIcon from '@mui/icons-material/AddShoppingCartRounded';

import { useStateContext } from "../Context/StateContext";


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

    const { carrito, setCarrito, agregarProducto } = useStateContext();

    const [expanded, setExpanded] = React.useState(false);
    const [quantity, setQuantity] = React.useState(1);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    
  return (
    <div className='product-card'>

            <img src={product.imgURL} alt="Product Image" />

            <div className='card-content-container'>
                <CardContent style={{maxHeight: "100px", marginBottom: "4px"}}>
                    <h5 className='product-name'>{product.name}</h5>
                    <p className='product-price'>${product.price}</p>
                    <br/>
                </CardContent>

                <CardActions disableSpacing className='cart-actions'>
                    <IconButton aria-label="add to cart">
                        <AddShoppingCartRoundedIcon className='material-icons red' sx={{ fontSize: 38 }} onClick={() => setCarrito(agregarProducto(product, quantity, carrito))}/>
                    </IconButton>
                    <ButtonGroup>
                        <Button className="primary-button" color="primary" onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}>-</Button>
                        <Badge className='button-group center' color="primary">{quantity}</Badge>
                        <Button  className="primary-button" color="primary" onClick={() => setQuantity((quantity + 1) <= product.cantidad ? quantity + 1 : quantity)}>+</Button>
                    </ButtonGroup>
                    <ExpandMore expand={expanded} onClick={handleExpandClick} aria-expanded={expanded} aria-label="show more">
                        <ExpandMoreIcon />
                    </ExpandMore>
                </CardActions>
            </div>

            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <Typography>
                        <h6>{product.marca}</h6>
                        <p>{product.description}</p>
                        <h6><strong>Stock:</strong>{product.cantidad}</h6>
                    </Typography>
                </CardContent>
            </Collapse>

    </div>
  );
}