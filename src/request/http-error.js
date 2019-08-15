//Export default HTTP error
export class HTTPError extends Error {
    constructor(code, message) {
        super(message);
        this.name = "HTTPError";
        this.code = code;
    }
}

