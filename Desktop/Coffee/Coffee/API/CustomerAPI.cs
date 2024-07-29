﻿using Coffee.Models;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Coffee.DTOs;
using Coffee.Utils;
using System.Reflection;

namespace Coffee.API
{
    public class CustomerAPI
    {
        private static CustomerAPI _ins;

        public static CustomerAPI Ins
        {
            get
            {
                if (_ins == null)
                    _ins = new CustomerAPI();
                return _ins;
            }
            private set
            {
                _ins = value;
            }
        }

        public string beginUrl = "/customer";

        //// <summary>
        /// 
        /// </summary>
        /// <returns>
        ///     Danh sách Khách hàng
        /// </returns>
        public async Task<(string, List<CustomerDTO>)> getCustomers()
        {
            using (HttpClient client = new HttpClient())
            {
                try
                {
                    // Send a GET request to the specified URL
                    HttpResponseMessage resp = await client.GetAsync(Constants.API.IP + beginUrl + "/customers");

                    string responseContent = resp.Content.ReadAsStringAsync().Result;

                    // Parse the JSON
                    var jsonObj = JObject.Parse(responseContent);

                    if (resp.IsSuccessStatusCode)
                    {
                        // Extract the data portion
                        var data = jsonObj["data"];

                        // Deserialize the data portion into a list
                        var customers = JsonConvert.DeserializeObject<List<CustomerDTO>>(data.ToString());

                        return ("Lấy danh sách khách hàng thành công", customers);
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

        //// <summary>
        /// 
        /// </summary>
        /// <returns>
        ///     Danh sách địa chỉ khách hàng
        /// </returns>
        public async Task<(string, List<AddressModel>)> getAddressCustomer(string customerID)
        {
            using (HttpClient client = new HttpClient())
            {
                try
                {
                    // Send a GET request to the specified URL
                    HttpResponseMessage resp = await client.GetAsync(Constants.API.IP + "/address/" + customerID);

                    string responseContent = resp.Content.ReadAsStringAsync().Result;

                    // Parse the JSON
                    var jsonObj = JObject.Parse(responseContent);

                    if (resp.IsSuccessStatusCode)
                    {
                        // Extract the data portion
                        var data = jsonObj["data"];

                        // Deserialize the data portion into a list
                        var addressCustomers = JsonConvert.DeserializeObject<List<AddressModel>>(data.ToString());

                        return ("Lấy danh sách địa chỉ khách hàng thành công", addressCustomers);
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
        /// Thêm Khách hàng
        /// INPUT: Customer: Khách hàng
        /// </summary>
        /// <param name="Customer"></param>
        /// <returns>
        ///     1: Lỗi khi thêm dữ liệu
        ///     2: Khách hàng
        /// </returns>
        public async Task<(string, CustomerDTO)> createCustomer(CustomerDTO Customer)
        {
            using (HttpClient client = new HttpClient())
            {
                try
                {
                    string json = JsonConvert.SerializeObject(Customer);
                    HttpContent content = new StringContent(json, Encoding.UTF8, "application/json");

                    HttpResponseMessage response = await client.PostAsync(Constants.API.IP + beginUrl + "/customer", content);

                    if (response.IsSuccessStatusCode)
                    {
                        return ("Thêm khách hàng thành công", Customer);
                    }
                    else
                    {
                        return ("Thêm khách hàng thất bại", Customer);
                    }
                }
                catch (HttpRequestException e)
                {
                    return (e.Message, null);
                }
            }
        }

        /// <summary>
        /// Cập nhật Khách hàng
        /// INPUT: Customer: Khách hàng
        /// </summary>
        /// <param name="Customer"></param>
        /// <returns>
        ///     1: Thông báo
        ///     2: Khách hàng
        /// </returns>
        public async Task<(string, CustomerDTO)> updateCustomer(CustomerDTO Customer)
        {
            using (HttpClient client = new HttpClient())
            {
                try
                {
                    string json = JsonConvert.SerializeObject(Customer);
                    HttpContent content = new StringContent(json, Encoding.UTF8, "application/json");

                    HttpResponseMessage response = await client.PutAsync(Constants.API.IP + beginUrl + "/customer/" + Customer.MaKhachHang, content);

                    if (response.IsSuccessStatusCode)
                    {
                        return ("Cập nhật khách hàng thành công", Customer);
                    }
                    else
                    {
                        return ("Cập nhật khách hàng thất bại", Customer);
                    }
                }
                catch (HttpRequestException e)
                {
                    return (e.Message, null);
                }
            }
        }

        /// <summary>
        /// Xoá Khách hàng
        /// INPUT:
        ///     CustomerID: mã Khách hàng
        /// </summary>
        /// <param name="CustomerID"></param>
        /// <returns>
        ///     1: Thông báo
        ///     2: True nếu xoá thành công, False xoá thất bại
        /// </returns>
        public async Task<(string, bool)> DeleteCustomer(string customerID)
        {
            using (HttpClient client = new HttpClient())
            {
                try
                {
                    HttpResponseMessage response = await client.DeleteAsync(Constants.API.IP + beginUrl + $"/customer/{customerID}");

                    if (response.IsSuccessStatusCode)
                    {
                        return ("Xoá khách hàng thành công", true);
                    }
                    else
                    {
                        return ("Xoá khách hàng thất bại", false);
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