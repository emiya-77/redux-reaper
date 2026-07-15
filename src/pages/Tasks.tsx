import { filterTasks, selectTasks } from "@/redux/features/task/taskSlice";
import { useAppSelector } from "@/redux/hook";

const Tasks = () => {
    // const tasks = useAppSelector((state) => state.todo.tasks)
    const tasks = useAppSelector(selectTasks)
    const filter = useAppSelector(filterTasks)

    console.log(tasks)
    console.log(filter)

    return <div>Tasks</div>
}

export default Tasks;