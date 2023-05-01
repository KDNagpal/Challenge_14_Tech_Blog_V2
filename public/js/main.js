const logIn = async (e) => {
    e.preventDefault()

    const username = document.getElementById('logInUsername').value.trim()
    const password = document.getElementById('logInPassword').value.trim()
    console.log('Logging in with username:', username, 'and password:', password);


    if (!username || !password)
        return
    const response = await fetch('/api/user/login', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: { 'Content-Type': 'application/json' }
    })
    if (response.ok) document.location.replace('/')
    else alert('Failed to log in!')
}
if (document.getElementById('logInButton')) document.getElementById('logInButton').addEventListener('click', logIn);

const signUp = async(e) => {
    e.preventDefault()
    
    const username = document.getElementById('signUpUsername').value.trim()
    const password = document.getElementById('signUpPassword').value.trim()
    const confirmPassword = document.getElementById('confirmPassword').value.trim()
    console.log('Signing up with username:', username, 'and password:', password);

    if (!username || !password || !confirmPassword) return
    if (password !== confirmPassword) return alert('Passwords do not match')

    const response = await fetch('/api/user/signup', {
        method: 'POST',
        body: JSON.stringify({username, password}),
        headers: {'Content-Type': 'application/json'}
    }) 
    if (response.ok) document.location.replace('/')
    else alert('Failed to sign up.')
}
if (document.getElementById('signUpButton')) document.getElementById('signUpButton').addEventListener("click", signUp)

async function logOut(e){
    e.preventDefault()
    console.log('Logging out');


    const response = await fetch('/api/user/logout', {
        method: 'POST'
    })

    if(response.ok) document.location.replace('/')
    else alert('Logout failed somehow.')
}
if (document.getElementById("logOutButton")) document.getElementById("logOutButton").addEventListener("click", logOut)

async function newPost(e){
    e.preventDefault()
    const title = document.getElementById('postTitle').value.trim()
    const body = document.getElementById('postBody').value.trim()
    const response = await fetch ('api/post/newpost', {
        method: 'POST',
        body: JSON.stringify({title,body}),
        headers: {'Content-Type': 'application/json'}
    })
    if(response.ok) document.location.replace('/')
    else alert('Failed to post')
}

if (document.getElementById('postSubmit')) document.getElementById('postSubmit').addEventListener('click', newPost)

async function newComment(e){
    e.preventDefault()
    const body = document.getElementById('commentBody').value.trim()
    const postId = window.location.href.split('/').replace('?','')
    const response = await fetch('/api/post/newcomment', {
        method: 'POST',
        body: JSON.stringify({body,postId}),
        header: {'Content-Type': 'application/json'}
    })
    if (response.ok) document.location.reload()
    else alert('Comment not posted!')
}
if (document.getElementById('commentSubmit'))document.getElementById('commentSubmit').addEventListener("click",newComment);