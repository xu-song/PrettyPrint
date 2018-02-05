
// will be injected to current chrome.tab from extApp
// the break point in this file will not work, as it not run in extApp


Title = {
	"tomcat.apache.org":"$(\"#content > h2\")[0].innerHTML",
	"gslab.qq.com":"$(\".article_tit\")[0].innerHTML"
}

// remove ads,
Remover = {
	// sup-post-2 display: inline-block ! important
	// #gd1  display: block !important;
	// I cannot hide these elements
	"www.ruanyifeng.com":["#sup-post-2","#gd1","#comments-open"]
}

Hider = {
	"jekyllcn.com":["header","footer",".unit.one-fifth.hide-on-mobiles",".unit.whole.center-on-mobiles"],
	"stackoverflow.com":[".everyonelovesstackoverflow",".s-hero"],
	"www.zhihu.com":["header",".Sticky--holder",".Question-sideColumn",".QuestionAnswers-answerAdd",".CornerButtons"],
	"tensorflow.com":[],
	"theano.com":[],
	"keras.com":[],
	"liaoxuefeng":[],
	"cdc.tencent.com":[".g-header",".g-footer",".sidebar"],
	"www.w3school.com.cn":["#header","#footer","#navfirst","#navsecond","#tpn","#sidebar","iframe"],
	"developers.google.com":["footer",".devsite-banner"],
	"crxdoc-zh.appspot.com":[".inline-toc"],
	"www.runoob.com":[".logo-search",".navigation",".left-column",".right-column","#footer",".fixed-btn",".feedback-btn",".article-heading-ad","#respond"], // no print style
	"www.ruanyifeng.com":["#header","#footer","#sup-post-2","#gd1","#comments-open"], // footer一定要删，否则会影响布局
	"coolshell.cn":["header",".wp_rp_wrap"],
	"www.quora.com":[".SiteHeader",".RequestAnswersDrawer",".layout_2col_side",".SimpleToggle "],
	"blog.csdn.net":["header","aside",".csdn-toolbar",".recommend_list",".recommend_tit",".more_comment",".returnTop"],
	"www.csdn.net":["header","aside",".csdn-toolbar",".recommend_list",".recommend_tit",".more_comment",".returnTop"],
	"www.infoq.com":["#topInfo","#header",".top-bar-promo",".article_page_right","#footer",".bottomContent",".help_links",".popupLoginComments",".news_container img",".popup-box"],
	"www.yiibai.com":[".header",".pageside","#SOHU_MAIN","iframe",".footer",".fixed-btn","#footer-copyright",".xshare",".SOHUCS",".adsbygoogle"],
	"scitech.people.com.cn":["header","nav",".rmwb_fixDiv",".rmwb_fixbtn",".rmwb_dragLayer",".right",".jingbian2012",".ad",".ipc_none",".message",".m10","embed","footer",".tools"],
	"tomcat.apache.org":["header",".noprint"],
	"gslab.qq.com":[".top_nav",".tech_nav","#pt","#ftt",".side_btn","#comment",".prev_next_article",".btn_share"],
	"help.github.com":[".sidebar"]
	// export python-doc by one-click
	// www.cnblogs.com的模板太差了，每个comment并列三个元素
}

// width:100%
Modifier = {
	"jekyllcn.com":[".unit.four-fifths"],
	"stackoverflow.com":["#mainbar", "#answers", "#answers-header", ".answer", ".comments ", ".post-text", ".answer.accepted-answer"],
	"www.zhihu.com":[".Question-mainColumn"],
	"tensorflow.com":[],
	"cdc.tencent.com":[".article-details", ".content-text"],
	"www.w3school.com.cn":["#maincontent", "div#maincontent	div"],
	"developers.google.com":[],
	"www.runoob.com":[".middle-column"],
	"www.quora.com":[".layout_2col_main"],
	"blog.csdn.net":["main"],
	"www.csdn.net":["main"],
	"www.infoq.com":[".article_page_left"],
	"www.yiibai.com":[".content",".container"],
	"gslab.qq.com":["body",".tech_con",".w1000",".main"],
	"help.github.com":["div.article"]
}

Displayer = {
	"www.ruanyifeng.com":["#comments",".overflowbugx"],
	"stackoverflow.com":["td.votecell","div.vote"],

	//"zh.wikipedia.org":[".navbox",".vertical-navbox","tr"] // not work, beacuse it has been set !important in wikipedia
	"www.voachinese.com":["#comments",".comments"]
}

// rename class, or remove class (not remove elements)
Renamer = {
	"zh.wikipedia.org":["navbox","vertical-navbox"],
	"en.wikipedia.org":["navbox","vertical-navbox"]
}

// show
Clicker = {
	"zh.wikipedia.org":["navbox"],
	"en.wikipedia.org":["navbox"]
}



// ask if need merge



// jquery is more easy to get element than document.getElementById and document.getElementByClassName
function prettyPages() {

	// 1. set title
	var title = Title[window.location.host];
	if(title!=undefined) {
		document.title = eval(title).toString();
	}

	// 2. remove elements
	var elements = Remover[window.location.host];
	if(elements!=undefined) {
		elements.forEach(function(selector){
			$(selector).remove();  // remove or hide
		})
	}

	// 3. rename class
	var elements = Renamer[window.location.host];
	if(elements!=undefined) {
		elements.forEach(function(selector){
			var dd = $("."+selector)
			for(var i=0; i<dd.length; i++) {
				dd[i].classList.add("new"+selector);
				dd[i].classList.remove(selector);
			}
		})
	}

	// 4. click

	// 5. add to style
	var elements = Hider[window.location.host];
	var mediaStyle = "";
	if(elements!=undefined) {
		mediaStyle = mediaStyle + elements.join(", ") + "{display:none !important;}";
	}

	var elements = Modifier[window.location.host];
	if(elements!=undefined) {
		mediaStyle = mediaStyle + elements.join(", ") + "{width:100% !important;min-width:0 !important;}";
	}

	var elements = Displayer[window.location.host];
	if(elements!=undefined) {
		mediaStyle = mediaStyle + elements.join(", ") + "{display:unset !important;}";
	}

	mediaStyle = "<style type='text/css'>@media print{" + mediaStyle + "}</style>";

	$("head").append(mediaStyle);

	// 6. others
	if(window.location.host=="zh.wikipedia.org") {
		for(var i=0; i<$(".overflowbugx").length; i++) {
			$(".overflowbugx")[i].style.overflow=""
		}
	}





	// "&lt;" and  "&gt;" also work in html
}

// *.google.com
function matchRule(str, wildcardString) {
	rule = wildcardString.split("\.").join("\\\.");

	// "."  => Find a single character, except newline or line terminator
	// ".*" => Matches any string that contains zero or more characters
	rule = rule.split("*").join(".*");

	var regex = new RegExp(rule);

	//Returns true if it finds a match, otherwise it returns false
	return regex.test(str);
}
