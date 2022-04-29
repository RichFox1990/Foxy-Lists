const defaultHeaders = {
    'Content-Type': 'application/json',
};

export const buildRequest = (method, body) => {
    const request = {
        method,
        headers: defaultHeaders,
    };
    if (body) {
        request.body = JSON.stringify(body);
    }
    // console.log('request.body', request.body);
    return request;
};
