import './buttonStyle.css'
const CustonButton = (props) => {
  
  return (
    <button type="button" class={`text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 gap-1 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ${props.disabled && "bg-gray-600 cursor-not-allowed hover:bg-gray-600" }`} {...props}>
        {props?.title}
        {props?.icon}
    </button>
  );
};

export default CustonButton;