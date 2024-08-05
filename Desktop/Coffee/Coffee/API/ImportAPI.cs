using Coffee.Utils;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Coffee.Models;

namespace Coffee.API
{
    public class ImportAPI
    {
        private static ImportAPI _ins;

        public static ImportAPI Ins
        {
            get
            {
                if (_ins == null)
                    _ins = new ImportAPI();
                return _ins;
            }
            private set
            {
                _ins = value;
            }
        }

        public string beginUrl = "/bill-import";


        /// <summary>
        /// Thêm phiếu nhập kho
        /// INPUT: BillImportModel: phiếu nhập kho
        /// </summary>
        /// <param name="billImport"></param>
        /// <returns>
        ///     1: Lỗi khi thêm dữ liệu
        ///     2: phiếu nhập kho
        /// </returns>
        public async Task<(string, bool)> createBillImport(ImportModel billImport)
        {
            using (HttpClient client = new HttpClient())
            {
                try
                {
                    string json = JsonConvert.SerializeObject(billImport);
                    HttpContent content = new StringContent(json, Encoding.UTF8, "application/json");

                    HttpResponseMessage response = await client.PostAsync(Constants.API.IP + beginUrl + "/bill-import", content);

                    if (response.IsSuccessStatusCode)
                    {
                        return ("Thêm phiếu nhập kho thành công", true);
                    }
                    else
                    {
                        string responseContent = response.Content.ReadAsStringAsync().Result;

                        // Parse the JSON
                        var jsonObj = JObject.Parse(responseContent);

                        return (JsonConvert.DeserializeObject<string>(jsonObj["message"].ToString()), false);
                    }
                }
                catch (HttpRequestException e)
                {
                    return (e.Message, false);
                }
            }
        }


        public async Task<(string, bool)> deleteBillImport(string billImportID)
        {
            using (HttpClient client = new HttpClient())
            {
                try
                {
                    HttpResponseMessage response = await client.DeleteAsync(Constants.API.IP + beginUrl + $"/bill-import/{billImportID}");

                    if (response.IsSuccessStatusCode)
                    {
                        return ("Xoá phiếu nhập kho thành công", true);
                    }
                    else
                    {
                        return ("Xoá phiếu nhập kho thất bại", false);
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
