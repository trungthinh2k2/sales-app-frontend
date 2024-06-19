import requestConfig, { ContentType, Method } from "../configurations/axios.config";
import { ResponseSuccess } from "../dtos/responses/response.susscess";
import { CategoryDto } from "../dtos/resquests/category.dto";
import { CategoryModel } from "../models/category.model";

export const createCategory = async (categoryDto: CategoryDto): Promise<ResponseSuccess<CategoryModel>> => {
    try {
        const response = await requestConfig(
            'categories',
            Method.POST,
            categoryDto,
            ContentType.JSON
        );
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
}

export const getCategories = async (): Promise<ResponseSuccess<CategoryModel[]>> => {
    try {
        const response = await requestConfig(
            'categories',
            Method.GET,
            [],
            ContentType.JSON
        );
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
}

export const deleteCategory = async (id: number = -1): Promise<ResponseSuccess<string>> => {
    try {
        const response = await requestConfig(
            `categories/` + id,
            Method.DELETE,
            [],
            ContentType.JSON
        );
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
}

export const updateCategory = async (id: number = -1, categoryDto: CategoryDto) : Promise<ResponseSuccess<CategoryModel>> => {
    try {
        console.log("Category: ", categoryDto);
        const response = await requestConfig(
            `categories/` + id,
            Method.PUT,
            categoryDto,
            ContentType.JSON
        );
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
}
