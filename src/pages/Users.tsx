import { useRef, useState } from "react";

const User = () => {
    const ref = useRef<HTMLInputElement>(null)
    console.log("Rendered", ref.current?.value)
    return (
        <div className="border p-6 max-w-7xl mx-auto mt-20">
            <input className="bg-gray-700 rounded border-2 border-gray-400" ref={ref} />
        </div>
    )
}

// const User = () => {
//     const [value, setValue] = useState("");
//     console.log("Rendered")
//     return (
//         <div className="border p-6 max-w-7xl mx-auto mt-20">
//             <input
//                 value={value}
//                 onChange={(e) => setValue(e.target.value)}
//                 className="bg-gray-700 rounded border-2 border-gray-400"
//             />
//         </div>
//     )
// }

export default User;