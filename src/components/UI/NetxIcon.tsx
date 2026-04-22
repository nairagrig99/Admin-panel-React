import type {IconProps} from "../../Model/icon-props.ts";

const NextIcon = ({size = 20, className = "", onClick}: IconProps) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
        onClick={onClick}
    >
        <polyline points="9 18 15 12 9 6"/>
    </svg>
);
export default NextIcon