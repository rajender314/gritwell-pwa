
export const setLocalStorage = (key: string, item: string) => {
  localStorage.setItem(key, item);
};
export const getLocalStorage = (item: string) => {
  return localStorage.getItem(item) ? localStorage.getItem(item) : '';
};
export const clearLocalStorage = () => {
  localStorage.clear();
  sessionStorage.clear();
  localStorage.removeItem('gritwell_client_access_token');
};

export const getFAQs =(item:string) =>{
  const FAQS = localStorage.getItem('faqs');
  const parsedData = FAQS ? JSON.parse(FAQS) : {};
  return parsedData ? parsedData[item] ? parsedData[item] : '' : '';
};
