import { Box, Button, Container, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import ProductCard from "../../../components/user/cards/ProductCard";
import { getPageProducts } from "../../../services/product.service";
import { primaryGradient } from "../../../theme";
import Carousel from "../../../components/user/carousels/Carousel";
import { ProductUserResponse } from "../../../dtos/responses/products/productUser-response";

const Home = () => {
    const [productSales, setProductSales] = useState<ProductUserResponse[]>([]);

    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const interval = setInterval(() => {
            setIsVisible(prev => !prev);
        }, 500);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            const response = await getPageProducts();
            if (response.status === 200) {
                setProductSales(response.data.data);
            }
        };
        fetchData();
    }, []);

    return (
        <Box>
            <Carousel />
            {productSales.length > 0 &&
                <Container>
                    <Typography
                        variant="h6" sx={{
                            color: 'red', p: 2,
                            opacity: isVisible ? 1 : 0,
                            transition: 'opacity 0.5s ease-in-out',
                        }}>
                        Sản phẩm khuyến mãi
                    </Typography>
            

                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '30px', justifyContent: 'center' }}>
                        {productSales.map((product: ProductUserResponse) => (
                            <Box key={product.product.id}
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
                        {productSales.map((product: ProductUserResponse) => (
                            <Box key={product.product.id}
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
        </Box>
    );
}

export default Home;