export default function Button({ children, variant = 'primary', icon = null, className = '', ...props}) {

    const basestyles = "inline-flex items-center justify-center gap-2 px-6 py-3 rounded-md font-medium text-4 transition-all duration-200 hover:opacity-90";

    const variants = {
        primary: "bg-primary text-white border border-primary fill-white stroke-white",
        secondary: "bg-transparent text-primary border border-primary fill-primary stroke-primary",
        outline: "bg-transparent text-gray-700 border border-gray-600 rounded-full px-5 py-2 text-base fill-primary stroke-primary",
        white: "bg-white text-primary border border-white fill-primary stroke-primary text-sm px-4 py-2",
    };

    return (
        <button className={`${basestyles} ${variants[variant]} ${className}`} {...props}>
            {children}
            {icon && (
                <svg viewBox="0 0 24 24" className="w-[18px] h-[18px]" xmlns="http://www.w3.org/2000/svg">
                  {icon}
                </svg>
            )}
        </button>
    )
} 