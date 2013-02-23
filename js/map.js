function createMarker( icon_cnt) {

    if( icon_cnt == '4') {
        return "http://maps.google.co.jp/mapfiles/ms/icons/red-dot.png";
    } else if( icon_cnt == '3') {
        return "http://maps.google.co.jp/mapfiles/ms/icons/orange-dot.png";
    } else if( icon_cnt == '2') {
        return "http://maps.google.co.jp/mapfiles/ms/icons/yellow-dot.png";
    } else if( icon_cnt == '1') {
        return "http://maps.google.co.jp/mapfiles/ms/icons/green-dot.png";
    }


}

var xparam = {
        center_latitude:'35.664035',
        center_longitude:'139.698212',
        zoom:14
}

$(document).ready(function($){

        $.ajax({
            type: "GET",
            url: "https://spreadsheets.google.com/feeds/list/0AtgMYirU9UNcdHlxYjlRN3lCeHZyVjBUSWJQMUtSVWc/od6/public/values",
            data:{alt:'json'},
            success:function(data) {
            var xres = data;

            var rows = [];



            var myLatlng = new google.maps.LatLng( xparam.center_latitude, xparam.center_longitude);
            var mapOptions = {
                zoom: xparam.zoom,
                center: myLatlng,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            }
            var map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);

            $.each(xres.feed.entry, function(id){
                //  var d = xres.feed.entry[id].content.$t.split(',')

                var _lat = xres.feed.entry[id].gsx$lat.$t;
                var _lng = xres.feed.entry[id].gsx$lng.$t;
                var _statusid = xres.feed.entry[id].gsx$statusid.$t;
                var _name = "test"; //xres.feed.entry[id].gsx$name.$t;

                //alert("_lat:" + _statusid);

                //$('#debug').html(_lat + "  " + _lng);
                // your data parse
                //rows.push(parse_latlng(d));


                var xSetPoint = new google.maps.LatLng(_lat,_lng);
                var xSetHtml = '<div>' +  createMarker(_statusid) + '</div>';

                var marker = new google.maps.Marker({
                    position: xSetPoint,
                    map: map,
                    title:"Hello World!",
                    icon:createMarker(_statusid)
                });

                //createMarker( xSetPoint,xSetHtml);

            });

            /*
            for(var i = 0; i < rows.length; i++){
                console.log(rows[i]['tweetcat']);
            }*/

            },
            error:function(data) {



            }
        });


});

var xmap = "";