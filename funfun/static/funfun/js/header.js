document.addEventListener('DOMContentLoaded', function () {
    const currentPath = window.location.pathname;
    console.log(currentPath)

    const navLinks = document.querySelectorAll('.header-nav ul a');

    navLinks.forEach(link => {
        if (currentPath.includes(link.getAttribute('href'))) {
            console.log(link)
            const listItem = link.querySelector('li');
            console.log("listItem : " + listItem);
            listItem.classList.add('active');
        }
    });
});
