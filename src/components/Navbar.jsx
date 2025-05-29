import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Navbar = () => {
    const { store, dispatch } = useGlobalReducer();

    return (
        <nav className="navbar navbar-expand-lg bg-dark border-bottom border-body" data-bs-theme="dark">
            <div className="container-fluid">
                <button className="navbar-toggler ms-3" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <Link className="navbar-brand ms-4 me-4" to="#">
                    <img
                        src="https://pngimg.com/uploads/star_wars_logo/star_wars_logo_PNG10.png"
                        alt="Star Wars Logo"
                        className="img-fluid" 
                        style={{ height: "60px", width: "auto" }}
                    />
                </Link>
                <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        {/* Espacio para items de navegación si los necesitas */}
                    </ul>
                    <div className="btn-group me-3">
                        <button type="button" className="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                            Favorites ({store.favorites.length})
                        </button>
                        <ul className="dropdown-menu dropdown-menu-end">
                            {store.favorites.length === 0 ? <li className="dropdown-item">Empty</li> :
                                store.favorites.map(favorite => (
                                    <li key={favorite} className="dropdown-item d-flex justify-content-between align-items-center">
                                        {favorite}
                                        <i 
                                            className="fa-solid fa-trash-can text-danger" 
                                            style={{ cursor: "pointer" }}
                                            onClick={() => dispatch({ type: "handle_favorites", payload: favorite })}
                                        ></i>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    );
};