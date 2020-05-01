import axios, { AxiosResponse } from "axios";
import { IActivity } from "../models/activity";
import { history } from "../..";
import { toast } from "react-toastify";

axios.defaults.baseURL = "http://localhost:5000/api/";
axios.interceptors.response.use(undefined, (error) => {
  if (error.message === "Network Error") {
    toast.error("check the api server");
  }
  const { status, data, config } = error.response;
  if (status === 404) {
    history.push("/notfound");
  }
  if (
    status === 400 &&
    config.method === "get" &&
    data.errors.hasOwnProperty("id")
  ) 
  {
    history.push("/notfound");
  }
  if (status === 500) {
    toast.error("internal server error");
  }
  throw error;
});
const ResponsBody = (respons: AxiosResponse) => respons.data;
const requests = {
  get: (url: string) => axios.get(url).then(sleep(1000)).then(ResponsBody),
  post: (url: string, body: {}) =>
    axios.post(url, body).then(sleep(1000)).then(ResponsBody),
  put: (url: string, body: {}) =>
    axios.put(url, body).then(sleep(1000)).then(ResponsBody),
  del: (url: string) => axios.delete(url).then(sleep(1000)).then(ResponsBody),
};
const sleep = (ms: number) => (response: AxiosResponse) =>
  new Promise<AxiosResponse>((resolve) =>
    setTimeout(() => resolve(response), ms)
  );

// const sleep= function(ms:number){
//   return function(response:AxiosResponse){
//         console.log(response);
//         return(new Promise<AxiosResponse>(resolve=>setTimeout(()=>resolve(response),ms))
//         )
//     }
// }

const Activities = {
  list: (): Promise<IActivity[]> => requests.get("/activities"),
  details: (id: string) => requests.get(`activities/${id}`),
  create: (activity: IActivity) => requests.post("/activities", activity),
  update: (activity: IActivity) =>
    requests.put(`activities/${activity.id}`, activity),
  delete: (id: string) => requests.del(`activities/${id}`),
};

export default { Activities };
