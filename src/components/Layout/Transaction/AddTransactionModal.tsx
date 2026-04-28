import Input from "../../UI/Input.tsx";
import Label from "../../UI/Label.tsx";
import Select from "../../UI/Select.tsx";
import {CATEGORIES_OPTION, LIMIT, STATUS_EXPENSE, STATUS_OPTION} from "../../../constants/constant.ts";
import type {OptionProps} from "../../../Model/select-props.ts";
import SelectRadioBtn from "../../UI/SelectRadioBtn.tsx";
import {formatData} from "../../../utils/formatData.ts";

import Button from "../../UI/Button.tsx";
import {useCallback, useEffect, useMemo, useState} from "react";
import type {TransactionInterface} from "../../../Model/transaction-interface.ts";
import {useDispatch, useSelector} from "react-redux";
import type {AppDispatch, RootState} from "../../../Store/store.ts";
import {editTransaction, sortTransaction, TransactionThunk} from "../../../Store/Transaction/ApiThunkTransaction.ts";
import {useValidation} from "../../../Hooks/useValidation.ts";
import {ErrorMessageEnum} from "../../../Enums/error-message.enum.ts";
import {PopupMode} from "../../../Enums/popup-mode.ts";
import {AmountStatus} from "../../../Enums/amount-status.ts";


const INITIAL_STATE_FORM: TransactionInterface = {
    description: '',
    id: 0,
    amount: '',
    amountStatus: 'expense',
    category: '',
    date: '',
    status: 'pending'
}

const ERROR_STATE = Object.keys(INITIAL_STATE_FORM).reduce((acc, key) => {
    acc[key] = ''
    return acc;
}, {} as Record<string, string | number>)


type EditTransaction = {
    data: TransactionInterface,
    mode: string
}

interface ModalProps {
    closePopup: () => void;
    editDate?: EditTransaction
}


export default function AddTransactionModal({closePopup, editDate}: ModalProps) {

    const categoriesOption: OptionProps[] = useMemo(() => formatData(CATEGORIES_OPTION), [CATEGORIES_OPTION]);
    const status: OptionProps[] = useMemo(() => formatData(STATUS_OPTION), [STATUS_OPTION]);
    const expense: OptionProps[] = useMemo(() => formatData(STATUS_EXPENSE), [STATUS_EXPENSE]);
    const select = useSelector((state: RootState) => state.user.loggedUser)

    const [form, setForm] = useState<TransactionInterface>(INITIAL_STATE_FORM);
    const validation = useValidation(ERROR_STATE);

    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        if (editDate.mode === PopupMode.EDIT) {
            setForm(editDate.data)
        }
    }, [editDate]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const errorMsg = [];
        for (const key in form) {
            errorMsg.push(validation.validate(form, key, ErrorMessageEnum.REQUIRED))
        }

        const isError = errorMsg.every((el) => el);
        if (!isError) return;

        const dataForm = {
            userId: select.id,
            ...form
        }

        if (editDate?.mode === PopupMode.EDIT) {

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


            const updateData: EditTransaction = {
                id: editDate.data.id,
                data: changedForm
            }

            if (Object.values(updateData.data).length) {
                dispatch(editTransaction(updateData)).then(() => {
                    closePopup();
                })
            }

            return;
        }
        console.log('FIRST')
        dispatch(TransactionThunk(dataForm)).then(() => {
            dispatch(sortTransaction({
                start: 1,
                end: LIMIT,
                id: select.id,
                sortBy: AmountStatus.ALL
            }));
            closePopup();
        });
    }

    const setFormValue = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLButtonElement>) => {
        const {name, value} = e.target;

        setForm((input) => ({
            ...input,
            [name]: value
        }));

        validation.cleanError(name);
    }, []);

    return <div
        className='bg-[#283132] absolute top-1/2 left-1/2 w-[460px] h-fit p-4 -translate-x-1/2 -translate-y-1/2 text-white'>
        <h3 className='text-2xl'>Add New Transaction</h3>

        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
            <Label label='Description' labelClass='flex flex-col'>
                <Input
                    value={form.description}
                    errorMessage={validation.error.description}
                    onChange={setFormValue}
                    onBlur={(e) => validation.validate(form, e.target.name, ErrorMessageEnum.REQUIRED)}
                    name='description'
                    type="text"
                    placeholder=""
                    className="border outline outline-slate-100 rounded-sm bg-[#4A5555] py-1 px-2"/>
            </Label>
            <Label label='Amount' labelClass='flex flex-col'>
                <SelectRadioBtn values={expense}
                                name='amountStatus'
                                className='flex gap-2 absolute right-[16px]'
                                selectedColor='bg-red-900'
                                setSelected={setFormValue}/>
                <Input type="number"
                       name='amount'
                       errorMessage={validation.error.amount}
                       onBlur={(e) => validation.validate(form, e.target.name, ErrorMessageEnum.REQUIRED)}
                       onChange={setFormValue}
                       value={form.amount}
                       className="border outline outline-slate-100 rounded-sm bg-[#4A5555] py-1 px-2 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"/>
            </Label>

            <div className="flex justify-between">
                <Label label='Category' labelClass='flex flex-col'>
                    <Select placeholder='--Select Category--'
                            value={form.category}
                            name='category'
                            onBlur={(e) => validation.validate(form, e.target.name, ErrorMessageEnum.REQUIRED)}
                            errorMessage={validation.error.category}
                            onChange={setFormValue}
                            options={categoriesOption}
                            className='border border-solid px-[10px] py-[7px] rounded-[4px]'/>
                </Label>
                <div className='flex flex-col gap-4'>

                    <Label label='Date' labelClass='flex flex-col'>
                        <Input type="date"
                               name='date'
                               value={form.date}
                               onBlur={(e) => validation.validate(form, e.target.name, ErrorMessageEnum.REQUIRED)}
                               errorMessage={validation.error.date}
                               onChange={setFormValue}
                               className="border outline outline-slate-100 rounded-sm bg-[#4A5555] py-1 px-2"/>
                    </Label>

                    <Label label='Status' labelClass=''>
                        <SelectRadioBtn values={status}
                                        name='status'
                                        className='flex gap-2'
                                        selectedColor='bg-[#63B6BD]'
                                        setSelected={setFormValue}/>
                    </Label>
                </div>

            </div>

            <div className="flex gap-2 justify-end mt-6">
                <Button type="button" className="border px-2 py-1 rounded" onClick={closePopup}>Cancel</Button>
                <Button type="submit"
                        className="bg-[#2D7A78] px-2 py-1 rounded">{editDate?.mode === PopupMode.EDIT ? 'Edit Transaction' : 'Save Transaction'}</Button>
            </div>
        </form>

    </div>
}

