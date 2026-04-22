import {useState} from "react";

export const useValidation = <T extends Record<string, unknown>>(errState: T) => {
    const [error, setError] = useState(errState);

    const validate = (form: T, name: keyof T, message: string) => {
        if (String(form[name]).trim().length === 0) {
            setError((prev) => ({...prev, [name]: message}));
            return false;
        } else {
            setError((prev) => ({...prev, [name]: ''}));
            return true;
        }
    }
    const cleanError = (name: string) => {
        setError((prev) => ({
            ...prev,
            [name]: ''
        }))
    }
    return {validate, cleanError, error}
}