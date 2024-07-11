<template>
    <div class="verify-otp-view">
      <div class="verify-otp-card">
        <div class="logo-container">
          <img :src="Logo" alt="Vue Logo" class="vue-logo" />
        </div>
        <h2 class="verify-otp-title">Verify OTP</h2>
        <p class="description">
          Enter the OTP sent to your email to proceed.
        </p>
        <form @submit.prevent="handleVerifyOtp">
          <div class="form-field">
            <label for="otp">OTP</label>
            <div class="otp-inputs">
              <input
                v-for="(digit, index) in otpDigits"
                :key="index"
                :id="'otp' + index"
                type="text"
                maxlength="1"
                v-model="otp[index]"
                @input="handleOtpInput(index)"
              />
            </div>
          </div>
          <button type="submit" class="verify-button">Verify OTP</button>
          <router-link to="/resend-otp" class="resend-link">Resend OTP</router-link>
        </form>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import Logo from '@/assets/logo.svg';
  
  const otpDigits = 6; // Number of OTP digits
  const otp = ref(Array(otpDigits).fill('')); // Array to store OTP digits
  const router = useRouter();
  
  const handleOtpInput = (index: number) => {
    if (otp[index].length === 1 && index < otpDigits - 1) {
      // Move to the next input field
      const nextInput = document.getElementById(`otp${index + 1}`);
      nextInput?.focus();
    }
  };
  
  const handleVerifyOtp = () => {
    const otpValue = otp.value.join('');
    console.log('Verifying OTP:', otpValue);
    // Add your OTP verification logic here
    router.push('/success'); // Navigate to success page or next step
  };
  </script>
  
  <style scoped>
  .verify-otp-view {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f4f4f4;
  }
  
  .verify-otp-card {
    width: 400px;
    padding: 1rem;
    background: #fff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    text-align: center;
  }
  
  .logo-container {
    display: flex;
    justify-content: center;
    margin-bottom: 1rem;
  }
  
  .vue-logo {
    width: 80px;
  }
  
  .verify-otp-title {
    margin-bottom: 1rem;
    font-size: 1.5rem;
    font-weight: bold;
  }
  
  .description {
    margin-bottom: 1.5rem;
    font-size: 1rem;
    color: #555;
  }
  
  .form-field {
    margin-bottom: 1rem;
  }
  
  .form-field label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: bold;
  }
  
  .otp-inputs {
    display: flex;
    justify-content: space-between;
  }
  
  .otp-inputs input {
    width: 40px;
    height: 40px;
    text-align: center;
    font-size: 1.25rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    margin: 0 0.25rem;
  }
  
  .verify-button {
    width: 100%;
    padding: 0.75rem;
    font-size: 1rem;
    color: #fff;
    background-color: var(--primary-color);
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  .verify-button:hover {
    background-color: var(--hover-color);
  }
  
  .resend-link {
    display: block;
    margin-top: 1rem;
    color: var(--primary-color);
    text-decoration: none;
  }
  
  .resend-link:hover {
    text-decoration: underline;
  }
  </style>
  