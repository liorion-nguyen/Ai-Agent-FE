import { z } from 'zod';

export const adminLoginSchema = z.object({
  email: z.string().email('Email không hợp lệ'),
  password: z.string().min(6, 'Mật khẩu ít nhất 6 ký tự'),
});

export const adminRegisterSchema = z.object({
  email: z.string().email('Email không hợp lệ'),
  password: z.string().min(6, 'Mật khẩu ít nhất 6 ký tự'),
  fullname: z.string().min(1, 'Tên không được để trống'),
});

export const forgotPasswordSchema = z.object({
  email: z.string().email('Email không hợp lệ'),
});

export const verifyOtpSchema = z.object({
  email: z.string().email('Email không hợp lệ'),
  otp: z.string().length(10, 'OTP phải có 10 ký tự'),
});

export const newPasswordSchema = z.object({
  email: z.string().email('Email không hợp lệ'),
  new_password: z.string().min(6, 'Mật khẩu ít nhất 6 ký tự'),
});
