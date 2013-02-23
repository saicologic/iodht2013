$( document ).ready(function($) {

  function parse(str){
    if(str != undefined) {
     return str.split(':')[1];
    } else {
      return '';
    }
  };

  function parse_tweets(category_id, d){
    return {
          'category_id': category_id,
          'tweetcat': parse(d[0]),
          'tweettime': parse(d[1]),
          'lat': parse(d[2]),
          'lng': parse(d[3]),
          'tweet': parse(d[4]),
          'picurl': parse(d[5])
    };
  };

  // Get Photo
  getPhoto();

  $.ajax({
    type: "GET",
    url: "https://spreadsheets.google.com/feeds/list/0AtgMYirU9UNcdHlxYjlRN3lCeHZyVjBUSWJQMUtSVWc/od7/public/values",
    data:{alt:'json'},
    success:function(data) {

      // Create data
      var res = data;
      var rows = [];
      $.each(res.feed.entry, function(id){
        var d = res.feed.entry[id].content.$t.split(',')
        var category_id = res.feed.entry[id].gsx$tweetcatid.$t;
        rows.push(parse_tweets(category_id, d));
      });


      // Get Category
      var categories = [];
      for(var i = 0; i < rows.length; i++){
        categories.push(rows[i]['tweetcat']);
      };
      var c = _.uniq(categories);

      // Create Category map
      var outputs = []
      for(var i = 0; i < rows.length; i++){
        var index = rows[i]['category_id'];
        if(_.isEmpty(outputs[index])){
          outputs[index] = [];
        }
        outputs[index].push(rows[i]['tweet']);
      };

      function load_tweets(outputs){
        $('#tweet').empty();
        var selected_category_id = window.location.hash.replace('#', '');
        if(selected_category_id == undefined || selected_category_id == 0) {
          var r = outputs[1];
        } else {
          var r = outputs[selected_category_id];
        }

        for(var i = 0; i < r.length; i++){
          var html = "<span>" + r[i] + "</span><br/>";
          $('#tweet').append(html);
        }

      }

      load_tweets(outputs);

      // Output categories
      for(var i = 0; i < c.length; i++){
        var html = "<span><a class='category' href='#" +i+ "'>" + c[i] + "</a></span><br/>";
        $('#categories').append(html);
      }

      $(".category").click(function(){
        load_tweets(outputs);
      })

    },
    error:function(data) {
    }
  });

});