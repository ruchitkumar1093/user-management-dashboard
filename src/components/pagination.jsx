import "./pagination.css";
function Pagination({ currentPage, totalPages, setCurrentPage, users }) {

    const pages = [];

    for(let i=1; i<=totalPages; i++){
        if(i === 1 ||
            Math.abs(i - currentPage) <= 1 ||
            i === totalPages
        ){
            pages.push(i);
        }

        else{

            if(pages[pages.length-1] !== "..."){
                pages.push("...");
            }
        }
    }


    return (
        <div className="btn">
            <button type="button" onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage <= 1}>
                Previous
            </button>

            {pages.map((item, index) => item === "..." ? <span key={index}>{item}</span> : 
            <button className={item === currentPage ? "active" : ""} type="button"
            onClick={() => setCurrentPage(item)}>{item}</button>)}

            <button type="button" onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage >= totalPages}>
                Next
            </button>
        </div>
    );
}

export default Pagination;