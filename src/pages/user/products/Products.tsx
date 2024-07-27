import { Box, Container, Pagination, Typography } from "@mui/material"
import { useEffect, useState } from "react";
import { getPageProducts } from "../../../services/product.service";
import { ProductUserResponse } from "../../../dtos/responses/products/productUser-response";
import ProductCard from "../../../components/user/cards/ProductCard";
import { useLocation, useNavigate } from "react-router-dom";

const Products = () => {
    const [productSales, setProductSales] = useState<ProductUserResponse[]>([]);
    const [totalPage, setTotalPage] = useState(1);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const pageNo = queryParams.get("pageNo") ? Number(queryParams.get("pageNo")) : 1;
    const [pageNoState, setPageNoState] = useState(pageNo);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchData = async () => {
            const response = await getPageProducts(pageNoState, 5);
            console.log(response);
            if (response.status === 200) {
                setProductSales(response.data.data);
                setTotalPage(response.data.totalPage);
            }
        };
        fetchData();
    }, [pageNoState]);
    const handleChange = (_event: React.ChangeEvent<unknown>, value: number) => {
        setPageNoState(value);
        navigate('?pageNo=' + value);
    };

    return (
        <Box>
            {productSales.length > 0 &&
                <Container>
                    <Typography variant="h6" sx={{
                        color: 'red', p: 2,
                        transition: 'opacity 0.5s ease-in-out',
                    }}>Danh sách quần áo</Typography>
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
                </Container>}
            <Box sx={{ display: 'flex', justifyContent: 'center', m: 2 }}>
                {totalPage > 1 && <Pagination count={totalPage} page={pageNo} variant="outlined" shape="rounded"
                    onChange={handleChange}
                />}
            </Box>

        </Box>
    );
}

export default Products;