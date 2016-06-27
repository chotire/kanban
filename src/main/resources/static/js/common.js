$(document).ready(function() {
  $("a").click(function(e) {
    if ($(this).attr("href") == "#") {
      e.preventDefault();
    }
  });

  $("form").submit(function(e) {
    e.preventDefault();
  });
});