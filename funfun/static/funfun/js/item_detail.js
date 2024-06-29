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

function openFundingPopup() {
    let popup = document.getElementById('funding-popup');
    popup.style.display = 'block';

    document.body.style.overflow = 'hidden';
}

function closeFundingPopup() {
    let popup = document.getElementById('funding-popup');
    popup.style.display = 'none';

    document.body.style.overflow = 'auto';
}

window.onclick = function (event) {
    let editPopup = document.getElementById('edit-comment-popup');
    let fundingPopup = document.getElementById('funding-popup');
    if (event.target == editPopup) {
        closeEditPopup();
    } else if (event.target == fundingPopup) {
        closeFundingPopup();
    }
}

// 펀딩 금액 달성 퍼센트 구하기
document.addEventListener('DOMContentLoaded', function () {
    let goalMoney = parseInt(document.querySelector('.goal-money').innerText);
    let successMoney = parseInt(document.querySelector('.success-money').innerText);
    let currentPercent = (successMoney / goalMoney) * 100;
    document.querySelector('.current-percent').innerText = currentPercent.toFixed(2);

    // D-Day 계산
    let endDateString = "{{ item.end_period|date:'Y-m-d' }}";
    let endDate = new Date(endDateString);
    let today = new Date();
    let timeDiff = endDate - today;
    let daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

    let dDayText = document.getElementById('d-day-text');
    let dDayElement = document.getElementById('d-day');
    let dDayPrefixElement = document.getElementById('d-day-prefix');
    let dDaySuffixElement = document.getElementById('d-day-suffix');

    if (daysDiff > 0) {
        dDayElement.innerText = daysDiff;
    } else if (daysDiff === 0) {
        dDayElement.innerText = "D-Day";
    } else {
        dDayText.innerText = "";
        dDayElement.innerText = "";
        dDayPrefixElement.innerText = "";
        dDaySuffixElement.innerText = "펀딩이 마감되었어요";
        // 펀딩이 마감되었을 때 버튼의 onclick 이벤트 제거
        let fundingButton = document.getElementById('participate-funding-btn');
        fundingButton.innerText = "펀딩에 참여할 수 없어요"
        fundingButton.onclick = null;
        fundingButton.style.cursor = "not-allowed"; // 버튼 스타일 변경
    }
});
