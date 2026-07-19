import "./deleteSelected.css";

function DeleteSelected({ selectedUsers, users, setUsers, setLoading }) {

    async function handleDelete(ids) {
        setLoading(true);
        await Promise.all(
            ids.map((id) =>
                fetch(`https://dummyjson.com/users/${id}`, {
                    method: "DELETE",
                })
            )
        );
        const updatedUsers = users.filter(
            (user) => !ids.includes(user.id)
        );
        setUsers(updatedUsers);
        setLoading(false);
    }

    return (
        <div>
            <button onClick={() => handleDelete(selectedUsers)}>Delete Selected</button>
        </div>
    );
}

export default DeleteSelected;