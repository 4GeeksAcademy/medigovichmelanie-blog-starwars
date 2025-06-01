import { Outlet } from "react-router-dom/dist"
import ScrollToTop from "../components/ScrollToTop"
import { Navbar } from "../components/Navbar"
import { Footer } from "../components/Footer"
import useGlobalReducer from "../hooks/useGlobalReducer"
import { useEffect } from "react"
import { getCharacters, getPlanets, getVehicles } from "../services/APIServices"

// Base component that maintains the navbar and footer throughout the page and the scroll to top functionality.
export const Layout = () => {
    const { store, dispatch } = useGlobalReducer()

    useEffect(() => {
        if (localStorage.getItem("characters")) {
            dispatch({ type: "set_characters", payload: JSON.parse(localStorage.getItem("characters")) })
        } else {
            getCharacters(dispatch)

        }
        if (localStorage.getItem("planets")) {
            dispatch({ type: "set_planets", payload: JSON.parse(localStorage.getItem("planets")) })
        } else {
            getPlanets(dispatch)

        }
        if (localStorage.getItem("vehicles")) {
            dispatch({ type: "set_vehicles", payload: JSON.parse(localStorage.getItem("vehicles")) })
        } else {
            getVehicles(dispatch)

        }
    }, [])
    return (
        <ScrollToTop>
            <Navbar />
            <Outlet />
            <Footer />
        </ScrollToTop>
    )
}