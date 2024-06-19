import { Alert, Box, Button, Paper, Snackbar, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import ButtonGrandient from "../../../components/common/ButtonGrandient";
import { ProviderModel } from "../../../models/provider.model";
import { useEffect, useState } from "react";
import { ResponseSuccess } from "../../../dtos/responses/response.susscess";
import { getProviders } from "../../../services/provider.service";
import DialogDeleteProvider from "../../../components/admin/dialogs/providers/DialogDeleteProvider";

const Provider = () => {
    const [providers, setProviders] = useState<ProviderModel[]>([]);
    const [openDelete, setOpenDelete] = useState(false);
    const [provider, setProvider] = useState<ProviderModel>({});
    const [openAlert, setOpenAlert] = useState({
        show: false,
        status: '',
        message: ''
    });


    const handleCloseDelete = () => {
        setOpenDelete(false);
    }

    const deleteProvider = (provider: ProviderModel) => {
        setProviders(prev => prev.filter((item) => item.id !== provider.id));
    }

    useEffect(() => {
        (async () => {
            try {
                const response: ResponseSuccess<ProviderModel[]> = await getProviders();
                setProviders(response.data);
            } catch (error) {
                console.log(error);
            }
        })()
    }, []);

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
        <Box sx={{p: 2}}>
            <Typography variant="h5">Danh sách nhà cung cấp</Typography>
            <Box>
                <ButtonGrandient variant="contained">Thêm nhà cung cấp</ButtonGrandient>
                {openDelete && <DialogDeleteProvider open={openDelete} handleClose={handleCloseDelete} deleteProvider={deleteProvider} provider={provider} showAlert={showAlert}/>}
                
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
                    <Table sx={{ minWidth: 650 }} aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell align={'center'}>Id</TableCell>
                                <TableCell align={'center'}>Tên nhà cung cấp</TableCell>
                                <TableCell align={'center'}>Số điện thoại</TableCell>
                                <TableCell align={'center'}>Email</TableCell>
                                <TableCell align={'center'}>Địa chỉ</TableCell>
                                <TableCell align={'center'}>Trạng thái</TableCell>
                                <TableCell align={'center'}>Thao tác</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {providers.map((provider: ProviderModel) => (
                                <TableRow key={provider.id}>
                                    <TableCell align={'center'}>{provider.id}</TableCell>
                                    <TableCell align={'center'}>{provider.providerName}</TableCell>
                                    <TableCell align={'center'}>{provider.phoneNumber}</TableCell>
                                    <TableCell align={'center'}>{provider.email}</TableCell>
                                    <TableCell align={'center'}>{provider.address?.street + ', ' + provider.address?.district + ', ' + provider.address?.city}</TableCell>
                                    <TableCell align={'center'}>{provider.status}</TableCell>
                                    <TableCell align={'center'}>
                                        <Button color={'success'}
                                        >Cập nhật</Button>
                                        <Button onClick={() => {setOpenDelete(true), setProvider(provider)}}>Xóa</Button>
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

export default Provider;