import axiosClient from "./axiosClient";

const getProducts = {
    getAllProduct: () => {
        const url = `products`;
        return axiosClient.get(url);
    }
}

export default getProducts;