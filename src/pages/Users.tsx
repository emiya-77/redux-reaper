import { AddUserModal } from "@/components/module/users/AddUserModal";
import UserTaskCard from "@/components/module/users/UserTaskCard";
import { selectUsers } from "@/redux/features/user/userSlice";
import { useAppSelector } from "@/redux/hook";

const User = () => {
    const users = useAppSelector(selectUsers);
    console.log(users);

    return (
        <div className="mx-auto max-w-7xl px-5 mt-20">
            <div className="flex justify-end items-center gap-5">
                <h1 className="mr-auto">Users</h1>
                <AddUserModal />
            </div>
            <div className="grid grid-cols-3 gap-4 space-y-5 mt-5">
                {
                    users.map(user => (
                        <UserTaskCard user={user} key={user.id} />
                    ))
                }
            </div>
        </div>
    )
}

export default User;