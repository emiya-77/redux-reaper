import { Button } from "@/components/ui/button"
import { removeUser } from "@/redux/features/user/userSlice";
import { useAppDispatch } from "@/redux/hook";
import type { IUser } from "@/types"
import { Trash2 } from "lucide-react"

interface IProps {
    user: IUser;
}

const UserTaskCard = ({ user }: IProps) => {

    const dispatch = useAppDispatch();

    return (
        <div className="h-full border px-5 py-3 rounded-md">
            <div className="flex justify-between items-center">
                <div className="flex gap-2 items-center">
                    <h1>{user.name}</h1>
                </div>
                <div className="flex gap-3 items-center">
                    <Button 
                        variant="link"
                        className="p-0 text-red-500 cursor-pointer"
                        onClick={() => dispatch(removeUser(user.id))}
                    >
                        <Trash2/>
                    </Button>
                    {/* <EditTaskModal task={task} /> */}
                </div>
            </div>
        </div>
    )
}

export default UserTaskCard;