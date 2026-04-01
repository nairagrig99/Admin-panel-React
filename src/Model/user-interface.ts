export interface UserInterface {
    id: string,
    first_name: string,
    last_name: string,
    birthOfDay: Date | null,
    gender: string,
    mobileOrEmail: string,
    password: string,
    isLogged: boolean
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