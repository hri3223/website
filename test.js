const adminAccount = { username: "genova", password: "12345678" };
const users = [];
const posts = JSON.parse(localStorage.getItem('posts')) || [];
const authContainer = document.getElementById('authContainer');
const postFormContainer = document.getElementById('postFormContainer');
const blogContainer = document.getElementById('blogContainer');
const adminPanel = document.getElementById('adminPanel');
const userList = document.getElementById('userList');
const adminLink = document.getElementById('adminLink');
let loggedInUser = null;

const renderPosts = () => {
    blogContainer.innerHTML = '';
    posts.forEach((post, index) => {
        const postElement = document.createElement('div');
        postElement.className = 'blog-post';
        postElement.innerHTML = `<h3>${post.title}</h3><p>${post.content}</p><p><strong>Posted by: ${post.author}</strong></p>`;

        if (loggedInUser?.username === post.author || loggedInUser?.username === adminAccount.username) {
            const deleteButton = document.createElement('button');
            deleteButton.className = 'delete-button';
            deleteButton.textContent = 'Delete';
            deleteButton.onclick = () => {
                posts.splice(index, 1);
                localStorage.setItem('posts', JSON.stringify(posts));
                renderPosts();
            };
            postElement.appendChild(deleteButton);
        }

        const commentSection = document.createElement('div');
        commentSection.className = 'comment-section';
        post.comments.forEach(comment => {
            const commentElement = document.createElement('div');
            commentElement.className = 'comment';
            commentElement.textContent = comment;
            commentSection.appendChild(commentElement);
        });

        const commentInput = document.createElement('input');
        commentInput.type = 'text';
        commentInput.placeholder = 'Add a comment...';
        const commentButton = document.createElement('button');
        commentButton.textContent = 'Post Comment';
        commentButton.onclick = () => {
            const comment = commentInput.value;
            if (comment) {
                post.comments.push(comment);
                localStorage.setItem('posts', JSON.stringify(posts));
                renderPosts();
            }
        };

        commentSection.appendChild(commentInput);
        commentSection.appendChild(commentButton);

        postElement.appendChild(commentSection);
        blogContainer.appendChild(postElement);
    });
};

const renderUsers = () => {
    userList.innerHTML = '';
    users.forEach((user, index) => {
        const userElement = document.createElement('li');
        userElement.innerHTML = `<span>${user.username} (Password: ${user.password})</span>`;
        const deleteUserButton = document.createElement('button');
        deleteUserButton.textContent = 'Delete';
        deleteUserButton.onclick = () => {
            users.splice(index, 1);
            renderUsers();
        };
        userElement.appendChild(deleteUserButton);
        userList.appendChild(userElement);
    });
};

const switchToLogin = () => {
    authContainer.querySelector('#authTitle').textContent = 'Login';
    document.getElementById('authButton').style.display = 'block';
    document.getElementById('signupButton').style.display = 'none';
    document.getElementById('authSwitch').innerHTML = `Don't have an account? <span id="switchToSignup" style="color: #ff007f; cursor: pointer;">Sign up</span>`;
    document.getElementById('switchToSignup').onclick = switchToSignupMode;
};

const switchToSignupMode = () => {
    authContainer.querySelector('#authTitle').textContent = 'Sign Up';
    document.getElementById('authButton').style.display = 'none';
    document.getElementById('signupButton').style.display = 'block';
    document.get
