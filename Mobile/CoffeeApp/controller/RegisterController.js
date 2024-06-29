const { default: axios } = require("axios")

const handleRegisterAccount = async (username, email, password) => {
    try {
        const response = await axios.post('http://localhost:3000/users/register', {
            username: username,
            email: email,
            password: password
        })

        return response.data
    } catch (error) {
        return error.response.data
    }
}

export { handleRegisterAccount }