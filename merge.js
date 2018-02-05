

// 获取URL列表
UrlSelector = {
	"help.github.com":".km-article-link", // $(".km-article-link")[0].href
	"pytorch.org":[".wy-menu a.reference"],
	"www.tensorflow.org":".devsite-section-nav .devsite-nav-list .devsite-nav-item .devsite-nav-title:not(.devsite-nav-title-no-path)"
}

// 需要合并的header元素，比如css js
MergeHeader = {

}

// 需要合并的内容元素
MergeElement = {
	"help.github.com":[".breadcrumbs",".article"],
	"pytorch.org":[".rst-content"],
	"www.tensorflow.org":[".devsite-article-inner"]
}

// add the MergeElement to ToElement
ToElement = {
	"help.github.com":[".chevron"],
	"pytorch.org":[".wy-nav-content"],
	"www.tensorflow.org":[".devsite-article"]
}



MergeRemover = {
	"help.github.com":[".article"],
  "pytorch.org":[".rst-content"]
}



function getUrlList() {
	var urlList = [];
	var urlSelector = UrlSelector[window.location.host];
	if(urlSelector!=undefined) {
		urlSelector = String(urlSelector);
		for(var i=0; i<$(urlSelector).length; i++) {
			if(!$(urlSelector)[i].href.includes("#"))
				urlList.push($(urlSelector)[i].href);
		}
	}
	return urlList;
}


// 异步调用，
function httpRequest(callback) {

	var stocks = localStorage.stocks || 'sh000001';
	var url = 'http://hq.sinajs.cn/list=' + stocks;

    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, false);
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            callback(xhr.responseText);
        }
    }
    xhr.send();
}

// 同步调用，XMLHttpRequest
function XHRRequest() {
	// request page
	var xhr = new XMLHttpRequest();
	//xhr.open("get", "example.txt", false);

	// get element
}

// 同步调用，jquery

// 页面中可能会存在image、js、css的相对路径，可能出现merge后路径找不到的问题。
// 因此需要把相对路径转化为绝对路径。
function absolute(base, relative) {
    var stack = base.split("/"),
        parts = relative.split("/");
    stack.pop(); // remove current file name (or empty string)
                 // (omit if "base" is the current folder without trailing slash)
    for (var i=0; i<parts.length; i++) {
        if (parts[i] == ".")
            continue;
        if (parts[i] == "..")
            stack.pop();
        else
            stack.push(parts[i]);
    }
    return stack.join("/");
}

// 草，这个函数是干嘛的来着
function relativeToAbsolute(host, element){
        $('a',element).not('[href^="http"],[href^="https"],[href^="mailto:"],[href^="#"]').each(function() {
            $(this).attr('href', function(index, value) {
                if (value!=undefined && value.substr(0,1) !== "/") {
                    value = absolute(host,value);
                }
                return value;
            });
        });

				$('link',element).not('[href^="http"],[href^="https"],[href^="mailto:"],[href^="#"]').each(function() {
						$(this).attr('href', function(index, value) {
								if (value.substr(0,1) !== "/") {
										value = absolute(host,value);
								}
								return value;
						});
				});

				$('img',element).not('[src^="http"],[src^="https"],[src^="mailto:"],[src^="#"]').each(function() {
						$(this).attr('src', function(index, value) {
								if (value.substr(0,1) !== "/") {
										value = absolute(host,value);
								}
								return value;
						});
				});

				$('script',element).not('[src^="http"],[src^="https"],[src^="mailto:"],[src^="#"]').each(function() {$(this)
					if($(this)[0].hasAttribute("src")) {
						$(this).attr('src', function(index, value) {
								if (value.substr(0,1) !== "/") {
										value = absolute(host,value);
								}
								return value;
						});
					}
				});


				return element;
    }



//
function merge() {
	debugger;
	// 1. get url list
	var urlList = getUrlList();

	// 2. http request
	var headerList = new Set();
	var elementlList = [];
	for(var i=0; i<urlList.length; i++) {
		var html = $.ajax({
		  url: urlList[i],
		  async: false
		}).responseText;

		var doc = document.createElement('html');
		doc.innerHTML = html;
		doc = relativeToAbsolute(urlList[i], doc);

		// 获取 head (css js)
		var cssList = $("[type='text/css']",doc);
		for(var j=0; j<cssList.length; j++)
			headerList.add(cssList[j].outerHTML)
		var jsList = $("script",doc);
		for(var j=0; j<jsList.length; j++)
			headerList.add(jsList[j].outerHTML)

		// 获取内容
		var mergeElement = MergeElement[window.location.host];
		var currentElement = "";
		for(var j=0; j<mergeElement.length; j++) {
			currentElement = currentElement + $(mergeElement[j],doc)[0].outerHTML;
		}
		elementlList.push(currentElement);
	}

	// 3. merge all elements & add into one page
	var elements = MergeRemover[window.location.host];
	if(elements!=undefined) {
		elements.forEach(function(selector){
			$(selector).remove();  // remove or hide
		})
	}

	// 插入head
	var allCss = Array.from(headerList).join("");
	$("head").append(allCss);

	// 插入内容
	var allPage = elementlList.join("<br><hr size=\"30\" noshade><br>");
	$(ToElement[window.location.host][0])[0].innerHTML = allPage;

}
