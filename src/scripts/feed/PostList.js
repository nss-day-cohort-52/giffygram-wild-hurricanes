import { getPosts, getUsers, DeletePost, getCurrentUser, getUserFavoritePosts, DeleteFavorite, getFavorites, saveNewFavorite, setChosenUserProfileId } from '../data/provider.js'


export const PostList = () => {
    const posts = getPosts()
    const users = getUsers()
    const userFavoritedPosts = getUserFavoritePosts()

    //finding an object in user favorited posts where the postObj.id is equal to the clicked star's post object id and storing it in a variable
    return `<section class="posts">
    ${posts.map(postObj => {
        const foundUser = users.find(userObj => {
            return postObj.userId === userObj.id
        })

        const foundFavoritedPost = userFavoritedPosts.find(favoritedPostObj => favoritedPostObj.id === postObj.id)
        return `
        <div class="post">
            <header>
                <h2 class="post__title">${postObj.title}</h2>
            </header>
            <img class="post__image" src="${postObj.imageURL}">
            <div class="post__description">
                ${postObj.description}
            </div>
            <div class="post__tagline">
                <a href="#" class="profileLink" id="profile--${foundUser.id}">
                    Posted by: ${foundUser.name}
                </a>
                on ${postObj.datePosted}
            </div>
            <div id="post__action" class="post__actions">
                <div>  
                    ${foundFavoritedPost
                        ? `<img name="star--${postObj.id}" class="actionIcon" src="./images/favorite-star-yellow.svg"></img>`
                        : `<img name="star--${postObj.id}" class="actionIcon" src="./images/favorite-star-blank.svg"></img>`
                    }     
                </div>
                
                ${postObj.userId === getCurrentUser().currentUserId // if statement that checks if the userId on a post is the same as the  logged in user. If true the then generate the html which generates the trashcan Icon
                    ? ` <div> 
                            <img id="blockPost--${postObj.id}" class="actionIcon" src="./images/block.svg">
                        </div>`
                    : ""
                }
                
            </div>
        </div>`
    }).join("")}
    </section>`

}


//this event listener is responsible for checking to see if a post has been favorited. If it has not then it will post the favorited post data to the api
// checks if the post has already been favorited and if it has then it will remove the favorited post object from the favorites array 
document.addEventListener(
    "click",
    (event) => {
        if(event.target.name){
            if (event.target.name.startsWith("star")) {
                const [, postObjString] = event.target.name.split("--")
                const postObjId = parseInt(postObjString)
                const userFavoritedPosts = getUserFavoritePosts()
                const favorites = getFavorites()
                const currentUserId = getCurrentUser().currentUserId
                //finding an object in user favorited posts where the postObj.id is equal to the clicked star's post object id and storing it in a variable
                const foundFavoritedPost = userFavoritedPosts.find(postObj => postObj.id === postObjId)
                //if the foundFavoritedPost is truthy find the matching favorite and delete it from our favorites array 
                if (foundFavoritedPost) {
                    const foundFavorite = favorites.find(favorite => foundFavoritedPost.id === favorite.postId && favorite.userId === currentUserId)
                    DeleteFavorite(foundFavorite.id)
                    // if the foundFavoritedPost is falsey then post the newFavoriteObject to the api/favorites array 
                } else {
                    const newFavoriteObject = {
                        postId: postObjId,
                        userId: currentUserId
                    }
                    saveNewFavorite(newFavoriteObject)
                }
            }
        }
    }
)

document.addEventListener("click", event => {
    if (event.target.id.startsWith("blockPost--")) {  // checking that what was clicked starts with blockPost--
        const [, postObjId] = event.target.id.split("--") // splitting the Id from the "blockPost--" element
        DeletePost(parseInt(postObjId)) // invoking the function with an argument of postObjId variable that holds the posts Id value.
    } else if (event.target.id.startsWith("profile--")) {
        //adding event listener to check if profile-- was clicked on 
        const [, userObjId] = event.target.id.split("--")
        //creating an array of the user objet Id taken from the .split() 
        setChosenUserProfileId(parseInt(userObjId))
        //invoking the function and passing in as an argument the userObjId variable that holds the value of the user ID
    }
})









