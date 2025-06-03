import authApiRequest from "@/actions/auth";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useLoginMutation = () => {
  return useMutation({
    mutationFn: authApiRequest.login,
  });
};
export const useRegisterMutation = () => {
  return useMutation({
    mutationFn: authApiRequest.register,
  });
};
export const useLogoutMutation = () => {
  return useMutation({
    mutationFn: authApiRequest.logout,
  });
};

export const useSetTokenToCookieMutation = () => {
  return useMutation({
    mutationFn: authApiRequest.setTokenToCookie,
  });
};
export const useCheckEmailExits = () => {
  return useMutation({
    mutationFn: authApiRequest.checkEmailExits,
  });
};
export const useSendOTP = () => {
  return useMutation({
    mutationFn: authApiRequest.sendOTP,
  });
};
export const useVerificationCode = () => {
  return useMutation({
    mutationFn: authApiRequest.verificationCode,
  });
};
export const useForgotPassword = () => {
  return useMutation({
    mutationFn: authApiRequest.forgotPassword,
  });
};
export const useGetGoogleLoginUrl = () => {
  return useQuery({
    queryFn: authApiRequest.getGoogleLoginUrl,
    queryKey: ["getGoogleLoginUrl"],
  });
};
