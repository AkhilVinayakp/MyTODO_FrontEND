
const Todo = ({data})=>{
    return(
            <li className="mb-4 w-[620px] h-16 p-1 flex justify-between items-center">
                <input
                    type="text"
                    placeholder="double click to Type"
                    className=" todo-content input w-full max-w-[540px] input-md"
                    readOnly=""
                    value={data.title}
                />
                <div>
                    <button className="btn btn-circle  btn-outline" name="close-btn">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                    </button>
                </div>
            </li>

    )
}

export default Todo;