import { useState, useEffect, useContext } from "react";
import Table from "../components/table";
import Pagination from "../components/pagination";
import Search from "../components/search";
import Limit from "../components/limit";
import Order from "../components/order";
import Sort from "../components/sort";
import Hair from "../components/hair";
import AddNewUser from "../components/addNewUser";
import UserForm from "./userForm";
import DeleteSelected from "../components/deleteSelected";
import LogOut from "../components/logOut";
import { AuthContext } from "../context/AuthContext";
import "./home.css";

function Home({ localUsers, editedUsers, setApiUserTotal, emptyFormData, setFormData, setEditId, setIsEditing }) {
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [search, setSearch] = useState("");
    const [limit, setLimit] = useState(10);
    const [loading, setLoading] = useState(false);
    const [order, setOrder] = useState("");
    const [sort, setSort] = useState("");
    const [hairColor, setHairColor] = useState("");
    const [hairType, setHairType] = useState("");

    const [masterChecked, setMasterChecked] = useState(false);
    const [selectedUsers, setSelectedUsers] = useState([]);

    const{logout} = useContext(AuthContext);

    useEffect(() => {
        async function fetchResult() {
            setLoading(true);
            const skip = ((currentPage - 1) * limit);

            let link;

            if (search) {
                link = `https://dummyjson.com/users/search?q=${search}&limit=${limit}&skip=${skip}`;
            }
            else {
                link = `https://dummyjson.com/users?limit=${limit}&skip=${skip}`;
            }

            if (sort !== "") {
                link += `&sortBy=${sort}`;
                if (order !== "") {
                    link += `&order=${order}`;
                }
            }

            let response = await fetch(link);
            let data = await response.json();
            const updatedUsers = data.users.map((user) => editedUsers[user.id] || user);
            const newTotal = data.total + localUsers.length;
            const newTotalPages = Math.ceil(newTotal / limit);
            setUsers(currentPage === newTotalPages ? [...updatedUsers, ...localUsers] : updatedUsers);

            setTotal(newTotal);
            if (!search) {
                setApiUserTotal(data.total);
            }
            setLoading(false);
        }
        fetchResult();

    }, [currentPage, limit, search, sort, order, localUsers, editedUsers, setApiUserTotal]);

    const totalPages = Math.ceil(total / limit);

    const filteredHair = users.filter((user) => (
        (user.hair.color === hairColor || hairColor === "") &&
        (user.hair.type === hairType || hairType === "")
    ));

    async function handleDelete(id) {
        setLoading(true);
        const result = await fetch(`https://dummyjson.com/users/${id}`, {
            method: "DELETE",
        });
        const data = await result.json();
        const updatedUsers = users.filter((item) => (item.id !== id));
        setUsers(updatedUsers);
        setLoading(false);
    }


    return (
        <div className="container">
            <div className="top">
                <h1>Users Table</h1>
                <div className="topRight">
                    <Search search={search} setSearch={setSearch} />
                    <LogOut logout={logout} />
                </div>
            </div>
            <div className="edge">
                <div className="header">
                    <Sort sort={sort} setSort={setSort} />
                    <Order order={order} setOrder={setOrder} sort={sort} />
                    <Hair hairColor={hairColor} setHairColor={setHairColor} hairType={hairType} setHairType={setHairType} />
                </div>
                {selectedUsers.length > 0 && <DeleteSelected selectedUsers={selectedUsers} users={users} setUsers={setUsers} setLoading={setLoading} />}
                <AddNewUser emptyFormData={emptyFormData} setFormData={setFormData} setIsEditing={setIsEditing} />
            </div>
            <Table search={search} loading={loading} filteredHair={filteredHair} hairColor={hairColor} hairType={hairType} handleDelete={handleDelete} setFormData={setFormData} setEditId={setEditId} setIsEditing={setIsEditing} masterChecked={masterChecked} setMasterChecked={setMasterChecked} selectedUsers={selectedUsers} setSelectedUsers={setSelectedUsers} />
            <div className="bottom">
                <Pagination currentPage={currentPage} totalPages={totalPages}
                    setCurrentPage={setCurrentPage} users={users} />
                <Limit limit={limit} setLimit={setLimit} />
            </div>
        </div>
    );
}

export default Home;
