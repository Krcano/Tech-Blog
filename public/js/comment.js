const newFormHandler = async (event) => {
  event.preventDefault();

//   const name = document.querySelector("#comment-name").value.trim();
  const description = document.querySelector("#comment-desc").value.trim();

  if (description) {
    const response = await fetch(`/api/posts/:id`, {
      method: "POST",
      body: JSON.stringify({description }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      response.render()
    } else {
      alert("Failed to create comment");
    }
  }
};

const delButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
  
      const response = await fetch(`/api/posts/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        document.location.replace('/profile');
      } else {
        alert('Failed to delete post');
      }
    }
  };
document
  .querySelector(".login-form")
  .addEventListener("submit", newFormHandler);
  
  document
  .querySelector('.project-list')
  .addEventListener('click', delButtonHandler);
