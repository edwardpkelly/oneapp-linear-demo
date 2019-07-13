export default (id) => {
    $('html, body').animate({
        scrollTop: $(`#${id}`).offset().top
    }, 800);
};