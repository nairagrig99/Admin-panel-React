const MobileMenuTicket = ({isOpen, setIsOpen}) => {
    return (
        <button
            onClick={() => setIsOpen(!isOpen)}
            className={`z-50 p-2 text-white absolute right-0`}
        >
            <div className="w-6 h-5 relative flex flex-col justify-between items-center">
                <span
                    className={`w-full h-0.5 bg-white rounded-lg transition-all duration-300 transform origin-left ${isOpen ? 'rotate-45' : 'rotate-0'}`}></span>
                <span
                    className={`w-full h-0.5 bg-white rounded-lg transition-all duration-300 ${isOpen ? 'opacity-0' : 'opacity-100'}`}></span>
                <span
                    className={`w-full h-0.5 bg-white rounded-lg transition-all duration-300 transform origin-left ${isOpen ? '-rotate-45' : 'rotate-0'}`}></span>
            </div>
        </button>
    );
};

export default MobileMenuTicket