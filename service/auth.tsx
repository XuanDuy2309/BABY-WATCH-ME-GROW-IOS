import api from "@/config/api";
import { IUser } from "@/interface/IUser";
// authActions.ts

export const signin = (formData: any) => api.post("/login", formData);

export const signup = (formData: any) => api.post("/register/user", formData);

export const resetPassword = (formData: any) => api.post("/reset", formData);

export const changePassword = (formData: any, user: IUser) => api.post(`/changepassword/${user.id_user}`, formData, {
    headers: { 'Authorization': `Bearer ${user.token}` }
})

export const changeAvatar = (formData: any, user: IUser) => api.post(`/changeavatar/${user.id_user}`,formData, {
    headers: { 'Authorization': `Bearer ${user.token}` }
})

export const getUser = (id: string | undefined, token: string) => api.get(`/profile/${id}`, {
    headers: { 'Authorization': `Bearer ${token}` }
})