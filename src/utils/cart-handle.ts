import { CartItemModel } from "../models/cart-item.model"

export const addToCartLocalStorage = (item: any) => {
    if (checkItemInCart(item)) {
        addQuantity(item)
    } else {
        pushItemCart(item)
    }
    
}

const pushItemCart = (item: CartItemModel) => {
    const cart = getCartLocalStorage()
    cart.push(item)
    localStorage.setItem('cart', JSON.stringify(cart))
}

export const getCartLocalStorage = (): CartItemModel[] => {
    const cart = localStorage.getItem('cart')
    return cart ? JSON.parse(cart) : []
}

const checkItemInCart = (item: CartItemModel): boolean => {
    const cart = getCartLocalStorage();
    if (cart.length > 0) {
        const filter = cart.filter((cartItem: CartItemModel) => cartItem.productDetail.id === item.productDetail.id);
        if (filter.length > 0) {
            return true;
        }
        else {
            return false;
        }
    }
    return false;
}

const addQuantity = (item: CartItemModel) => {
    const cart = getCartLocalStorage()
    const newCart = cart.map(cartItem => {
        if (cartItem.productDetail.id === item.productDetail.id) {
            cartItem.quantity += item.quantity
        }
        return cartItem
    })
    localStorage.setItem('cart', JSON.stringify(newCart))
}

export const updateItemCart = (item: CartItemModel) => {
    const cart = getCartLocalStorage();
    const filter = cart.filter((cartItem: CartItemModel) => cartItem.productDetail.id === item.productDetail.id);
    if(filter.length > 0) {
        filter[0].quantity = item.quantity;
        localStorage.setItem('cart', JSON.stringify(cart));
    }

}

// import { CartItemModel } from "../models/cart-item.model";
// import { getUserFromLocalStorage } from "../services/user.service";

// // Lấy user từ localStorage
// const user = getUserFromLocalStorage();
// const userId = user?.email;

// const getCartKey = (userId: string): string => `cart_${userId}`;

// export const addToCartLocalStorage = (item: CartItemModel) => {
//     if (userId) {
//         if (checkItemInCart(item)) {
//             addQuantity(item);
//         } else {
//             pushItemCart(item);
//         }
//     }
// }

// const pushItemCart = (item: CartItemModel) => {
//     if (userId) {
//         const cart = getCartLocalStorage(userId);
//         cart.push(item);
//         localStorage.setItem(getCartKey(userId), JSON.stringify(cart));
//     }
// }

// export const getCartLocalStorage = (userId: string): CartItemModel[] => {
//     const cart = localStorage.getItem(getCartKey(userId));
//     return cart ? JSON.parse(cart) : [];
// }

// const checkItemInCart = (item: CartItemModel): boolean => {
//     if (userId) {
//         const cart = getCartLocalStorage(userId);
//         if (cart.length > 0) {
//             const filter = cart.filter((cartItem: CartItemModel) => cartItem.productDetail.id === item.productDetail.id);
//             return filter.length > 0;
//         }
//     }
//     return false;
// }

// const addQuantity = (item: CartItemModel) => {
//     if (userId) {
//         const cart = getCartLocalStorage(userId);
//         const newCart = cart.map(cartItem => {
//             if (cartItem.productDetail.id === item.productDetail.id) {
//                 cartItem.quantity += item.quantity;
//             }
//             return cartItem;
//         });
//         localStorage.setItem(getCartKey(userId), JSON.stringify(newCart));
//     }
// }

// export const updateItemCart = (item: CartItemModel) => {
//     if (userId) {
//         const cart = getCartLocalStorage(userId);
//         const filter = cart.filter((cartItem: CartItemModel) => cartItem.productDetail.id === item.productDetail.id);
//         if (filter.length > 0) {
//             filter[0].quantity = item.quantity;
//             localStorage.setItem(getCartKey(userId), JSON.stringify(cart));
//         }
//     }
// }