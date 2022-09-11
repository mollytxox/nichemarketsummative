let footerTopInfo1 = document.getElementsByClassName(`footer-top-info1`);

for (let i = 0; i < footerTopInfo1.length; i++) {
    const element = footerTopInfo1[i];
    element.addEventListener('click', function () {
        this.classList.toggle('active');
        console.log('clicked');
    })

}

console.log('hello');