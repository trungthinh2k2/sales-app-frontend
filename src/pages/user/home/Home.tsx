import { Box, Button, Container, Typography } from "@mui/material";
import { ProductModel } from "../../../models/product.model";
import { useEffect, useState } from "react";
import ProductCard from "../../../components/user/cards/ProductCard";
import { ResponseSuccess } from "../../../dtos/responses/response.susscess";
import { getProducts } from "../../../services/product.service";
import { primaryGradient } from "../../../theme";
import Carousel from "../../../components/user/carousels/Carousel";


const Home = () => {
    const [productSales, setProductSales] = useState<ProductModel[]>([]);

    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const interval = setInterval(() => {
            setIsVisible(prev => !prev);
        }, 500);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        (async () => {
            try {
                const response: ResponseSuccess<ProductModel[]> = await getProducts();
                setProductSales(response.data);
            } catch (error) {
                console.log(error);
            }
        })()
    }, []);

    return (
        <Box>
            <Carousel />
            {productSales.length > 0 &&
                <Container>
                    <Typography variant="h6" sx={{
                        color: 'red', p: 2,
                        opacity: isVisible ? 1 : 0,
                        transition: 'opacity 0.5s ease-in-out',
                    }}>
                        Sản phẩm khuyến mãi
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '30px', justifyContent: 'center' }}>
                        {productSales.map((product: ProductModel) => (
                            <Box key={product.id}
                                sx={{
                                    flexBasis: '250px',
                                }}>
                                <ProductCard product={product}></ProductCard>
                            </Box>
                        ))}
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'center', m: 2 }}>
                        <Button sx={{
                            width: '200px',
                            ':hover': {
                                background: primaryGradient,
                                color: 'white',
                            }
                        }}>Xem thêm</Button>
                    </Box>
                </Container>}




            {productSales.length > 0 &&
                <Container>
                    <Typography variant="h6" sx={{
                        color: 'red', p: 2,
                        opacity: isVisible ? 1 : 0,
                        transition: 'opacity 0.5s ease-in-out',
                    }}>Quần áo nam</Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '30px', justifyContent: 'center' }}>
                        {productSales.map((product: ProductModel) => (
                            <Box key={product.id}
                                sx={{
                                    flexBasis: '250px',
                                    // ':hover': {
                                    //     boxShadow: '0 0 10px 0 #ccc',
                                    // }
                                }}>
                                <ProductCard product={product}></ProductCard>
                            </Box>
                        ))}
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'center', m: 2 }}>
                        <Button sx={{
                            width: '200px',
                            ':hover': {
                                background: primaryGradient,
                                color: 'white',
                            }
                        }}>Xem thêm</Button>
                    </Box>
                </Container>}
        </Box>
    );
}

export default Home;