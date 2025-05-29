import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const PlanetCard = ({ planet }) => {
    const [imgError, setImgError] = useState(false);
    const { store, dispatch } = useGlobalReducer();
    const [isFavorite, setIsFavorite] = useState(store.favorites.includes(planet?.properties.name));

    const handleImageError = () => {
        setImgError(true);
    };

    const handleClick = () => {
        dispatch({ type: "handle_favorites", payload: planet?.properties.name });
        setIsFavorite(!isFavorite);
    }

    useEffect(() => {
        setIsFavorite(store.favorites.includes(planet?.properties.name));
    }, [store.favorites]);

    return (
        <div className="col-md-3 col-lg-2 col-sm-6 col-12 mb-4 px-2">
            <div className="card h-100 shadow-sm border-0 hover-effect">
                <img
                    src={planet.uid == 1 ? "https://upload.wikimedia.org/wikipedia/en/6/6d/Tatooine_%28fictional_desert_planet%29.jpg" : `https://github.com/tbone849/star-wars-guide/blob/master/build/assets/img/planets/${planet?.uid}.jpg?raw=true`}
                    className="card-img-top img-fluid"
                    alt={`Imagen de ${planet?.properties.name}`}
                    onError={handleImageError}
                    style={{ height: "200px", objectFit: "cover" }}
                />

                <div className="card-body d-flex flex-column p-3">
                    <h5 className="card-title text-truncate mb-3">{planet?.properties.name}</h5>
                    <p className="card-text mb-1"><strong>Population:</strong> {planet?.properties.population}</p>
                    <p className="card-text mb-1"><strong>Terrain:</strong> {planet?.properties.terrain}</p>
                    <p className="card-text mb-3"><strong>Gravity:</strong> {planet?.properties.gravity}</p>

                    <div className="mt-auto d-flex justify-content-between align-items-center">
                        <Link to={`/planet/${planet.uid}`} className="w-75 me-2">
                            <button className="btn btn-outline-primary w-100 py-2">Learn more!</button>
                        </Link>
                        <button
                            className={`btn p-2 ${isFavorite ? 'btn-danger' : 'btn-outline-danger'}`}
                            onClick={handleClick}
                            style={{ lineHeight: '1' }}>
                            <i className="fas fa-heart"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}