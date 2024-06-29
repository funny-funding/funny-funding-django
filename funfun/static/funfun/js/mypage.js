const confirmDelete = (itemId) => {
    if (confirm("정말로 삭제하시겠습니까?")) {
        document.getElementById('delete-form-' + itemId).submit();
    }
}

document.addEventListener('DOMContentLoaded', () => {
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