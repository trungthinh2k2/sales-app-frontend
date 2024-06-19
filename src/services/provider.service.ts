import requestConfig, { ContentType, Method } from "../configurations/axios.config";
import { ResponseSuccess } from "../dtos/responses/response.susscess";
import { ProviderModel } from "../models/provider.model";

export const getProviders = async (): Promise<ResponseSuccess<ProviderModel[]>> => {

    try {
        const response = await requestConfig(
            'providers',
            Method.GET,
            [],
            ContentType.JSON
        );
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
}
export const deleteProvider = async (id: number = -1): Promise<ResponseSuccess<string>> => {
    try {
        const response = await requestConfig(
            `providers/` + id,
            Method.DELETE,
            [],
            ContentType.JSON
        );
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
}