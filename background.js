// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.



// reference: https://stackoverflow.com/questions/21535233/injecting-multiple-scripts-through-executescript-in-google-chrome
function executeScripts(tabId, injectDetailsArray, callback)
{
    function createCallback(tabId, injectDetails, innerCallback) {
        return function () {
            chrome.tabs.executeScript(tabId, injectDetails, innerCallback);
        };
    }
    
    // need further reading
    for (var i = injectDetailsArray.length - 1; i >= 0; --i)
        callback = createCallback(tabId, injectDetailsArray[i], callback);

    if (callback !== null)
        callback();   // execute outermost function
}


// Called when the user clicks on the browser action.
chrome.browserAction.onClicked.addListener(function(tab) {

	// should be done by tab (webapp)
  	executeScripts(null,[
        { file: "lib/jquery.min.js" },  // inject while click, not static-inject (content-script)
        { file: "prettyPage.js" },
        { file: "merge.js" },
        { code: 'prettyPages()' },
        { code: 'merge()' },
        { code: 'window.print()'}  // 等同于在浏览器输入 chrome://print/
    ], function() {
    	// should be done by extAPP
    	//chrome.tabs.update({url: "javascript:window.print();"}); // 为什么要用update函数，executeScript不也一样吗？
    });
});

// inject js while update tab
// chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){
//     if(changeInfo && changeInfo.status == "complete"){
//   	executeScripts(null,[
//         { file: "lib/jquery.min.js" }, 
//         { file: "pretty.js" }
//     ]);
//     }
// });
