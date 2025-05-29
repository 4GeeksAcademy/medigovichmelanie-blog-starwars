import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const CharacterCard = ({ character }) => {
    const [imgError, setImgError] = useState(false);
    const { store, dispatch } = useGlobalReducer();
    const [isFavorite, setIsFavorite] = useState(store.favorites.includes(character?.properties.name));

    const handleImageError = () => {
        setImgError(true);
    };

    const handleClick = () => {
        dispatch({ type: "handle_favorites", payload: character?.properties.name });
        setIsFavorite(!isFavorite);
    }

    useEffect(() => {
        setIsFavorite(store.favorites.includes(character?.properties.name));
    }, [store.favorites]);

    return (
        <div className="col-md-3 col-lg-2 col-sm-6 col-12 mb-4 px-2">
            <div className="card h-100 shadow-sm border-0 hover-effect">
                {imgError ? (
                    <div className="image-placeholder d-flex align-items-center justify-content-center"
                        style={{
                            height: "200px",
                            backgroundColor: "#f0f0f0",
                            borderBottom: "1px solid #ddd"
                        }}>
                        <span className="text-muted">Imagen no disponible</span>
                    </div>
                ) : (
                    <img
                        src={`https://github.com/tbone849/star-wars-guide/blob/master/build/assets/img/characters/${character?.uid}.jpg?raw=true`}
                        className="card-img-top img-fluid"
                        alt={`Imagen de ${character?.properties.name}`}
                        onError={handleImageError}
                        style={{ height: "200px", objectFit: "cover" }}
                    />
                )}

                <div className="card-body d-flex flex-column p-3">
                    <h5 className="card-title text-truncate mb-3">{character?.properties.name}</h5>
                    <p className="card-text mb-1"><strong>Gender:</strong> {character?.properties.gender}</p>
                    <p className="card-text mb-1"><strong>Hair Color:</strong> {character?.properties.hair_color}</p>
                    <p className="card-text mb-3"><strong>Eye Color:</strong> {character?.properties.eye_color}</p>

                    <div className="mt-auto d-flex justify-content-between align-items-center">
                        <Link to={`/character/${character.uid}`} className="w-75 me-2">
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