import requestConfig, { ContentType, Method } from "../configurations/axios.config";
import { ResponseSuccess } from "../dtos/responses/response.susscess";
import { ProductDetailDto } from "../dtos/resquests/product-detail.dto";
import { ProductDetailModel } from "../models/product-detail.model";

export const createProductDetail = async (productDetailDto: ProductDetailDto) : Promise<ResponseSuccess<ProductDetailModel>> => {
    try {
        const response = await requestConfig(
            'productDetails',
            Method.POST,
            productDetailDto,
            ContentType.JSON
        )
        console.log("Response: ", response.data);
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
}