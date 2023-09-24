import axios from "axios";

class phoneOTP {
  constructor(phone, token, googleId, socket) {
    this.phone = phone;
    this.otp = this.generateOTP();
    this.token = token;
    this.googleId = googleId;
    this.socket = socket;
    this.error = "";
  }

  generateOTP() {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  async sendOTP() {
    const result = await axios
      .post(
        "/api/mobile/OTPsend",
        {
          phone: this.phone,
          otp: this.otp,
          sendingTime: new Date(),
        },
        {
          headers: {
            Authorization: `Bearer ${this.token}`,
            idType: this.googleId ? "google" : "email",
          },
        }
      )
      .then(() => true)
      .catch((e) => {
        this.error=e.response.data.error;
        return false;
      });
    return result;
  }

  async verifyOTP() {
    const result = await axios
      .post(
        "/api/mobile/OTPverify",
        {
          phone: this.phone,
          otp: this.otp,
        },
        {
          headers: {
            Authorization: `Bearer ${this.token}`,
            idType: this.googleId ? "google" : "email",
          },
        }
      )
      .then(() => {
        return true;
      })
      .catch(() => {
        return false;
      });
    return result;
  }
}

export default phoneOTP;
