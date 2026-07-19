import "./addNewUser.css";
import {Link} from "react-router-dom";

function AddNewUser({ emptyFormData, setFormData, setIsEditing }){
    return(
        <div className="newUser">
            <Link to="/userForm/add"><button type="button" onClick={() => {
                setIsEditing(false);
                setFormData(emptyFormData);
            }}>Add User</button></Link>
        </div>
    );
}

export default AddNewUser;
