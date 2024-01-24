/////////////////////////////////////////////////////////////////////////
function ecommerce_purchase(id, products) {
  window.dataLayer = window.dataLayer || [];
  dataLayer.push({
    "ecommerce": {
      "currencyCode": "RUB",
      "purchase": {
        "actionField": { "id" : id, },
        "products": products,
      }
    }
  });
}

/////////////////////////////////////////////////////////////////////////
function ecommerce_add(products) {
  window.dataLayer = window.dataLayer || [];
  dataLayer.push({
    "ecommerce": {
      "currencyCode": "RUB",
      "add": {
        "products": products,
      }
    }
  });
}

/////////////////////////////////////////////////////////////////////////
function ecommerce_remove(products) {
  window.dataLayer = window.dataLayer || [];
  dataLayer.push({
    "ecommerce": {
      "currencyCode": "RUB",
      "remove": {
        "products": products,
      }
    }
  });
}

/////////////////////////////////////////////////////////////////////////
function ecommerce_detail(product) {
  window.dataLayer = window.dataLayer || [];
  dataLayer.push({
    "ecommerce": {
      "currencyCode": "RUB",
      "detail": {
        "products": [{
           "id": product.id,
           "name" : product.name,
           "price": product.price,
           "brand": product.brand,
           "category": product.category,
         }]
      }
    }
  });
}

///////////////////////////////////////////////////////////////////
function ecommerce_impressions(arg1='h1', list_selector=".items-list") {
  if ($.isArray(arg1)) {
    var impressions = []
    arg1.forEach(function(item, index, arr) {
      if (item.hasOwnProperty('title_selector') && item.hasOwnProperty('list_selector')) {
        var impr = ecommerce_getSingleListImpressions(item.title_selector, item.list_selector);
        impressions = impressions.concat(impr);
      }
    });
  } else {
    var impressions = ecommerce_getSingleListImpressions(arg1, list_selector);
  }
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    "ecommerce": {
      "currencyCode": "RUB",
      "impressions": impressions,
    },
  });
}

////////////////////////////////////////////////////////////////////////
function ecommerce_getSingleListImpressions(title_selector, list_selector=".items-list") {
  var title = $(title_selector).text();
  var impressions = [];
  $(list_selector + ' > *').each(function(index){
    var position = index + 1;
    $(this).data('list', title);
    $(this).data('position', position);
    $(this).on('click', ecommerce_onListItemClick);
    impressions.push({
      'id': $(this).data('id'),
      'name': $(this).data('name'),
      'brand': $(this).data('brand'),
      'category': $(this).data('category'),
      'price': $(this).data('price'),
      'list': title,
      'position': position,
    });
  });
  return impressions;
}

////////////////////////////////////////////////////////////////////////
function ecommerce_onListItemClick(e) {
  window.dataLayer = window.dataLayer || [];
  dataLayer.push({
    "ecommerce": {
      "currencyCode": "RUB",
      "click": {
        "products": [{
          "id": $(this).data('id'),
          "name": $(this).data('name'),
          "price": $(this).data('price'),
          "brand": $(this).data('brand'),
          "category": $(this).data('category'),
          "list": $(this).data('list'),
          "position": $(this).data('position'),
        }],
      }
    }
  });
  return true;
}

/////////////////////////////////////////////////////////////////////////
function ecommerce_promoview(promo_selector = ".promo") {
  var promotions = []
  $(promo_selector).each(function(index){
    $(this).on('click', ecommerce_onPromoClick);
    promotions.push({
      "id": $(this).data('id'),
      "name": $(this).data('name'),
      "creative": $(this).data('creative'),
      "position": $(this).data('position'),
    })
  });
  window.dataLayer = window.dataLayer || [];
  dataLayer.push({
    "ecommerce": {
      "promoView": {
        "promotions": promotions,
      }
    }
  });
}

////////////////////////////////////////////////////////////////////////
function ecommerce_onPromoClick(e) {
  window.dataLayer = window.dataLayer || [];
  dataLayer.push({
    "ecommerce": {
      "promoClick": {
        "promotions": [{
          "id": $(this).data('id'),
          "name": $(this).data('name'),
          "creative": $(this).data('creative'),
          "position": $(this).data('position'),
        }],
      }
    }
  });
  return true;
}
