/* eslint-disable boundaries/no-unknown-files */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
// axios.d.ts
import "axios";

declare module "axios" {
    interface AxiosResponse<T = any, D = any> {
        error?: string;
    }
}
