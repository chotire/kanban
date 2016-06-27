$.rest = function(url, data, callback, type, method) {
  if ($.isFunction(data)) {
    type = type || callback,
    callback = data,
    data = {}
  }
 
  return $.ajax({
    url: url,
    type: method,
    success: callback,
    data: data,
    contentType: type
  });
}

$.put = function(url, data, callback, type) {
  return $.rest(url, data, callback, type, "PUT");
}

$.delete = function(url, data, callback, type) {
  return $.rest(url, data, callback, type, "DELETE");
}

$.serialize = function(data) {
  var params = decodeURIComponent($.param(data));
  do {
    var el = params.match(/\[([a-zA-Z]+)\]/);
    if (el) {
      var pattern = new RegExp("\\[" + el[1] + "\\]", "g");
      params = params.replace(pattern, "." + el[1]);
    }
  } while(el);
  return params;
}

$.fn.serializeObject = function() {
  var o = {};
  var a = this.serializeArray();
  $.each(a, function() {
    if (o[this.name] !== undefined) {
      if (!o[this.name].push) {
        o[this.name] = [o[this.name]];
      }
      o[this.name].push(this.value || "");
    } else {
      o[this.name] = this.value || "";
    }
  });
  return o;
};