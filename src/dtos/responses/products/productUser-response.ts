import { ProductModel } from "../../../models/product.model"

export type ProductUserResponse = {
    product: ProductModel,
    discount?: number,
    discountedPrice?: number,
    discountedAmount?: number,
    expiredDate?: Date
}