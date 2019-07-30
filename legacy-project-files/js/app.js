var BRAND_VALUES =
    [
        {
            label: 'Bravo',
            data: 'bravo',
            requestor: 'bravo',
            config: 'BRAVO_ONEAPP_STAGE'
        },
        {
            label: 'CNBC',
            data: 'cnbc',
            requestor: 'cnbc',
            config: 'CNBC_ONEAPP_STAGE'
        },
        {
            label: 'E!',
            data: 'e',
            requestor: 'e',
            config: 'E_ONEAPP_STAGE'
        },
        {
            label: 'MSNBC',
            data: 'msnbc',
            requestor: 'msnbc',
            config: 'MSNBC_ONEAPP_STAGE'
        },
        {
            label: 'NBC',
            data: 'nbc',
            requestor: 'nbcentertainment',
            config: 'NBC_STAGE'
        },
        {
            label: 'NBC Universo',
            data: 'nbcuniverso',
            requestor: 'mun2',
            config: 'NBCUNIVERSO_ONEAPP_STAGE'
        },
        {
            label: 'Oxygen',
            data: 'oxygen',
            requestor: 'oxygen',
            config: 'OXYGEN_ONEAPP_STAGE'
        },
        {
            label: 'Syfy',
            data: 'syfy',
            requestor: 'syfy',
            config: 'SYFY_ONEAPP_STAGE'
        },
        {
            label: 'USA Network',
            data: 'usa',
            requestor: 'usa',
            config: 'USA_ONEAPP_STAGE'
        }
    ];

var CALLSIGN_CONSTANTS = {
    "EAST": "east",
    "WEST": "west"
};

var DEFAULT_BRAND;

(function () {
    DEFAULT_BRAND = findBrandData('nbc');
    var params = new URLSearchParams(window.location.search);
    if (params.get('brand') && findBrandData(params.get('brand'))) {
        DEFAULT_BRAND = findBrandData(params.get('brand'));
    }
})();

function findBrandData(brand) {
    return BRAND_VALUES.find(function(obj) {
        return obj.data === brand;
    });
}

function smoothScroll() {
    $('html, body').animate({
        scrollTop: $('#main-content').offset().top
    }, 800);
}

function updateElements(brand) {
    var brandData = findBrandData(brand);
    if (!brandData || !encodedAuthorizationToken) return;

    $('#watching-header').html(`Now Watching: ${brandData.label}`);
    $('#watching-header').css('visibility', 'visible');

    document.querySelectorAll('button').forEach(function (btn) {
        if (btn.classList.contains('btn-watch-now')) {
            if (btn.id.split('-')[1] === brandData.data) {
                $(`#${btn.id}`).toggleClass('btn-danger', true);
                $(`#${btn.id}`).toggleClass('btn-primary', false);
                btn.innerHTML = 'Watching NOW!'
                btn.disabled = true;
            } else {
                $(`#${btn.id}`).toggleClass('btn-primary', true);
                $(`#${btn.id}`).toggleClass('btn-danger', false);
                btn.innerHTML = 'Watch LIVE Now!'; 
                btn.disabled = false;
            }
        }
    });
}

function updateUiWithAuthStatus() {
    if (encodedAuthorizationToken) {
        $('#player-auth-overlay').fadeOut(300, function () {
            $(this).css({ visibility: "hidden", display: "" });
        });
    } else {
        $('#watching-header').css('visibility', 'hidden');
    }
    document.querySelectorAll('button').forEach(function (btn) {
        if (btn.classList.contains('btn-watch-now')) {
            if (encodedAuthorizationToken) {
                btn.innerHTML = 'Watch LIVE Now!';
            } else {
                btn.innerHTML = 'Sign-in to Watch';
            }
        }
    });
}