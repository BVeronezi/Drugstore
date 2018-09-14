// HEADER FUNCTIONS
var appHeader = {
    init: function (settings) {
        appHeader.config = {
            $header: $('.header'),
            $cart: $('.header__main-customer__cart'),
            $account: $('.header__nav-account'),
            accountFlag: true,
            minicartFlag: false,
            locationFlag: false,
            lvl1Flag: false,
            navTouched: false
        };

        // Allow overriding the default config
        $.extend(appHeader.config, settings);

        appHeader.setup();
    },

    setup: function () {
        appHeader.bindScroll();

        $(document)
            .on('click', '.header__main-menu__trigger', appHeader.menuOpen)
            .on('click', '.header__main-menu__close', appHeader.menuClose)
            .on('click', '.promobar-close', appHeader.promobarClose)
            .on('mouseenter', '.header__main-customer__cart', function () {
                appHeader.config.accountFlag && appHeader.popover.off(appHeader.config.$account, 'accountFlag');
                appHeader.config.locationFlag && appHeader.popover.off($('.header__topbar-loc'), 'locationFlag');
            })
            .on('mouseenter', '.header__nav-account__login', function () {
                appHeader.config.minicartFlag && appHeader.popover.off(appHeader.config.$cart, 'minicartFlag');
                appHeader.config.locationFlag && appHeader.popover.off($('.header__topbar-loc'), 'locationFlag');
            })
            .on('mouseenter', '.header__topbar-loc', function () {
                appHeader.config.minicartFlag && appHeader.popover.off(appHeader.config.$cart, 'minicartFlag');
                appHeader.config.accountFlag && appHeader.popover.off(appHeader.config.$account, 'accountFlag');
            })
            .on('touchend', '.header__main-customer__cart-icon', function (e) {
                if (!appHeader.config.minicartFlag) {
                    e.preventDefault();
                    appHeader.popover.checkAll();
                    appHeader.popover.open(appHeader.config.$cart, 'minicartFlag');
                    $(document).on('touchstart', appHeader.popover.minicartFlag);
                }
            })
            .on('touchend', '.header__nav-account__login', function (e) {
                if (!appHeader.config.accountFlag) {
                    e.preventDefault();
                    appHeader.popover.checkAll();
                    appHeader.popover.open(appHeader.config.$account, 'accountFlag');
                    $(document).on('touchstart', appHeader.popover.accountFlag);
                }
            })
            .on('touchend', '.header__topbar-loc__city', function (e) {
                if (!appHeader.config.locationFlag) {
                    e.preventDefault();
                    appHeader.popover.checkAll();
                    appHeader.popover.open($('.header__topbar-loc'), 'locationFlag');
                    $(document).on('touchstart', appHeader.popover.locationFlag);
                }
            })
            .on('touchstart', '.header__nav-item', function (e) {
                appHeader.config.navTouched = true
            })
            .on('touchend', '.header__nav-item', function (e) {
                setTimeout(function () {
                    appHeader.config.navTouched = false
                }, 10);
            })
            .on('mouseenter', '.header__nav-item', function (e) {
                if (appHeader.config.navTouched || appHeader.isMobile()) return;
                appHeader.popover.checkAll();
                $(this).addClass('header__nav-item--active').siblings().removeClass('header__nav-item--active');
                appHeader.config.lvl1Flag = true;
            })
            .on('mouseleave', '.header__nav-item', function (e) {
                if (appHeader.config.navTouched || appHeader.isMobile()) return;
                $(this).removeClass('header__nav-item--active');
                $(this).closest('.header__nav').removeClass('header__nav-lvl2--active');
                appHeader.config.lvl1Flag = false;
            })
            .on('click', '.header__nav-item > a', function (e) {
                if (!appHeader.config.lvl1Flag || !$(this).parent().hasClass('header__nav-item--active') || appHeader.isMobile()) e.preventDefault();
                appHeader.config.lvl1Flag = true;

                if ($(this).siblings('div.header__nav-lvl2').length === 0) {
                    window.location = $(this).attr('href');
                } else if (appHeader.isMobile()) {
                    // navigation link for mobile
                    if ($(this).siblings('div.header__nav-lvl2').length === 1) {
                        $(this).closest('.header__nav').toggleClass('header__nav-lvl2--active');
                        $(this).parent().toggleClass('header__nav-item--active');
                    }
                } else {
                    $(this).parent().addClass('header__nav-item--active').siblings().removeClass('header__nav-item--active');
                }
            })
            ;

        $('.form__header-dropdown-select').selectric();
    },

    isMobile: function () {
        return matchMedia && matchMedia('(max-width: 767px)').matches;
    },

    bindScroll: function () {
        var lastScrollTop = $(window).scrollTop();
        var $header = appHeader.config.$header;
        var $account = appHeader.config.$account;

        $(window).scroll(function (event) {
            var st = $(this).scrollTop();
            var modalOpened = $('html').hasClass('modal--active');

            if (appHeader.config.lvl1Flag && !appHeader.isMobile()) {
                $('.header__nav-item--active').removeClass('header__nav-item--active');
                $('.header__nav-lvl2--active').removeClass('header__nav-lvl2--active');
                appHeader.config.lvl1Flag = false;
            }

            appHeader.config.accountFlag && appHeader.popover.off(appHeader.config.$account, 'accountFlag');

            if (modalOpened) return;

            // MENU >> SHOW or HIDE onScroll
            // if (st > 150) {
            //     if (st > lastScrollTop) {
            //      $header.attr('data-scrolled','down');
            //     } else {
            //          $header.attr('data-scrolled','up');
            //     }
            // } else {
            //  $header.attr('data-scrolled','');
            // }
            lastScrollTop = st;
        });
    },

    menuOpen: function () {
        appSearch.config.$modalSearch.hasClass('modal--current') && appSearch.close(appSearch.config.$modalSearch);

        appHeader.config.$header.addClass('header--mobile');
        $(document).swipe({
            swipeLeft: function (event, direction, distance, duration, fingerCount, fingerData) {
                appHeader.isMobile() && appHeader.config.$header.hasClass('header--mobile') && appHeader.menuClose();
            }
        });
    },

    menuClose: function () {
        appHeader.config.$header.removeClass('header--mobile');
        $(document).swipe("destroy");
    },

    promobarClose: function () {
        $('body').removeClass('promobar--active')
    },

    popover: {
        open: function ($holder, popoverFlag) {
            $holder.addClass('popover-hover');
            appHeader.config[popoverFlag] = true;
        },
        close: function ($holder, popoverFlag) {
            $holder.removeClass('popover-hover popover-hover--init');
            appHeader.config[popoverFlag] = false;
        },
        off: function ($holder, popoverFlag) {
            appHeader.popover.close($holder, popoverFlag);
            $(document).off('touchstart', appHeader.popover[popoverFlag]);
        },
        minicartFlag: function (e) {
            var $holder = appHeader.config.$cart;
            var clickInside = $(e.target).closest($holder).length;
            if (!clickInside) appHeader.popover.off($holder, 'minicartFlag');
        },
        accountFlag: function (e) {
            var $holder = appHeader.config.$account;
            var clickInside = $(e.target).closest($holder).length;
            if (!clickInside) appHeader.popover.off($holder, 'accountFlag');
        },
        locationFlag: function (e) {
            var $holder = $('.header__topbar-loc');
            var clickInside = $(e.target).closest('.header__topbar-loc').length;
            if (!clickInside) appHeader.popover.off($holder, 'locationFlag');
        },
        checkAll: function () {
            appHeader.config.minicartFlag && appHeader.popover.off(appHeader.config.$cart, 'minicartFlag');
            appHeader.config.accountFlag && appHeader.popover.off(appHeader.config.$account, 'accountFlag');
            appHeader.config.locationFlag && appHeader.popover.off($('.header__topbar-loc'), 'locationFlag');
        }
    }
}

var appFooter = {
    init: function (settings) {
        appFooter.config = {
            $footer: $('.footer'),
            $siteMap: $('.footer__sitemap-nav')
        };

        // Allow overriding the default config
        $.extend(appFooter.config, settings);

        appFooter.setup();
    },

    setup: function () {
        appFooter.config.$footer
            .on('click', '.footer__sitemap-nav__lvl1--trigger', function () {
                if ($(this).hasClass('is-opened')) {
                    $(this).removeClass('is-opened');
                } else {
                    appFooter.config.$siteMap.find('.is-opened').removeClass('is-opened');
                    $(this).addClass('is-opened');
                }
            })
    }
}

var appAlerts = {
    init: function (settings) {
        appAlerts.config = {
            $alert: $('.alert')
        };

        // Allow overriding the default config
        $.extend(appAlerts.config, settings);

        if (appAlerts.config.$alert.length != 0) {
            appAlerts.setup();
            appAlerts.initialized = true;
        }
    },

    setup: function () {
        $(document)
            .on('click', '.alert-close', appAlerts.hideAlert)

        $('.alert__close').click(function (e) {
            e.preventDefault();
            appAlerts.hideAlert();
        })
    },

    showAlert: function (config) {
        if (!appAlerts.initialized) {
            appAlerts.init();
        }
        var $alert = appAlerts.config.$alert;
        var timeout = config.showTimeout;
        if (!timeout) {
            timeout = 10000;
        }
        appAlerts.hideTimeout = setTimeout(function () {
            appAlerts.hideAlert();
        }, timeout);

        $alert.attr('data-status', config.status);
        $alert.find('.alert__title').html(config.title);
        $alert.find('.alert__text').html(config.text);
        appHeader.promobarClose();

        $alert.addClass('alert--active');
        $(window).one('scroll', appAlerts.hideAlert);
    },

    hideAlert: function () {
        var $alert = appAlerts.config.$alert;
        $alert.removeClass('alert--active');
        clearTimeout(appAlerts.hideTimeout);
    },

    initialized: false
}

var appForms = {
    init: function (settings) {
        appForms.config = {
            $newsletterForm: $('#newsletterForm')
        };

        // Allow overriding the default config
        $.extend(appForms.config, settings);

        appForms.setup();
    },

    setup: function () {
        appForms.firstFocus();
        appForms.inputBlur();
        appForms.phoneMask()
        appForms.promobarCloseOnFocus();
        appForms.setMobileSticky();
        appForms.validateNewsletter();
    },

    firstFocus: function () {
        $('[tabindex="1"]').focus();
    },

    inputBlur: function () {
        $(document)
            .on('blur', '.form__field__input', function () {
                $(this).parent().toggleClass('has-value', !!$(this).val());
            });
    },

    phoneMask: function () {
        var maskBehavior = function (val) {
            return val.replace(/\D/g, '').length === 11 ? '(00) 00000-0000' : '(00) 0000-00009';
        };

        $('.js-mask--phone').mask(maskBehavior, {
            onKeyPress: function (val, e, field, options) {
                field.mask(maskBehavior.apply({}, arguments), options);
            }
        });
    },

    promobarCloseOnFocus: function () {
        appForms.config.$newsletterForm
            .on('focus', '.form__newsletter-input', function (e) {
                appHeader.promobarClose();
            });
    },

    setSticky: function ($stickyEl, $parentEl) {
        var ammount = ($parentEl.position().top + $parentEl.innerHeight());

        if (ammount <= ($(window).scrollTop() + window.innerHeight)) {
            $stickyEl.css("position", "absolute");
        } else {
            $stickyEl.css("position", "fixed");
        }
    },

    setMobileSticky: function () {
        var $stickyEl = $('.mobile-sticky__button');
        var $parentEl = $stickyEl.parent();

        if ($stickyEl.length) {
            appForms.setSticky($stickyEl, $parentEl);

            // check the sticky element on scrolling
            $(window).on('scroll', function () {
                !$('html').hasClass('modal--active') && appForms.setSticky($stickyEl, $parentEl);
            });
        }
    },

    reset: function ($form) {
        $form.trigger('reset');
        $form.find('.has-value').removeClass('has-value');
        $form.find('.has-success').removeClass('has-success');
        $form.find('.has-error').removeClass('has-error');

        $form.data('validator') && $form.data('validator').resetForm();

        $form.find('.form__field__input, .form__field__select').each(function () {
            $(this).parent().toggleClass('has-value', !!$(this).val());
        });
    },

    bindSelUfAndSelCidade: function (formSelStr) {
        var $selUf = $("#" + formSelStr + "-UF"),
            $selMun = $("#" + formSelStr + "-cidade");

        $selUf.on('change', function (evt) {
            var val = $(evt.target).val();
            if (val != '' && val != null && val != undefined) {
                var cidades = appForms.getMunsForUf(val);
                var html = '<option value="" selected disabled>Selecione...</option>';
                html += cidades.map(function (cidade) { return "<option>" + cidade + "</option>" }).join('');
                $selMun.empty().append(html);
            } else {
                var html = '<option value="" selected disabled>Cidade</option>';
                $selMun.empty().append(html);
            }
        });
    },

    getMunsForUf: function (str) {
        var attr = str.length == 2 ? 'sigla' : 'nome';
        return appUfMunicipios.estados.filter(function (estado) {
            return estado[attr] === str;
        })[0].cidades;
    },

    validateNewsletter: function () {
        appForms.config.$newsletterForm
            .on('focus', '.form__newsletter-input', function (e) {
                appHeader.promobarClose();
            });

        $('#newsletterForm .form__newsletter-input')
            .on('input', function (e) {
                e.preventDefault();
                var $field = $('#newsletterForm .form__newsletter-field');
                var $input = $('#newsletterForm .form__newsletter-input');

                if (/(.+)@(.+){2,}\.(.+){2,}/.test($input.val())) {
                    $field.addClass('has-success')
                    $field.removeClass('has-error');
                } else {
                    $field.addClass('has-error')
                    $field.removeClass('has-success');
                }
            });

        appForms.config.$newsletterForm
            .on('submit', function (e) {
                e.preventDefault();
                var $field = $('.form__newsletter-field', this);
                var $input = $('.form__newsletter-input', this);

                if (/(.+)@(.+){2,}\.(.+){2,}/.test($input.val())) {
                    var data = {};
                    data.subscription = 'newsLetter';
                    data.email = $input.val();
                    data.active = true;
                    data.mode = 'email';

                    var today = new Date();
                    var dd = today.getDate();
                    var mm = today.getMonth() + 1;
                    var yyyy = today.getFullYear();
                    if (dd < 10)
                        dd = '0' + dd;

                    if (mm < 10)
                        mm = '0' + mm;

                    today = dd + '-' + mm + '-' + yyyy;
                    data.lastUpdateDate = today;

                    var hostName = window.location.protocol + "//" + window.location.hostname + (window.location.hostname === 'localhost' || 'devbox.objectedge.com' ? (':' + window.location.port) : '');
                    var url = hostName + '/u/v1/users/preferences';
                    var request = new Request(url, {
                        method: 'POST',
                        mode: 'cors',
                        headers: new Headers({
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                            'Authorization': 'Basic YXV0aHNlcnZlcmNsaWVudDpkOWRhYmVhZS1jZTU4LTRjYzEtOTRiOS0xN2NiY2MzYWRkOTI='
                        }),
                        body: JSON.stringify(data)
                    });

                    fetch(request).then(function (response) {
                        var status = response.status;
                        console.log('status: ' + status);
                        if (status === 200) {
                            $field.addClass('has-success')
                            $field.removeClass('has-error');
                            appAlerts.showAlert({
                                status: 'success',
                                title: 'Voc&ecirc; est&aacute; cadastrado na nossa NewsLetter',
                                text: 'Agora que você esta cadastrado desfrute das áreas exclusivas do site'
                            });
                        } else {
                            $field.addClass('has-error')
                            $field.removeClass('has-success');
                            appAlerts.showAlert({
                                status: 'error',
                                title: 'Título do feedback',
                                text: 'Mensagem de erro'
                            });
                        }
                        return response;
                    });
                } else {
                    $field.addClass('has-error')
                    $field.removeClass('has-success');
                    appAlerts.showAlert({
                        status: 'error',
                        title: 'E-mail inválido',
                        text: ''
                    });
                }
            });
    }
}

var appSearch = {
    init: function (settings) {
        appSearch.config = {
            $seachQuery: $('#searchQuery'),
            $modalSearch: $('#searchResults'),
            $modalSearchHeader: $('.modal__header', '#searchResults'),
            $headerTopbar: $('.header__topbar-container'),
            $headerMain: $('.header__main-container'),
            $headerAccount: $('.header__nav-account')
        };

        // Allow overriding the default config
        $.extend(appSearch.config, settings);

        appSearch.setup();
    },

    setup: function () {
        $(document).on('click', '.modal__search-overlay', appSearch.overlayClose);
        $(document).on('click', '.modal__search-close', appSearch.overlayClose);
        appSearch.bindSearch();
    },

    getCaretPos: function (input) {
        if (document.selection && document.selection.createRange) {
            var range = document.selection.createRange();
            var bookmark = range.getBookmark();
            var caretPos = bookmark.charCodeAt(2) - 2;
        } else {
            if (input.setSelectionRange)
                var caretPos = input.selectionStart;
        }
        return caretPos;
    },

    open: function ($wrapper) {
        var savedSearchQuery = appSearch.config.$seachQuery.val();

        appHeader.promobarClose();
        appHeader.popover.checkAll();
        appModals.setScrollW(true);
        $('html').addClass('modal--active');
        $wrapper.addClass('modal--current');

        document.body.focus();
        appSearch.config.$headerTopbar.appendTo(appSearch.config.$modalSearchHeader);
        appSearch.config.$headerMain.appendTo(appSearch.config.$modalSearchHeader);
        appSearch.config.$seachQuery.parent().addClass('has-results');
        setTimeout(function () {
            appSearch.config.$seachQuery[0].focus();
            appSearch.config.$seachQuery.val('').val(savedSearchQuery);
        }, 1);
    },

    close: function ($wrapper) {
        var savedSearchQuery = appSearch.config.$seachQuery.val();
        var caretPos = appSearch.getCaretPos(appSearch.config.$seachQuery[0]);

        $('html').removeClass('modal--active');
        $wrapper.removeClass('modal--current');
        appModals.setScrollW(false);

        document.body.focus();
        appSearch.config.$headerTopbar.appendTo('.header__topbar');
        appSearch.config.$headerMain.appendTo('.header__main-wrapper');
        appSearch.config.$seachQuery.parent().removeClass('has-results');
        setTimeout(function () {
            appSearch.config.$seachQuery[0].focus();
            appSearch.config.$seachQuery.val('').val(savedSearchQuery);
            if (appSearch.config.$seachQuery[0].createTextRange) {
                var range = appSearch.config.$seachQuery[0].createTextRange();
                range.move('character', caretPos);
                range.select();
            }
            else if (appSearch.config.$seachQuery[0].selectionStart) {
                appSearch.config.$seachQuery[0].setSelectionRange(caretPos, caretPos);
            }
        }, 1);
    },

    overlayClose: function (e) {
        appSearch.close($(this).closest('.modal__wrapper'));
    },

    bindSearch: function () {
        var dataset = new Bloodhound({
            datumTokenizer: Bloodhound.tokenizers.whitespace,
            queryTokenizer: Bloodhound.tokenizers.whitespace,
            local: ['Corretivo Facial (3)', 'Corretivo labial (8)']
        });

        // appSearch.config.$seachQuery.typeahead({
        // 	hint: false,
        // 	highlight: false,
        // 	minLength: 3
        // },
        // {
        // 	name: 'dataset',
        // 	source: dataset
        // });

        appSearch.config.$seachQuery
            .on('keyup', function (e) {
                // console.log($(this).val());
                if (e.keyCode === 27) { // ESC
                    appSearch.close(appSearch.config.$modalSearch);
                } else {
                    if ($(this).val().length >= 3 && !appSearch.config.$modalSearch.hasClass('modal--current')) appSearch.open(appSearch.config.$modalSearch);
                    if ($(this).val().length < 3 && appSearch.config.$modalSearch.hasClass('modal--current')) appSearch.close(appSearch.config.$modalSearch);
                }
            });
    }
}

var appModals = {
    init: function (settings) {
        appModals.config = {
            currentScrollTop: 0
        };

        // Allow overriding the default config
        $.extend(appModals.config, settings);

        appModals.setup();
    },

    setup: function () {
        $(document).on('click', '.modal__overlay', appModals.overlayClose);
        $(document).on('click', '.modal__close', appModals.overlayClose);

        $(document).on('click', '[data-modal]', function (e) {
            e.preventDefault();

            var modalId = $(this).attr('data-modal');
            var $wrapper = $(modalId);
            $wrapper.length && appModals.open($wrapper);
        });
    },

    open: function ($wrapper) {
        appModals.setScrollW(true);
        $('html').addClass('modal--active');
        $wrapper.addClass('modal--current');
    },

    close: function ($wrapper) {
        $('html').removeClass('modal--active');
        $wrapper.removeClass('modal--current');
        appModals.setScrollW(false);
    },

    overlayClose: function (e) {
        appModals.close($(this).closest('.modal__wrapper'));
    },

    checkScrollW: function () {
        var scrollDiv = document.createElement("div");
        scrollDiv.className = "scrollbar-measure";
        document.body.appendChild(scrollDiv);

        // Get the scrollbar width
        var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;

        // Delete the DIV 
        document.body.removeChild(scrollDiv);

        return scrollbarWidth;
    },

    setScrollW: function (toggle) {
        var scrollBarW = appModals.checkScrollW();
        var measure = toggle ? scrollBarW + 'px' : '';
        if (toggle) appModals.config.currentScrollTop = document.body.scrollTop || document.documentElement.scrollTop;

        $('body').css('padding-right', measure);
        $('.header').css('padding-right', measure);
        $('.header__nav-table').css('padding-right', measure);

        if (toggle) {
            $('main').css('top', -appModals.config.currentScrollTop + 'px');
        } else {
            document.body.scrollTop = document.documentElement.scrollTop = appModals.config.currentScrollTop;
            $('main').css('top', '');
        }
    }
}

var appFirstAccess = {
    init: function (settings) {
        appFirstAccess.config = {
            store: window.sessionStorage,
            flagName: 'onofre.pageAlreadyViewed'
        };

        $.extend(appFirstAccess.config, settings);
        appFirstAccess.setup();
    },

    setup: function () {
        if (appFirstAccess.isntFirst()) return;
        appFirstAccess.firstAccessHand();
        appFirstAccess.flagStore();
    },

    isntFirst: function () {
        return appFirstAccess.config.store.getItem(appFirstAccess.config.flagName);
    },

    flagStore: function () {
        appFirstAccess.config.store.setItem(appFirstAccess.config.flagName, true);
    },

    firstAccessHand: function () {
        appHeader.config.$account.addClass('popover-hover--init');
        /* ... */
    }

}

$(document).ready(function () {
    appHeader.init();
    appFooter.init();
    if (!appAlerts.initialized) {
        appAlerts.init();
    }
    appForms.init();
    appSearch.init();
    appModals.init();
    appFirstAccess.init();
});
