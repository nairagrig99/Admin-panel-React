import DashboardSvg from "../../UI/DashboardSvg.tsx";
import GoalsSvg from "../../UI/GoalsSvg.tsx";
import ReportsSvg from "../../UI/ReportsSvg.tsx";
import TransactionSvg from "../../UI/TransactionSvg.tsx";
import SettingsSvg from "../../UI/SettingsSvg.tsx";

export default function NavIcon({icon}: { icon: string }) {
    switch (icon) {
        case "dashboard":
            return <DashboardSvg/>;
        case "goals":
            return <GoalsSvg/>;
        case "reports":
            return <ReportsSvg/>
        case "transactions":
            return <TransactionSvg/>
        case "settings":
            return <SettingsSvg/>
        default:
            return null;
    }
}