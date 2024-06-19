import requestConfig, { ContentType, Method } from "../configurations/axios.config";
import { ResponseSuccess } from "../dtos/responses/response.susscess";
import { SizeModel } from "../models/size.model";

export const getSize = async () : Promise<ResponseSuccess<SizeModel[]>> => {
    try {
        const response = await requestConfig(
            'sizes',
            Method.GET,
            [],
            ContentType.FORM_DATA
        );
        console.log("Response: ", response.data);
        return response.data;
    } catch (error) {
        return Promise.reject(error)
    }
}