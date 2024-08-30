import api from "@/config/api";
import apiSwap from "@/config/apiSwap";
import { IUser } from "@/interface/IUser";

export const getTemplVid = (currentPage: number, url: string) => api.get(`/get/list_video/${url}?page=${currentPage}`);

export const getTemplImg = (currentPage: number, url: string) => api.get(`/list_image/${url}?page=${currentPage}`);

export const getHisUpload = (userId: number) => api.get(`/images/${userId}?type=video`);

export const uploadImage = (formData: any, user: IUser) => api.post(`/upload-gensk/${user.id_user}?type=src_nu`, formData, {
  headers: {
    Accept: 'application/json',
    'Content-Type': 'multipart/form-data',
    'Authorization': `Bearer ${user.token}`,
  },
});

export const getHisVid = (user:IUser) => api.get('/get/list_video/id_user_swap',{
  params: {
    id_user: user.id_user
  }
 
})

export const getHisGen = (user:IUser) => api.get('/list_image/all_image_swap_generate',{
  params: {
    id_user: user.id_user
  }

})

export const getHisNew = (user:IUser) => api.get('/list_image/all_image_swap',{
  params: {
    type:'newborn',
    id_user: user.id_user
  }

})

export const getHisBaby = (user:IUser) => api.get('/list_image/all_image_swap_mom_baby',{
  params: {
    type:'mom_and_baby',
    id_user: user.id_user
  }

})

export const handleGenerate = (user: IUser, img: any) => apiSwap.get(`/getdata/sukien/baby`, {
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

export const handleNewBorn = (user: IUser, img: any) => apiSwap.get(`/getdata/swap/listimage_baby_newborn`, {
  params: {
    device_them_su_kien: 'browser',
    ip_them_su_kien: '11111',
    id_user: user.id_user,
    list_folder: "Newborn1",
  },

  headers: {
    link1: img.img1,
    link2: img.img2,
    Authorization: `Bearer ${user.token}`,
  },
});

export const handleKidAndMom = (user: IUser, img: any,folder_name: string) => apiSwap.get(`/getdata/swap/listimage_mom_baby`, {
  params: {
    device_them_su_kien: 'browser',
    ip_them_su_kien: '11111',
    id_user: user.id_user,
    list_folder: folder_name,
  },

  headers: {
    link1: img.img1,
    Authorization: `Bearer ${user.token}`,
  },
});

export const handleDadAndMom = (user: IUser, img: any,id: any) => apiSwap.get(`/getdata/genvideo/swap/imagevid/grow_up`, {
  params: {
    device_them_su_kien: 'browser',
    ip_them_su_kien: '11111',
    src_vid_path: id,
    src_img: img,
    id_user: user.id_user,

  },

  headers: {
    Authorization: `Bearer ${user.token}`,
  },
});

export const handleTimeMachine = (user: IUser, img: any,id: any) => apiSwap.get(`/getdata/genvideo/swap/imagevid/time_machine`, {
  params: {
    device_them_su_kien: 'browser',
    ip_them_su_kien: '11111',
    src_vid_path: id,
    src_img: img.img1,
    id_user: user.id_user,

  },

  headers: {
    Authorization: `Bearer ${user.token}`,
  },
});