import { Box, Button, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { CartItemModel } from "../../../models/cart-item.model";
import { useState } from "react";
import { ConvertPrice } from "../../../utils/convert-price";
import QuantityProduct from "../../../components/user/products/QuantityProduct";

type Props = {
    item: CartItemModel
}

const CartItem = ({ item }: Props) => {
    const navigate = useNavigate();
    const [quantity, setQuantity] = useState<number>(item.quantity);

    const setQuantityProp = (quantity: number) => {
        setQuantity(quantity);
    }
    return (
        <Box sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
            ':hover': {
                backgroundColor: 'secondary.main'
            },
            cursor: 'pointer'
        }} onClick={() => (navigate("/products/" + item.productDetail.product?.id))}>
            <Grid container sx={{
                display: 'flex',
                alignItems: 'center', justifyContent: 'center'
            }}>
                <Grid item xs={2} >
                    <img src={item.productDetail.product?.thumbnail ?? ""} alt={item.productDetail.product?.productName ?? ""} width={"100%"} height={150} />
                </Grid>
                <Grid item xs={2}>
                    <Box>

                    </Box>
                    <Typography sx={{
                        minHeight: '48px',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'normal',
                        pl: 1, pr: 1
                    }}>{item.productDetail.product?.productName}</Typography>
                </Grid>
                <Grid item xs={2}>
                    <Box>
                        <Typography>Màu sắc: {item.productDetail.color.colorName}</Typography>
                    </Box>
                    <Box>
                        <Typography>Kích thước: {item.productDetail.size.numberSize ?? item.productDetail.size.textSize}</Typography>
                    </Box>
                </Grid>
                <Grid item xs={1}>
                    <Typography>{ConvertPrice(item.productDetail.product?.price ?? 0)}</Typography>
                </Grid>
                <Grid item xs={2}>
                    <QuantityProduct cartItem={item} quantity={quantity} setQuantity={setQuantityProp} maxValue={item.productDetail?.quantity ?? 0} />
                </Grid>
                <Grid item xs={2}>
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Typography>{ConvertPrice((item.productDetail.product?.price ?? 0) * (item.quantity ?? 0))}</Typography>
                    </Box>
                </Grid>
                <Grid item xs={1}>
                    <Button variant="contained" color="warning">Xóa</Button>
                </Grid>
            </Grid>
        </Box>
    )
}

export default CartItem;