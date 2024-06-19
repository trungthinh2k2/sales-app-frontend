import { Box, Button, FormControl, ImageList, ImageListItem, InputLabel, MenuItem, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import styled from "styled-components";
import { CategoryModel } from "../../../models/category.model";
import { useEffect, useState } from "react";
import { ResponseSuccess } from "../../../dtos/responses/response.susscess";
import { getCategories } from "../../../services/category.service";
import { ProviderModel } from "../../../models/provider.model";
import { getProviders } from "../../../services/provider.service";
import { useFormik } from "formik";
import { ProductDto } from "../../../dtos/resquests/product.dto";
import { createProduct } from "../../../services/product.service";
import { ProductModel } from "../../../models/product.model";
import * as yup from 'yup';
import { ColorModel } from "../../../models/color.model";
import { getColors } from "../../../services/color.service";
import { SizeModel } from "../../../models/size.model";
import { getSize } from "../../../services/size.service";
import { ProductDetailDto } from "../../../dtos/resquests/product-detail.dto";
import { createProductDetail } from "../../../services/product-detail.service";
import ProductImage from "../../../components/admin/products/ProductImage";

const VisuallyHiddenInput = styled('input')({
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

const validationProductSchema = yup.object({
    productName: yup.string().required('Vui lòng nhập tên sản phẩm'),
    price: yup.number().min(1, 'Giá phải lớn hơn 0').required('Vui lòng nhập giá'),
    categoryId: yup.string().required('Vui lòng chọn loại sản phẩm'),
    providerId: yup.string().required('Vui lòng chọn nhà cung cấp'),
});

const validationProductDetailSchema = yup.object({
    colorId: yup.string().required('Vui lòng chọn màu sắc'),
    sizeId: yup.string().required('Vui lòng chọn kích thước'),
    quantity: yup.number().min(1, 'Số lượng phải lớn hơn 0').required('Vui lòng nhập số lượng'),
});

const CreateProduct = () => {
    const [categories, setCategories] = useState<CategoryModel[]>([]);
    const [providers, setProviders] = useState<ProviderModel[]>([]);
    const [colors, setColors] = useState<ColorModel[]>([]);
    const [sizes, setSizes] = useState<SizeModel[]>([]);
    const [images, setImages] = useState<File[]>([]);
    const [urls, setUrls] = useState<string[]>([]);
    const [thumbnail, setThumbnail] = useState<number>(1);
    const [productDetailDtos, setProductDetailDtos] = useState<ProductDetailDto[]>([]);

    useEffect(() => {
        (async () => {
            try {
                const response: ResponseSuccess<CategoryModel[]> = await getCategories();
                setCategories(response.data);
                const responseProvider: ResponseSuccess<ProviderModel[]> = await getProviders();
                setProviders(responseProvider.data);
                const responseColor: ResponseSuccess<ColorModel[]> = await getColors();
                setColors(responseColor.data);
                const responseSize: ResponseSuccess<SizeModel[]> = await getSize();
                setSizes(responseSize.data);
            } catch (error) {
                console.log(error);
            }
        })();
    }, []);

    const setThumbnailImage = (index: number) => {
        setThumbnail(index);
    }

    const handleSubmit = () => {
        formik.handleSubmit();
    }

    const addProductDetail = () => {
        formikProductDetail.handleSubmit();
    }

    const handleChangeImages = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            setImages([...images, ...Array.from(files)]);
            const imageUrls = Array.from(files).map(file => URL.createObjectURL(file));
            setUrls(prev => [...prev, ...imageUrls]);
        }
    }

    const formik = useFormik({
        initialValues: {
            productName: '',
            price: 0,
            description: '',
            // categoryId: 0,
            // providerId: 0,
            thumbnail: '',
        },
        validationSchema: validationProductSchema
        ,
        onSubmit: async (values: ProductDto, {resetForm}) => {
            const formData = new FormData();
            formData.append('productName', values.productName ? values.productName : '');
            formData.append('price', values.price ? values.price.toString() : '0');
            formData.append('description', values.description ? values.description : '');
            formData.append('categoryId', values.categoryId ? values.categoryId.toString() : '0');
            formData.append('providerId', values.providerId ? values.providerId.toString() : '0');
            formData.append('thumbnail',thumbnail.toString());
            images.forEach((image) => {
                formData.append(`images`, image, image.name);
            });

            try {
                const response: ResponseSuccess<ProductModel> = await createProduct(formData);
                console.log("Response: ", response);
                const productId = response.data.id;
                const productDetails = productDetailDtos.map((dto: ProductDetailDto) => {
                    return { ...dto, productId: productId };
                })
                for (const productDetailDto of productDetails) {
                    await createProductDetail(productDetailDto);
                }
                setImages([]);
                setUrls([]);
                setProductDetailDtos([]);
                resetForm();
            } catch (error) {
                console.log(error);
            }
        }
    });

    const formikProductDetail = useFormik({
        initialValues: {
            colorId: '',
            sizeId: '',
            quantity: 0,
        },
        validationSchema: validationProductDetailSchema
        ,
        onSubmit: (values: ProductDetailDto, { resetForm }) => {
            setProductDetailDtos(prev => {
                const productDto: ProductDetailDto | undefined = prev.find((dto: ProductDetailDto) => {
                    return dto.sizeId === values.sizeId && dto.colorId === values.colorId;
                });
                if (productDto) {
                    productDto.quantity = (productDto?.quantity ?? 0) + (values?.quantity ?? 0);
                } else {
                    prev.push(values);
                }
                return prev;
            });
            resetForm();
        },
    });

    const removeImage = (index: number) => {
        setUrls(prev => {
            const newUrls = prev.filter(url => url !== prev[index]);
            return newUrls;
        });
        setImages(prev => {
            const newImages = prev.filter(img => img !== prev[index]);
            return newImages;
        });
    }

    return (
        <Box sx={{ p: 2 }} component='form'>
            <Typography variant="h5">Thêm sản phẩm</Typography>
            <Box sx={{
                p: 2,
                display: 'flex',
                flexWrap: 'wrap',
                gap: '20px'
            }}>
                <TextField
                    sx={{
                        flexBasis: '200px',
                        display: 'flex',
                        flexGrow: 1
                    }}
                    id="product-name"
                    label="Tên sản phẩm"
                    name="productName"
                    value={formik.values.productName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.productName && Boolean(formik.errors.productName)}
                    helperText={formik.touched.productName && formik.errors.productName}
                />
                <TextField
                    sx={{
                        flexBasis: '200px',
                        display: 'flex',
                        flexGrow: 1
                    }}
                    id="product-price"
                    label="Giá"
                    type="number"
                    name="price"
                    value={formik.values.price}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.price && Boolean(formik.errors.price)}
                    helperText={formik.touched.price && formik.errors.price}
                />
            </Box>
            <Box sx={{
                p: 2, display: 'flex',
                flexWrap: 'wrap',
                gap: '20px'

            }}>
                <FormControl sx={{
                    flexBasis: '200px',
                    display: 'flex',
                    flexGrow: 1
                }}>
                    <InputLabel id="categories">Loại sản phẩm</InputLabel>
                    <Select
                        labelId="categories"
                        id="categories"
                        label="Loại sản phẩm"
                        name="categoryId"
                        value={formik.values.categoryId}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.categoryId && Boolean(formik.errors.categoryId)}
                    >
                        {categories.map((category: CategoryModel) => (
                            <MenuItem
                                key={category.id}
                                value={category.id}
                            > {category.categoryName}</MenuItem>
                        ))}
                    </Select>
                    {formik.touched.categoryId && formik.errors.categoryId && (
                        <Typography color="error">{formik.errors.categoryId}</Typography>
                    )}
                </FormControl>
                <FormControl sx={{
                    flexBasis: '200px',
                    display: 'flex',
                    flexGrow: 1
                }}>
                    <InputLabel id="providers">Nhà cung cấp</InputLabel>
                    <Select
                        labelId="providers"
                        id="providers"
                        label="Nhà cung cấp"
                        name="providerId"
                        value={formik.values.providerId}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.providerId && Boolean(formik.errors.providerId)}
                    >
                        {providers.map((provider: ProviderModel) => (
                            <MenuItem
                                key={provider.id}
                                value={provider.id}
                            >{provider.providerName}</MenuItem>
                        ))}
                    </Select>
                    {formik.touched.providerId && formik.errors.providerId && (
                        <Typography color="error">{formik.errors.providerId}</Typography>
                    )}
                </FormControl>
            </Box>
            <Box sx={{ p: 2, display: 'flex' }}>
                <TextField
                    sx={{
                        flexBasis: '200px',
                        display: 'flex',
                        flexGrow: 1
                    }}
                    id="outlined-multiline-static"
                    label="Mô tả"
                    name="description"
                    multiline
                    rows={4}
                    value={formik.values.description}
                    onChange={formik.handleChange}
                />
            </Box>
            <Box sx={{ p: 2, pl: 3 }}>
                <Button
                    component="label"
                    role={undefined}
                    variant="contained"
                    tabIndex={-1}
                    startIcon={<CloudUploadIcon />}
                >
                    Upload ảnh
                    <VisuallyHiddenInput type="file" accept={"image/*"} multiple onChange={handleChangeImages} />
                </Button>
            </Box>
            <Box sx={{
                display: 'flex',
                p: 2,
                flexWrap: 'wrap',
                gap: 12
            }}>
                <ImageList>
                    {urls.map((url: string, index: number) => (
                        <ProductImage key={index} url={url} index={index}
                            removeImage={removeImage}
                            setThumbnailImage={setThumbnailImage}
                            isThumbnail={index === thumbnail}
                        />
                    ))}
                </ImageList>
            </Box>

            {/* Start add of product detail */}

            <Box sx={{ mt: 2 }}>
                <Typography component="span" sx={{ flexGrow: 1, pl: 3 }}>
                    Chi tiết sản phẩm
                </Typography>
                <Box sx={{
                    p: 2, pl: 3, display: 'flex',
                    flexWrap: 'wrap',
                    gap: '20px'

                }}>
                    <FormControl sx={{
                        flexBasis: '200px',
                        display: 'flex',
                        flexGrow: 1
                    }}>
                        <InputLabel id="colors">Màu sắc</InputLabel>
                        <Select
                            labelId="colors"
                            id="colors"
                            label="Màu sắc"
                            name="colorId"
                            value={formikProductDetail.values.colorId}
                            onChange={formikProductDetail.handleChange}
                            onBlur={formikProductDetail.handleBlur}
                            error={formikProductDetail.touched.colorId && Boolean(formikProductDetail.errors.colorId)}

                        >
                            {colors.map((color: ColorModel) => (
                                <MenuItem
                                    key={color.id}
                                    value={color.id}
                                >
                                    {color.colorName}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl sx={{
                        flexBasis: '200px',
                        display: 'flex',
                        flexGrow: 1
                    }}>
                        <InputLabel id="sizes">Kích thước</InputLabel>
                        <Select
                            labelId="sizes"
                            id="sizes"
                            label="Kích thước"
                            name="sizeId"
                            value={formikProductDetail.values.sizeId}
                            onChange={formikProductDetail.handleChange}
                        >
                            {sizes.map((size: SizeModel) => (
                                <MenuItem
                                    key={size.id}
                                    value={size.id}
                                >{size.numberSize ?? size.textSize}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>
                <Box sx={{
                    p: 2, display: 'flex',
                    flexWrap: 'wrap',
                    gap: '20px'
                }}>
                    <TextField
                        sx={{ flex: 1 }}
                        id="product-quantity"
                        label="Số lượng"
                        type="number"
                        name="quantity"
                        value={formikProductDetail.values.quantity}
                        onChange={formikProductDetail.handleChange}
                        onBlur={formikProductDetail.handleBlur}
                        error={formikProductDetail.touched.quantity && Boolean(formikProductDetail.errors.quantity)}
                        helperText={formikProductDetail.touched.quantity && formikProductDetail.errors.quantity}
                    />
                </Box>
                <Box sx={{ p: 2, pl: 3 }}>
                    <Button variant="contained" onClick={addProductDetail}>Thêm</Button>
                </Box>
            </Box>
            <TableContainer component={Paper} sx={{ p: 2 }}>
                <Table aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell >Màu sắc</TableCell>
                            <TableCell >Kích thước</TableCell>
                            <TableCell >Số lượng</TableCell>
                            <TableCell align="center">Thao tác</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {productDetailDtos.map((productDetailDto: ProductDetailDto, index: number) => (
                            <TableRow key={index} sx={{
                                ':hover': {
                                    backgroundColor: 'secondary.main'
                                }
                            }}>
                                <TableCell >{colors.filter(color => productDetailDto.colorId === color.id)[0].colorName}</TableCell>
                                <TableCell >{sizes.filter(size => productDetailDto.sizeId === size.id)[0].numberSize ??
                                    sizes.filter(size => productDetailDto.sizeId === size.id)[0].textSize
                                }</TableCell>
                                <TableCell>{productDetailDto.quantity}</TableCell>
                                <TableCell align="center">
                                    <Button sx={{
                                        width: '70px',
                                        height: '20px',
                                        fontSize: '9px',
                                        fontWeight: 'bold',
                                        textTransform: 'none',
                                    }} className="btn-action-table" variant="contained" color="error"
                                    // onClick={() => {
                                    //     deleteProductDetail(productDetailDto)
                                    // }}
                                    >Xóa</Button>
                                </TableCell>

                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Finish end of product detail */}

            <Box sx={{ p: 2, display: 'flex', justifyContent: 'flex-end' }}>
                <Button variant="contained" onClick={handleSubmit}>Thêm sản phẩm hoàn tất</Button>
            </Box>

        </Box>
    );
}

export default CreateProduct;   