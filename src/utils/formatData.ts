import {ErrorMessageEnum} from "../Enums/error-message.enum.ts";

export function formatData(option: string[]) {
    return option.map((el: string) => ({value: el}))
}

export function findError(form, validation) {
    const errorMsg = [];

    for (const key in form) {
        errorMsg.push(validation.validate(form, key, ErrorMessageEnum.REQUIRED))
    }

    return errorMsg.every((el) => el);
}

export function updatedData(form, editDate) {
    let changedForm = {};

    for (const formKey in form) {
        const value = form[formKey]
        if (value !== editDate.data[formKey]) {
            changedForm = {
                ...changedForm,
                [formKey]: value
            }
        }
    }

    return changedForm
}
