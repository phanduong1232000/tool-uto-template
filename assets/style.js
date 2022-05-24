$.fn.bttooltip = $.fn.tooltip;
$(document).ready(function () {
    $('[data-toggle="tooltip"]').bttooltip();
});

if (screen.width < 1025 && screen.width > 767) {
    $('.profileBtn').removeAttr('style');
}
$('.noMobileService').click(function () {
    $('#mobilePop').modal('show');
})

function change_theme_mode() {
    console.log($('#range_slider').val());
    var cv = $('#range_slider').val() - 1;
    const newVal = Number((cv * 100 / 12));
    if ($('#dark_theme').length === 0) {
        $('.mode_text').text("Chế độ tối");
        var theme_file = '../assets/css/dark-theme.css';
        var link = '<link id="dark_theme" rel="stylesheet" href="' + theme_file + '">';
        $('head').append(link);
        $('.logo img').attr('src', 'https://uto.vn/storage/beta/assets/images/logo2.png');
        setCookie('check_theme', 'dark', 60 * 24 * 360);
        $("#range_fill").css("background", "linear-gradient(to right, #573E92 0%, #573E92 " + newVal +
            "%, #444 " +
            newVal + "%, #444 100%)");
    } else {
        $('.mode_text').text("Chế độ sáng");
        $('.logo img').attr('src', 'https://uto.vn/storage/beta/assets/images/logo2.png');
        setCookie('check_theme', 'light', -0);
        $('#dark_theme').remove();
        $("#range_fill").css("background", "linear-gradient(to right, #573E92 0%, #573E92 " + newVal +
            "%, #EBE9E9 " +
            newVal + "%, #EBE9E9 100%)");
    }
}
$('.page_leave_confirmation').click(function (e) {
    e.preventDefault();
    var thisLang = $(this);
    var hrf = $(this).attr('href');
    var txt = $('.gc_text').text();
    txt = txt + $('#textarea').text();
    if (thisLang.hasClass('lang_switch')) {
        var hash = window.location.hash;
        var redirectTo = $(this).attr('href') + hash;
        window.location = redirectTo;
    } else if (txt === '' || txt == 'undefined') {
        window.location = hrf;
    } else {
        $('#new_search_confirm').modal('show');
        $('#newSearchYes').click(function () {
            window.location = hrf;
        });
        return false;
    }
});
$('#newSearchNo').on('click', function () {
    $('#new_search_confirm').modal('hide');
    return false;
});



function setCookie(name, value, Exp_minutes) {
    var d = new Date();
    d.setTime(d.getTime() + (Exp_minutes * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

function show_alert(title = '', msg = '') {
    if (title != '' && msg != '') {
        $('#alert_title').text(title);
        $('#alert_msg').text(msg);
    }
    $('#G_alertmodal').modal();
}

function show_success_alert(title = '', msg = '') {
    if (title != '' && msg != '') {
        $('#success_alert_title').text(title);
        $('#success_alert_msg').text(msg);
    }
    $('#thanks_alertmodal').modal();
}

function show_loader(txt = "Processing...") {
    $('#loaderText').text(txt);
    $('#sstProLoader').show();
}

function hide_loader() {
    $('#sstProLoader').hide();
}
/*** Upload from computer */
$('.uploadPopBtn').on('click', function () {
    $('#UpFileModal').modal('show');
    return false;
});
$('#file').change(function () {
    // var files = $('#file').prop('files');
    var files = $(this).get(0).files;
    $('#append').html('');
    var file_check = $(this).get(0).files[0]; //files[0]; //$('#file').prop('files')[0];
    // var file_check = files[0]; //$('#file').prop('files')[0];
    var length = files.length; //('#file').prop('files').length;
    var indx = 0;
    if (!file_check) {
        return false;
    }
    // $('#dupli_loader_gif').show();
    file_fetch_content('textarea', files, length, indx);
});