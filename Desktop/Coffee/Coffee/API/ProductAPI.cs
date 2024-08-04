﻿using Coffee.DSA;
using Coffee.DTOs;
using Coffee.Models;
using Coffee.Utils;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Markup;

namespace Coffee.API
{
    public class ProductAPI
    {
        private static ProductAPI _ins;

        public static ProductAPI Ins
        {
            get
            {
                if (_ins == null)
                    _ins = new ProductAPI();
                return _ins;
            }
            private set
            {
                _ins = value;
            }
        }

        public string beginUrl = "/product";

        /// <summary>
        /// Lấy danh sách sản phẩm
        /// </summary>
        /// <returns>
        ///     1. Thông báo
        ///     2. Danh sách sản phẩm
        /// </returns>
        public async Task<(string, List<ProductDTO>)> getProducts()
        {
            using (HttpClient client = new HttpClient())
            {
                try
                {
                    // Send a GET request to the specified URL
                    HttpResponseMessage resp = await client.GetAsync(Constants.API.IP + beginUrl + "/products");

                    string responseContent = resp.Content.ReadAsStringAsync().Result;

                    // Parse the JSON
                    var jsonObj = JObject.Parse(responseContent);

                    if (resp.IsSuccessStatusCode)
                    {
                        // Extract the data portion
                        var data = jsonObj["data"];

                        // Deserialize the data portion into a dictionary
                        var productsDict = JsonConvert.DeserializeObject<Dictionary<string, ProductDTO>>(data.ToString());

                        // Convert the dictionary values to a list
                        var products = productsDict.Values.ToList();

                        // Get list type of product
                        (string label, List<ProductTypeDTO> productTypes) = await ProductTypeAPI.Ins.GetProductTypes();

                        int sizeProductTypes = productTypes.Count();

                        foreach (var product in products)
                        {
                            int findIndexProductType = BinarySearch.Ins.BinarySearchProductType(productTypes, sizeProductTypes, product.MaLoaiSanPham);

                            if (findIndexProductType == -1)
                                product.LoaiSanPham = "Không có";
                            else
                                product.LoaiSanPham = productTypes[findIndexProductType].LoaiSanPham;
                        }

                        return ("Lấy danh sách sản phẩm thành công", products);
                    }
                    else
                    {
                        return (JsonConvert.DeserializeObject<string>(jsonObj["message"].ToString()), null);
                    }
                }
                catch (HttpRequestException e)
                {
                    return (e.Message, null);
                }
            }
        }

        public async Task<(string, bool)> updateQuantityProduct(string productID, double quantity)
        {
            using (HttpClient client = new HttpClient())
            {
                try
                {
                    string json = JsonConvert.SerializeObject(quantity);
                    HttpContent content = new StringContent(json, Encoding.UTF8, "application/json");

                    HttpResponseMessage response = await client.PutAsync(Constants.API.IP + beginUrl + "/quantity-product/" + productID, content);

                    if (response.IsSuccessStatusCode)
                    {
                        return ("Cập nhật sản phẩm thành công", true);
                    }
                    else
                    {
                        return ("Cập nhật sản phẩm thất bại", false);
                    }
                }
                catch (HttpRequestException e)
                {
                    return (e.Message, false);
                }
            }
        }


        public async Task<(string, List<ProductSizeDetailDTO>)> getSizes()
        {
            using (HttpClient client = new HttpClient())
            {
                try
                {
                    // Send a GET request to the specified URL
                    HttpResponseMessage resp = await client.GetAsync(Constants.API.IP + beginUrl + "/sizes");

                    string responseContent = resp.Content.ReadAsStringAsync().Result;

                    // Parse the JSON
                    var jsonObj = JObject.Parse(responseContent);

                    if (resp.IsSuccessStatusCode)
                    {
                        // Extract the data portion
                        var data = jsonObj["data"];

                        // Deserialize the data portion into a list
                        var sizes = JsonConvert.DeserializeObject<List<ProductSizeDetailDTO>>(data.ToString());

                        return ("Lấy danh sách kích thước thành công", sizes);
                    }
                    else
                    {
                        return (JsonConvert.DeserializeObject<string>(jsonObj["message"].ToString()), null);
                    }
                }
                catch (HttpRequestException e)
                {
                    return (e.Message, null);
                }
            }
        }

        /// <summary>
        /// Lấy danh sách sản phẩm giảm giá
        /// </summary>
        /// <returns>
        ///     1. Thông báo
        ///     
        /// </returns>
        public async Task<(string, List<DiscountProductDTO>)> getDiscountProducts()
        {
            using (HttpClient client = new HttpClient())
            {
                try
                {
                    // Send a GET request to the specified URL
                    HttpResponseMessage resp = await client.GetAsync(Constants.API.IP + beginUrl + "/discounts");

                    string responseContent = resp.Content.ReadAsStringAsync().Result;

                    // Parse the JSON
                    var jsonObj = JObject.Parse(responseContent);

                    if (resp.IsSuccessStatusCode)
                    {
                        // Extract the data portion
                        var data = jsonObj["data"];

                        // Deserialize the data portion into a list
                        var products = JsonConvert.DeserializeObject<List<DiscountProductDTO>>(data.ToString());

                        return ("Lấy danh sách sản phẩm giảm giá thành công", products);
                    }
                    else
                    {
                        return (JsonConvert.DeserializeObject<string>(jsonObj["message"].ToString()), null);
                    }
                }
                catch (HttpRequestException e)
                {
                    return (e.Message, null);
                }
            }
        }

        /// <summary>
        /// Cập nhật giảm giá sản phẩm
        /// </summary>
        /// <returns>
        ///     1. Thông báo
        ///     2. True/False
        /// </returns>
        public async Task<(string, bool)> updateDiscountProduct(string productID, int value)
        {
            using (HttpClient client = new HttpClient())
            {
                try
                {
                    var updateData = new { PhanTramGiam = value };
                    string json = JsonConvert.SerializeObject(updateData);
                    HttpContent content = new StringContent(json, Encoding.UTF8, "application/json");

                    HttpResponseMessage response = await client.PutAsync(Constants.API.IP + beginUrl + "/discounts/" + productID, content);

                    if (response.IsSuccessStatusCode)
                    {
                        return ("Cập nhật giảm giá sản phẩm thành công", true);
                    }
                    else
                    {
                        string responseContent = await response.Content.ReadAsStringAsync();

                        return (JObject.Parse(responseContent)["message"].ToString(), false);
                    }
                }
                catch (HttpRequestException e)
                {
                    return (e.Message, false);
                }
            }
        }

        public async Task<(string, bool)> deleteProduct(string productID)
        {
            using (HttpClient client = new HttpClient())
            {
                try
                {
                    HttpResponseMessage response = await client.DeleteAsync(Constants.API.IP + beginUrl + $"/product/{productID}");

                    if (response.IsSuccessStatusCode)
                    {
                        return ("Xoá sản phẩm thành công", true);
                    }
                    else
                    {
                        return ("Xoá sản phẩm thất bại", false);
                    }
                }
                catch (HttpRequestException e)
                {
                    return (e.Message, false);
                }
            }
        }

        /// <summary>
        /// Thêm sản phẩm
        /// INPUT: ProductDTO: sản phẩm
        /// </summary>
        /// <param name="product"></param>
        /// <returns>
        ///     1: Lỗi khi thêm dữ liệu
        ///     2: sản phẩm
        /// </returns>
        public async Task<(string, ProductModel)> createproduct(ProductModel product)
        {
            using (HttpClient client = new HttpClient())
            {
                try
                {
                    string json = JsonConvert.SerializeObject(product);
                    HttpContent content = new StringContent(json, Encoding.UTF8, "application/json");

                    HttpResponseMessage response = await client.PostAsync(Constants.API.IP + beginUrl + "/product", content);

                    if (response.IsSuccessStatusCode)
                    {
                        return ("Thêm sản phẩm thành công", product);
                    }
                    else
                    {
                        string responseContent = response.Content.ReadAsStringAsync().Result;

                        // Parse the JSON
                        var jsonObj = JObject.Parse(responseContent);

                        return (JsonConvert.DeserializeObject<string>(jsonObj["message"].ToString()), null);
                    }
                }
                catch (HttpRequestException e)
                {
                    return (e.Message, null);
                }
            }
        }

        /// <summary>
        /// Cập nhật sản phẩm
        /// INPUT: Customer: sản phẩm
        /// </summary>
        /// <param name="product"></param>
        /// <returns>
        ///     1: Thông báo
        ///     2: sản phẩm
        /// </returns>
        public async Task<(string, ProductModel)> updateProduct(ProductModel product)
        {
            using (HttpClient client = new HttpClient())
            {
                try
                {
                    string json = JsonConvert.SerializeObject(product);
                    HttpContent content = new StringContent(json, Encoding.UTF8, "application/json");

                    HttpResponseMessage response = await client.PutAsync(Constants.API.IP + beginUrl + "/product/" + product.MaSanPham, content);

                    if (response.IsSuccessStatusCode)
                    {
                        return ("Cập nhật sản phẩm thành công", product);
                    }
                    else
                    {
                        string responseContent = response.Content.ReadAsStringAsync().Result;

                        // Parse the JSON
                        var jsonObj = JObject.Parse(responseContent);

                        return (JsonConvert.DeserializeObject<string>(jsonObj["message"].ToString()), null);
                    }
                }
                catch (HttpRequestException e)
                {
                    return (e.Message, null);
                }
            }
        }
    }
}
