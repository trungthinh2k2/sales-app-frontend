import requestConfig, { ContentType, Method } from "../configurations/axios.config";
import { ResponseSuccess } from "../dtos/responses/response.susscess";
import { ColorModel } from "../models/color.model";

export const getColors = async () : Promise<ResponseSuccess<ColorModel[]>> => {
    try {
        const response = await requestConfig(
            'colors',
            Method.GET,
            [],
            ContentType.JSON
        );
        console.log("Response: ", response.data);
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
}
