function openEditPopup(commentId, content) {
    let popup = document.getElementById('edit-comment-popup');
    let form = document.getElementById('edit-comment-form');
    let textarea = document.getElementById('edit-comment-content');

    textarea.value = content;
    form.action = '/funfun/edit_comment/' + commentId + '/';
    popup.style.display = 'block';
}

function closeEditPopup() {
    let popup = document.getElementById('edit-comment-popup');
    popup.style.display = 'none';
}

// Close the popup if the user clicks anywhere outside of the popup
window.onclick = function(event) {
    let popup = document.getElementById('edit-comment-popup');
    if (event.target == popup) {
        popup.style.display = 'none';
    }
}
