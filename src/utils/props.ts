export type FlexProps = {
    alignItems?: 'baseline' | 'center' | 'end' |
    'flex-end' | 'start'| 'flex-start'|'initial';
    flexDirection ? : 'row'| 'row-reverse'| 'column'|'column-reverse';
    justifyContent ?:any;
}
export type StylingProps = {
    bgColor?:string;
    color?:string;
}
export type forgotProps = {
    email: string;
}
export type progressProps = {
    width: string;
}
export type recoveryProps = {
    password: string,
    confirmPassword: string;
    oldpassword?:string;
}
