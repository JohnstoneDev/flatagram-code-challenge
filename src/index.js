// Assign variables to the elements that will receive the picture information from server.

const imageElement = document.getElementById("card-image");
const imageTitleElement = document.getElementById("card-title");
const likeCountElement = document.getElementById("like-count");
const likeButton = document.getElementById("like-button");
const commentList = document.getElementById("comments-list");
const commentForm = document.getElementById("comment-form");
const commentInput = document.getElementById("comment");

// create an async function that gets an image from the server as soon as the page loads; 
// the function returns a promise that is then processed by an await function : 

async function getImage(){
    let imageUrl = 'http://localhost:3000/images/1';
    try {
        let response = fetch(imageUrl,{
            method : 'GET'
        });
        return await (await response).json();
    }
    catch(error){
        console.log(error);
    }
}

// function that handles the promise asynchronously and displays the image on the page

async function addImage(){
    let serverResponse = await getImage();
    console.log(serverResponse)
    let imageFromServer = serverResponse.image;
    let imageTitle = serverResponse.title;
    let imageComments = serverResponse.comments;
    console.log(imageComments);

    let imageLikes = serverResponse.likes;

    imageElement.setAttribute("src",imageFromServer);
    imageTitleElement.innerText = imageTitle;

    let likeCountNumber = likeCountElement.innerHTML.split(" ")[0];
    likeCountNumber = imageLikes;

    likeCountElement.innerHTML = `${likeCountNumber} likes`; 
    
    imageComments.map((comment) => {
        let individualComment = document.createElement("li");
       individualComment.innerText = comment.content;
       commentList.appendChild(individualComment);
    })

}

// Add event listener for the like button that increments the likes

likeButton.addEventListener("click",(() => {
    let currentLikeCount = parseInt(likeCountElement.innerHTML.split(" ")[0]);
    currentLikeCount = currentLikeCount + 1;
    return likeCountElement.innerHTML = `${currentLikeCount} likes`; 
}))

// Create variable to store new comment and add event listener to input element to update the variable
let newComment = "";

const handleChange = (event) => {
    event.preventDefault();
    newComment = event.target.value;

    if(newComment !=""){
        return newComment;
    }
}

commentInput.addEventListener('change',handleChange);

// Add submit event listener to form for adding comments
const handleSubmit = (event) => {
    event.preventDefault();
    let newCommentItem = document.createElement("li");
    newCommentItem.innerText = newComment;
    commentList.appendChild(newCommentItem);

    commentInput.value = "";
}

commentForm.addEventListener('submit',handleSubmit);


// Create an function that runs immediately the page loads  and calls the two asnychronous functions

const init = () => {
    getImage();
    addImage();
}

// Add an event listener for page loading and call the init function : 

document.addEventListener('DOMContentLoaded',init)