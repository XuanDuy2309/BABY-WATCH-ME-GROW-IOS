import api from "@/config/api";

export const getTemplVid = (currentPage:number,url:string)=> api.get(`/get/list_video/${url}?page=${currentPage}`);

export const getTemplImg = (currentPage:number,url:string)=> api.get(`/list_image/${url}?page=${currentPage}`);