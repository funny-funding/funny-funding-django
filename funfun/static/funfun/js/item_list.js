function selectCategory(selected) {
    // 모든 카테고리 아이템을 가져오기
    let categories = document.querySelectorAll('.category-container ul li');

    // 모든 카테고리를 순회하면서 클래스 제거
    categories.forEach(function(category) {
        category.classList.remove('selected-category');
    });
    // 선택된 카테고리에 클래스 추가
    selected.classList.add('selected-category');

    // 선택된 카테고리 값 저장
    currentCategory = selected.getAttribute('data-category-id');
    console.log('Selected Category ID:', currentCategory);

    let urlParams = new URLSearchParams(window.location.search);
    urlParams.set('category', currentCategory);
    history.replaceState(null, null, '?' + urlParams.toString());
}

function executeSelectCategoryOnLoad() {
    let urlParams = new URLSearchParams(window.location.search);
    let categoryParam = urlParams.get('category');

    if (categoryParam !== null) {
        let categoryItems = document.querySelectorAll('.category-container ul li');
        categoryItems.forEach(function(item) {
            let categoryId = item.getAttribute('data-category-id');
            if (categoryId === categoryParam) {
                selectCategory(item);
            }
        });
    }
}

window.onload = executeSelectCategoryOnLoad;
