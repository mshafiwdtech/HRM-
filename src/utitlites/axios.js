import axios from 'axios'

const axiosTokenised = axios.create({
    timeout: 10000
})

axiosTokenised.interceptors.request.use(
    (config) => {
        const token = JSON.parse(localStorage.getItem("epitomeUser"))?.token
        if (token) {
            config.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem("epitomeUser"))?.token}`;
        }
        return config;
    },
    (error) => Promise.reject(error),
);


export default axiosTokenised