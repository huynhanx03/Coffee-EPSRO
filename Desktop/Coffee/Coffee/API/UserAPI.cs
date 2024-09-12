using Coffee.DTOs;
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
    internal class UserAPI
    {
        private static UserAPI _ins;

        public static UserAPI Ins
        {
            get
            {
                if (_ins == null)
                    _ins = new UserAPI();
                return _ins;
            }
            private set
            {
                _ins = value;
            }
        }

        public string beginUrl = "/user";

        public async Task<(string, UserDTO)> getUserByNumberPhone(string numberPhone)
        {
            using (HttpClient client = new HttpClient())
            {
                try
                {
                    // Send a GET request to the specified URL
                    HttpResponseMessage resp = await client.GetAsync(Constants.API.IP + beginUrl + $"/number-phone/{numberPhone}");

                    string responseContent = resp.Content.ReadAsStringAsync().Result;

                    // Parse the JSON
                    var jsonObj = JObject.Parse(responseContent);

                    if (resp.IsSuccessStatusCode)
                    {
                        // Extract the data portion
                        var data = jsonObj["data"];

                        // Since data contains a nested object, we need to get the first property value
                        var userToken = data.First().First();

                        // Deserialize the nested object to UserDTO
                        var user = userToken.ToObject<UserDTO>();

                        return ("Lấy thông tin người dùng thành công", user);
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

        public async Task<(string, UserDTO)> updateUser(UserDTO user)
        {
            using (HttpClient client = new HttpClient())
            {
                try
                {
                    string json = JsonConvert.SerializeObject(user);
                    HttpContent content = new StringContent(json, Encoding.UTF8, "application/json");

                    HttpResponseMessage response = await client.PutAsync(Constants.API.IP + beginUrl + "/user/" + user.MaNguoiDung, content);

                    if (response.IsSuccessStatusCode)
                    {
                        return ("Cập nhật người dùng thành công", user);
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
