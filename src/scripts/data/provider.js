const API = "http://localhost:8088"
const mainContainer = document.querySelector(".giffygram")


const applicationState = {
    currentUser: {},
    feed: {
        chosenUserId: null,
        displayFavorites: false,
        displayMessages: false
    },
    users: [],
    messages: [],
    posts: [],
    favorites: [],
    follows: []
}

//Return a copy of the applicationState
export const getUsers = () => {
    return applicationState.users.map(user => ({ ...user }))
}
export const getMessages = () => {
    return applicationState.messages.map(message => ({ ...message }))
}



export const getPosts = () => {
    if (applicationState.feed.chosenUserId === null) {
        return applicationState.posts.map(post => ({ ...post }))
    } else {
        const filteredPosts = applicationState.posts.filter(post => {
          return  applicationState.feed.chosenUserId === post.userId
        })
        return filteredPosts
    }
}


export const getFavorites = () => {
    return applicationState.favorites.map(favorite => ({ ...favorite }))
}
export const getFollows = () => {
    return applicationState.follows.map(follow => ({ ...follow }))
}
export const getCurrentUser = () => {
    return { ...applicationState.currentUser }
}
export const setCurrentUser = (id) => {
    applicationState.currentUser.currentUserId = id
}
export const setChosenUserDropdownOption = (id) => {
    applicationState.feed.chosenUserId = id
    mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
}



//Fetch the API
export const fetchUsers = () => {
    return fetch(`${API}/users`)
        .then(response => response.json())
        .then(
            (usersAPI) => {
                // Store the external state in application state
                applicationState.users = usersAPI
            }
        )
}
export const fetchMessages = () => {
    return fetch(`${API}/messages`)
        .then(response => response.json())
        .then(
            (messagesAPI) => {
                // Store the external state in application state
                applicationState.messages = messagesAPI
            }
        )
}
export const fetchPosts = () => {
    return fetch(`${API}/posts`)
        .then(response => response.json())
        .then(
            (postsAPI) => {
                // Store the external state in application state
                applicationState.posts = postsAPI
            }
        )
}
export const fetchFavorites = () => {
    return fetch(`${API}/favorites`)
        .then(response => response.json())
        .then(
            (favoritesAPI) => {
                // Store the external state in application state
                applicationState.favorites = favoritesAPI
            }
        )
}
export const fetchFollows = () => {
    return fetch(`${API}/follows`)
        .then(response => response.json())
        .then(
            (followsAPI) => {
                // Store the external state in application state
                applicationState.follows = followsAPI
            }
        )
}

export const saveDirectMessage = (directMessageObj) => { // export fumction that saves the state of Direct Messages created on the MessageForm module
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(directMessageObj)
    }


    return fetch(`${API}/messages`, fetchOptions)
        .then(response => response.json())
        .then(() => {
            mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
        })
}



