// add cart
$('.add-cart').on('click', function(){
    var cart_list = $('.shopping-cart-content ul'),
        name = '',
        price = '',
        img = '',
        quantity = '01';
  
    if($(this).hasClass('pro-cart')){
      var content_div = $(this).parents('.product-wrap').find('.product-content');
      name = content_div.find('h3 a').html();
      price = content_div.find('.product-price span').html();
      img = content_div.siblings().find('.default-img').attr('src');
    }
  
    addToCart(cart_list, name, price, quantity, img);
  
    var count_div = $('.count-style'),
        count_num = parseInt(count_div.html()),
        total = count_num + 1;
    count_div.html((total < 10) ? '0' + total : total);
  })
  
  function addToCart(append_list, name, price, quantity, img){
    append_list.append(
      '<li class="single-shopping-cart">' +
        '<div class="shopping-cart-img">' +
          '<a href="#"><img alt="" class="cart-item-image" src="'+ img +'" width="75px"></a>' +
        '</div>' +
        '<div class="shopping-cart-title">' +
          '<h4><a href="#">'+ name +'</a></h4>' +
          '<h6>Qty: '+ quantity +'</h6>' +
          '<span>'+ price +'</span>' +
        '</div>' +
        '<div class="shopping-cart-delete">' +
          '<a href="javascript:void(0)" onclick="removeFromCart($(this))"><i class="fa fa-times-circle"></i></a>' +
        '</div>' +
      '</li>'
    );
    countTotalPrice(append_list);
  }
  
  function removeFromCart(element){
    element.parents('li').remove();
    countTotalPrice($('.shopping-cart-content ul'));
    var count_div = $('.count-style'),
        count_num = parseInt(count_div.html()),
        total = count_num - 1;
    count_div.html((total != 0 && total < 10) ? '0' + total : total);
  }
  
  function countTotalPrice(append_list){
    console.log('hello');
    var total = 0;
    append_list.find('li').each(function() {
      total += parseInt($(this).find('.shopping-cart-title span').html().replace('$', ''))
      console.log(total);
    });
    $('.shop-total').html('$' + total + '.00');
  }
  
  // search product list
  $("#searchTableBtn").on("click", function() {
    var value = $(this).prev('input').val().toLowerCase(),
        result_total = 0;
      
    $('.row .col-xl-4').filter(function() {
      $(this).toggle($(this).find('.product-content h3 a').text().toLowerCase().indexOf(value) > -1);
    });
    result_total = $('.row .col-xl-4:visible').length;
  
    if(value == ''){
      $('.select-shoing-wrap p').html('Showing 1–9 of 9 result');    
    }else{
      $('.select-shoing-wrap p').html('Showing ' + result_total + ' result');    
    }
  });
  
  // Filter Category
  $('.filter__input').on("click", function() {
      $(this).parents('li').siblings().find('input').prop('checked', false);
  
      let attr = '';
      $('.filter__ul').each(function(){
          var total_checked = $(this).find('li input:checked').length;
          if(total_checked > 0){
              attr += '[data-' + $(this).attr('data') + '="' + $(this).find('li input:checked').val() + '"]';
          }
      });
  
      $('.product--item').hide();
      $('.product--item' + attr).show();
  
      var result_total = $('.product--item:visible').length,
          length = $('.filter__input:checked').length;
  
      if(length <= 0){
        $('.select-shoing-wrap p').html('Showing 1–9 of 9 result');    
      }else{
        $('.select-shoing-wrap p').html('Showing ' + result_total + ' result');    
      }
  });
  
  // Delete item in cart page
  $('.delete-item').on('click', function(){
    $(this).parents('tr').remove();
    countTotalPriceInCartDetail();
  })
  
  $('.dec, .inc').on('click', function(){
    var quantity = $(this).siblings('.cart-plus-minus-box').val();
    var untilPrice = parseInt($(this).parents('tr').find('.product-price-cart span').html().replace('$', ''));
    $(this).parents('tr').find('.product-subtotal').html('$' + untilPrice * quantity + '.00');
    countTotalPriceInCartDetail();
  })
  // Count total in cart page
  function countTotalPriceInCartDetail(){
    var totalPrice = 0;
    var vat = 0.1;
  
    $('.cart-table-content tbody tr').each(function(){
      totalPrice += parseInt($(this).find('.product-subtotal').html().replace('$', ''));
    });
    $('.grand-totall h5 span').html('$' + totalPrice + '.00');
  
    totalWithVAT = (totalPrice * vat) + totalPrice;
    $('.grand-totall-title span').html('$' + totalWithVAT + '.00');
  }
  