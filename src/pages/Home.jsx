import { useEffect, useState } from "react";
import { CharacterCard } from "../components/CharacterCard";
import { PlanetCard } from "../components/PlanetCard";
import { VehicleCard } from "../components/VehicleCard";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Home = () => {

    const { store, dispatch } = useGlobalReducer()


    return (
        <div className="text-center mt-5">
            <h1>Characters</h1>
            <div className="d-flex overflow-x-scroll">
                {
                    store.characters.map(character => (
                        <CharacterCard key={character.uid} character={character} />
                    ))
                }
            </div>

            <h1>Planets</h1>
            <div className="d-flex overflow-x-scroll">
                {
                    store.planets.map(planet => (
                        <PlanetCard key={planet.uid} planet={planet} />
                    ))
                }
            </div>

            <h1>Vehicles</h1>
            <div className="d-flex overflow-x-scroll pb-3">
                {
                    store.vehicles.map(vehicle => (
                        <VehicleCard key={vehicle.uid} vehicle={vehicle} />
                    ))
                }
            </div>
        </div>
    );
};