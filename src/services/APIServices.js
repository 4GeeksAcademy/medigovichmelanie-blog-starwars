export const getCharacters = async (dispatch) => {
    const response = await fetch("https://www.swapi.tech/api/people/")
    const data = await response.json()
    if (data) {
        const results = await loadAllCharactersDetails(data.results)
        dispatch({ type: "set_characters", payload: results })
        localStorage.setItem("characters", JSON.stringify(results))
    }

}

export const getPlanets = async (dispatch) => {
    const response = await fetch("https://www.swapi.tech/api/planets/")
    const data = await response.json()
    if (data) {
        const results = await loadAllPlanetsDetails(data.results)
        dispatch({ type: "set_planets", payload: results })
        localStorage.setItem("planets", JSON.stringify(results))

    }
}

export const getVehicles = async (dispatch) => {
    const response = await fetch("https://www.swapi.tech/api/vehicles/")
    const data = await response.json()
    if (data) {
        const results = await loadAllVehiclesDetails(data.results)
        dispatch({ type: "set_vehicles", payload: results })
        localStorage.setItem("vehicles", JSON.stringify(results))
    }
}

const loadAllCharactersDetails = async (characters) => {
    try {
        const promises = characters.map(async (character) => {
            try {
                const response = await fetch(`https://www.swapi.tech/api/people/${character.uid}`)
                const data = await response.json()
                return {
                    uid: character.uid,
                    properties: data.result.properties
                }
            } catch (error) {
                console.log(error);

            }
        })
        const results = await Promise.all(promises)
        return results
    } catch (error) {
        console.log(error);

    }
}

const loadAllPlanetsDetails = async (planets) => {
    try {
        const promises = planets.map(async (planet) => {
            try {
                const response = await fetch(`https://www.swapi.tech/api/planets/${planet.uid}`)
                const data = await response.json()
                return {
                    uid: planet.uid,
                    properties: data.result.properties
                }
            } catch (error) {
                console.log(error);

            }
        })
        const results = await Promise.all(promises)
        return results
    } catch (error) {
        console.log(error);

    }
}

const loadAllVehiclesDetails = async (vehicles) => {
    try {
        const promises = vehicles.map(async (vehicle) => {
            try {
                const response = await fetch(`https://www.swapi.tech/api/vehicles/${vehicle.uid}`)
                const data = await response.json()
                return {
                    uid: vehicle.uid,
                    properties: data.result.properties
                }
            } catch (error) {
                console.log(error);

            }
        })
        const results = await Promise.all(promises)
        return results
    } catch (error) {
        console.log(error);

    }
}