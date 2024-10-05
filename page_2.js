
const postsContainer = document.getElementById('posts-container');

/**
 *
 */
async function loadPosts() {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            const posts = JSON.parse(this.responseText); // Parse JSON response
            const postsContainer = document.getElementById('posts-container'); // Assuming you have a container for posts

            posts.forEach(post => {
                const postElement = document.createElement('div');
                postElement.classList.add('post');
                postElement.innerHTML = `
                    <div class="post-title">${post.title}</div>
                    <div class="post-body">${post.body}</div>
                `;

                postsContainer.appendChild(postElement);
            });
        }
    };
    xhttp.open("GET", `https://jsonplaceholder.typicode.com/posts`, true);
    xhttp.send();
}


// Event listener for å oppdage når brukeren har scrollet til bunnen av siden
window.addEventListener('scroll', () => {
    if ((window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 100)) {
        loadPosts();
    }
});

// Initial innlasting av innlegg
loadPosts();
