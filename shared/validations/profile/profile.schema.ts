export const validatePhoneNumber = (phone: string): boolean => {
  // Vietnamese phone number format: 0[3|5|7|8|9][0-9]{8}
  const phoneRegex = /^0[3|5|7|8|9][0-9]{8}$/;
  return phoneRegex.test(phone);
};

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};
