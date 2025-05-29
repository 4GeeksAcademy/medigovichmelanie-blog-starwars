import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const PlanetDetails = () => {
    const { store, dispatch } = useGlobalReducer()
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
            const findPlanet = store.planets.find(plan => plan.uid == params.uid)

            setPlanet(findPlanet);
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
                            alt={`Imagen de ${planet.properties.name}`}
                            onError={handleImageError}
                            style={{ maxHeight: "500px", width: "100%", objectFit: "cover" }}
                        />
                    )}
                </div>
                <div className="col-md-6">
                    <div className="card shadow">
                        <div className="card-header bg-dark text-white">
                            <h2 className="card-title mb-0">{planet.properties.name}</h2>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-6">
                                    <p><strong>Diameter:</strong> {planet.properties.diameter} km</p>
                                    <p><strong>Rotation Period:</strong> {planet.properties.rotation_period} hours</p>
                                    <p><strong>Orbital Period:</strong> {planet.properties.orbital_period} days</p>
                                    <p><strong>Gravity:</strong> {planet.properties.gravity}</p>
                                </div>
                                <div className="col-md-6">
                                    <p><strong>Population:</strong> {planet.properties.population}</p>
                                    <p><strong>Climate:</strong> {planet.properties.climate}</p>
                                    <p><strong>Terrain:</strong> {planet.properties.terrain}</p>
                                    <p><strong>Surface Water:</strong> {planet.properties.surface_water}%</p>
                                </div>
                            </div>
                            <hr />
                            <div className="mt-3">
                                <h5>Description</h5>
                                <p className="text-muted">
                                    {planet.properties.name} is a planet with {planet.properties.climate} climate and {planet.properties.terrain} terrain.
                                    It has a diameter of {planet.properties.diameter} km and a population of {planet.properties.population}.
                                    The gravity is {planet.properties.gravity} and it completes an orbit every {planet.properties.orbital_period} days.
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