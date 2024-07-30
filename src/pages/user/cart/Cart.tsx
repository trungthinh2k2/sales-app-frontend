import { Box, Button, Container, Drawer, Typography } from "@mui/material"
import CartEmpty from "./CartEmpty";
import { useSelector } from "react-redux";
import { CartItemModel } from "../../../models/cart-item.model";
import CartItem from "./CartItem";
import { RootState } from "../../../redux/store/store";
import { ConvertPrice } from "../../../utils/convert-price";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { isLoginAccount } from "../../../services/user.service";
import { Payment } from "./Payment";

const Cart = () => {

    const cart = useSelector((state: RootState) => state.cart.items);
    const [totalMoney, setTotalMoney] = useState<number>(0);
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);

    useEffect(() => {
        let total = 0;
        cart.forEach((cartItem: CartItemModel) => {
            total += (cartItem.productDetail.product?.price ?? 0) * (cartItem.quantity ?? 0);
        });
        setTotalMoney(total);
    }, [cart]);

    const openDrawer = () => {
        if (!isLoginAccount()) {
            navigate('/auth/login', { state: { from: '/cart' } });
        }
        setOpen(true);
    }

    return (
        <Container>
            {cart.length > 0 ? <>
                <Box>
                    <Typography variant="h4">Giỏ hàng</Typography>
                    {cart.map((cartItem: CartItemModel, index: number) => (
                        <CartItem key={index} item={cartItem} />
                    ))}
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', mb: 2 }}>
                    <Typography sx={{ fontWeight: 600, mr: '30px', color: 'red' }}>Tổng thanh toán: {ConvertPrice(totalMoney)}</Typography>
                    <Button color="success" variant="contained" onClick={openDrawer}>Thanh toán</Button>
                </Box>
                <Drawer
                    anchor={'bottom'}
                    open={open}
                    onClose={() => setOpen(false)}
                >
                    <Payment></Payment>
                </Drawer>
            </> : <CartEmpty />}
            <Box>
            </Box>
        </Container>

    )
}

export default Cart;    
