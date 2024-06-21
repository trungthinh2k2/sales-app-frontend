import { Box, Button, Card, CardContent, CardMedia, Fab, Typography } from "@mui/material";
import { ProductModel } from "../../../models/product.model";
import LocalMallIcon from '@mui/icons-material/LocalMall';
import { ConvertPrice } from "../../../utils/convert-price";
import { useNavigate } from "react-router-dom";

type ProductCardProps = {
    product: ProductModel;
}

const ProductCard = ({ product }: ProductCardProps) => {
    const navigate = useNavigate();
    return (
        <Card sx={{
            maxWidth: 345,
            border: '2px solid transparent',
            transition: 'border-color 0.2s ease-in-out',
            ':hover': {
                borderColor: 'red',
                cursor: 'pointer'
            }
        }} onClick={() => navigate('/products/' + product.id)}
        >
            <CardMedia
                sx={{ height: 200, resizeMode: 'contain' }}
                image={product?.thumbnail ?? ''}
                // title="{product?.productName ?? ''}"
            />
            <CardContent>
                <Typography gutterBottom
                    sx={{ display: "flex", justifyContent: "center", fontWeight: '600' }}
                >
                    {product?.productName ?? ''}
                </Typography>
                <Typography gutterBottom
                    sx={{ display: "flex", justifyContent: "center", color: 'red' }}>
                    {ConvertPrice(product?.price ?? 0)}
                </Typography>
                <Box sx={{ display: "flex", justifyContent: "center", gap: 1 }}>
                    <Button sx={{
                        display: 'flex', alignItems: 'center',
                        ':hover': {
                            background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
                            color: 'white',

                        }
                    }} onClick={() => navigate('/products/' + product.id)}>
                        Thêm vào giỏ hàng <LocalMallIcon sx={{ ml: 1 }} /></Button>
                </Box>
            </CardContent>
        </Card>
    )
}

export default ProductCard;