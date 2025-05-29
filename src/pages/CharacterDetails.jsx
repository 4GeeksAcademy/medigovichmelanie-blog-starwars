import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Link } from "react-router-dom";

export const CharacterDetails = () => {
    const [character, setCharacter] = useState({})
    const [loading, setLoading] = useState(true)
    const [imgError, setImgError] = useState(false)
    const navigate = useNavigate()

    const params = useParams()

    const handleImageError = () => {
        setImgError(true);
    };

    const getCharacterDetails = async () => {
        try {
            setLoading(true)
            const response = await fetch(`https://www.swapi.tech/api/people/${params.uid}`);
            if (!response.ok) {
                navigate("/")
            }
            const data = await response.json();
            setCharacter(data.result.properties);
        } catch (error) {
            console.error("Error fetching character details:", error)
            navigate("/")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getCharacterDetails()
    }, [params.uid])

    if (loading) {
        return (
            <div className="container text-center my-5">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
                <p className="mt-2">Loading character details...</p>
            </div>
        )
    }

    return (
        <div className="container my-5">
            <div className="row">
                <div className="col-md-6 mb-4">
                    {imgError ? (
                        <div className="image-placeholder d-flex align-items-center justify-content-center bg-secondary" 
                            style={{ height: "500px", borderRadius: "10px" }}>
                            <span className="text-white">Image not available</span>
                        </div>
                    ) : (
                        <img
                            src={`https://github.com/tbone849/star-wars-guide/blob/master/build/assets/img/characters/${params.uid}.jpg?raw=true`}
                            className="img-fluid rounded shadow-lg"
                            alt={`Imagen de ${character?.name}`}
                            onError={handleImageError}
                            style={{ maxHeight: "500px", width: "100%", objectFit: "cover" }}
                        />
                    )}
                </div>
                <div className="col-md-6">
                    <div className="card shadow">
                        <div className="card-header bg-dark text-white">
                            <h2 className="card-title mb-0">{character.name}</h2>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-6">
                                    <p><strong>Height:</strong> {character.height} cm</p>
                                    <p><strong>Mass:</strong> {character.mass} kg</p>
                                    <p><strong>Hair Color:</strong> {character.hair_color}</p>
                                    <p><strong>Skin Color:</strong> {character.skin_color}</p>
                                </div>
                                <div className="col-md-6">
                                    <p><strong>Eye Color:</strong> {character.eye_color}</p>
                                    <p><strong>Birth Year:</strong> {character.birth_year}</p>
                                    <p><strong>Gender:</strong> {character.gender}</p>
                                    <p><strong>Homeworld:</strong> {character.homeworld}</p>
                                </div>
                            </div>
                            <hr />
                            <div className="mt-3">
                                <h5>Description</h5>
                                <p className="text-muted">
                                    {character.name} is a {character.gender} character from the Star Wars universe. 
                                    With {character.hair_color} hair and {character.skin_color} skin, 
                                    this character stands {character.height} cm tall and weighs {character.mass} kg.
                                </p>
                            </div>
                        </div>
                        <div className="card-footer text-end">
                            <Link to="/" className="btn btn-primary">
                                Back to Home
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}