import { child, get, getDatabase, ref } from "firebase/database";
import { BASE_URL } from "../constants";
const { default: axios } = require("axios");

/**
 * @notice Get the categories of the products
 * @returns The result of the operation
 */
const getCategories = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/product/categories`)
        return response.data
    } catch (error) {
        console.log(error)
        return error
    }
}

/**
 * @notice Get the products from the database
 * @returns The result of the operation
 */
const getProducts = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/product/products`)
        return response.data
    } catch (error) {
        return error.response.data
    }
}


/**
 * @notice Get the products on sale
 * @returns The products on sale
 */
const getProductsSale = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/product/productssale`)
        return response.data
    } catch (error) {
        return error.response.data
    }
}

/**
 * @notice Get the detail of a product by id
 * @param productId The id of product
 * @returns 
 */
const getProductDetailById = async (productId) => {
    try {
        const response = await axios.get(`${BASE_URL}/product/products/${productId}`)
        return response.data
    } catch (error) {
        return error.response.data
    }
}

/**
 * @notice Get the list of product Id that have been sold the most
 * @returns The list of product Id that have been sold the most
 */
const getProductsBestSeller = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/product/bestseller`)
        return response.data
    } catch(err) {
        console.log(err)
        return response.error.data
    }
}

export { getCategories, getProducts, getProductsSale, getProductDetailById, getProductsBestSeller }