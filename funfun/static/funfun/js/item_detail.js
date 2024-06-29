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
    document.getElementById('funding-error-message').style.display = 'none'; // 에러 메시지 숨기기
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
    let endDate = new Date(itemEndPeriod);
    let today = new Date();
    let timeDiff = endDate - today;
    console.log("timeDiff: "+timeDiff);
    timeDiff+=1000000000;
    console.log("timeDiff: "+timeDiff);
    let daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
    console.log("daysDiff: "+daysDiff);

    let dDayText = document.getElementById('d-day-text');
    let dDayElement = document.getElementById('d-day');
    let dDayPrefixElement = document.getElementById('d-day-prefix');
    let dDaySuffixElement = document.getElementById('d-day-suffix');

    daysDiff-=12;
    console.log("daysDiff: "+daysDiff);
    if (daysDiff > 0) {
        dDayElement.innerText = daysDiff;
    } else if (daysDiff === 0) {
        dDayElement.innerText = "Day";
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

// 투자 금액 확인
document.getElementById('funding-form').addEventListener('submit', function(event) {
    let amount = parseInt(document.getElementById('funding-amount').value);

    if (amount <= 0 || amount > userBalance) {
        event.preventDefault();
        let errorMessage = document.getElementById('funding-error-message');
        errorMessage.style.display = 'block';
        errorMessage.innerText = amount <= 0 ? '투자 금액은 0원보다 커야 합니다.' : '자금이 부족합니다.';
    }
});
