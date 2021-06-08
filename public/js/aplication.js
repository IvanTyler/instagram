console.log('work')

const $newPostForm = document.forms.newPostForm;
const $postContainer = document.querySelector('[data-postscontainer]');
const $userId = document.querySelector('.newPostForm-button-submit').dataset.id

$newPostForm.addEventListener('submit', async (e) => {
    e.preventDefault()

    const formData = Object.fromEntries(new FormData(e.target))
    console.log(formData)

    const response = await fetch('/posts', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({...formData, author: $userId})
    })

    const dataFromServer = await response.json()

    const newPostHTML = createHTMLforNewPost(dataFromServer)

    $postContainer.insertAdjacentHTML('afterbegin', newPostHTML)

    console.log(dataFromServer)
    window.location = '/posts'
})

function createHTMLforNewPost(newPost) {
    return `
        <div data-id="${newPost._id}" class="post-inst">
            <div class="wrapper-posts-picture">
                <img class="posts-picture-icon" src="${newPost.picture}" alt="${newPost.title}" class="img-post-inst">
            </div>
            <div class="wrapper-posts-actions">
                <h3 class="post-inst-title">${newPost.title}</h3>
                <div class="wrapper-actions">
                    <p data-likes class="card-text">Likes:${newPost.likes}</p>
                    <button class="btn-delete">delete</button>
                </div>
            </div>
        </div>
    `
}

$postContainer.addEventListener('click', async (event) => {
    if(event.target.tagName === 'P'){
        console.log(event.target)
        const $postWrapper = event.target.closest('[data-id]')
        const postId = $postWrapper.dataset.id
        console.log(postId)

        const response = await fetch(`/posts/${postId}`, {
            method: 'PATCH',
        })

        const newLikesValue = await response.json()
        
        const $likes = $postWrapper.querySelector('[data-likes]')

        $likes.innerText = `Likes: ${newLikesValue.likes}`
    }
})

$postContainer.addEventListener('click', async (event) => {
    if(event.target.name === 'delete-post'){ 
        const $postWrapper = event.target.closest('[data-id]')
        const postId = $postWrapper.dataset.id
        const response = await fetch(`/posts/${postId}`, {
            method: 'DELETE',
        })

        if(response.status === 200){
            $postWrapper.remove()
        }
    }
})

$postContainer.addEventListener('click', async (event) => {
    event.preventDefault()
    const titlePost = document.getElementById(`title-${event.target.dataset.id}`)
    if(event.target.name === 'edit-post'){
        titlePost.removeAttribute('readonly')
    }
    if(event.target.name === 'save-post'){
        titlePost.setAttribute('readonly', '')
        const response = await fetch(`/${event.target.dataset.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title: titlePost.value })
        })
    }
})