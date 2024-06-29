let currentCategory = '';

function selectCategory(selected) {
    // 모든 카테고리 아이템을 가져오기
    let categories = document.querySelectorAll('.category-container ul li');

    // 모든 카테고리를 순회하면서 클래스 제거
    categories.forEach(function (category) {
        category.classList.remove('selected-category');
    });

    // 선택된 카테고리에 클래스 추가
    selected.classList.add('selected-category');

    // 선택된 카테고리 값 저장
    currentCategory = selected.getAttribute('data-category-id');

    if (selected.innerText == "전체보기") {
        currentCategory = '';
        updateUrlParams();
    } else {
        updateUrlParams();
    }

    updateUrlParams();  // 카테고리를 선택할 때마다 URL 업데이트
}

const updateUrlParams = () => {
    let currentUrl = new URL(window.location.href);

    if (currentCategory) {
        currentUrl.searchParams.set('category', currentCategory);
    } else {
        currentUrl.searchParams.delete('category');
    }

    window.location.href = currentUrl.toString();
}

function executeSelectCategoryOnLoad() {
    let urlParams = new URLSearchParams(window.location.search);
    let categoryParam = urlParams.get('category');

    if (categoryParam !== null) {
        let categoryItems = document.querySelectorAll('.category-container ul li');
        categoryItems.forEach(function (item) {
            let categoryId = item.getAttribute('data-category-id');
            if (categoryId === categoryParam) {
                item.classList.add('selected-category');  // URL에 있는 카테고리 매개변수에 따라 선택된 카테고리 표시
                currentCategory = categoryParam;  // 현재 카테고리 설정
            }
        });
    } else {
        let allCategory = document.querySelector('.category-container ul li:first-child');
        allCategory.classList.add('selected-category');
        currentCategory = '';
    }
}

document.addEventListener('DOMContentLoaded', executeSelectCategoryOnLoad);


document.addEventListener('DOMContentLoaded', () => {
    const searchIcon = document.getElementById('search-icon');
    const searchInput = document.getElementById('search-input');

    searchIcon.addEventListener('click', () => {
        performSearch();
    });

    searchInput.addEventListener('keydown', function (event) {
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

        if (currentCategory) {
            currentUrl += `?category=${currentCategory}&search=${searchValue}`;  // 카테고리와 검색어가 모두 있는 URL로 업데이트
        } else if (currentCategory) {
            currentUrl += `?category=${currentCategory}`;  // 카테고리만 있는 URL로 업데이트
        } else if (searchValue) {
            currentUrl += `?search=${searchValue}`;  // 검색어만 있는 URL로 업데이트
        }

        window.location.href = currentUrl;
    };

    // D-Day 계산 및 펀딩 퍼센트 계산
    document.querySelectorAll('.item').forEach(function (itemElement) {
        let endDateString = itemElement.getAttribute('data-end-period');
        let endDate = new Date(endDateString);
        let today = new Date();
        let timeDiff = endDate - today;
        let daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

        let dDayElement = itemElement.querySelector('.d-day');

        if (daysDiff > 0) {
            dDayElement.innerText = daysDiff;
        } else if (daysDiff === 0) {
            dDayElement.innerText = "Day";
        } else {
            dDayElement.innerText = "마감";
        }

        let goalMoney = parseInt(itemElement.getAttribute('data-goal-money'));
        let successMoney = parseInt(itemElement.getAttribute('data-success-money'));
        let currentPercent = (successMoney / goalMoney) * 100;
        itemElement.querySelector('.percent').innerText = currentPercent.toFixed(2);
    });
});
