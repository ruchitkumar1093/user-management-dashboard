import { Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/login";
import UserForm from "./pages/userForm";
import { useState } from "react";
import UserView from "./pages/userView";
import ProtectedRoute from "./components/ProtectedRoute";

const emptyFormData = {
    firstName: "",
    lastName: "",
    age: "",
    gender: "",
    city: "",
    phone: "",
    hairColor: "",
    hairType: ""
};

function App() {
    const [localUsers, setLocalUsers] = useState([]);
    const [editedUsers, setEditedUsers] = useState({});
    const [apiUserTotal, setApiUserTotal] = useState(0);
    const [editId, setEditId] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState(emptyFormData);

    async function handleAdd() {
        const userData = {
            firstName: formData.firstName,
            lastName: formData.lastName,
            age: Number(formData.age),
            gender: formData.gender,
            address: {
                city: formData.city
            },
            phone: formData.phone,
            hair: {
                color: formData.hairColor,
                type: formData.hairType
            }
        };

        let data = {};

        try {
            const result = await fetch('https://dummyjson.com/users/add', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData)
            })

            data = await result.json();
        }
        catch (error) {
            console.log(error);
        }

        setLocalUsers((prev) => [...prev, { ...userData, ...data, id: apiUserTotal + prev.length + 1 }]);
    }

    async function handleEdit(id) {
        const userData = {
            id: id,
            firstName: formData.firstName,
            lastName: formData.lastName,
            age: Number(formData.age),
            gender: formData.gender,
            address: {
                city: formData.city
            },
            phone: formData.phone,
            hair: {
                color: formData.hairColor,
                type: formData.hairType
            }
        };

        let data = {};

        try {
            const result = await fetch(`https://dummyjson.com/users/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData)
            });

            data = await result.json();
        }
        catch (error) {
            console.log(error);
        }

        const updatedUser = { ...userData, ...data, id };

        setLocalUsers((prev) => prev.map((user) => (
            user.id === id ? updatedUser : user
        )));
        setEditedUsers((prev) => ({
            ...prev,
            [id]: updatedUser
        }));
    }
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<ProtectedRoute><Home
                formData={formData}
                localUsers={localUsers}
                editedUsers={editedUsers}
                setApiUserTotal={setApiUserTotal}
                emptyFormData={emptyFormData}
                setFormData={setFormData}
                setEditId={setEditId}
                setIsEditing={setIsEditing} /></ProtectedRoute>} />
            <Route path="/userForm/add" element={<ProtectedRoute><UserForm
                formData={formData}
                setFormData={setFormData}
                handleAdd={handleAdd}
                isEditing={false} /></ProtectedRoute>} />
            <Route path="/userForm/edit/:id" element={<ProtectedRoute><UserForm
                formData={formData}
                setFormData={setFormData}
                handleEdit={handleEdit}
                isEditing={true} /></ProtectedRoute>} />
            <Route path="/userView/:id" element={<ProtectedRoute><UserView /></ProtectedRoute>} />
        </Routes>
    );
}

export default App;
