const commentFormHandler = async (event) => {
    event.preventDefault();

    const postId = document.querySelector('input[name="post-id"]').value;
    const comment = document.querySelector('textarea[name="comment-body"]').value.trim();

    if (comment) {
        const response = await fetch('/api/comments', {
            method: 'POST',
            body: JSON.stringify({ postId, comment }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.reload();
        } else {
            document.location.replace('/login');
        }
    }
}

document
    .querySelector('.comment-form')
    .addEventListener('submit', commentFormHandler);
    