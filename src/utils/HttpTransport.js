enum METHODS { Get = 'GET',
    Put = 'PUT',
    Post = 'POST',
    Delete = 'DELETE'
}

const TIMEOUT = 5000;

function queryStringify(data: Record<string, unknown>) {
    const getQueryStr = Object.keys(data)
        .map((key) => `${key}=${data[key]}`)
        .join("&");
    return `?${getQueryStr}`;
}

type Options = {
    data?: any;
    method?: METHODS;
    timeout?: number;
    headers?: Record<string, string>;
};

type HTTPMethod = (
    url: string,
    options?: Options,
) => Promise<XMLHttpRequest | unknown>;

class HTTPTransport {
    constructor() {
        this.request = this.request.bind(this);
    }

    get: HTTPMethod = (url, options = {}) => {
        const { data } = options;
        if (options.data) {
            url += queryStringify(data);
        }
        return this.request(url, { ...options, method: METHODS.Get });
    };
    post: HTTPMethod = (url, options = {}) => {
        return this.request(url, { ...options, method: METHODS.Post });
    }

    put: HTTPMethod = (url, options = {}) => {
        return this.request(url, { ...options, method: METHODS.Put });
    }

    delete: HTTPMethod = (url, options = { timeout: TIMEOUT }) => {
        return this.request(url, { ...options, method: METHODS.Delete });
    }

    request(url: string, options: Options = { timeout: TIMEOUT }) {
        const { method, data, headers } = options;

        return new Promise((resolve, reject) => {

            const xhr = new XMLHttpRequest();
            if (!method) {
                reject(new Error('No method'));
                return;
            }
            xhr.open(method, url);
            if (headers !== undefined) {
                Object.entries(headers).forEach(([key, value]) => {
                    xhr.setRequestHeader(key, value);
                });
            }

            xhr.onload = function () {
                resolve(xhr);
            };

            xhr.onabort = reject;
            xhr.onerror = reject;
            xhr.ontimeout = reject;

            if (method === METHODS.Get || !data) {
                xhr.send();
            } else {
                xhr.send(JSON.stringify(data));
            }
        })
    }
}