import {useState} from "react";
import Input from "../UI/Input.tsx";
import {useDispatch, useSelector} from "react-redux";
import type {AppDispatch, RootState} from "../../Store/store.ts";
import {Link, useNavigate} from "react-router-dom";
import Button from "../UI/Button.tsx";
import {updateUser} from "../../Store/User/ApiThunk.ts";
import type {UserInterface} from "../../Model/user-interface.ts";
import {ErrorMessage} from "../UI/ErrorMessage.tsx";

export default function LoginForm() {

    const select = useSelector((state: RootState) => state.user);
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()

    const [form, setForm] = useState({
        email: '',
        password: ''
    })
    const [error, setError] = useState<string>()

    const loginHandle = (formData: FormData) => {
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;
        const isEmpty = email.length && password.length
        if (!isEmpty) {
            setError('Fields are required')
            return
        }

        const isLogin: UserInterface | undefined = select.user.find((user) => user.mobileOrEmail === email && user.password === password);
        if (!isLogin) {
            setError('User name or password is incorrect')
            return
        }

        setError(null)
        dispatch(updateUser({
            id: isLogin.id,
            key: 'isLogged',
            value: true
        })).then((res) => {
            if (res.meta.requestStatus === 'fulfilled') {
                navigate('/dashboard')
            }
        })
    }

    const handleForm = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setForm((prev) => ({...prev, [name]: value}))
    }

    return <div className="bg-[#373333] h-screen flex flex-col justify-center">
        <form action={loginHandle}
              className="px-4 md:px-0 flex flex-col justify-center items-center gap-[8px] h-fit mb-2">
            <Input type="email"
                   value={form.email}
                   onChange={handleForm}
                   name='email'
                   placeholder="Login"
                   className="px-[10px] py-[17px] rounded-[4px] border-white  text-white outline-none w-[400px] max-w-full border-1 border-solid"/>

            <Input type="password"
                   value={form.password}
                   onChange={handleForm}
                   name='password'
                   placeholder='Password'
                   className="px-[10px] py-[17px] rounded-[4px] border-white text-white max-w-full outline-none w-[400px] border-1 border-solid"/>
            <ErrorMessage message={error}/>
            <Button value="Login"
                    type="submit"
                    className="py-[10px] px-0 rounded-[4px] bg-[#2BB3A3] text-[#FFF] w-[400px] max-w-full outline-none cursor-pointer text-[18px]"/>
        </form>
        <div className="text-center text-white">Create Account <Link className="text-[18px] text-blue-700"
                                                                     to="/auth/reg">Register</Link></div>
    </div>
}