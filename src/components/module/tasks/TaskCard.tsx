import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { cn } from "@/lib/utils";
import { deleteTask, toggleCompleteState } from "@/redux/features/task/taskSlice";
import { useAppDispatch } from "@/redux/hook";
import type { ITask } from "@/types"
import { Edit, Trash2 } from "lucide-react"
import { EditTaskModal } from "./EditTaskModal";

interface IProps {
    task: ITask;
}

const TaskCard = ({ task }: IProps) => {

    const dispatch = useAppDispatch();

    return (
        <div className="border px-5 py-3 rounded-md">
            <div className="flex justify-between items-center">
                <div className="flex gap-2 items-center">
                    <div className={cn("size-3 rounded-full", {
                        "bg-green-500": task.priority === "Low",
                        "bg-orange-500": task.priority === "Medium",
                        "bg-red-500": task.priority === "High"
                    })}></div>
                    <h1 className={cn({"line-through": task.isComplete})}>{task.title}</h1>
                </div>
                <div className="flex gap-3 items-center">
                    <Button 
                        variant="link"
                        className="p-0 text-red-500 cursor-pointer"
                        onClick={() => dispatch(deleteTask(task.id))}
                    >
                        <Trash2/>
                    </Button>
                    <Checkbox 
                        checked={task.isComplete}
                        onClick={() => dispatch(toggleCompleteState(task.id))}
                        className="cursor-pointer" 
                    />
                    <EditTaskModal task={task} />
                </div>
            </div>
            <p className="mt-5">{task.description}</p>
        </div>
    )
}

export default TaskCard;