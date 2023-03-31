import axios, { AxiosResponse } from "axios";

axios.defaults.baseURL = 'http://localhost:5262/api/';

const responseBody = (response: AxiosResponse) => response.data;

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