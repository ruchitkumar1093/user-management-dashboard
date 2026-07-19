import "./userForm.css";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

function UserForm({ formData, setFormData, handleAdd, handleEdit, isEditing }) {

    const { id } = useParams();

    useEffect(() => {
        if (!id) return;
        async function fetchUser() {
            const response = await fetch(`https://dummyjson.com/users/${id}`);
            const user = await response.json();

            setFormData({
                firstName: user.firstName,
                lastName: user.lastName,
                age: user.age,
                gender: user.gender,
                city: user.address.city,
                phone: user.phone,
                hairColor: user.hair.color,
                hairType: user.hair.type
            });
        }

        fetchUser();
    }, [id]);

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev, [name]: value
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isEditing) {
            await handleEdit(Number(id));
        }
        else {
            await handleAdd();
        }

        navigate("/home");
    }

    return (
        <div className="userForm">
            <div className="top">
                <h1>Users Form</h1>
            </div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="firstName">First Name: </label>
                    <input id="firstName" value={formData.firstName} name="firstName"
                        onChange={handleChange} placeHolder="Enter First Name" />
                </div>
                <div>
                    <label htmlFor="lastName">Last Name: </label>
                    <input id="lastName" value={formData.lastName} name="lastName"
                        onChange={handleChange} placeHolder="Enter Last Name" />
                </div>
                <div>
                    <label htmlFor="age">Age: </label>
                    <input id="age" value={formData.age} name="age"
                        onChange={handleChange} placeHolder="Enter Age" />
                </div>
                <div>
                    <label htmlFor="gender">Gender: </label>
                    <input id="gender" value={formData.gender} name="gender"
                        onChange={handleChange} placeHolder="Enter Gender" />
                </div>
                <div>
                    <label htmlFor="city">City: </label>
                    <input id="city" value={formData.city} name="city"
                        onChange={handleChange} placeHolder="City" />
                </div>
                <div>
                    <label htmlFor="phone">Phone: </label>
                    <input id="phone" value={formData.phone} name="phone"
                        onChange={handleChange} placeHolder="Enter Phone" />
                </div>
                <div>
                    <label htmlFor="hairColor">Hair Color: </label>
                    <input id="hairColor" value={formData.hairColor} name="hairColor"
                        onChange={handleChange} placeHolder="Enter Hair Color" />
                </div>
                <div>
                    <label htmlFor="hairType">Hair Type: </label>
                    <input id="hairType" value={formData.hairType} name="hairType"
                        onChange={handleChange} placeHolder="Enter Hair Type" />
                </div>
                <div>
                    <div className="btn">
                        {!isEditing ? (
                            <>
                                <button type="submit">Add</button>

                                <Link to="/home">
                                    <button type="button">Cancel</button>
                                </Link>
                            </>
                        ) : (
                            <>
                                <button type="submit">Update</button>

                                <Link to="/home">
                                    <button type="button">Cancel</button>
                                </Link>
                            </>
                        )}
                    </div>
                </div>

            </form>
        </div>
    );
}

export default UserForm;
