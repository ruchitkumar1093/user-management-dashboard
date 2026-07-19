function UserCard({ viewData, loading }) {
    return (
        <div className="info">

            {loading ? <p>Loading...</p> : viewData.map((item) => (
                <div className="view">
                    <div className="userProfile">
                        <img src={item.image} />
                        <h1 key={item.id}>
                            {item.firstName}</h1>
                    </div>
                    <div>
                        <p>Age: {item.age}</p>
                        <p>Gender: {item.gender}</p>
                        <p>City: {item.address.city}</p>
                        <p>Phone: {item.phone}</p>
                        <p>Hair Color: {item.hair.color}</p>
                        <p>Hair Type: {item.hair.type}</p>
                    </div>
                </div>
            ))}

        </div>
    );
}

export default UserCard;