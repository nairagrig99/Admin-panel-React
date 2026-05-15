import {useCallback, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import type {AppDispatch, RootState} from "../../../Store/store.ts";
import {useValidation} from "../../../Hooks/useValidation.ts";
import {ErrorMessageEnum} from "../../../Enums/error-message.enum.ts";
import Label from "../../UI/Label.tsx";
import Input from "../../UI/Input.tsx";
import Button from "../../UI/Button.tsx";
import {findError, updatedData} from "../../../utils/formatData.ts";
import {PopupMode} from "../../../Enums/popup-mode.ts";
import {ApiThunkEditGoals, ApiThunkGoal} from "../../../Store/Goal/ApiThunkGoal.ts";
import type {GoalType} from "../../../Model/goal-interface.ts";
import {GoalStatus} from "../../../Enums/goal-status.ts";
import type {ModalProps} from "../../../Model/ModalProps.ts";

const INITIAL_STATE_FORM = {
    goalName: '',
    targetAmount: '',
    initialSavings: '',
    iconImg: '',
    date: ''
}
export default function GoalsModal({closePopup, editDate}: ModalProps) {

    const select = useSelector((state: RootState) => state.user.loggedUser)

    const [form, setForm] = useState<GoalType>(INITIAL_STATE_FORM);
    const validation = useValidation(INITIAL_STATE_FORM);

    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        if (editDate.mode === PopupMode.EDIT) {
            setForm(editDate.data)
        }
    }, [editDate]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!findError(form, validation)) return
        const findMin = Math.min(+form.initialSavings / +form.targetAmount, 1);

        const percentage = Math.round(findMin * 100);
        const goalStatus = percentage < 100 ? GoalStatus.ACTIVE : GoalStatus.COMPLETED

        if (editDate?.mode === PopupMode.EDIT) {

            const changedForm = updatedData(form, editDate)

            const updateData = {
                id: editDate.data.id,
                goalStatus: goalStatus,
                data: changedForm
            }

            if (Object.values(updateData.data).length) {
                dispatch(ApiThunkEditGoals(updateData)).then(() => {
                    closePopup();
                })
            }

            return;
        }

        const dataForm = {
            userId: select.id,
            goalStatus: goalStatus,
            ...form
        }

        dispatch(ApiThunkGoal(dataForm)).then(() => closePopup());
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
        <h3 className='text-2xl'>Add New Goal</h3>

        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
            <Label label='Goal Name' labelClass='flex flex-col'>
                <Input
                    value={form.goalName}
                    errorMessage={validation.error.goalName}
                    onChange={setFormValue}
                    onBlur={(e) => validation.validate(form, e.target.name, ErrorMessageEnum.REQUIRED)}
                    name='goalName'
                    type="text"
                    placeholder=""
                    className="border outline outline-slate-100 rounded-sm bg-[#4A5555] py-1 px-2"/>
            </Label>
            <Label label='Target Amount' labelClass='flex flex-col'>

                <Input type="number"
                       name='targetAmount'
                       errorMessage={validation.error.targetAmount}
                       onBlur={(e) => validation.validate(form, e.target.name, ErrorMessageEnum.REQUIRED)}
                       onChange={setFormValue}
                       value={form.targetAmount}
                       className="border outline outline-slate-100 rounded-sm bg-[#4A5555] py-1 px-2 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"/>
            </Label>

            <Label label='Initial Savings' labelClass='flex flex-col'>

                <Input type="number"
                       name='initialSavings'
                       errorMessage={validation.error.initialSavings}
                       onBlur={(e) => validation.validate(form, e.target.name, ErrorMessageEnum.REQUIRED)}
                       onChange={setFormValue}
                       value={form.initialSavings}
                       className="border outline outline-slate-100 rounded-sm bg-[#4A5555] py-1 px-2 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"/>
            </Label>

            <Label label='Icon/img' labelClass='flex flex-col'>
                {editDate.mode === PopupMode.EDIT && <img src={form.iconImg}/>}
                <Input type="file"
                       name='iconImg'
                       errorMessage={validation.error.iconImg}
                       onBlur={(e) => validation.validate(form, e.target.name, ErrorMessageEnum.REQUIRED)}
                       onChange={setFormValue}
                       value={editDate.mode === PopupMode.EDIT ? '' : form.iconImg}
                       className="border outline outline-slate-100 rounded-sm bg-[#4A5555] py-1 px-2 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"/>
            </Label>

            <div className="flex justify-between">

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
                </div>

            </div>

            <div className="flex gap-2 justify-end mt-6">
                <Button type="button" className="border px-2 py-1 rounded" onClick={closePopup}>Cancel</Button>
                <Button type="submit"
                        className="bg-[#2D7A78] px-2 py-1 rounded">{editDate?.mode === PopupMode.EDIT ? 'Edit Goal' : 'Save Goal'}</Button>
            </div>
        </form>

    </div>
}