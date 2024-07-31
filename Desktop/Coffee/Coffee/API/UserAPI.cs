using Coffee.DTOs;
using Coffee.Utils;
using Newtonsoft.Json;
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
                        return ("Cập nhật người dùng thất bại", null);
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
