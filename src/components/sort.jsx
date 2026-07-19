import "./sort.css";

function Sort({sort, setSort}){
    return(
        <div className="head">
            <label for="filter">Sort By: </label>
            <select className="fltr"
            id="filter"
            value={sort}
            onChange={(e) => setSort(e.target.value)}>
                <option value="">None</option>
                <option value={"firstName"}>First Name</option>
                <option value={"lastName"}>Last Name</option>
                <option value={"age"}>Age</option>
                <option value={"phone"}>Phone</option>
            </select>
        </div>
    );
}

export default Sort;