import "./order.css";

function Order({order, setOrder, sort}) {
    return (
        <div className="head">
            <label htmlFor="order">Order By: </label>
            <select id="order"
                className="order"
                disabled = {sort === ""}
                
                value={order}
                onChange={(e) => setOrder(e.target.value)}>
                <option value="asc">asc</option>
                <option value="desc">desc</option>
            </select>
        </div>
    );
}

export default Order;