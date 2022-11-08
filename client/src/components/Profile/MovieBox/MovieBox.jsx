import { Link } from "react-router-dom";

export function MovieBox({
    movies    
}) {
    return (
        <>
            {movies.map(x => 
                <div key={x._id} className="movie-box">
                    <h3>{x.title}</h3>
                    <p>{x.genre}</p>
                    <button><Link to={`/details/${x._id}`}>Details</Link></button>
                </div> 
            )}
        </>
    );
}