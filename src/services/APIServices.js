export const getCharacters = async (dispatch) => {
    const response = await fetch("https://www.swapi.tech/api/people/")
    const data = await response.json()
    dispatch({type: "set_characters" , payload: data.results})
}

export const getPlanets = async (dispatch) => {
    const response = await fetch("https://www.swapi.tech/api/planets/")
    const data = await response.json()
    dispatch({type: "set_planets" , payload: data.results})
}

export const getVehicles = async (dispatch) => {
    const response = await fetch("https://www.swapi.tech/api/vehicles/")
    const data = await response.json()
    dispatch({type: "set_vehicles" , payload: data.results})
}