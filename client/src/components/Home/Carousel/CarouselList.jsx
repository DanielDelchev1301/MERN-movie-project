import { Carousel } from "react-bootstrap";

export function CarouselList({
    movies
}) {
    return (
        <div className="carousel-box">
            <Carousel fade>
                {movies.map(movie => 
                    <Carousel.Item key={movie._id} interval={4000}>
                        <img
                            className="d-block w-100"
                            src={movie.imageUrl}
                            alt={movie.title}
                        />
                        <Carousel.Caption>
                            <h3 className="carousel-title">{movie.title}</h3>
                            <p className="carousel-paragraph">{movie.genre}</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                )}
            </Carousel>
        </div>
    );
}