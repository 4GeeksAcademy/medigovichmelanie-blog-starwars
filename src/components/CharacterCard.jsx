import { useEffect, useState } from "react";

export const CharacterCard = ({ character }) => {
    const [detalle, setDetalle] = useState({});
    const [imgError, setImgError] = useState(false);

    const getDetails = async () => {
        const response = await fetch(`https://www.swapi.tech/api/people/${character.uid}`);
        const data = await response.json();
        setDetalle(data.result.properties);
    }

    const handleImageError = () => {
        setImgError(true);
    };

    useEffect(() => {
        getDetails();
    }, [])

    return (
        <div className="col-md-3 col-lg-2 col-sm-6 col-12">
            <div className="card">
                {imgError ? (
                    <div className="image-placeholder" style={{
                        height: "200px",
                        backgroundColor: "#f0f0f0",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderBottom: "1px solid #ddd"
                    }}>
                        <span className="text-muted">Imagen no disponible</span>
                    </div>
                ) : (
                    <img
                        src={`https://github.com/tbone849/star-wars-guide/blob/master/build/assets/img/characters/${character?.uid}.jpg?raw=true`}
                        className="card-img-top" 
                        alt={`Imagen de ${character?.name}`}
                        onError={handleImageError}
                        style={{ height: "200px", objectFit: "cover" }}
                    />
                )}
                
                <div className="card-body">
                    <h5 className="card-title">{character?.name}</h5>
                    <p className="card-text">Gender: {detalle.gender}</p>
                    <p className="card-text">Hair Color: {detalle.hair_color}</p>
                    <p className="card-text">Eye Color: {detalle.eye_color}</p>
                    <a href="#" className="btn btn-primary mt-2">Learn more!</a>
                </div>
            </div>
        </div>
    )
}