import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import ButtonGrandient from "../../../components/common/ButtonGrandient";

const Category = () => {
    return (
        <Box sx={{ p: 2 }}>
            <Typography variant="h5">Loại sản phẩm</Typography>
            <Box>
                <ButtonGrandient variant="contained" >Thêm loại sản phẩm</ButtonGrandient>

                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Id</TableCell>
                                <TableCell >Tên loại sản phẩm</TableCell>
                                <TableCell >Trạng thái</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        <TableRow>
                                <TableCell>1</TableCell>
                                <TableCell >Áo</TableCell>
                                <TableCell >ACTIVE</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Box>
    )
}

export default Category;    