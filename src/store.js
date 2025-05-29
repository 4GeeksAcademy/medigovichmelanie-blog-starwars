export const initialStore = () => {
  return {
    message: null,
    todos: [
      {
        id: 1,
        title: "Make the bed",
        background: null,
      },
      {
        id: 2,
        title: "Do my homework",
        background: null,
      }
    ],
    characters: [],
    planets: [],
    vehicles: [],
    favorites: []
  }
}

export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case 'add_task':

      const { id, color } = action.payload

      return {
        ...store,
        todos: store.todos.map((todo) => (todo.id === id ? { ...todo, background: color } : todo))
      };
    case "set_characters":
      return {
        ...store,
        characters: action.payload
      };
    case "set_planets":
      return {
        ...store,
        planets: action.payload
      };
    case "set_vehicles":
      return {
        ...store,
        vehicles: action.payload
      };
      case "handle_favorites":
        let newFavorites = []
        if (store.favorites.includes(action.payload)) {
          newFavorites = store.favorites.filter(favorite => favorite !== action.payload)
        }else {
          newFavorites = [...store.favorites, action.payload]
        }        
        return {
          ...store,
          favorites: newFavorites
        }
    default:
      throw Error('Unknown action.');
  }
}