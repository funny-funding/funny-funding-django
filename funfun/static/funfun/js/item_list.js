let currentCategory = null;

function selectCategory(selected) {
    // 모든 카테고리 아이템을 가져오기
    let categories = document.querySelectorAll('.category-container ul li');
    // 모든 카테고리를 순회하면서 클래스 제거
    categories.forEach(function(category) {
        console.log("category classList: "+category.classList);
        category.classList.remove('selected-category');
    });
    // 선택된 카테고리에 클래스 추가
    selected.classList.add('selected-category');

    // 선택된 카테고리 값 저장
    currentCategory = selected.innerText;
    console.log('Selected Category:', currentCategory);
    console.log('Selected Category:', selected);
}