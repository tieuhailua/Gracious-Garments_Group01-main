(function($) {
    "use strict";

    var $productCompare = $('#product-compare'),
        modalProductCompare = null;

    if ($productCompare.length) {
        modalProductCompare = new bootstrap.Modal($productCompare.get(0), {
            static: false
        });
    }

    var compare_list = [];
    $('.btn-compare').click(function(e) {
        e.preventDefault();

        var id = $(this).attr('data');
        if (id && PRODUCT_COMPARE[id]) {
            if (-1 === compare_list.indexOf(id)) {
                if (compare_list.length < 3) {
                    compare_list.push(id);

                    var productData = PRODUCT_COMPARE[id],
                        htmlContent = '';

                    htmlContent += '<div class="item" data="' + id + '">';
                        htmlContent += '<div class="photo"><img src="' + productData.photo + '" alt="' + productData.name + '"></div>';
                        htmlContent += '<div class="name">' + productData.name + '</div>';
                        htmlContent += '<button type="button" class="btn-close"></button>';
                    htmlContent += '</div>';

                    $('#compare-box .list').append(htmlContent);

                    $('#compare-box .run').prop('disabled', !(compare_list.length > 1));

                    $('#compare-box').addClass('active');
                }
                else {
                    alert('You can only choose up to 3 products to compare');
                }
            }
            else {
                alert('This product already exists in the comparison list');
            }
        }
        else {
            console.warn('Oops, something went wrong');
        }
    });

    $("#compare-box").on('click', '.btn-close', function(e) {
        e.preventDefault();

        var $item = $(this).parent('.item'),
            id = $item.attr('data'),
            idx = id ? compare_list.indexOf(id) : null;

        if (id && idx !== -1) {
            compare_list.splice(idx, 1);

            $item.remove();

            $('#compare-box .run').prop('disabled', !(compare_list.length > 1));

            if (!compare_list.length) {
                $('#compare-box').removeClass('active');
            }
        }
    });

    $("#compare-box .run").click(function(e) {
        e.preventDefault();

        var specs = [
                {
                    key: 'photo',
                    name: 'Product',
                },
                {
                    key: 'name',
                    name: 'Name',
                },
                {
                    key: 'type',
                    name: 'Deals',
                },
                {
                    key: 'price',
                    name: 'Price',
                },
                {
                    key: 'size',
                    name: 'Size',
                },
                {
                    key: 'categories',
                    name: 'Categories',
                },
                {
                    key: 'style',
                    name: 'Style',
                },
                {
                    key: 'brand',
                    name: 'Brand',
                },
                {
                    key: 'weight',
                    name: 'Weight',
                },
                {
                    key: 'age',
                    name: 'Age',
                },
                {
                    key: 'dimensions',
                    name: 'Dimensions',
                },
                {
                    key: 'materials',
                    name: 'Materials',
                },
                {
                    key: 'collection',
                    name: 'Collection',
                },
                {
                    key: 'provenance',
                    name: 'Made in',
                },
                {
                    key: 'other',
                    name: 'Other info',
                },
            ];

        var htmlContent = '';

        htmlContent += '<table class="table table-bordered">';
            specs.forEach(function(d) {
                var htmlItem = '';
                htmlItem += '<tr>';
                    htmlItem += '<th>' + d.name + '</th>';
                    compare_list.forEach(function(i) {
                        var product = PRODUCT_COMPARE[i];
                        if (product[d.key]) {
                            htmlItem += '<td>';
                                htmlItem += '<div class="compare--' + d.key + '">';
                                    if ('photo' == d.key) {
                                        htmlItem += '<img src="' + product[d.key] + '" alt="' + product.name + '">';
                                    }
                                    else if ('size' == d.key) {
                                        Object.keys(product[d.key]).forEach(function(s) {
                                            if (product[d.key][s]) {
                                                htmlItem += '<span>' + String(s).toUpperCase() + '</span>';
                                            }
                                        });
                                    }
                                    else {
                                        htmlItem += product[d.key];
                                    }
                                htmlItem += '</div>';
                            htmlItem += '</td>';
                        }
                        else {
                            console.warn(d.key, product, 'not found');

                            return;
                        }
                    });
                htmlItem += '</tr>';

                htmlContent += htmlItem;
            });
        htmlContent += '</table>';

        $('#product-compare-detail').html(htmlContent);

        if (modalProductCompare) {
            modalProductCompare.show();
        }
    });

    /* Cart search */
    $(".account-satting-active , .search-active").on("click", function(e) {
        e.preventDefault();
        $(this).parent().find('.account-dropdown , .search-content').slideToggle('medium');
    })
    
    /* Cart dropdown */
    var iconCart = $('.icon-cart');
    iconCart.on('click', function() {
        $('.shopping-cart-content').toggleClass('cart-visible');
    })
    
    /* Slider active */
    $('.slider-active').owlCarousel({
        loop: true,
        nav: true,
        autoplay: false,
        navText: ['<i class="fa fa-chevron-left"></i>', '<i class="fa fa-chevron-right"></i>'],
        autoplayTimeout: 5000,
        animateOut: 'fadeOut',
        animateIn: 'fadeIn',
        item: 1,
        responsive: {
            0: {
                items: 1
            },
            768: {
                items: 1
            },
            1000: {
                items: 1
            }
        }
    })
    
    
    /* Slider active 2 */
    $('.slider-active-2').owlCarousel({
        loop: true,
        nav: true,
        autoplay: false,
        navText: ['<i class="pe-7s-angle-left"></i>', '<i class="pe-7s-angle-right"></i>'],
        autoplayTimeout: 5000,
        animateOut: 'fadeOut',
        animateIn: 'fadeIn',
        item: 1,
        responsive: {
            0: {
                items: 1
            },
            768: {
                items: 1
            },
            1000: {
                items: 1
            }
        }
    })
    
    
    /* Slider active */
    $('.slider-active-3').owlCarousel({
        loop: true,
        nav: false,
        autoplay: false,
        autoplayTimeout: 5000,
        animateOut: 'fadeOut',
        animateIn: 'fadeIn',
        item: 1,
        responsive: {
            0: {
                items: 1
            },
            768: {
                items: 1
            },
            1000: {
                items: 1
            }
        }
    })
    
    
    /* Instagram active */
    $('.instagram-active').owlCarousel({
        loop: true,
        nav: false,
        autoplay: false,
        autoplayTimeout: 5000,
        animateOut: 'fadeOut',
        animateIn: 'fadeIn',
        item: 5,
        responsive: {
            0: {
                items: 2
            },
            768: {
                items: 4
            },
            1000: {
                items: 5
            }
        }
    })
    
    
    /* Collection slider active */
    $('.collection-active').owlCarousel({
        loop: true,
        nav: false,
        autoplay: true,
        autoplayTimeout: 5000,
        item: 4,
        margin: 30,
        responsive: {
            0: {
                items: 1
            },
            576: {
                items: 2
            },
            768: {
                items: 3
            },
            1000: {
                items: 4
            }
        }
    })
    
    
    /* Collection slider active 2 */
    $('.collection-active-2').owlCarousel({
        loop: true,
        nav: false,
        autoplay: false,
        autoplayTimeout: 5000,
        item: 3,
        margin: 30,
        responsive: {
            0: {
                items: 1
            },
            576: {
                items: 2
            },
            768: {
                items: 3
            },
            1000: {
                items: 3
            }
        }
    })
    
    
    /* product-slider active */
    $('.product-slider-active').owlCarousel({
        loop: true,
        nav: true,
        autoplay: false,
        navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
        autoplayTimeout: 5000,
        item: 4,
        margin: 30,
        responsive: {
            0: {
                items: 1,
                autoplay: true,
            },
            576: {
                items: 2
            },
            768: {
                items: 2
            },
            992: {
                items: 3
            },
            1200: {
                items: 4
            }
        }
    })
    
    /* product-slider active 2 */
    $('.product-slider-active-2').owlCarousel({
        loop: true,
        nav: false,
        autoplay: false,
        autoplayTimeout: 5000,
        item: 4,
        margin: 30,
        responsive: {
            0: {
                items: 1,
                autoplay: true,
            },
            576: {
                items: 2
            },
            768: {
                items: 2
            },
            992: {
                items: 3
            },
            1200: {
                items: 4
            }
        }
    })
    
    /* product-slider active 3 */
    $('.product-slider-active-3').owlCarousel({
        loop: true,
        nav: true,
        autoplay: false,
        navText: ['<i class="fa fa-long-arrow-left"></i>', '<i class="fa fa-long-arrow-right"></i>'],
        autoplayTimeout: 5000,
        item: 4,
        margin: 30,
        responsive: {
            0: {
                items: 1,
                autoplay: true,
            },
            576: {
                items: 2
            },
            768: {
                items: 2
            },
            992: {
                items: 3
            },
            1200: {
                items: 4
            }
        }
    })
    
    /* Testimonial active */
    $('.testimonial-active').owlCarousel({
        loop: true,
        nav: true,
        autoplay: false,
        navText: ['<i class="pe-7s-angle-left"></i>', '<i class="pe-7s-angle-right"></i>'],
        autoplayTimeout: 5000,
        item: 1,
        margin: 30,
        responsive: {
            0: {
                items: 1,
                autoplay: true,
            },
            576: {
                items: 1
            },
            768: {
                items: 1
            },
            1000: {
                items: 1
            }
        }
    })
    /* Testimonial 2 active */
    $('.testimonial-active-2').owlCarousel({
        loop: true,
        nav: false,
        autoplay: false,
        navText: ['<i class="pe-7s-angle-left"></i>', '<i class="pe-7s-angle-right"></i>'],
        autoplayTimeout: 5000,
        item: 1,
        responsive: {
            0: {
                items: 1,
                autoplay: true,
            },
            576: {
                items: 1
            },
            768: {
                items: 1
            },
            1000: {
                items: 1
            }
        }
    })
    
    
    /* Brand logo active */
    $('.brand-logo-active').owlCarousel({
        loop: true,
        nav: false,
        autoplay: false,
        autoplayTimeout: 5000,
        item: 5,
        margin: 30,
        responsive: {
            0: {
                items: 2
            },
            576: {
                items: 3
            },
            768: {
                items: 4
            },
            992: {
                items: 5
            },
            1000: {
                items: 5
            }
        }
    })
    
    /* Brand logo active */
    $('.brand-logo-active-2').owlCarousel({
        loop: true,
        nav: false,
        autoplay: false,
        autoplayTimeout: 5000,
        item: 4,
        margin: 45,
        responsive: {
            0: {
                items: 1
            },
            576: {
                items: 3
            },
            768: {
                items: 3
            },
            992: {
                items: 4
            },
            1000: {
                items: 4
            }
        }
    })
    
    
    /* Related product active */
    $('.related-product-active').owlCarousel({
        loop: true,
        nav: false,
        autoplay: false,
        autoplayTimeout: 5000,
        item: 4,
        margin: 30,
        responsive: {
            0: {
                items: 1
            },
            576: {
                items: 2
            },
            768: {
                items: 2
            },
            992: {
                items: 3
            },
            1200: {
                items: 4
            }
        }
    })
    
    
    /*--- Quickview-slide-active ---*/
    $('.quickview-slide-active').owlCarousel({
        loop: true,
        navText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
        margin: 15,
        smartSpeed: 1000,
        nav: true,
        dots: false,
        responsive: {
            0: {
                items: 3,
                autoplay: true,
                smartSpeed: 300
            },
            576: {
                items: 3
            },
            768: {
                items: 3
            },
            1000: {
                items: 3
            }
        }
    })
    
    
    $('.quickview-slide-active a').on('click', function() {
        $('.quickview-slide-active a').removeClass('active');
    })
    
    
    /*----------------------------
    	Cart Plus Minus Button
    ------------------------------ */
    var CartPlusMinus = $('.cart-plus-minus');
    CartPlusMinus.prepend('<div class="dec qtybutton">-</div>');
    CartPlusMinus.append('<div class="inc qtybutton">+</div>');
    $(".qtybutton").on("click", function() {
        var $button = $(this);
        var oldValue = $button.parent().find("input").val();
        if ($button.text() === "+") {
            var newVal = parseFloat(oldValue) + 1;
        } else {
            // Don't allow decrementing below zero
            if (oldValue > 0) {
                var newVal = parseFloat(oldValue) - 1;
            } else {
                newVal = 1;
            }
        }
        $button.parent().find("input").val(newVal);
    });
    
    
    /*--
    Menu Stick
    -----------------------------------*/
    var header = $('.sticky-bar');
    var win = $(window);
    win.on('scroll', function() {
        var scroll = win.scrollTop();
        if (scroll < 200) {
            header.removeClass('stick');
        } else {
            header.addClass('stick');
        }
    });
    
    
    /* jQuery MeanMenu */
    $('#mobile-menu-active').meanmenu({
        meanScreenWidth: "991",
        meanMenuContainer: ".mobile-menu-area .mobile-menu",
    });
    
    
    /*-----------------------------------
        Scroll zoom
    -------------------------------------- */
    window.sr = ScrollReveal({
        duration: 800,
        reset: false
    });
    sr.reveal('.scroll-zoom');
    
    
    /*-----------------------
        Shop filter active 
    ------------------------- */
    $('.filter-active a').on('click', function(e) {
        e.preventDefault();
        $('.product-filter-wrapper').slideToggle();
    })
    
    
    /*---------------------
        Price slider
    --------------------- */
    var sliderrange = $('#slider-range');
    var amountprice = $('#amount');
    $(function() {
        sliderrange.slider({
            range: true,
            min: 16,
            max: 400,
            values: [0, 300],
            slide: function(event, ui) {
                amountprice.val("$" + ui.values[0] + " - $" + ui.values[1]);
            }
        });
        amountprice.val("$" + sliderrange.slider("values", 0) +
            " - $" + sliderrange.slider("values", 1));
    });
    
    
    /* Language dropdown */
    $(".language-style a").on("click", function(e) {
        e.preventDefault();
        $(this).parent().find('.lang-car-dropdown').slideToggle('medium');
    })
    
    
    /* use style dropdown */
    $(".use-style a").on("click", function(e) {
        e.preventDefault();
        $(this).parent().find('.lang-car-dropdown').slideToggle('medium');
    })
    
    
    /*=========================
		Toggle Ativation
	===========================*/
    function itemToggler() {
        $(".toggle-item-active").slice(0, 8).show();
        $(".item-wrapper").find(".loadMore").on('click', function(e) {
            e.preventDefault();
            $(this).parents(".item-wrapper").find(".toggle-item-active:hidden").slice(0, 4).slideDown();
            if ($(".toggle-item-active:hidden").length == 0) {
                $(this).parent('.toggle-btn').fadeOut('slow');
            }
        });
    }
    itemToggler();
    
    
    function itemToggler2() {
        $(".toggle-item-active2").slice(0, 8).show();
        $(".item-wrapper2").find(".loadMore2").on('click', function(e) {
            e.preventDefault();
            $(this).parents(".item-wrapper2").find(".toggle-item-active2:hidden").slice(0, 4).slideDown();
            if ($(".toggle-item-active2:hidden").length == 0) {
                $(this).parent('.toggle-btn2').fadeOut('slow');
            }
        });
    }
    itemToggler2();
    
    function itemToggler3() {
        $(".toggle-item-active3").slice(0, 8).show();
        $(".item-wrapper3").find(".loadMore3").on('click', function(e) {
            e.preventDefault();
            $(this).parents(".item-wrapper3").find(".toggle-item-active3:hidden").slice(0, 4).slideDown();
            if ($(".toggle-item-active3:hidden").length == 0) {
                $(this).parent('.toggle-btn3').fadeOut('slow');
            }
        });
    }
    itemToggler3();
    
    
    /*--------------------------
        ScrollUp
    ---------------------------- */
    $.scrollUp({
        scrollText: '<i class="fa fa-angle-double-up"></i>',
        easingType: 'linear',
        scrollSpeed: 900,
        animation: 'fade'
    });
    
    
    /*--------------------------
        Isotope
    ---------------------------- */
    
    $('.grid').imagesLoaded(function() {
        // init Isotope
        $('.grid').isotope({
            itemSelector: '.grid-item',
            percentPosition: true,
            layoutMode: 'masonry',
            masonry: {
                // use outer width of grid-sizer for columnWidth
                columnWidth: '.grid-sizer',
            }
        });
    });
    
    
    /*--- Clickable menu active ----*/
    const slinky = $('#menu').slinky()
    
    /*====== sidebarCart ======*/
    function sidebarMainmenu() {
        var menuTrigger = $('.clickable-mainmenu-active'),
            endTrigger = $('button.clickable-mainmenu-close'),
            container = $('.clickable-mainmenu');
        menuTrigger.on('click', function(e) {
            e.preventDefault();
            container.addClass('inside');
        });
        endTrigger.on('click', function() {
            container.removeClass('inside');
        });
    };
    sidebarMainmenu();
    
    
    /*=========================
		Toggle Ativation
	===========================*/
    function itemToggler4() {
        $(".toggle-item-active4").slice(0, 6).show();
        $(".item-wrapper4").find(".loadMore4").on('click', function(e) {
            e.preventDefault();
            $(this).parents(".item-wrapper4").find(".toggle-item-active4:hidden").slice(0, 3).slideDown();
            if ($(".toggle-item-active4:hidden").length == 0) {
                $(this).parent('.toggle-btn4').fadeOut('slow');
            }
        });
    }
    itemToggler4();

    function itemToggler5() {
        $(".toggle-item-active5").slice(0, 6).show();
        $(".item-wrapper5").find(".loadMore5").on('click', function(e) {
            e.preventDefault();
            $(this).parents(".item-wrapper5").find(".toggle-item-active5:hidden").slice(0, 3).slideDown();
            if ($(".toggle-item-active5:hidden").length == 0) {
                $(this).parent('.toggle-btn5').fadeOut('slow');
            }
        });
    }
    itemToggler5();

    function itemToggler6() {
        $(".toggle-item-active6").slice(0, 6).show();
        $(".item-wrapper6").find(".loadMore6").on('click', function(e) {
            e.preventDefault();
            $(this).parents(".item-wrapper6").find(".toggle-item-active6:hidden").slice(0, 3).slideDown();
            if ($(".toggle-item-active6:hidden").length == 0) {
                $(this).parent('.toggle-btn6').fadeOut('slow');
            }
        });
    }
    itemToggler6();
    
    
    /*---------------------
        Countdown
      --------------------- */
    $('[data-countdown]').each(function() {
        var $this = $(this),
            finalDate = $(this).data('countdown');
        $this.countdown(finalDate, function(event) {
            $this.html(event.strftime('<span class="cdown day">%-D <p>Days</p></span> <span class="cdown hour">%-H <p>Hours</p></span> <span class="cdown minutes">%M <p>Minutes</p></span class="cdown second"> <span>%S <p>Second</p></span>'));
        });
    });
    
    
    /*--------------------------
        Product Zoom
	---------------------------- */
    $(".zoompro").elevateZoom({
        gallery: "gallery",
        galleryActiveClass: "active",
        zoomWindowWidth: 300,
        zoomWindowHeight: 100,
        scrollZoom: false,
        zoomType: "inner",
        cursor: "crosshair"
    });
    
    
    /*---------------------
        Product dec slider
    --------------------- */
    $('.product-dec-slider-2').slick({
        infinite: true,
        slidesToShow: 4,
        vertical: true,
        slidesToScroll: 1,
        centerPadding: '60px',
        prevArrow: '<span class="product-dec-icon product-dec-prev"><i class="fa fa-angle-up"></i></span>',
        nextArrow: '<span class="product-dec-icon product-dec-next"><i class="fa fa-angle-down"></i></span>',
        responsive: [{
                breakpoint: 992,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 479,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            }
        ]
    });
    
    
    /*---------------------
        Video popup
    --------------------- */
    $('.video-popup').magnificPopup({
        type: 'iframe',
        mainClass: 'mfp-fade',
        removalDelay: 160,
        preloader: false,
        zoom: {
            enabled: true,
        }
    });
    
    
    /*---------------------
        Sidebar active
    --------------------- */
    $('.sidebar-active').stickySidebar({
        topSpacing: 80,
        bottomSpacing: 30,
        minWidth: 767,
    });
    
    
    /* Product details slider */
    $('.product-details-slider-active').owlCarousel({
        loop: true,
        nav: true,
        autoplay: false,
        autoplayTimeout: 5000,
        animateOut: 'fadeOut',
        animateIn: 'fadeIn',
        navText: ['<i class="fa fa-chevron-left"></i>', '<i class="fa fa-chevron-right"></i>'],
        item: 3,
        margin: 30,
        responsive: {
            0: {
                items: 1
            },
            768: {
                items: 3
            },
            1000: {
                items: 3
            }
        }
    })
    
    
    /*--
    Magnific Popup
    ------------------------*/
    $('.img-popup').magnificPopup({
        type: 'image',
        gallery: {
            enabled: true
        }
    });
    
    
    /*-------------------------
    Create an account toggle
    --------------------------*/
    $('.checkout-toggle2').on('click', function() {
        $('.open-toggle2').slideToggle(1000);
    });
    
    $('.checkout-toggle').on('click', function() {
        $('.open-toggle').slideToggle(1000);
    });
    
    
    /*---- CounterUp ----*/
    $('.count').counterUp({
        delay: 10,
        time: 1000
    });
    
    
    /* Blog img slide active */
    $('.blog-img-slide').owlCarousel({
        loop: true,
        nav: true,
        dots: false,
        autoplay: false,
        autoplayTimeout: 5000,
        animateOut: 'fadeOut',
        animateIn: 'fadeIn',
        navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
        item: 1,
        margin: 30,
        responsive: {
            0: {
                items: 1
            },
            768: {
                items: 1
            },
            1000: {
                items: 1
            }
        }
    })
    
    
    /*====== fullpage slider active ======*/
   
    $('#fullpage').fullpage({
        sectionSelector : '.flone-fp-section',
        slideSelector : '.flone-fp-slide',
        navigation : true,
        responsiveWidth: 575
    });
    
    
    /*------ Wow Active ----*/
    new WOW().init();
    
    
    
    
    
    
    
    
    
    
    



})(jQuery);