import { Box, Button, Container, Rating, TextField, Typography } from "@mui/material"
import { useEffect, useState } from "react";
import { ProductModel } from "../../../models/product.model";
import { ProductResponse } from "../../../dtos/responses/product-response";
import { ResponseSuccess } from "../../../dtos/responses/response.susscess";
import { useParams } from "react-router-dom";
import { getProductById } from "../../../services/product.service";
import { ProductImageModel } from "../../../models/product-image.model";
import Carousel from "react-material-ui-carousel";
import { ConvertPrice } from "../../../utils/convert-price";
import { ProductDetailModel } from "../../../models/product-detail.model";
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { secondaryGradient } from "../../../theme";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import { ColorModel } from "../../../models/color.model";
import { SizeModel } from "../../../models/size.model";

const SizeColorBox = ({ text }: { text: string | number }) => {
    return (
        <Box sx={{
            background: '#cccc',
            color: 'ffff',
            borderRadius: 1,
            pl: 1,
            pr: 1,
            ':hover': {
                cursor: 'pointer',
                background: '#0000',
                borderColor: 'red',
            }
        }}>
            <Typography>{text}</Typography>
        </Box>
    )
}

const ProductDetail = () => {

    const { id } = useParams();
    const [productResponse, setProductResponse] = useState<ProductModel>();
    const [productImages, setProductImages] = useState<ProductImageModel[]>([]);
    const [productDetails, setProductDetails] = useState<ProductDetailModel[]>([]);
    const [colors, setColors] = useState<ColorModel[]>([]);
    const [sizes, setSizes] = useState<SizeModel[]>([]);

    useEffect(() => {
        (async () => {
            try {
                const response: ResponseSuccess<ProductResponse> = await getProductById(Number(id));
                setProductResponse(response.data.product);
                setProductImages(response.data.productImages ?? []);
                setProductDetails(response.data.productDetails ?? []);

                let uniqueColors: ColorModel[] = [];
                productDetails.forEach((productDetail: ProductDetailModel) => {
                    const filter : ColorModel[] = uniqueColors.filter(
                        (color: ColorModel) => color.id === productDetail.color?.id);
                        if (filter.length <= 0) {
                            uniqueColors.push(productDetail.color)
                        }
                });
                setColors(uniqueColors);

                let uniqueSizes: SizeModel[] = [];
                response.data.productDetails?.forEach((productDetail:ProductDetailModel) => {
                    const filter : SizeModel[] = uniqueSizes.filter(
                        (size: SizeModel) => size.id === productDetail.size?.id);
                        if(filter.length <= 0) {
                            uniqueSizes.push(productDetail.size)
                        }
                })
                setSizes(uniqueSizes);

            } catch (error) {

            }
        })();
    }, [])

    return (
        <Container >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: 2,
                }}
            >
                <Box sx={{ borderRight: 1, paddingRight: 2, borderColor: '#f6f6f6' }}>
                    <Carousel
                        sx={{
                            width: 450,
                            height: 496,
                        }}
                    >
                        {productImages.map((productImage: ProductImageModel) => {
                            return (
                                <Box>
                                    <img width={450} height={450} src={productImage.path} alt="" />
                                </Box>
                            )
                        })}
                    </Carousel>
                </Box>
                <Box sx={{ width: '100%' }}>
                    <Typography variant="h5" sx={{ fontWeight: '700', pb: 1 }}>{productResponse?.productName}</Typography>
                    <Typography variant="h6">{productResponse?.provider?.providerName}</Typography>
                    <Typography variant="h5" sx={{ color: 'red', fontWeight: '700', pt: 1, pb: 1 }}>{ConvertPrice(productResponse?.price ?? 0)}</Typography>
                    {productResponse?.avgRating ? <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2, alignItems: 'center' }}> <Rating name="read-only" value={productResponse?.avgRating} readOnly />
                        <Typography>{productResponse.numberOfRating + ' đánh giá'}</Typography>
                    </Box> :
                        <Typography>Chưa có đánh giá</Typography>}
                    <Box sx={{display: 'flex', flexDirection: 'column', gap: 2 ,borderTop: 2, pt: 2, borderColor: '#f6f6f6'  }}>
                        <Box sx={{ display: 'flex', gap: 1,}}>
                            <Typography >Chọn màu sắc: </Typography>
                            {colors.map((color: ColorModel) => (
                                <SizeColorBox text={color.colorName ?? ''} />
                            ))}
                        </Box>
                        <Box sx={{ display: 'flex', gap: 1}}>
                            <Typography >Chọn kích thước: </Typography>
                           
                            {sizes.map((size: SizeModel)=> (
                                <SizeColorBox text={size.textSize ?? size.numberSize ?? ''}/>
                            ))}
                        </Box>
                        <Typography>Số lượng trong kho: {productResponse?.totalQuantity}</Typography>

                        <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                            <Typography >Chọn số lượng: </Typography>
                            <Button sx={{width: '10px'}}>  
                                <RemoveIcon />
                            </Button>
                            <TextField type="number" />
                            <Button>
                                <AddIcon />
                            </Button>
                        </Box>
                    </Box>
                    <Box sx={{display: 'flex', gap: 2}}>
                        <Button variant="contained" sx={{ width: 'auto', height: '50px', ':hover': { background: secondaryGradient, color: 'white', } }}> <LocalMallIcon sx={{mr: 1}}/> Thêm vào giỏ hàng</Button>
                        <Button variant="contained" sx={{ width: 'auto', height: '50px', ':hover': { background: secondaryGradient, color: 'white', } }}> <ShoppingCartIcon sx={{mr: 1}}/> Mua ngay</Button>
                    </Box>
                </Box>
            </Box>
            <Box>
                <Box>

                </Box>
                <Box>
                    <Box>

                    </Box>
                    <Box>

                    </Box>
                </Box>
            </Box>
            <Box>

            </Box>
        </Container>
    )
}

export default ProductDetail;