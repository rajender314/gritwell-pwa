export type PayloadProps = {
    payload: object;
    method: string;
    apiUrl: string;
    headers?: object;
};

export type FilterColumnProps = {
    id: number;
    name: string;
};

type Data = {
    status_code: number,
    message: string,
    data: object | string
}

export type Response = {
    response: Data
}
export type ApiResponse = {
    result: ApiResponseProps;
};
export type ApiResponseProps = {
    data: any;
    message: string;
    status_code: number;
    success: boolean;
};
export type SigninProps = {
    email: string,
    password: string
};
export type SignupProps = {
    email: string,
    phone: string,
    first_name: string,
    last_name: string
};
