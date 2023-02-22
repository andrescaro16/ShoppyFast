//Formato de tarjeta de productos
const ProductCard = ({product}) => {
    return (
    <div className="product">
        <div className="left" style={{ backgroundImage: `url(${product.imgURL})` }}></div>
        <div className="right">
            <h5>{product.name}</h5>
            <p>{product.marca}</p>
            <p>{product.description}</p>
            <p> <strong>Precio:</strong> {product.price}</p>
            <p> <strong>Cantidad:</strong> {product.cantidad}</p>
        </div>
    </div>);
}

export default ProductCard;