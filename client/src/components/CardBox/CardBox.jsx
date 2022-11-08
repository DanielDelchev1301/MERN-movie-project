import { Link } from "react-router-dom";

export function CardBox({
    movies
}) {
    return (
        <>
            {movies.map(movie => 
                <article key={movie._id} className='most-watched-article' >
                    <div className="card-box">
                        <img src={movie.imageUrl} alt={movie.title} />
                        <h2>{movie.title}</h2>
                        <button><Link to={`/details/${movie._id}`}>Details</Link></button>
                    </div>
                </article>
            )}
        </>
    );
}