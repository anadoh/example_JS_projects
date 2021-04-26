const postContainer = document.getElementById("post-container");
const loading = document.querySelector(".loader");
const filter = document.getElementById("filter");

const limit = 5;
var page = 1;

async function getPosts() {
  const res = await fetch(
    `https://api.punkapi.com/v2/beers?page=${page}&per_page=${limit}`
  );

  const data = await res.json();
  return data;
}

async function showPosts() {
  const posts = await getPosts();

  posts.forEach((post) => {
    const postEl = document.createElement("div");
    postEl.classList.add("post");
    postEl.innerHTML = `
        <div class="number">${post.id}</div>
            <div class="post-info">
                <h2 class="post-title">${post.name}</h2>
                <p class="post-body">${post.description}</p>
            </div>
        `;
    postContainer.appendChild(postEl);
  });
}
function showLoading() {
  loading.classList.add("show");
  setTimeout(() => {
    loading.classList.remove("show");
    setTimeout(() => {
      page++;
      showPosts();
    }, 300);
  }, 1000);
}

function filterPosts(e) {
  const term = e.target.value.toLowerCase();
  const posts = document.querySelectorAll(".post");

  posts.forEach((post) => {
    const title = post.querySelector(".post-title").innerText;
    const body = post.querySelector(".post-body").innerText;

    if (
      title.toLowerCase().indexOf(term) > -1 ||
      body.toLowerCase().indexOf(term) > -1
    ) {
      post.style.display = "flex";
    } else {
      post.style.display = "none";
    }
  });
}

showPosts();

window.addEventListener("scroll", () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

  if (scrollTop + clientHeight >= scrollHeight - 5) {
    showLoading();
  }
});

filter.addEventListener("input", filterPosts);
