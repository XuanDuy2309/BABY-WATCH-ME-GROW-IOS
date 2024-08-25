import api from "@/config/api";
import apiSwap from "@/config/apiSwap";
import { IUser } from "@/interface/IUser";

export const getTemplVid = (currentPage: number, url: string) => api.get(`/get/list_video/${url}?page=${currentPage}`);

export const getTemplImg = (currentPage: number, url: string) => api.get(`/list_image/${url}?page=${currentPage}`);

export const getHisUpload = (userId: number) => api.get(`/images/${userId}?type=video`);

export const uploadImage = (formData: any, user: IUser) => api.post(`/upload-gensk/${user.id_user}?type=src_nu`, formData, {
    headers: {
        "Content-Type": "multipart/form-data",
        'Authorization': `Bearer ${user.token}`,
    },
});

export const handleGenerate = (user: IUser,img:any) => apiSwap.get(`/getdata/sukien/baby`,{
    params: {
      device_them_su_kien: 'browser',
      ip_them_su_kien: '11111',
      id_user: user.id_user,
    },

    headers: {
      linknam: img.img1,
      linknu: img.img2,
      Authorization: `Bearer ${user.token}`,
    },
  });