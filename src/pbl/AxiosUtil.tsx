import axios, {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

export const axiosInstance: AxiosInstance = axios.create({
  timeout: 30000,
});
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (err: AxiosError) => {
    const { config, response } = err;

    if (
      (response?.status === 401 ||
        (response &&
          response?.status === 500 &&
          JSON.stringify(response.data).indexOf("JWT") > -1) ||
        (response?.status === 500 &&
          (JSON.stringify(err?.response?.data).indexOf("ExpiredJwtException") >
            -1 ||
            JSON.stringify(err?.response?.data).indexOf(
              "MalformedJwtException"
            )))) &&
      config
    ) {
      // const isToeknProblem = err.message.indexOf("ExpiredJwtException");
      // console.log(isToeknProblem);
      // localStorage.removeItem('at');
      // delete config.headers.Authorization;
      if (localStorage.getItem("at") === "undefined") {
        localStorage.clear();
        window.location.reload();
        return;
      }

      await axios
        .get("/api/user/rt")
        .then((res) => {
          if(res === undefined || res.data === undefined || res.data.at === undefined) {
            localStorage.clear();
            window.location.reload();  
          }
          config.headers.Authorization = "Bearer " + res.data.at;
          localStorage.setItem("at", res.data.at);
          window.location.reload();
          return axiosInstance(config);
        })
        .catch((err) => {
          console.error(err);

          localStorage.clear();
          window.location.reload();

          return err;
        });
    }
  }
);
axiosInstance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const at = localStorage.getItem("at");
  if (at) {
    config.headers.Authorization = `Bearer ${at}`;
  }

  return config;
});

export const apiList = {};
