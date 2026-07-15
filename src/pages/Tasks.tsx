import TaskCard from "@/components/module/tasks/TaskCard";
import { selectTasks } from "@/redux/features/task/taskSlice";
import { useAppSelector } from "@/redux/hook";

const Tasks = () => {
    // const tasks = useAppSelector((state) => state.todo.tasks)
    const tasks = useAppSelector(selectTasks)

    console.log(tasks)

    return (
        <div className="mx-auto max-w-7xl px-5 mt-20">
            <div>
                <h1>Tasks</h1>
            </div>
            <div className="space-y-5 mt-5">
                {
                    tasks.map(task => (
                        <TaskCard task={task} />
                    ))
                }
            </div>
        </div>
    )
}

export default Tasks;