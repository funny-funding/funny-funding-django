let currentCategory = '';

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

    updateUrlParams();  // 카테고리를 선택할 때마다 URL 업데이트
}

function executeSelectCategoryOnLoad() {
    let urlParams = new URLSearchParams(window.location.search);
    let categoryParam = urlParams.get('category');

    if (categoryParam !== null) {
        let categoryItems = document.querySelectorAll('.category-container ul li');
        categoryItems.forEach(function(item) {
            let categoryId = item.getAttribute('data-category-id');
            if (categoryId === categoryParam) {
                selectCategory(item);  // URL에 있는 카테고리 매개변수에 따라 선택된 카테고리 표시
            }
        });
    }
}

window.onload = executeSelectCategoryOnLoad;

document.addEventListener('DOMContentLoaded', () => {
    const searchIcon = document.getElementById('search-icon');
    const searchInput = document.getElementById('search-input');

    searchIcon.addEventListener('click', () => {
        performSearch();
    });

    searchInput.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            performSearch();
        }
    });

    const performSearch = () => {
        let searchValue = searchInput.value.trim();  // 검색어 값 가져오기

        if (currentCategory) {
            updateUrlParams(searchValue);  // 현재 선택된 카테고리가 있으면 URL 업데이트
        } else if (searchValue) {
            let currentUrl = "http://localhost:8000/funfun/list";
            window.location.href = `${currentUrl}?search=${searchValue}`;  // 검색어만 있는 URL로 이동
        }
    };

    const updateUrlParams = (searchValue) => {
        let currentUrl = "http://localhost:8000/funfun/list";

        if (searchValue && currentCategory) {
            currentUrl += `?type=${currentCategory}&search=${searchValue}`;  // 카테고리와 검색어가 모두 있는 URL로 업데이트
        }

        window.location.href = currentUrl;
    };
});
