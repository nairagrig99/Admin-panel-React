import Input from "../UI/Input.tsx";
import Label from "../UI/Label.tsx";
import {useMemo} from "react";
import Select from "../UI/Select.tsx";
import type {OptionProps} from "../../Model/SelectProps.ts";
import {Controller, useForm} from "react-hook-form";
import Button from "../UI/Button.tsx";
import {ErrorMessage} from "../UI/ErrorMessage.tsx";
import {useDispatch, useSelector} from "react-redux";
import type {UserFormState, UserInterface} from "../../Model/user-interface.ts";
import {registerUser} from "../../Store/userActions.ts";
import type {AppDispatch, RootState} from "../../Store/store.ts";
import {Link, useNavigate} from 'react-router-dom';

const MONTH_OPTIONS: OptionProps[] = Array.from({length: 12}, (_, i) => (
    {value: new Date(0, i).toLocaleString('en-US', {month: 'long'})}
))

const currentYear = new Date().getFullYear() - 5;
const startYear = new Date(1930, 0, 1).getFullYear();
const yearLength = currentYear - startYear;

const YEAR_OPTION: OptionProps[] = Array.from({length: yearLength}, (_, i) => ({value: (startYear + i)}));
const GENDER = [{value: "Female"}, {value: "Male"}];
export default function RegisterForm() {

    const dispatch = useDispatch<AppDispatch>();
    const select = useSelector((state: RootState) => state.user);
    const navigate = useNavigate()

    const {watch, control, handleSubmit, setError, formState: {errors}} = useForm({
        defaultValues: {
            first_name: "",
            last_name: "",
            gender: "",
            birthMonth: "",
            birthDay: "",
            birthYear: "",
            mobileOrEmail: "",
            password: ""
        }
    });

    const onSubmit = (data: UserFormState) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const phoneRegex = /^(\+?\d{1,4}?[-.\s]?)?(\(?\d{3}\)?[-.\s]?)?\d{3}[-.\s]?\d{4}$/;

        if (!(emailRegex.test(data.mobileOrEmail) || phoneRegex.test(data.mobileOrEmail))) {
            setError('mobileOrEmail', {
                type: "manual",
                message: "Mobile number or email is not Valid"
            })
            return;
        }

        const isExist = select.user.some((user) => user.mobileOrEmail === data.mobileOrEmail)

        if (isExist) {
            setError('mobileOrEmail', {
                type: "manual",
                message: "This Email or Mobile number is already exist"
            })
            return
        }

        const month = MONTH_OPTIONS.findIndex((month) => month.value === data.birthMonth)
        const birthOfDay = new Date(+data.birthYear, month, +data.birthDay);

        // const birthOfDay = new Date(`${data.birthMonth} ${+data.birthDay} ,${+data.birthYear}`)
        // const dayWeek = day.toLocaleString('en-US', {weekday: 'long'})
        // console.log("dayWeek", dayWeek);

        const updatedData: UserInterface = {
            first_name: data.first_name,
            last_name: data.last_name,
            gender: data.gender,
            mobileOrEmail: data.mobileOrEmail,
            password: data.password,
            birthOfDay: birthOfDay,
            isLogged: false
        }

        dispatch(registerUser(updatedData)).then((res) => {
            if (res.meta.requestStatus === "fulfilled") {
                navigate('/auth/login')
            }
        })
    }

    const [birthDay, birthYear, birthMonth] = watch(['birthDay', 'birthYear', 'birthMonth']);

    const DAY_OPTIONS: OptionProps[] = useMemo(() => {
        const convertMoths = MONTH_OPTIONS.findIndex((month) => month.value === birthMonth);
        const currentLength = new Date(+birthYear, convertMoths + 1, 0).getDate();
        return Array.from({length: currentLength}, (_, i) => ({value: (i + 1)}));
    }, [birthDay, birthYear, birthMonth])

    return <div className="flex flex-col bg-[#373333] items-center h-auto overflow-auto md:h-screen justify-center ">
        <div className="w-full flex justify-center  items-center  text-[#FFF] font-sans">
            <form onSubmit={handleSubmit(onSubmit)} className="px-4 md:px-0  flex flex-col gap-[20px] ">
                <div>
                    <h3 className="text-[20px] font-sans m-[0] my-[5px]">Name</h3>
                    <div className="flex flex-col gap-[4px] md:flex-row ">
                        <Controller
                            name="first_name"
                            control={control}
                            rules={{
                                required: "First name is required",
                                minLength: {value: 2, message: "Too short!"}
                            }}
                            render={({field, fieldState: {error}}) => (
                                <div className="flex flex-col">
                                    <Input type="text" {...field} name="first_name" placeholder="First name"
                                           className="px-[10px] py-[17px] rounded-[4px] border-1 border-solid outline-none"
                                    />
                                    {error && <ErrorMessage message={error?.message}/>}
                                </div>
                            )}
                        />

                        <Controller
                            name="last_name"
                            control={control}
                            rules={{
                                required: "Last name is required",
                                minLength: {value: 2, message: "Too short!"}
                            }}
                            render={({field, fieldState: {error}}) => (
                                <div className="flex flex-col">
                                    <Input {...field} type="text" name="last_name" placeholder="Last name"
                                           className="px-[10px] py-[17px] border-1 border-solid rounded-[4px]  outline-none"/>
                                    {error && <ErrorMessage message={error?.message}/>}
                                </div>

                            )}
                        />
                    </div>
                </div>
                <div>
                    <h3 className="text-[20px] font-sans m-[0] my-[5px]">Birthday</h3>
                    <div className="flex flex-col">
                        <div className="flex flex-col md:flex-row  gap-[8px]">
                            <Controller
                                name="birthYear"
                                control={control}
                                rules={{
                                    required: 'Birth of day is required'
                                }}
                                render={({field}) => (
                                    <Select {...field} options={YEAR_OPTION}
                                            placeholder="Year"
                                            className="border-1 border-solid px-[10px] py-[17px] rounded-[4px] border-0 outline-none w-full"/>
                                )}
                            />

                            <Controller
                                name="birthMonth"
                                control={control}
                                rules={{
                                    required: 'Birth of day is required'
                                }}
                                render={({field}) => (
                                    <Select {...field} options={MONTH_OPTIONS}
                                            placeholder="Month"
                                            className="border-1 border-solid px-[10px] py-[17px] rounded-[4px] border-0 outline-none w-full"/>
                                )}
                            />

                            <Controller
                                name="birthDay"
                                control={control}
                                rules={{
                                    required: 'Birth of day is required'
                                }}
                                render={({field}) => (
                                    <Select {...field} options={DAY_OPTIONS}
                                            placeholder="Day"
                                            className="border-1 border-solid px-[10px] py-[17px] rounded-[4px] border-0 outline-none w-full"/>
                                )}
                            />
                        </div>
                        <div>
                            {(errors.birthYear || errors.birthMonth || errors.birthDay) && (
                                <ErrorMessage
                                    message={
                                        errors.birthYear?.message ||
                                        errors.birthMonth?.message ||
                                        errors.birthDay?.message
                                    }
                                />
                            )}

                        </div>
                    </div>

                </div>

                <div>
                    <h3 className="text-[20px] font-sans m-[0] my-[5px]">Gender</h3>
                    <Controller
                        name="gender"
                        control={control}
                        rules={{
                            required: "Gender is required"
                        }}
                        render={({field, fieldState: {error}}) => (
                            <>
                                <Select {...field} options={GENDER} placeholder="Gender"
                                        className="border-1 border-solid px-[10px] py-[17px] rounded-[4px] border-0 outline-none w-full"/>
                                {error && <ErrorMessage message={error?.message}/>}
                            </>

                        )}
                    />
                </div>

                <div>
                    <Controller
                        name="mobileOrEmail"
                        control={control}
                        rules={{
                            required: "Mobile number Or email is required",
                            minLength: {value: 2, message: "Too short!"}
                        }}
                        render={({field, fieldState: {error}}) => (
                            <>
                                <Label label="Mobile or Email" labelClass="flex flex-col text-[20px] font-sans">
                                    <Input type="text" {...field} name="email"
                                           placeholder="Mobile number Or email"
                                           className="border-1 border-solid px-[10px] py-[17px] rounded-[4px] border-0 outline-none"/>
                                </Label>
                                {error && <ErrorMessage message={error?.message}/>}
                            </>

                        )}
                    />
                </div>

                <div>
                    <Controller
                        name="password"
                        control={control}
                        rules={{
                            required: "Password is required",
                            minLength: {value: 8, message: "Too short!"}
                        }}
                        render={({field, fieldState: {error}}) => (
                            <>
                                <Label label="Password" labelClass="flex flex-col text-[20px] font-sans">
                                    <Input type="password" {...field} name="password"
                                           placeholder="password"
                                           className="border-1 border-solid px-[10px] py-[17px] rounded-[4px] border-0 outline-none"/>
                                </Label>
                                {error && <ErrorMessage message={error?.message}/>}
                            </>

                        )}
                    />
                </div>
                <Button
                    className="py-[10px] px-0 rounded-[4px] bg-[#2BB3A3] text-[#FFF] outline-none cursor-pointer text-[18px]"
                    type='submit'
                    value="Submit"/>
            </form>
        </div>

        <div className="text-center text-[#FFF]">Are you already Registered ? <Link
            className="text-[18px] text-blue-700"
            to="/auth/login">Login</Link></div>
    </div>

}
