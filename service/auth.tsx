import api from "@/config/api";
// authActions.ts

export const signin = (formData:any) => api.post("/login", formData);

export const signup = (formData:any) => api.post("/register/user", formData);

export const resetPassword = (formData:any) => api.post("/reset", formData);

export const changePassword = (formData:any, id:string | undefined,token:string) => api.post(`/changepassword/${id}`,formData, {
    headers:{'Authorization': `Bearer ${token}`}
})

export const changeAvatar = (formData:any, id:string | undefined,link_img:any, token:string) => api.post(`/changeavatar/${id}`,{link_img: link_img, check_img: "upload"}, {
    headers:{'Authorization': `Bearer ${token}`}
})

export const getUser = ( id:string | undefined,token:string) => api.get(`/profile/${id}`, {
    headers:{'Authorization': `Bearer ${token}`}
})