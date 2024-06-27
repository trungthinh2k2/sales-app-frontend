import { Box, Button, Container, Typography } from "@mui/material"
import CartEmpty from "./CartEmpty";
import { useSelector } from "react-redux";
import { CartItemModel } from "../../../models/cart-item.model";
import CartItem from "./CartItem";
import { RootState } from "../../../redux/store/store";
import { ConvertPrice } from "../../../utils/convert-price";
import { useEffect, useState } from "react";

const Cart = () => {

    const cart = useSelector((state: RootState) => state.cart.items);
    const [totalMoney, setTotalMoney] = useState<number>(0);
    useEffect(() => {
        let total = 0;
        cart.forEach((cartItem: CartItemModel) => {
            total += (cartItem.productDetail.product?.price ?? 0) * (cartItem.quantity ?? 0);
        });
        setTotalMoney(total);
    }, [cart]);
    return (
        <Container>
            {cart.length > 0 ? <>
                <Box>
                    <Typography variant="h4">Giỏ hàng</Typography>
                    {cart.map((cartItem: CartItemModel, index: number) => (
                        <CartItem key={index} item={cartItem} />
                    ))}
                </Box>
                <Box sx={{display: 'flex', justifyContent: 'flex-end', alignItems: 'center', mb: 2}}>
                    <Typography sx={{ fontWeight: 600, mr: '30px', color: 'red'}}>Tổng thanh toán: {ConvertPrice(totalMoney)}</Typography>
                    <Button color="success" variant="contained">Mua hàng</Button>
                </Box>
            </> : <CartEmpty />}
            <Box>
            </Box>
        </Container>

    )
}

export default Cart;    
