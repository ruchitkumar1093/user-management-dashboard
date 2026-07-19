import "./table.css";
import { FiEdit, FiTrash, FiEye } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useState } from "react";
function Table({ user, search, loading, filteredHair, hairColor, hairType, handleDelete, setFormData, setEditId, setIsEditing, masterChecked, setMasterChecked, selectedUsers, setSelectedUsers }) {

    function handleMasterCheckbox(e) {
        const checked = e.target.checked;
        setMasterChecked(checked);
        if (checked) {
            setSelectedUsers(filteredHair.map(item => item.id));
        }
        else {
            setSelectedUsers([]);
        }
    }

    function handleCheckbox(id) {
        let updatedUsers;
        if (selectedUsers.includes(id)) {
            updatedUsers = selectedUsers.filter(item => item !== id);
        }
        else {
            updatedUsers = [...selectedUsers, id];
        }

        setSelectedUsers(updatedUsers);
        setMasterChecked(updatedUsers.length === filteredHair.length);
    }

    function handleEditClick(item) {
        setIsEditing(true);
        setEditId(item.id);

        setFormData({
            firstName: item.firstName,
            lastName: item.lastName,
            age: item.age,
            gender: item.gender,
            city: item.address.city,
            phone: item.phone,
            hairColor: item.hair.color,
            hairType: item.hair.type
        });
    }
    return (
        <div className="tble">
            <div className="tableWrapper">
                <table>
                    <thead>
                        <tr>
                            <th rowspan="2"><input type="checkbox"
                                checked={masterChecked}
                                onChange={handleMasterCheckbox}></input></th>
                            <th rowspan="2">ID</th>
                            <th rowspan="2">First Name</th>
                            <th rowspan="2">Last Name</th>
                            <th rowspan="2">Age</th>
                            <th rowspan="2">Gender</th>
                            <th rowspan="2">City</th>
                            <th rowspan="2">Phone</th>
                            <th colspan="2">Hair Style</th>
                            <th rowspan="2">Actions</th>
                        </tr>
                        <tr>
                            <th>color</th>
                            <th>type</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? <p>Loading...</p> : (filteredHair.map((item) =>
                        (<tr key={item.id}>
                            <td><input type="checkbox"
                                checked={selectedUsers.includes(item.id)}
                                onChange={() => handleCheckbox(item.id)}></input></td>
                            <td>{item.id}</td>
                            <td>{item.firstName}</td>
                            <td>{item.lastName}</td>
                            <td>{item.age}</td>
                            <td>{item.gender}</td>
                            <td>{item.address.city}</td>
                            <td>{item.phone}</td>
                            <td>{item.hair.color}</td>
                            <td>{item.hair.type}</td>
                            <td><Link to={`/userForm/edit/${item.id}`}><button id="icons" onClick={() => handleEditClick(item)}><FiEdit /></button></Link>
                                <button onClick={() => handleDelete(item.id)} id="icons"><FiTrash /></button>
                                <Link to={`/userView/${item.id}`}><button id="icons"><FiEye /></button></Link></td>
                        </tr>))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Table;