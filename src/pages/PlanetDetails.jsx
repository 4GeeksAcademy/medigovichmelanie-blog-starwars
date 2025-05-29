import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Link } from "react-router-dom";

export const PlanetDetails = () => {
    const [planet, setPlanet] = useState({})
    const [loading, setLoading] = useState(true)
    const [imgError, setImgError] = useState(false)
    const navigate = useNavigate()

    const params = useParams()

    const handleImageError = () => {
        setImgError(true);
    };

    const getPlanetDetails = async () => {
        try {
            setLoading(true)
            const response = await fetch(`https://www.swapi.tech/api/planets/${params.uid}`);
            if (!response.ok) {
                navigate("/")
            }
            const data = await response.json();
            setPlanet(data.result.properties);
        } catch (error) {
            console.error("Error fetching planet details:", error)
            navigate("/")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getPlanetDetails()
    }, [params.uid])

    if (loading) {
        return (
            <div className="container text-center my-5">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
                <p className="mt-2">Loading planet details...</p>
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
                            src={params.uid == 1 ? 
                                "https://upload.wikimedia.org/wikipedia/en/6/6d/Tatooine_%28fictional_desert_planet%29.jpg" : 
                                `https://github.com/tbone849/star-wars-guide/blob/master/build/assets/img/planets/${params.uid}.jpg?raw=true`}
                            className="img-fluid rounded shadow-lg"
                            alt={`Imagen de ${planet?.name}`}
                            onError={handleImageError}
                            style={{ maxHeight: "500px", width: "100%", objectFit: "cover" }}
                        />
                    )}
                </div>
                <div className="col-md-6">
                    <div className="card shadow">
                        <div className="card-header bg-dark text-white">
                            <h2 className="card-title mb-0">{planet.name}</h2>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-6">
                                    <p><strong>Diameter:</strong> {planet.diameter} km</p>
                                    <p><strong>Rotation Period:</strong> {planet.rotation_period} hours</p>
                                    <p><strong>Orbital Period:</strong> {planet.orbital_period} days</p>
                                    <p><strong>Gravity:</strong> {planet.gravity}</p>
                                </div>
                                <div className="col-md-6">
                                    <p><strong>Population:</strong> {planet.population}</p>
                                    <p><strong>Climate:</strong> {planet.climate}</p>
                                    <p><strong>Terrain:</strong> {planet.terrain}</p>
                                    <p><strong>Surface Water:</strong> {planet.surface_water}%</p>
                                </div>
                            </div>
                            <hr />
                            <div className="mt-3">
                                <h5>Description</h5>
                                <p className="text-muted">
                                    {planet.name} is a planet with {planet.climate} climate and {planet.terrain} terrain. 
                                    It has a diameter of {planet.diameter} km and a population of {planet.population}. 
                                    The gravity is {planet.gravity} and it completes an orbit every {planet.orbital_period} days.
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