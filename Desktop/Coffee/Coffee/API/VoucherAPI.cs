﻿using Newtonsoft.Json.Linq;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Coffee.Utils;
using Coffee.DTOs;

namespace Coffee.API
{
    public class VoucherAPI
    {
        private static VoucherAPI _ins;

        public static VoucherAPI Ins
        {
            get
            {
                if (_ins == null)
                    _ins = new VoucherAPI();
                return _ins;
            }
            private set
            {
                _ins = value;
            }
        }

        public string beginUrl = "/voucher";

        public async Task<(string, List<VoucherDTO>)> GetVouchers()
        {
            using (HttpClient client = new HttpClient())
            {
                try
                {
                    HttpResponseMessage resp = await client.GetAsync(Constants.API.IP + beginUrl + "/vouchers");
                    string responseContent = await resp.Content.ReadAsStringAsync();

                    var jsonObj = JObject.Parse(responseContent);

                    if (resp.IsSuccessStatusCode)
                    {
                        var data = jsonObj["data"];
                        var vouchers = JsonConvert.DeserializeObject<List<VoucherDTO>>(data.ToString());
                        return ("Lấy danh sách phiếu giảm giá thành công", vouchers);
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

        public async Task<(string, bool)> createVoucher(VoucherDTO voucher)
        {
            using (HttpClient client = new HttpClient())
            {
                try
                {
                    string json = JsonConvert.SerializeObject(voucher);
                    HttpContent content = new StringContent(json, Encoding.UTF8, "application/json");

                    HttpResponseMessage response = await client.PostAsync(Constants.API.IP + beginUrl + "/voucher", content);

                    if (response.IsSuccessStatusCode)
                    {
                        return ("Thêm phiếu giảm giá thành công", true);
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

        public async Task<(string, bool)> DeleteVoucher(string voucherId)
        {
            using (HttpClient client = new HttpClient())
            {
                try
                {
                    HttpResponseMessage response = await client.DeleteAsync(Constants.API.IP + beginUrl + $"/vouchers/{voucherId}");

                    if (response.IsSuccessStatusCode)
                    {
                        return ("Xoá phiếu giảm giá thành công", true);
                    }
                    else
                    {
                        return ("Xoá phiếu giảm giá thất bại", false);
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
