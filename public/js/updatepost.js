// do a put request for the update d post

const UpdateBttnHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector("#post-name").value.trim();
  const description = document.querySelector("#post-desc").value.trim();
console.log(name, description)
  if (name && description) {
    const id = event.target.getAttribute("data-id");
    const response = await fetch(`/api/posts/${id}`, {
      method: "Put",
      body: JSON.stringify({ name, description }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      document.location.replace("/profile");
    } else {
      alert("Failed to update post");
    }
  }
};


  document
    .querySelector('#update')
    .addEventListener('click', UpdateBttnHandler);
