import { Box, Button, Card, CardContent, CardMedia, Typography } from "@mui/material";
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
            position: 'relative',
            ':hover': {
                borderColor: 'red',
                cursor: 'pointer'
            }
        }} onClick={() => navigate('/products/' + product.id)}
        >
            <Box sx={{
                position: 'absolute',
                top: 0, p: 1,
                borderRadius: '0px 0px 5px 0px',
                background: 'red',
            }}> <Typography sx={{
                color: '#fff',
                fontSize: '10px'
            }}>Sale off 40%</Typography></Box>
            <CardMedia
                sx={{ height: 200, resizeMode: 'contain' }}
                image={product?.thumbnail ?? ''}
            />
            <CardContent>
                <Typography gutterBottom
                    sx={{
                        fontWeight: '600', 
                        minHeight: '48px',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'normal',
                    }}
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