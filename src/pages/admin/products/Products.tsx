import { Box, MenuItem, Pagination, Select, Stack, Typography } from "@mui/material";
import SearchInput from "../../../components/admin/search-input/SearchInput";
import ProductCard from "../../../components/admin/cards/ProductCard";
import ButtonGrandient from "../../../components/common/ButtonGrandient";
import { useNavigate } from "react-router-dom";
import { ProductModel } from "../../../models/product.model";
import { useEffect, useState } from "react";
import { ResponseSuccess } from "../../../dtos/responses/response.susscess";
import { getProducts } from "../../../services/product.service";

const Products = () => {
    const navigate = useNavigate();
    const fNavigateUpdate = (id: number) => {
        navigate('update/' + id);
    }
    const fNavigateDelete = (id: number) => {
        navigate('delete/' + id);
    }

    const [products, setProducts] = useState<ProductModel[]>([]);

    useEffect(() => {
        (async () => {
            try {
                const response: ResponseSuccess<ProductModel[]> = await getProducts();
                setProducts(response.data);
            } catch (error) {
                console.log(error);
            }
        })()
    }, []);

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', p: 2 }}>
            <Box>
                <Typography variant="h6">Danh sách sản phẩm</Typography>
                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                    <ButtonGrandient variant="contained" onClick={() => navigate("create")}>Thêm sản phẩm</ButtonGrandient>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Box>
                        <SearchInput placeHolder="Nhập sản phẩm cần tìm..."></SearchInput>
                    </Box>
                    <Box>
                        <Select
                            size="small">
                            <MenuItem value="1">Sản phẩm đang hoạt động</MenuItem>
                            <MenuItem value="2">Sản phẩm ngừng hoạt động</MenuItem>
                        </Select>
                    </Box>
                </Box>
                <Box sx={{
                    display: 'flex',
                    gap: '12px',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    p: 0.5
                }}>
                    {products.map((product: ProductModel, index: number) => (
                        <Box sx={{ width: '260px' }} key={index}>
                            <ProductCard
                                productId={product.id ?? 0}
                                productName={product.productName ?? ''}
                                productPrice={product.price ?? 0}
                                fNavigateUpdate={fNavigateUpdate}
                                fNavigateDelete={fNavigateDelete}
                                thumbnail={product.thumbnail ?? ''}
                            />
                        </Box>
                    ))}
                </Box>
                <Box sx={{
                    display: 'flex', alignItems: 'center',
                    width: '100%', justifyContent: 'flex-end',
                    mt: 2, bottom: 0
                }}>
                    <Stack spacing={2} sx={{ display: "flex", flexDirection: "flex-end" }}>
                        <Pagination count={10} showFirstButton showLastButton color={"primary"} />
                    </Stack>
                </Box>
            </Box>


        </Box>
    )
}

export default Products;