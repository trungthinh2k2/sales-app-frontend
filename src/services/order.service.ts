import requestConfig, { ContentType, Method } from "../configurations/axios.config";
import { ResponseSuccess } from "../dtos/responses/response.susscess";
import { OrderDto } from "../dtos/resquests/order.dto";
import { OrderModel } from "../models/order.model";

export const createOrder = async (OrderDto: OrderDto): Promise<ResponseSuccess<OrderModel>> => {
    console.log("Đã vào createOrder");
    try {
        const response = await requestConfig(
            `orders`,
            Method.POST,
            OrderDto,
            ContentType.JSON,
            true
        );
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
}