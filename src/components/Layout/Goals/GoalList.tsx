import {useDispatch, useSelector} from "react-redux";
import type {AppDispatch, RootState} from "../../../Store/store.ts";
import CartSettings from "./CartSetings.tsx";
import {memo, useState} from "react";
import {ApiThunkDeleteGoals} from "../../../Store/Goal/ApiThunkGoal.ts";
import ProgressCircle from "../../UI/ProgressCircle.tsx";
import GoalsModal from "./GoalsModal.tsx";
import Popup from "../../UI/Popup.tsx";
import type {GoalModel} from "../../../Model/goal-interface.ts";
import {PopupMode} from "../../../Enums/popup-mode.ts";

const GoalList = memo(() => {
    const {goals} = useSelector((state: RootState) => state.goals);
    const [selectForEdit, setSelectForEdit] = useState<GoalModel>();
    const [isOpen, setIsOpen] = useState(false)
    const dispatch = useDispatch<AppDispatch>();

    if (!goals[0] || !goals[0].id) return;
    const removeGoal = (id: number) => {
        dispatch(ApiThunkDeleteGoals(id))
    }
    const editGoal = (item: GoalModel) => {
        setIsOpen(true)
        setSelectForEdit(item);
    }

    return <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7">
        {goals.map((goal) => (
            <div key={goal.id}
                 className="p-4 cart-item  h-[250px] bg-[#1f292a] flex flex-col justify-between text-center border border-[#2d3a3b] rounded-2xl">
                <h3>{goal.goalName}</h3>
                <div>
                    <ProgressCircle initialSaving={Number(goal.initialSavings)}
                                    targetAmount={Number(goal.targetAmount)}/>
                </div>
                <CartSettings handleEdit={() => editGoal(goal)}
                              handleRemove={() => removeGoal(goal.id)}
                />
            </div>
        ))}
        <Popup isOpen={isOpen}>
            <GoalsModal editDate={{data: selectForEdit, mode: PopupMode.EDIT}}
                        closePopup={() => setIsOpen(false)}></GoalsModal>
        </Popup>

    </div>

})
export default GoalList