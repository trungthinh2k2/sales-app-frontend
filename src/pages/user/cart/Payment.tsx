import { Box, Button, Container, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material"
import { useFormik } from "formik";
import * as yup from 'yup';
import { getUserFromLocalStorage } from "../../../services/user.service";
import { getCartLocalStorage } from "../../../utils/cart-handle";
import { DeliveryMethod, OrderDto, PaymentMethod } from "../../../dtos/resquests/order.dto";
import { UserModel } from "../../../models/user.model";
import { CartItemModel } from "../../../models/cart-item.model";
import { ButtonPrimaryGrandient } from "../../../components/common/ButtonGrandient";
import { createOrder } from "../../../services/order.service";


const validationPaymentSchema = yup.object({
    buyerName: yup.string().required('Vui lòng nhập họ và tên người nhận'),
    phoneNumber: yup.string()
        .required("Vui lòng nhập số điện thoại")
        .matches(/^0[0-9]{9}$/, "Số điện thoại không hợp lệ"),
});

export const Payment = () => {

    const user: UserModel | null = getUserFromLocalStorage();
    const cart: CartItemModel[] = getCartLocalStorage();
    const formikPayment = useFormik({
        initialValues: {
            email: user?.email || '',
            phoneNumber: user?.phoneNumber || '',
            buyerName: user?.name || '',
            address: {
                street: user?.address?.street || '',
                district: user?.address?.district || '',
                city: user?.address?.city || ''
            },
            note: '',
            paymentMethod: PaymentMethod.COD,
            deliveryMethod: DeliveryMethod.ECONOMY,
            productOrders: cart.map((item) => {
                return {
                    productDetailId: item.productDetail.id || 0,
                    quantity: item.quantity,
                }
            })
        },
        validationSchema: validationPaymentSchema,
        onSubmit: async (values: OrderDto) => {
            console.log(values);
            await createOrder(values);
            alert('đặt hàng thành công');
            localStorage.removeItem("cart");
            window.location.href = '/home';
        },
    })
    return (
        <Container>
            <Box sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
            }}>
                <Typography variant="h4">Thông tin thanh toán</Typography>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: '12px',
                }}>
                    <TextField
                        sx={{
                            flex: 1,
                            mt: 1
                        }}
                        label="Tên người nhận"
                        type="text"
                        name="buyerName"
                        value={formikPayment.values.buyerName}
                        onChange={formikPayment.handleChange}
                        onBlur={formikPayment.handleBlur}
                        error={formikPayment.touched.buyerName && Boolean(formikPayment.errors.buyerName)}
                        helperText={formikPayment.touched.buyerName && formikPayment.errors.buyerName}
                    />
                    <TextField
                        sx={{
                            flex: 1,
                            mt: 1
                        }}
                        label="Tên người nhận"
                        type="text"
                        name="buyerName"
                        value={formikPayment.values.buyerName}
                        onChange={formikPayment.handleChange}
                        onBlur={formikPayment.handleBlur}
                        error={formikPayment.touched.buyerName && Boolean(formikPayment.errors.buyerName)}
                        helperText={formikPayment.touched.buyerName && formikPayment.errors.buyerName}
                    />
                    <TextField
                        sx={{
                            flex: 1,
                            mt: 1
                        }}
                        label="Số điện thoại người nhận"
                        type="phone"
                        name="phoneNumber"
                        value={formikPayment.values.phoneNumber}
                        onChange={formikPayment.handleChange}
                        onBlur={formikPayment.handleBlur}
                        error={formikPayment.touched.phoneNumber && Boolean(formikPayment.errors.phoneNumber)}
                        helperText={formikPayment.touched.phoneNumber && formikPayment.errors.phoneNumber}
                    />
                </Box>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: '12px',
                }}>
                    <TextField
                        sx={{
                            flex: 1,
                            mt: 1
                        }}
                        label="Tên đường"
                        name="address.street"
                        value={formikPayment.values.address.street}
                        onChange={(e) => { formikPayment.handleChange(e) }}
                        onBlur={formikPayment.handleBlur}

                    />
                    <TextField
                        sx={{
                            flex: 1,
                            mt: 1
                        }}
                        label="Quận, huyện"
                        name="address.district"
                        value={formikPayment.values.address.district}
                        onChange={(e) => { formikPayment.handleChange(e) }}
                        onBlur={formikPayment.handleBlur}

                    />
                    <TextField
                        sx={{
                            flex: 1,
                            mt: 1
                        }}
                        label="Tỉnh, thành phố"
                        name="address.city"
                        value={formikPayment.values.address.city}
                        onChange={(e) => { formikPayment.handleChange(e) }}
                        onBlur={formikPayment.handleBlur}

                    />
                </Box>
                <FormControl sx={{
                    mt: 2,
                }}>
                    <InputLabel id="paymentMethod">Phương thức thanh toán</InputLabel>
                    <Select
                        labelId="paymentMethod"
                        label="Phương thức thanh toán"
                        name="paymentMethod"
                        value={formikPayment.values.paymentMethod}
                        onChange={formikPayment.handleChange}
                        onBlur={formikPayment.handleBlur}
                        error={formikPayment.touched.paymentMethod && Boolean(formikPayment.errors.paymentMethod)}
                    >
                        <MenuItem value={PaymentMethod.COD}>Thanh toán khi nhận hàng</MenuItem>
                        <MenuItem value={PaymentMethod.CC}>Thanh toán bằng ví điện tử</MenuItem>
                    </Select>
                </FormControl>
                <FormControl sx={{
                    mt: 2,
                }}>
                    <InputLabel id="deliveryMethod">Phương thức vận chuyển</InputLabel>
                    <Select
                        labelId="deliveryMethod"
                        label="Phương thức thanh toán"
                        name="deliveryMethod"
                        value={formikPayment.values.deliveryMethod}
                        onChange={formikPayment.handleChange}
                        onBlur={formikPayment.handleBlur}
                        error={formikPayment.touched.deliveryMethod && Boolean(formikPayment.errors.deliveryMethod)}
                    >
                        <MenuItem value={DeliveryMethod.EXPRESS}>Giao hàng nhanh</MenuItem>
                        <MenuItem value={DeliveryMethod.ECONOMY}>Giao hàng tiết kiệm</MenuItem>
                    </Select>
                </FormControl>

                <Box sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    mt: 2
                }}>
                    <ButtonPrimaryGrandient variant="contained" sx={{ width: '200px' }} onClick={() => formikPayment.submitForm()}>Đặt hàng</ButtonPrimaryGrandient>
                </Box>

            </Box>
        </Container >
    )
}