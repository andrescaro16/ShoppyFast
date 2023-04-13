import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { useStateContext } from '../Context/StateContext';

export default function Quantity({handleAddToCart}) {
  
  const { openQuantity, setOpenQuantity, setCantidadConfirmDialog } = useStateContext();


  const handleClose = () => {
    setOpenQuantity(false);
  };

  
  return (
    <div>
      <Dialog open={openQuantity} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Cantidad</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Ingresa la cantidad que deseas añadir al carrito
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Cantidad"
            type="number"
            onChange={(e) => setCantidadConfirmDialog(Number(e.target.value))}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleAddToCart} color="primary">
            Añadir al carrito
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
