import GoalsSort from "./GoalsSort.tsx";
import AddGoals from "./AddGoals.tsx";


export default function ActionsHeader() {
    return <div className="flex flex-col xl:flex-row gap-2 justify-between p-4 bg-[#63B6BD] rounded">
        <GoalsSort/>
        <AddGoals/>
    </div>
}