import React from 'react';
import { useNavigate } from "react-router-dom";
import { RiAddCircleLine } from 'react-icons/ri';
import swal from 'sweetalert';
import { useStateContext } from "../Context/StateContext";
import { sendNewProduct } from '../Services/productInfoServices';
import { FaBarcode, FaTags, FaBoxes, FaImage, FaHeading, FaInfoCircle, FaDollarSign, FaStream } from 'react-icons/fa';


const CreateProduct = () => {
  
  const {ProductInfo, setProductInfo} = useStateContext();
  const { tokenId, setTokenId } = useStateContext();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!tokenId) {
        // Si el token no está inicializado, mostrar un mensaje de error o redirigir al usuario a iniciar sesión
        console.log("El token no está inicializado");
        return;
      }

    if (
      ProductInfo.id &&
      ProductInfo.name &&
      ProductInfo.marca &&
      ProductInfo.description &&
      ProductInfo.price &&
      ProductInfo.imgURL &&
      ProductInfo.cantidad &&
      ProductInfo.category
    ) {
      if (ProductInfo.id < 0 || ProductInfo.price < 0 || ProductInfo.cantidad < 0) {
        swal({
          title: "Debes ingresar únicamente un número positivo",
          text: "",
          icon: "error",
          button: "Aceptar",
          timer: "4500"
        });
      } else {
        try {

            const productData = {
                id: parseInt(ProductInfo.id),
                name: ProductInfo.name,
                marca: ProductInfo.marca,
                description: ProductInfo.description,
                price: parseInt(ProductInfo.price),
                imgURL: ProductInfo.imgURL,
                cantidad: parseInt(ProductInfo.cantidad),
                deleted: false,
                category: ProductInfo.category
              };
              console.log("envio000: ",productData);
              console.log("token: ", tokenId);

          const response = await sendNewProduct(tokenId, productData);
          
          console.log("recibido ",response);
        
          swal({
            title: "Producto creado exitosamente",
            text: "Has creado un nuevo producto y se ha agregado al inventario",
            icon: "success",
            button: "Aceptar",
            timer: "4500"
          });
        } catch (error) {
          swal({
            title: "Error al crear el producto",
            text: "Ha ocurrido un error al crear el producto. Por favor, inténtalo de nuevo.",
            icon: "error",
            button: "Aceptar",
            timer: "4500"
          });
        }
        
      }
    } else {
      swal({
        title: "Debes llenar todos los campos",
        text: "",
        icon: "error",
        button: "Aceptar",
        timer: "4500"
      });
    }
  };

  const handleDevolverClick = () => {
    swal({
        title: "Producto creado exitosamente",
        text:"Has creado un nuevo producto y se ha agregado al inventario",
        icon: "success",
        button:"Aceptar",
        timer: "4500"
      });
  };

  return (
    <div className="form-container-createProduct">
      <form onSubmit={handleSubmit}>
        <div style={{ textAlign: "center", marginTop: "30px", display: "grid", gridTemplateColumns: "auto 1fr auto", alignItems: "center" }}>
          <RiAddCircleLine
            style={{
              fontSize: "32px",
              fontWeight: "bold",
              color: "#333",
              textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
              marginBottom: "10px",
              marginLeft: "150px",
            }}
          />
          <h1
            style={{
              fontSize: "32px",
              fontWeight: "bold",
              color: "#333",
              textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
              marginBottom: "10px"
            }}
          >
            Crea un nuevo producto
          </h1>
          <RiAddCircleLine
            style={{
              fontSize: "32px",
              fontWeight: "bold",
              color: "#333",
              textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
              marginBottom: "10px",
              marginRight: "150px"
            }}
          />
        </div>
        <div style={{ textAlign: "center", marginTop: "5px", marginBottom: "100px", gridTemplateColumns: "auto 1fr auto", alignItems: "center" }}>
          <h2
            style={{
              fontSize: "16px",
              color: "#666",
              textShadow: "1px 1px 2px rgba(0, 0, 0, 0.2)",
              marginLeft: "10px",
              marginRight: "10px"
            }}
          >
            Debes llenar los campos correctamente para crear un nuevo producto
          </h2>
        </div>

        <div className="form-row">
          <div className="column-create-product">
            <div className="form-group">
              <label className="labelCreateProduct" htmlFor="codigo">
                <FaBarcode />
                <div className="label-text">Código:</div>
              </label>
              <input className='createProductInputField'
                type="number"
                id="codigo"
                value={ProductInfo.id}
                onChange={(e) => setProductInfo({ ...ProductInfo, id: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label className="labelCreateProduct" htmlFor="marca">
                <FaTags />
                <div className="label-text">Marca:</div>
              </label>
              <input className='createProductInputField'
                type="text"
                id="marca"
                value={ProductInfo.marca}
                onChange={(e) => setProductInfo({ ...ProductInfo, marca: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label className="labelCreateProduct" htmlFor="existencia">
                <FaBoxes />
                <div className="label-text">Cantidad:</div>
              </label>
              <input className='createProductInputField'
                type="number"
                id="existencia"
                value={ProductInfo.cantidad}
                onChange={(e) => setProductInfo({ ...ProductInfo, cantidad: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label className="labelCreateProduct" htmlFor="urlImagen">
                <FaImage />
                <div className="label-text">URL de la imagen:</div>
              </label>
              <input className='createProductInputField'
                type="text"
                id="urlImagen"
                value={ProductInfo.imgURL}
                onChange={(e) => setProductInfo({ ...ProductInfo, imgURL: e.target.value })}
              />
            </div>
          </div>
          <div className="column-create-product">
            <div className="form-group">
              <label className="labelCreateProduct" htmlFor="nombre">
                <FaHeading />
                <div className="label-text">Nombre:</div>
              </label>
              <input className='createProductInputField'
                type="text"
                id="nombre"
                value={ProductInfo.name}
                onChange={(e) => setProductInfo({ ...ProductInfo, name: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label className="labelCreateProduct" htmlFor="precio">
                <FaDollarSign />
                <div className="label-text">Precio:</div>
              </label>
              <input className='createProductInputField'
                type="number"
                id="precio"
                value={ProductInfo.price}
                onChange={(e) => setProductInfo({ ...ProductInfo, price: e.target.value })}
              />
            </div>
            <div className="form-group">
                <label className="labelCreateProduct" htmlFor="categoria" style={{marginTop:"5px"}} >
                    <FaStream />
                    <div className="label-text">Categoria:</div>
                </label>
                <select
                    id="categoria"
                    value={ProductInfo.category}
                    onChange={(e) => setProductInfo({ ...ProductInfo, category: e.target.value })}
                >
                    <option value="">Selecciona una categoría</option>
                    <option value="Frutas y verduras">Frutas y verduras</option>
                    <option value="Productos lácteos">Productos lácteos</option>
                    <option value="Carnes y aves">Carnes y aves</option>
                    <option value="Granos y cereales">Granos y cereales</option>
                    <option value="Dulces y snacks">Dulces y snacks</option>
                    <option value="Aceites y grasas">Aceites y grasas</option>
                    <option value="Bebidas">Bebidas</option>
                    <option value="Alimentos procesados"></option>
                </select>
                </div>

            <div className="form-group">
              <label className="labelCreateProduct" htmlFor="descripcion" style={{marginTop:"65px"}}>
                <FaInfoCircle />
                <div className="label-text">Descripción:</div>
              </label>
              <textarea
                id="descripcion"
                value={ProductInfo.description}
                onChange={(e) => setProductInfo({ ...ProductInfo, description: e.target.value })}
              ></textarea>
            </div>
          </div>
        </div>
        <button
          className="primary-button"
          onClick={handleSubmit}
          style={{
            backgroundColor: "#009EC9"
          }}
        >
          Crear nuevo producto
        </button>
      </form>
    </div>
  );
};

export default CreateProduct;