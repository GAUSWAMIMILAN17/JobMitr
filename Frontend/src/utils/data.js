// 

const BASE_URL = "https://jobmitr.onrender.com";

export const USER_LOGIN_API = `${BASE_URL}/api/user/login`;
export const USER_REGISTER_API = `${BASE_URL}/api/user/register`;
export const USER_PROFILE_API = `${BASE_URL}/api/user/profile`;

// JOB ROUTES
export const JOB_GET_ALL_API = `${BASE_URL}/api/job/get`;
export const JOB_GET_SINGLE_API = (id) => `${BASE_URL}/api/job/get/${id}`;
export const JOB_POST_API = `${BASE_URL}/api/job/post`;
export const JOB_UPDATE_API = (id) => `${BASE_URL}/api/job/update/${id}`;
export const JOB_ADMIN_API = `${BASE_URL}/api/job/getadminjobs`;

// COMPANY ROUTES
export const COMPANY_GET_API = `${BASE_URL}/api/company/get`;
export const COMPANY_CREATE_API = `${BASE_URL}/api/company/create`;
export const COMPANY_SINGLE_API = (id) => `${BASE_URL}/api/company/get/${id}`;

// APPLICATION ROUTES
export const APPLICATION_POST_API = `${BASE_URL}/api/application/apply`;
export const APPLICATION_GET_API = `${BASE_URL}/api/application/get`;
export const APPLICATION_BY_JOB_API = (id) =>
  `${BASE_URL}/api/application/job/${id}`;
