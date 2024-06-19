import { Alert, Box, Button, Paper, Snackbar, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, useMediaQuery } from "@mui/material";
import ButtonGrandient from "../../../components/common/ButtonGrandient";
import { useEffect, useState } from "react";
import { ResponseSuccess } from "../../../dtos/responses/response.susscess";
import { CategoryModel } from "../../../models/category.model";
import { getCategories } from "../../../services/category.service";
import DialogCreateCategory from "../../../components/admin/dialogs/categories/DialogCreateCategory";
import DialogDeleteCategory from "../../../components/admin/dialogs/categories/DialogDeleteCategory";
import DialogUpdateCategory from "../../../components/admin/dialogs/categories/DialogUpdateCategory";

const Category = () => {
    const [open, setOpen] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [openUpdate, setOpenUpdate] = useState(false);
    const [categories, setCategories] = useState<CategoryModel[]>([]);
    const [category, setCategory] = useState<CategoryModel>({});
    const [openAlert, setOpenAlert] = useState({
        show: false,
        status: '',
        message: ''
    });
    const isMobile = useMediaQuery('(max-width:600px)');

    const handleClose = () => {
        setOpen(false);
    }
    const handleCloseDelete = () => {
        setOpenDelete(false);
    }
    const handleCloseUpdate = () => {
        setOpenUpdate(false);
    }

    useEffect(() => {
        (async () => {
            try {
                const response: ResponseSuccess<CategoryModel[]> = await getCategories();
                setCategories(response.data);
            } catch (error) {
                console.log(error);
            }
        })();
    }, []);

    const addCategory = (category: CategoryModel) => {
        setCategories(prev => [...prev, category]);
    }

    const deleteCategory = (category: CategoryModel) => {
        setCategories(prev => prev.filter((item) => item.id !== category.id));
    }

    const updateCategory = (category: CategoryModel) => {
        setCategories(prev => {
            const oldCategory = prev.filter((item) => category.id === item.id);
            const index = prev.indexOf(oldCategory[0]);
            prev[index] = category;
            return prev;
        });
    }

    const showAlert = (status: string, message: string) => {
        setOpenAlert(
            {
                show: true,
                status: status,
                message: message
            }
        )
    }

    return (
        <Box sx={{ p: 2 }}>
            <Typography variant="h5">Loại sản phẩm</Typography>
            <Box>
                <ButtonGrandient variant="contained" onClick={() => { setOpen(true) }}>Thêm loại sản phẩm</ButtonGrandient>
                {open && <DialogCreateCategory addCategory={addCategory} open={open} handleClose={handleClose} showAlert={showAlert} />}
                {openDelete && <DialogDeleteCategory deleteCategory={deleteCategory} open={openDelete} handleClose={handleCloseDelete} category={category} showAlert={showAlert} />}
                {openUpdate && <DialogUpdateCategory updateCategory={updateCategory} open={openUpdate} handleClose={handleCloseUpdate} category={category} showwAlert={showAlert} />}
                {openAlert.show && <Snackbar
                    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                    open={openAlert.show} autoHideDuration={3000} onClose={() => setOpenAlert({
                        show: false,
                        status: '',
                        message: ''
                    })}>
                    <Alert
                        severity={openAlert.status === 'success' ? 'success' : 'error'}
                        variant="filled"
                        sx={{ width: '100%' }}
                    >
                        {openAlert.message}
                    </Alert>
                </Snackbar>}
                <TableContainer component={Paper}>
                    <Table  size={isMobile ? 'small' : 'medium'} aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell align={'center'}>Id</TableCell>
                                <TableCell align={'center'}>Tên loại sản phẩm</TableCell>
                                <TableCell align={'center'}>Trạng thái</TableCell>
                                <TableCell align={'center'}>Thao tác</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {categories.map((category: CategoryModel) => (
                                <TableRow key={category.id}>
                                    <TableCell align={'center'}>{category.id}</TableCell>
                                    <TableCell align={'center'}>{category.categoryName}</TableCell>
                                    <TableCell align={'center'}>{category.status}</TableCell>
                                    <TableCell align={'center'}>
                                        <Button color={'success'}
                                            onClick={() => { setOpenUpdate(true), setCategory(category) }}
                                        >Cập nhật</Button>
                                        <Button onClick={() => { setOpenDelete(true), setCategory(category) }} >Xóa</Button>
                                    </TableCell>

                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Box>
    )
}

export default Category;    