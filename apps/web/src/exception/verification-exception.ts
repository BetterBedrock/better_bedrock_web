export class VerificationException extends Error {
    httpCode?: number;
    constructor(msg: string, code?: number) {
        super(msg);
        this.httpCode = code;

        // Set the prototype explicitly.
        Object.setPrototypeOf(this, VerificationException.prototype);
    }
}