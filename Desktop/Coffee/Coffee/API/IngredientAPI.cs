using Coffee.DTOs;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Coffee.Utils;

namespace Coffee.API
{
    public class IngredientAPI
    {
        private static IngredientAPI _ins;

        public static IngredientAPI Ins
        {
            get
            {
                if (_ins == null)
                    _ins = new IngredientAPI();
                return _ins;
            }
            private set
            {
                _ins = value;
            }
        }

        public string beginUrl = "/ingredient";

        //// <summary>
        /// 
        /// </summary>
        /// <returns>
        ///     Danh sách nguyên liệu
        /// </returns>
        public async Task<(string, List<IngredientDTO>)> getIngredients()
        {
            using (HttpClient client = new HttpClient())
            {
                try
                {
                    // Send a GET request to the specified URL
                    HttpResponseMessage resp = await client.GetAsync(Constants.API.IP + beginUrl + "/ingredients");

                    string responseContent = resp.Content.ReadAsStringAsync().Result;

                    // Parse the JSON
                    var jsonObj = JObject.Parse(responseContent);

                    if (resp.IsSuccessStatusCode)
                    {
                        // Extract the data portion
                        var data = jsonObj["data"];

                        // Deserialize the data portion into a list
                        var ingredients = JsonConvert.DeserializeObject<List<IngredientDTO>>(data.ToString());

                        return ("Lấy danh sách nguyên liệu thành công", ingredients);
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
        ///     Danh sách đơn vị nguyên liệu
        /// </returns>
        public async Task<(string, List<UnitDTO>)> getUnitIngredient()
        {
            using (HttpClient client = new HttpClient())
            {
                try
                {
                    // Send a GET request to the specified URL
                    HttpResponseMessage resp = await client.GetAsync(Constants.API.IP + beginUrl + "/units");

                    string responseContent = resp.Content.ReadAsStringAsync().Result;

                    // Parse the JSON
                    var jsonObj = JObject.Parse(responseContent);

                    if (resp.IsSuccessStatusCode)
                    {
                        // Extract the data portion
                        var data = jsonObj["data"];

                        // Deserialize the data portion into a list
                        var units = JsonConvert.DeserializeObject<List<UnitDTO>>(data.ToString());

                        return ("Lấy danh sách đơn vị nguyên liệu thành công", units);
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
        /// Thêm nguyên liệu
        /// INPUT: IngredientDTO: nguyên liệu
        /// </summary>
        /// <param name="Ingredient"></param>
        /// <returns>
        ///     1: Lỗi khi thêm dữ liệu
        ///     2: nguyên liệu
        /// </returns>
        public async Task<(string, IngredientDTO)> createIngredient(IngredientDTO Ingredient)
        {
            using (HttpClient client = new HttpClient())
            {
                try
                {
                    string json = JsonConvert.SerializeObject(Ingredient);
                    HttpContent content = new StringContent(json, Encoding.UTF8, "application/json");

                    HttpResponseMessage response = await client.PostAsync(Constants.API.IP + beginUrl + "/ingredient", content);

                    if (response.IsSuccessStatusCode)
                    {
                        return ("Thêm nguyên liệu thành công", Ingredient);
                    }
                    else
                    {
                        return ("Thêm nguyên liệu thất bại", null);
                    }
                }
                catch (HttpRequestException e)
                {
                    return (e.Message, null);
                }
            }
        }

        /// <summary>
        /// Cập nhật nguyên liệu
        /// INPUT: ingredient: nguyên liệu
        /// </summary>
        /// <param name="Ingredient"></param>
        /// <returns>
        ///     1: Thông báo
        ///     2: nguyên liệu
        /// </returns>
        public async Task<(string, IngredientDTO)> updateIngredient(IngredientDTO Ingredient)
        {
            using (HttpClient client = new HttpClient())
            {
                try
                {
                    string json = JsonConvert.SerializeObject(Ingredient);
                    HttpContent content = new StringContent(json, Encoding.UTF8, "application/json");

                    HttpResponseMessage response = await client.PutAsync(Constants.API.IP + beginUrl + "/ingredient/" + Ingredient.MaNguyenLieu, content);

                    if (response.IsSuccessStatusCode)
                    {
                        return ("Cập nhật nguyên liệu thành công", Ingredient);
                    }
                    else
                    {
                        return ("Cập nhật nguyên liệu thất bại", null);
                    }
                }
                catch (HttpRequestException e)
                {
                    return (e.Message, null);
                }
            }
        }

        public async Task<(string, bool)> updateQuantityIngredient(string ingredientID, double quantity)
        {
            using (HttpClient client = new HttpClient())
            {
                try
                {
                    string json = JsonConvert.SerializeObject(quantity);
                    HttpContent content = new StringContent(json, Encoding.UTF8, "application/json");

                    HttpResponseMessage response = await client.PutAsync(Constants.API.IP + beginUrl + "/quantity-ingredient/" + ingredientID, content);

                    if (response.IsSuccessStatusCode)
                    {
                        return ("Cập nhật nguyên liệu thành công", true);
                    }
                    else
                    {
                        return ("Cập nhật nguyên liệu thất bại", false);
                    }
                }
                catch (HttpRequestException e)
                {
                    return (e.Message, false);
                }
            }
        }

        /// <summary>
        /// Xoá nguyên liệu
        /// INPUT:
        ///     IngredientID: mã nguyên liệu
        /// </summary>
        /// <param name="IngredientID"></param>
        /// <returns>
        ///     1: Thông báo
        ///     2: True nếu xoá thành công, False xoá thất bại
        /// </returns>
        public async Task<(string, bool)> DeleteIngredient(string IngredientID)
        {
            using (HttpClient client = new HttpClient())
            {
                try
                {
                    HttpResponseMessage response = await client.DeleteAsync(Constants.API.IP + beginUrl + $"/ingredient/{IngredientID}");

                    if (response.IsSuccessStatusCode)
                    {
                        return ("Xoá nguyên liệu thành công", true);
                    }
                    else
                    {
                        return ("Xoá nguyên liệu thất bại", false);
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
