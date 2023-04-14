import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";

axios.defaults.baseURL = 'http://localhost:5262/api/';

const responseBody = (response: AxiosResponse) => response.data;

axios.interceptors.response.use(response => {
    return response;
}, (error: AxiosError) => {

    const { data, status } = error.response as AxiosResponse;
    
    
    switch (status) {
        case 400:
            toast.error(data.title);
            break;
        case 401:
            toast.error(data.title);
            break;
            case 404:
                console.log(status);
                toast.error(data.title);
                break;
        case 500:
            toast.error(data.title);
            break;
        default:
            break;
    }
    return Promise.reject(error.response);
}
)

const requests = {
    get: (url: string) => axios.get(url).then(responseBody),
    post: (url: string) => axios.post(url).then(responseBody),
    put: (url: string) => axios.put(url).then(responseBody),
    delete: (url: string) => axios.delete(url).then(responseBody),
}

const Catalog = {
    list: () => requests.get('products'),
    details: (id: number) => requests.get(`products/${id}`)
}

const TestErrors = {
    get400Error: () => requests.get('Buggy/bad-request'),
    get401Error: () => requests.get('Buggy/unauthorized'),
    get404Error: () => requests.get('Buggy/not-found'),
    get500Error: () => requests.get('Buggy/server-error'),
    getValidationError: () => requests.get('Buggy/validation-error'),
}

const agent = {
    Catalog,
    TestErrors
}

export default agent;