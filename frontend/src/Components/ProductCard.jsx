import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

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

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    
  return (
    <div className='product-card'>
        <Card sx={{ width: 340, border: "1px solid #ddd", borderRadius: 5, boxShadow: "2px 3px 2px rgba(0, 0, 0, 0.18)", "background-color": "#ebebeb" }} >

            <CardMedia
                component="img"
                height="300"
                image={product.imgURL}
                alt="Paella dish"

            />

            <div className='card-content-container'>
                <CardContent style={{maxHeight: "100px"}}>
                    <h5 className='product-name'>{product.name}</h5>
                    <p className='product-price'>${product.price}</p>
                </CardContent>

                <CardActions disableSpacing>
                    <IconButton aria-label="add to cart">
                        <AddShoppingCartIcon sx={{ color: red[500], fontSize: 38 }} onClick={() => setCarrito(agregarProducto(product, 1, carrito))}/>
                    </IconButton>
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

        </Card>
    </div>
  );
}