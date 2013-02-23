/**
 * pthoto関連の制御用
 *
 */

var getPhoto = function() {
    $.ajax({
        type: "GET",
        url: "https://spreadsheets.google.com/feeds/list/0AtgMYirU9UNcdHlxYjlRN3lCeHZyVjBUSWJQMUtSVWc/od7/public/values",
	data:{alt:'json'},
        success:function(data) {
		try{
            // picJson = $.parseJSON(data);
            picJson = data;
			displayPhoto(picJson.feed);
		}catch(e){
			picJson = data
		}
        },
        error:function() {
        }
    });
};
/**
 * 写真のリストを表示する
 *
 */
var displayPhoto = function(json) {
ulitem = $("#photo_list").children(1).children()
console.log(ulitem)
var count = 0;
$.each(json.entry ,function(key,value) {

    if (count < 24) {
    	imgTag = $("<img>");
    	imgTag.addClass("pic_image");
    	imgTag.attr("id","pic_"+key)
    	imgTag.attr("src",value.gsx$picurl["$t"])
    	imgTag.css("width",100)
    	imgTag.css("height",100)

    	//listTag = $("<li>");
    	//listTag.append(imgTag)
    	//ulitem.append(listTag)
    	//ulitem.append(imgTag)
    	$("#photo_list").append(imgTag)
    }
    count++;
});

};
