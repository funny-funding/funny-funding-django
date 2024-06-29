const confirmDelete = (itemId) => {
    if (confirm("정말로 삭제하시겠습니까?")) {
        document.getElementById('delete-form-' + itemId).submit();
    }
}