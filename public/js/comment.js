const newFormHandler = async (event) => {
  event.preventDefault();

  const description = document.querySelector("#comment-descr").value.trim();
  const pathName = window.location.pathname;
  const pathArray = pathName.split("/");
  const post_id = pathArray[pathArray.length - 1];

  if (description) {
    const response = await fetch(`/api/posts/comments`, {
      method: "POST",
      body: JSON.stringify({ description, post_id }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      document.location.replace("/");
    } else {
      alert("Failed to create comment");
    }
  }
};

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute("data-id")) {
    const id = event.target.getAttribute("data-id");

    const response = await fetch(`/api/posts/comments/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      document.location.replace("/profile");
    } else {
      alert("Failed to delete post");
    }
  }
};

document
  .querySelector(".submit-button")
  .addEventListener("click", newFormHandler);

document
  .querySelector(".dlt-button")
  .addEventListener("click", delButtonHandler);
