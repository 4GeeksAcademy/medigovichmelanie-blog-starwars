import { useEffect, useState } from "react";
import { CharacterCard } from "../components/CharacterCard";
import { PlanetCard } from "../components/PlanetCard";
import { VehicleCard } from "../components/VehicleCard";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Home = () => {

    const { store, dispatch } = useGlobalReducer()
    const [characters, setCharacters] = useState([])
    const [planets, setPlanets] = useState([])
    const [vehicles, setVehicles] = useState([])

    const getCharacters = async () => {
        const response = await fetch("https://www.swapi.tech/api/people/")
        const data = await response.json()
        setCharacters(data.results)
    }

    const getPlanets = async () => {
        const response = await fetch("https://www.swapi.tech/api/planets/")
        const data = await response.json()
        setPlanets(data.results)
    }

    const getVehicles = async () => {
        const response = await fetch("https://www.swapi.tech/api/vehicles/")
        const data = await response.json()
        setVehicles(data.results)
    }

    useEffect(() => {
        getCharacters()
        getPlanets()
        getVehicles()
    }, [])

    return (
        <div className="text-center mt-5">
            <h1>Characters</h1>
            <div className="d-flex overflow-x-scroll">
                {
                    characters.map(character => (
                        <CharacterCard key={character.uid} character={character} />
                    ))
                }
            </div>

            <h1>Planets</h1>
            <div className="d-flex overflow-x-scroll">
                {
                    planets.map(planet => (
                        <PlanetCard key={planet.uid} planet={planet} />
                    ))
                }
            </div>

            <h1>Vehicles</h1>
            <div className="d-flex overflow-x-scroll pb-3">
                {
                    vehicles.map(vehicle => (
                        <VehicleCard key={vehicle.uid} vehicle={vehicle} />
                    ))
                }
            </div>
        </div>
    );
};