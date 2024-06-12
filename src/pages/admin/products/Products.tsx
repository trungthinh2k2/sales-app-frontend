import { Box, Pagination, Select, Stack, Typography } from "@mui/material";
import SearchInput from "../../../components/admin/search-input/SearchInput";
import ProductCard from "../../../components/admin/cards/ProductCard";
import ButtonGrandient from "../../../components/common/ButtonGrandient";
import { useNavigate } from "react-router-dom";

function createData(id: number, name: string, price: number, fNavigate: void) {
    return { id, name, price};
}

const rows = [
    createData(1, 'Áo khoác nam', 159),
    createData(2, 'Áo khoác nam', 159),
    createData(3, 'Áo khoác nam', 159),
    createData(4, 'Áo khoác nam', 159),
    createData(5, 'Áo khoác nam', 159),
    createData(6, 'Áo khoác nam', 159),
    createData(7, 'Áo khoác nam', 159),
    createData(8, 'Áo khoác nam', 159),
];

const Products = () => {
    const navigate = useNavigate();
    const fNavigate = (id: number) => {
        navigate('update/' + id);
    }
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', p: 2 }}>

            <Box>
                <Typography variant="h6">Danh sách sản phẩm</Typography>
                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                    <ButtonGrandient onClick={() => navigate("create")}>Thêm sản phẩm</ButtonGrandient>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Box>
                        <SearchInput placeHolder="Nhập sản phẩm cần tìm..."></SearchInput>
                    </Box>
                    <Box>
                        <Select size="small">
                            <option value="1">Sắp xếp theo giá tăng dần</option>
                            <option value="2">Sắp xếp theo giá giảm dần</option>
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
                    {rows.map((item: any, index: number) => (
                        <Box sx={{ width: '260px' }} key={index}>
                            <ProductCard
                                productId={item.id}
                                productName={item.name}
                                productPrice={item.price}
                                fNavigate={fNavigate}
                            />
                        </Box>
                    ))}
                </Box>
            </Box>
            <Box sx={{
                display: 'flex', alignItems: 'center',
                width: '100%', justifyContent: 'flex-end',
                mt: 2
            }}>
                <Stack spacing={2} sx={{ display: "flex", flexDirection: "flex-end" }}>
                    <Pagination count={10} showFirstButton showLastButton color={"primary"} />
                </Stack>
            </Box>

        </Box>
    )
}

export default Products;