export default (id) => {
    if (!id) return;
    $('html, body').animate({
        scrollTop: $(`#${id}`).offset().top
    }, 800);
};