import twilio from "twilio";
import { ApiResponse } from "./ApiResponse.js";
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = new twilio(accountSid, authToken);

const sendOTPFromTwilio = async (otp, phoneNumber) => {
  client.messages
    .create({
      body: `Your OTP is ${otp}`,
      to: "+91 " + phoneNumber, // Text your number
      from: process.env.TWILIO_PHONE_NUMBER, // From a valid Twilio number
    })
    .then((message) =>
      console.log("OTP sent successfully")
    )
    .catch((err) => console.log("Something went wrong otp does not send succesfully",err))
};

export { sendOTPFromTwilio };
