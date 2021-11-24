// do a put request for the update d post

const UpdateBttnHandler = async (event) => {
  event.preventDefault();
  const pathName = window.location.pathname;
  const pathArray = pathName.split("/");
  const post_id = pathArray[pathArray.length - 1];

  const name = document.querySelector("#post-name").value.trim();
  const description = document.querySelector("#post-desc").value.trim();
console.log('hi')
  if (name && description) {
    // const id = event.target.getAttribute("data-id");
    const response = await fetch(`/api/posts/${post_id}`, {
      method: "Put",
      body: JSON.stringify({ name, description, post_id }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      document.location.replace("/profile");
      console.log('good response')
    } else {
      alert("Failed to update post");
    }
  }
};

document.querySelector("#update").addEventListener("click", UpdateBttnHandler);
