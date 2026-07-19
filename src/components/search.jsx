import "./search.css"
function Search({ search, setSearch }) {
    return (
        <div className="head">
            <label htmlFor="search">Search: </label>
            <input className="searchBar"
                type="text"
                placeholder="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)} />
        </div>
    );
}

export default Search;