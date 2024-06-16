import axios from "axios";
import { type ProductItem } from "../pages/product-page";  

export async function addProduct(product: ProductItem) {
    const response = await axios.post("http://localhost:3005/products", product)
    return response;
}