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
    }
}