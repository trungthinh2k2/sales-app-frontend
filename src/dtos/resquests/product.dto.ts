export type ProductDto = {
    id?: number,
    productName?: string,
    price?: number,
    description?: string,
    image?: File[],
    categoryId?: number,
    providerId?: number,
    thumbnail?: string,
    status?: string
}