var loading_url = "//statics.plurk.com/7f5c4282d2e9accfdae99cc6abb6c9bb.gif",
	pictureservices_img = "//statics.plurk.com/85b41d35700d663e1dec87bc78dbbf6d.gif";

function isImage(href) {
	href = (href + '').toLowerCase();
	return(href.indexOf("jpg") != -1 || href.indexOf("jpeg") != -1 || href.indexOf("png") != -1 || href.indexOf("gif") != -1);
}

function urldecode(href) {
	return href.replace(/%3A/gi, ":").replace(/%2F/gi, "/");
}

function getPlurkLargeImage(url) {
	url = url.replace("tn_", "");
	url = url.replace("tx_", "");
	url = url.replace(".gif", ".jpg");
	return url;
}

function getLargeImage(raw, href, alt) {
	if((raw.indexOf("statics.plurk.com") != -1 || raw.indexOf("static.plurk.com") != -1) && raw.indexOf(loading_url) == -1) return "";
	if(raw.indexOf("banana.plurk.com") != -1 || raw.indexOf("emos.plurk.com") != -1 || raw.indexOf("//s.plurk.com") != -1 || (raw.indexOf("plurk.com/static/") != -1 && raw.indexOf("plurk.com/static/creatures") == -1) || raw.indexOf("chrome-extension:") != -1) return "";
	if(raw.indexOf(loading_url) != -1) raw = href;
	if(raw.indexOf("avatars.plurk.com") != -1 || raw.indexOf("plurk.com/static/creatures") != -1) {
		raw = raw.replace("medium", "big");
		raw = raw.replace("small", "big");
		raw = raw.replace("gif", "jpg");
		return raw;
	}
	//Google+
	if(raw.indexOf("googleusercontent.com/gadgets/proxy") != -1 && raw.indexOf("url=") != -1) {
		raw = raw.slice(raw.indexOf("url=") + 4, raw.length);
		if(raw.indexOf("%27") != -1) raw = raw.slice(0, raw.indexOf("%27"));
		raw = urldecode(raw);
		raw = getLargeImage(raw, raw);
		return raw;
	}
	if(raw.indexOf("ytimg.googleusercontent.com/vi/") != -1) {
		raw = raw.replace(/\/(\d|default)\.jpg/, '/0.jpg');
		return raw;
	}
	if((raw.indexOf(".googleusercontent.com") != -1 || raw.indexOf(".ggpht.com") != -1 || raw.indexOf("bp.blogspot.com") != -1) &&
		raw.match(/.*\.com\/.*\/(\-?w\d+|\-?h\d+|\-p|\-o|s\d+(-[ch])?)+\/.*/)) {
		raw = raw.replace(/\/(\-?w\d+|\-?h\d+|\-p|\-o|s\d+(-[ch])?)+\//, '/s0/');
		return raw;
	}
	//Facebook
	if((raw.indexOf("external.ak.fbcdn.net") != -1 && raw.indexOf("url=") != -1) || (raw.indexOf("platform.ak.fbcdn.net") != -1 && raw.indexOf("src=") != -1)) {
		if(raw.indexOf("url=") != -1) raw = raw.slice(raw.indexOf("url=") + 4, raw.length);
		else raw = raw.slice(raw.indexOf("src=") + 4, raw.length);
		raw = urldecode(raw);
		raw = getLargeImage(raw, raw);
		return raw;
	}
	if(raw.indexOf("fbcdn-photos-a.akamaihd.net") != -1 || raw.indexOf("fbcdn-profile-a.akamaihd.net") != -1 || raw.indexOf("fbcdn-sphotos-a.akamaihd.net") != -1 || raw.indexOf("creative.ak.fbcdn.net") != -1 || raw.indexOf("profile.ak.fbcdn.net") != -1 || raw.indexOf("sphotos.ak.fbcdn.net") != -1 || raw.match(/photos(\-[0a-z])?\.ak\.fbcdn\.net/) || raw.indexOf("vthumb.ak.fbcdn.net") != -1) {
		raw = raw.replace("_s", "_n");
		raw = raw.replace("_q", "_n");
		raw = raw.replace("_t", "_n");
		return raw;
	}
	//YouTube
	if(raw.indexOf("ytimg.com/vi/") != -1 || raw.indexOf("img.youtube.com/vi/") != -1) {
		raw = raw.replace(/\/(\d|default)\.jpg/, '/0.jpg');
		return raw;
	}
	if(href.indexOf("youtube.com/watch") != -1) return href.replace(/^.*v=([\w-]+).*$/, 'http://i1.ytimg.com/vi/$1/0.jpg');
	if(href.indexOf("youtu.be") != -1) return href.replace(/^.*youtu.be\/([\w-]+).*$/, 'http://i1.ytimg.com/vi/$1/0.jpg');
	//Flickr
	if(raw.match(/static\.?flickr\.com/) && raw.indexOf("_b.") == -1 && raw.indexOf("_h.") == -1 && raw.indexOf("_k.") == -1 && raw.indexOf("_o.") == -1) {
		var width = ($(window).width() / 2 - 20), height = ($(window).height() - 60);
		if (raw.indexOf("_k.") != -1 && width < 2048 && height < 1530 ||
			raw.indexOf("_h.") != -1 && width < 1600 && height < 1195 ||
			raw.indexOf("_b.") != -1 && width < 1024 && height < 765 ||
			raw.indexOf("_c.") != -1 && width < 800 && height < 598 ||
			raw.indexOf("_z.") != -1 && width < 640 && height < 478 ||
			raw.indexOf("_d.") != -1 && width < 500 && height < 375)
			return raw;
		raw = raw.replace("_s.", "."); //正方形 75 (75 x 75)
		raw = raw.replace("_q.", "."); //正方形 150 (150 x 150)
		raw = raw.replace("_t.", "."); //縮圖 (100 x 75)
		raw = raw.replace("_m.", "."); //小型 240 (240 x 180)
		raw = raw.replace("_n.", "."); //小型 320 (320 x 239)
		raw = raw.replace("_d.", "."); //中型 500 (500 x 375)
		raw = raw.replace("_z.", "."); //中型 640 (640 x 478)
		raw = raw.replace("_c.", "."); //中型 800 (800 x 598)
		raw = raw.replace("_b.", "."); //大型 1024 (1024 x 765)
		raw = raw.replace("_h.", "."); //大型 1600 (1600 x 1195)
		raw = raw.replace("_k.", "."); //大型 2048 (2048 x 1530)
		raw = raw.slice(0, raw.lastIndexOf(".")) + "_b" + raw.slice(raw.lastIndexOf("."), raw.length);
		return raw;
	}
	//Vimeo
	if(raw.indexOf("b.vimeocdn.com") != -1) {
		if(raw.indexOf("/ps/") != -1) return raw.replace(/_\d+\./, "_300.");
		else if(raw.indexOf("/ts/") != -1) return raw.replace(/_\d+\./, "_640.");
	}
	//Wordpress
	if(raw.indexOf("files.wordpress.com") != -1 && raw.indexOf("?") != -1) {
		raw = raw.slice(0, raw.indexOf("?"));
		return raw;
	}
	if(raw.indexOf("s.wordpress.com/imgpress") != -1 && raw.indexOf("url=") != -1) {
		raw = raw.slice(raw.indexOf("url=") + 4, raw.length);
		if(raw.indexOf("%27") != -1) raw = raw.slice(0, raw.indexOf("%27"));
		raw = urldecode(raw);
		return raw;
	}
	if(raw.indexOf("wp-content") != -1) {
		raw = raw.replace(/-\d+x\d+\./, '.');
		return raw;
	}
	//PIXNET痞客邦
	if(raw.match(/s(\d?)\.pimg\.tw/) && raw.indexOf("/album/") != -1 && raw.indexOf("/element/") != -1 && raw.indexOf("_") != -1 && raw.indexOf("/zoomcrop/") != -1) {
		raw = "http://pic.pimg.tw/" + raw.slice(raw.indexOf("/album/") + 7, raw.indexOf("/element/")) + "/" + raw.slice(raw.indexOf("_") + 1, raw.indexOf("/zoomcrop/")) + ".jpg";
		return raw;
	}
	if(raw.match(/s(\d?)\.pimg\.tw/) && raw.match(/\/album(\d?)\//) && raw.indexOf("/albumset/") != -1 && raw.indexOf("/zoomcrop/") == -1) {
		raw = raw.slice(0, raw.indexOf(".jpg")) + "/zoomcrop/170x170.jpg";
		return raw;
	}
	if(raw.indexOf("pimg.pixnet.tv") != -1) {
		raw = raw.replace("90x90", "170x170");
		return raw;
	}
	if(raw.indexOf("pic.pimg.tw") != -1 || raw.indexOf("ext.pimg.tw") != -1) {
		raw = raw.replace("ext.pimg.tw", "pic.pimg.tw");
		raw = raw.replace("_t", "");
		raw = raw.replace("_n", "");
		raw = raw.replace("_m", "");
		raw = raw.replace("_l", "");
		raw = raw.replace("_b", "");
		return raw;
	}
	//Xuite
	if(raw.indexOf("vlog.xuite.net") != -1) {
		raw = raw.replace("m_", "");
		return raw;
	}
	if(raw.indexOf("share.photo.xuite.net") != -1) {
		raw = raw.replace("_q", "_x");
		raw = raw.replace("_c", "_x");
		raw = raw.replace("_t", "_x");
		raw = raw.replace("_l", "_x");
		raw = raw.replace("_o", "_x");
		return raw;
	}
	//CityTalk
	if(raw.indexOf("citytalk.tw") != -1 && raw.indexOf("event") != -1) {
		raw = raw.replace("_s2.", ".");
		raw = raw.replace("_s.", ".");
		return raw;
	}
	//NowNews
	if(raw.indexOf("static.nownews.com") != -1 && raw.indexOf("newspic") != -1) {
		raw = raw.slice(0, raw.lastIndexOf("/") + 1) + "i" + raw.slice(raw.lastIndexOf("/") + 2, raw.length);
		return raw;
	}
	//T客邦
	if(raw.indexOf("techbang.com/system/excerpt_images") != -1) {
		raw = raw.replace("square", "original");
		raw = raw.replace("thumb", "inpage");
		return raw;
	}
	if(raw.indexOf("t17.techbang.com/system/hot_images") != -1) {
		raw = raw.replace("thumb", "original");
		return raw;
	}
	//Yahoo
	if(raw.indexOf("yimg.com/bt/api") != -1 && raw.indexOf("/http") != -1) {
		if(raw.indexOf(".cf.") != -1) raw = raw.slice(raw.indexOf("/http") + 1, raw.indexOf(".cf."));
		else raw = raw.slice(raw.indexOf("/http") + 1, raw.length);
		raw = urldecode(raw);
		return raw;
	}
	//ETtoday.net
	if(raw.indexOf("static.ettoday.net/images") != -1) {
		raw = raw.replace("/b", "/d");
		return raw;
	}
	//Twitpic
	if(raw.indexOf("twitpicproxy.com/photos") != -1) {
		raw = raw.replace("thumb", "full");
		raw = raw.replace("large", "full");
		return raw;
	}
	//壹電視NEXTTV
	if(raw.indexOf("s.nexttv.com.tw/upload") != -1) {
		raw = raw.replace(/-\d+x\d+\./, '.');
		return raw;
	}
	//遊戲基地
	if(raw.indexOf("i.gbc.tw") != -1) {
		raw = raw.replace("m.", ".");
		raw = raw.replace("s.", ".");
		return raw;
	}
	//Instagram
	if(raw.indexOf("instagram.com") != -1 || raw.indexOf("instagram.com") != -1) {
		return alt;
	}
	if(href.indexOf("images.plurk.com") != -1) {
		return getPlurkLargeImage(href);
	}
	if(isImage(alt)) return alt;
	if(isImage(href)) return href;
	if(raw.indexOf("images.plurk.com") != -1) {
		return getPlurkLargeImage(raw);
	}
	return raw;
}

function errorPhoto(posX, img) {
	var show = 0,
		photo = $("#hoverzoom-" + posX).data("hoverzoom-photo"),
		old = photo.img,
		raw = img.attr("src") + '';
	console.debug("error photo:", raw);
	if(old.data("hoverzoom-src") == "src") {
		hidePhoto();
		old.data("hoverzoom-src", "none");
		return;
	}
	//Plurk
	else if(raw.indexOf("images.plurk.com") != -1 && raw.indexOf(".jpg") != -1) {
		raw = raw.replace("tn_", "");
		raw = raw.replace(".jpg", ".gif");
		show = 1;
	}
	//PIXNET痞客邦
	else if(raw.indexOf("pic.pimg.tw") != -1 && (raw.indexOf(".jpg") != -1 || raw.indexOf(".png") != -1)) {
		raw = raw.replace(".png", ".gif");
		raw = raw.replace(".jpg", ".png");
		show = 1;
	}
	if(show) {
		_showPhoto(posX, raw);
		old.data("hoverzoom-src", raw);
	} else {
		var src = photo.src,
			href = photo.href,
			alt = photo.alt;
		if(isImage(alt)) raw = alt;
		else if(isImage(href)) raw = href;
		else raw = src;
		_showPhoto(posX, raw);
		old.data("hoverzoom-src", "src");
	}
}

function showPhoto() {
	hidePhoto();
	var img = $(this);
	if(img.parents(".GB_Window").length > 0) return true;
	if(img.attr("id") == "cbox_img") return true;
	if(img.hasClass('cbox_img')) return true;

	var imgurl = img.data("hoverzoom-src"),
		src = img.attr("src") + '',
		href = img.parent("a").attr("href") + '',
		alt = img.attr("alt") + '';
	if(src.indexOf(pictureservices_img) != -1) src = href;
	if(!imgurl || imgurl == undefined) {
		imgurl = getLargeImage(src, href, alt);
		if(imgurl == "" || imgurl == undefined) return true;
		img.data("hoverzoom-src", imgurl);
	} else if(imgurl == "src") {
		if(isImage(alt)) imgurl = alt;
		else if(isImage(href)) imgurl = href;
		else imgurl = src;
	} else if(imgurl == "none") return true;
	var posX = "right";
	if(event.pageX > ($(window).width() / 2)) posX = "left";
	$("#hoverzoom-" + posX).data("hoverzoom-photo", {
		img: img,
		src: src,
		href: href,
		alt: alt
	});
	_showPhoto(posX, imgurl);
	return false;
}

function _showPhoto(posX, imgurl) {
	var win = $(window);
	$("#hoverzoom-" + posX).html($("<img/>").attr({
		id: "hoverzoom-" + posX + "-img",
		src: imgurl
	}).css({
		"max-height": (win.height() - 60) + "px",
		"max-width": (Math.round(win.width() / 2) - 20) + "px",
		"margin-bottom": "-4px"
	}).bind("error", function() {
		errorPhoto(posX, $(this));
	})).show();
}

function hidePhoto() {
	$("#hoverzoom-left, #hoverzoom-right").hide().html("").data("hoverzoom-photo", {});
	return true;
}

var hoverzoom_div = $("<div/>").attr("id", "hoverzoom-left").css({
	'position': "fixed",
	'top': "30px",
	'left': "10px",
	'z-index': 99999,
	'border': "solid 2px #000000",
	'background': "white",
}).hide().bind("mouseover", hidePhoto);
$('body').append(hoverzoom_div, hoverzoom_div.clone(true).attr("id", "hoverzoom-right").css({
	'right': "10px",
	'left': ""
}));

$(document).add("#timeline_holder").add("#form_holder").on("mouseover", "img", showPhoto).on("click mouseout", "img", hidePhoto);

if(location.href.match(/http:\/\/www.plurk.com\/(\w+)/)[1] == "m") {
	$(document).on("mouseover", "a.pictureservices", function(e){
		return showPhoto.call($(this).find("img").get(0), e);
	}).on("click mouseout", "a.pictureservices", hidePhoto);
}

