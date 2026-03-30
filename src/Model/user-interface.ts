export interface UserInterface {
    first_name: string,
    last_name: string,
    birthOfDay: Date,
    gender: string,
    mobileOrEmail: string,
    password: string
}
export interface UserFormState {
    first_name: string,
    last_name: string,
    birthMonth: string,
    birthDay: string,
    birthYear: string,
    gender: string,
    mobileOrEmail: string,
    password: string
}