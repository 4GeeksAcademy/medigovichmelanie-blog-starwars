import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Link } from "react-router-dom";

export const VehicleDetails = () => {
    const [vehicle, setVehicle] = useState({})
    const [loading, setLoading] = useState(true)
    const [imgError, setImgError] = useState(false)
    const navigate = useNavigate()

    const params = useParams()

    const handleImageError = () => {
        setImgError(true);
    };

    const getVehicleDetails = async () => {
        try {
            setLoading(true)
            const response = await fetch(`https://www.swapi.tech/api/vehicles/${params.uid}`);
            if (!response.ok) {
                navigate("/")
            }
            const data = await response.json();
            setVehicle(data.result.properties);
        } catch (error) {
            console.error("Error fetching vehicle details:", error)
            navigate("/")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getVehicleDetails()
    }, [params.uid])

    if (loading) {
        return (
            <div className="container text-center my-5">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
                <p className="mt-2">Loading vehicle details...</p>
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
                            src={`https://github.com/tbone849/star-wars-guide/blob/master/build/assets/img/vehicles/${params.uid}.jpg?raw=true`}
                            className="img-fluid rounded shadow-lg"
                            alt={`Imagen de ${vehicle?.name}`}
                            onError={handleImageError}
                            style={{ maxHeight: "500px", width: "100%", objectFit: "cover" }}
                        />
                    )}
                </div>
                <div className="col-md-6">
                    <div className="card shadow">
                        <div className="card-header bg-dark text-white">
                            <h2 className="card-title mb-0">{vehicle.name}</h2>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-6">
                                    <p><strong>Model:</strong> {vehicle.model}</p>
                                    <p><strong>Manufacturer:</strong> {vehicle.manufacturer}</p>
                                    <p><strong>Cost in Credits:</strong> {vehicle.cost_in_credits}</p>
                                    <p><strong>Length:</strong> {vehicle.length} meters</p>
                                </div>
                                <div className="col-md-6">
                                    <p><strong>Max Atmosphering Speed:</strong> {vehicle.max_atmosphering_speed}</p>
                                    <p><strong>Crew:</strong> {vehicle.crew}</p>
                                    <p><strong>Passengers:</strong> {vehicle.passengers}</p>
                                    <p><strong>Vehicle Class:</strong> {vehicle.vehicle_class}</p>
                                </div>
                            </div>
                            <hr />
                            <div className="mt-3">
                                <h5>Description</h5>
                                <p className="text-muted">
                                    The {vehicle.name} is a {vehicle.vehicle_class} vehicle manufactured by {vehicle.manufacturer}. 
                                    It has a model {vehicle.model} and can carry {vehicle.crew} crew members plus {vehicle.passengers} passengers. 
                                    With a length of {vehicle.length} meters, it can reach speeds of {vehicle.max_atmosphering_speed} in atmosphere.
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