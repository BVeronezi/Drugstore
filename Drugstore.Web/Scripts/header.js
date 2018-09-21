var appHeader = {
    init: function (settings) {
        appHeader.config = {
            $header: $('.header'),
            $cart: $('.header__main-customer__cart'),
            $account: $('.header__account'),
            accountFlag: false,
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

        //ON-2918: Limiting characters to two lines in Product Tile.
        $('.product-name').each(function () {
            var productName = $(this).html();
            var charLimit = 50;
            if (productName.length > charLimit) {
                productName = productName.substring(0, charLimit) + "...";
            }
            $(this).html(productName);
        });

        $(document)
            .on('click', '.header__main-menu__trigger', appHeader.menuOpen)
            .on('click', '.header__main-menu__close', appHeader.menuClose)
            .on('click', '.promobar-close', appHeader.promobarClose)
            .on('mouseenter', '.header__main-customer__cart', function () {
                appHeader.config.accountFlag && appHeader.popover.off(appHeader.config.$account, 'accountFlag');

                //Closing typeahead to prevent overlapping
                appHeader.closeTypeahead();

                appHeader.config.locationFlag && appHeader.popover.off($('.header__topbar-loc'), 'locationFlag');
            })
            .on('mouseenter', '.header__account__login', function () {
                appHeader.config.minicartFlag && appHeader.popover.off(appHeader.config.$cart, 'minicartFlag');

                //Closing typeahead to prevent overlapping
                appHeader.closeTypeahead();

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

                    //Closing typeahead to prevent overlapping
                    appHeader.closeTypeahead();

                    //Closing account modal to prevent overlapping
                    appHeader.config.$account.removeClass('popover-hover');

                    appHeader.popover.open(appHeader.config.$cart, 'minicartFlag');
                    $(document).on('touchstart', appHeader.popover.minicartFlag);
                }
            })
            .on('touchend', '.header__account__login', function (e) {
                if (!appHeader.config.accountFlag) {
                    e.preventDefault();
                    appHeader.popover.checkAll();

                    //Closing typeahead to prevent overlapping
                    appHeader.closeTypeahead();

                    //Closing cart modal to prevent overlapping
                    appHeader.config.$cart.removeClass('popover-hover');

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
            .on('click', '.header__account__action', function (e) {
                e.preventDefault();
            })
            .on('click', '.header__nav-item', function (e) {
                if (appHeader.config.navTouched || appHeader.isMobile()) return;
                appHeader.popover.checkAll();

                //Fix for ON-2687: Lazyloading images from the nav banners.
                var currentNavItem = $(this);
                var lazyLoadSelector = currentNavItem.find(".header__nav-lvl2__content > a");
                if (lazyLoadSelector.length > 0) {
                    appHeader.lazyloadImages(lazyLoadSelector);
                }

                $(this).addClass('header__nav-item--active').siblings().removeClass('header__nav-item--active');
                appHeader.config.lvl1Flag = true;
            })
            .on('mouseleave', '.header__nav-item', function (e) {
                if (appHeader.config.navTouched || appHeader.isMobile()) return;
                $(this).removeClass('header__nav-item--active');
                $(this).find('.header__nav-lvl2__item--active').removeClass('header__nav-lvl2__item--active');
                $(this).closest('.header__nav').removeClass('header__nav-lvl2--active');
                appHeader.config.lvl1Flag = false;
            })
            .on('click', '.header__nav-item > a', function (e) {
                if (!appHeader.config.lvl1Flag || !$(this).parent().hasClass('header__nav-item--active') || appHeader.isMobile()) e.preventDefault();
                appHeader.config.lvl1Flag = true;

                //Fix for ON-2687: Lazyloading images from the nav banners.
                var currentNavItem = $(this);
                var lazyLoadSelector = currentNavItem.parent().find(".header__nav-lvl2__content > a");
                if (lazyLoadSelector.length > 0) {
                    appHeader.lazyloadImages(lazyLoadSelector);
                }

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
            .on('click', '.header__nav-lvl2__item', function (e) {
                if (appHeader.isMobile()) return;

                //Fix for ON-2687: Lazyloading images from the nav banners.
                var currentNavItem = $(this);
                var lazyLoadSelector = currentNavItem.children('a').next(".header__nav-lvl3").find(".header__nav-lvl3__content > a");
                if (lazyLoadSelector.length > 0) {
                    appHeader.lazyloadImages(lazyLoadSelector);
                }

                $(this).addClass('header__nav-lvl2__item--active').siblings().removeClass('header__nav-lvl2__item--active');
            })
            .on('click', '.header__nav-lvl2__item > a', function (e) {
                if (!$(this).parent().hasClass('header__nav-lvl2__item--active') && !appHeader.isMobile()) e.preventDefault();
            })

        $('.header__form-dropdown-select').selectric();

        //ON-3058: Fixing header if the page loads when the user had already scrolled down.
        appHeader.fixHeader();

        //ON-3058: Fixing header during scroll.
        $(window).scroll(function () {
            appHeader.fixHeader();
        });

        //ON-3058: Fixing header on window resize, like changing portrait to landscape.
        $(window).resize(function () {
            appHeader.fixHeader();
        });

    },

    isMobile: function () {
        return window.matchMedia ? window.matchMedia('(max-width: 767px)').matches : window.innerWidth <= 767;
    },

    fixHeader: function () {
        if ($(window).scrollTop() > 100) {
            $('.header').addClass('sticky');
        } else {
            $('.header').removeClass('sticky');
        }
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
    },

    checkFirstAccess: function () {
        // appFirstAccess is not required because it is
        // handled through Oracle Experience manager
        // appFirstAccess.init({ store: window.sessionStorage });
    },

    lazyloadImages: function (e) {
        e.each(function () {
            if ($(this).find("img").length < 1) {
                var e = $(this).find(".lazyload").html();
                e = e.replace(/&lt;/g, '<');
                e = e.replace(/&gt;/g, '>');
                $(this).html(e)
            }
        })
    },

    closeTypeahead: function () {
        $('#searchResults').removeClass('modal--current');
        $('.modal-overlay-mobile').hide();
    }
}

appHeader.init();