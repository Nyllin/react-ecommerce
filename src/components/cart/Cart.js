import { Button, Container, Grid, Typography } from '@material-ui/core'
import React from 'react'
import { Link } from 'react-router-dom';
import CartItem from './cartItem/CartItem';
import useStyles from'./styles'

const Cart = ({cart ,handleUpdateCartQty, handleRemoveFromCart, handleEmptyCart }) => {
    const classes = useStyles();
    const isEmpty = !cart.line_items;
    const EmptyCart = () =>{return(
        <Typography variant="subtitle1">You have no item in shopping cart,
        <Link to="/" className={classes.link}>start adding some!</Link></Typography>
    )};
    const FilledCart = () =>{return(
        <>
        <Grid container spacing={3}>
        {cart.line_items.map((item)=>{return(
            <Grid item xs={12} sm={4}  key={item.id}>
               <CartItem item={item} onUpdateCartQty={handleUpdateCartQty} onRemoveFromCart={handleRemoveFromCart}/>
            </Grid>
           
        )})}
       
        </Grid>
        <div className={classes.cardDetails}>
            <Typography variant='h4'>Subtotal:{cart.subtotal.formatted_with_symbol}</Typography>
            <div>
                <Button className={classes.emptyButton} size='large' type='button' variant='contained' color="secondary" onClick={handleEmptyCart}>Empty Cart</Button>
                <Button component={Link} to='/checkout' className={classes.emptyButton} size='large' type='button' variant='contained' color="primary">Check Out</Button>
            </div>
        </div>
        </>
        )
    }

    if(!cart.line_items) return 'loading...';
  return (
    <Container>
        <div className={classes.toolbar}/>
        <Typography className={classes.title} variant="h3" gutterBottom>Your Shopping Cart</Typography>
        {!cart.line_items.length  ? <EmptyCart/> : <FilledCart/>}
    </Container>
  )
}

export default Cart