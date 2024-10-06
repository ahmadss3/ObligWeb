// Get the container where posts will be displayed
const postsContainer = document.getElementById('posts-container');

/**
 * I read and learned the following code from: https://www.w3schools.com/xml/ajax_intro.asp
 */
async function loadPosts() {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        // Check if the request is completed and successful
        if (this.readyState === 4 && this.status === 200) {
            const posts = JSON.parse(this.responseText);
            const postsContainer = document.getElementById('posts-container');

            // Iterate over each post and create elements
            posts.forEach(post => {
                const postElement = document.createElement('div');
                postElement.classList.add('post');
                postElement.innerHTML = `
                    <div class="post-title">${post.title}</div>
                    <div class="post-body">${post.body}</div>
                `;

                // Append the post element to the container
                postsContainer.appendChild(postElement);
            });
        }
    };

    xhttp.open("GET", `https://jsonplaceholder.typicode.com/posts`, true);
    xhttp.send(); // Send the request
}

// Add an event listener for scrolling
window.addEventListener('scroll', () => {
    // Check if the user has scrolled near the bottom of the page
    if ((window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 100)) {
        loadPosts(); // Load more posts
    }
});

loadPosts(); // Initial call to load posts
