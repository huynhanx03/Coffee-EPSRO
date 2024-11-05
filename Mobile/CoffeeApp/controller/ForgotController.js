import { EmailJSResponseStatus, send } from '@emailjs/react-native';
import { child, get, getDatabase, ref } from "firebase/database";
import axios from 'axios'
import { BASE_URL } from '../constants';

/**
 * @notice Generate a random 4-digit OTP
 * @returns a random 4-digit OTP
 */
const OTP = () => {
    let otpGenerate = Math.floor(Math.random() * 9000);
    return String(otpGenerate).padStart(4, '0');
}

let otpGenerate = '';
const {
    EXPO_PUBLIC_SERVICE_ID: service_id,
    EXPO_PUBLIC_TEMPLATE_ID: template_id,
    EXPO_PUBLIC_PUBLIC_KEY: public_key
} = process.env;

/**
 * @notice Send email that contain OTP to the user
 * @param email email
 * @param user user
 * @param otp otp
 */
const sendEmail = async (email, user, otp) => {
    try {
        await send (
            service_id,
            template_id,
            {
                to_name: user,
                message: otp,
                recipient: email,
            }, 
            {
                publicKey: public_key
            }
        )
    } catch (err) {
        if (err instanceof EmailJSResponseStatus) {
          console.log('EmailJS Request Failed...', err);
        }
  
        console.log('ERROR', err);
      }
}

/**
 * @notice Send OTP to the user's email
 * @dev Check the email is correct and send the OTP to the user's email
 * @param email email
 * @returns The result of the operation
 */
const ForgotPassword = async (email) => {
    otpGenerate = OTP();
    try {
        const response = await axios.get(`${BASE_URL}/user/forgot/${email}`);
        const user = response.data.data;
        const userId = Object.keys(user)[0];
        await sendEmail(email, user[userId].HoTen, otpGenerate);
        return [true, 'Gủi mã OTP thành công', otpGenerate];
    } catch (error) {
        if (error.response.status === 404) {
            return [false, 'Email không tồn tại', ''];
        }

        return [false, "Gủi mã OTP thất bại", ''];
    }
};

export { ForgotPassword };
