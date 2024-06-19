import { Status } from "./enum/status.enum"

export type ProductModel = {
    id?: number,
    productName?: string,
    price?: number,
    status?: Status,
    categoryId?: number
    providerId?: number
    description?: string
    avgRating?: number
    thumbnail?: string
    numberOfRating?: number
    totalQuantity?: number
}