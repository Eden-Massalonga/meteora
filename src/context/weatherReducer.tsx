import { GET_LOCATION, GET_WEATHER } from "./types"

interface Action {
    type: string,
    payload: any
}

export default (state: any, action: Action) => {
    switch (action.type) {
        case GET_WEATHER:
            return {
                ...state,
                weather: action.payload
            }
        case GET_LOCATION:
            return {
                ...state,
                location: action.payload['coord']
            }
        default:
            break;
    }
}
