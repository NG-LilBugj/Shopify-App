$(document).ready(() => {
    $('body').prepend(`<div class="header" id="header"></div>`);
    $('head').prepend(`<style>#header{width: 100vw; height: 50vh; background-color: aqua}</style>`)

    let header = document.getElementById('header');
    let sticky = header.offsetTop;

    window.onscroll = () => {
        if (window.pageYOffset > sticky){
            header.classList.add("sticky")
        }
        else {
            header.classList.remove("sticky")
        }
    }
});