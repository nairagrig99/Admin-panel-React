const ProgressCircle = ({initialSaving, targetAmount}: { initialSaving: number, targetAmount: number }) => {
    const radius = 45;
    const circumference = 2 * Math.PI * radius;

    const percentage = Math.min(initialSaving / targetAmount, 1);

    const offset = circumference - (percentage * circumference);

    return (
        <div className="relative flex items-center justify-center w-48 mx-auto h-fit">
            <svg className="transform -rotate-90 w-40 h-40">
                <circle
                    cx="80"
                    cy="80"
                    r={radius}
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="transparent"
                    className="text-gray-700"
                />
                <circle
                    cx="80"
                    cy="80"
                    r={radius}
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="transparent"
                    strokeDasharray={circumference}
                    style={{strokeDashoffset: offset}}
                    strokeLinecap="round"
                    className="text-teal-500 transition-all duration-500 ease-out"
                />
            </svg>
            <div className="absolute flex flex-col items-center justify-center">
                <span className="text-3xl font-bold text-white">
                    {Math.round(percentage * 100)}%
                </span>
                <span className="text-xs text-gray-400 mt-1">{targetAmount} $</span>
            </div>
        </div>
    );
};

export default ProgressCircle