import React from 'react'
import { Link } from 'react-router-dom';
import logo from "../Assets/Images/ShoppyfastLogo2.png";
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';

import { useStateContext } from '../Context/StateContext';


function Navbar() {

	const { itemCantidad } = useStateContext();

	return (
		<nav className='navbar-app'>
			<div className='navbar-left'>
				<Link to="/" className='link-class'>
					<div>
						<img src={logo} alt='ShoppyFast Logo' />
						<p>ShoppyFast</p>
					</div>
				</Link>
				<ul>
					<li>
						<Link to="/" className='link-class'>
							<p>Home</p>
						</Link>
					</li>
					<li>
						<Link to="/administrador/home" className='link-class'>
							<p>Administrador</p>
						</Link>
					</li>
				</ul>
			</div>
			<div className='navbar-right'>
				<div className='figure-container'>
					<Link to='/carrito' className='link-class'>
						<figure>
							<ShoppingCartRoundedIcon />
							<div>{itemCantidad}</div>
						</figure>
					</Link>
				</div>
			</div>
		</nav>
	);
}

export default Navbar;