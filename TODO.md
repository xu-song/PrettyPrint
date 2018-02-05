
keyword: background script, programmatic injection, silent print


## TODO

- silent print without dialog


- pretty more host
- recover page after print? no need, stay on the simplified page may be more helpful.
- print multi page at one click? how to save by default? go to next page? a button for multipage or not.
- jspdf lib?
- add a pop-up page, with download-all button.
- add to blog & disqus
- add about & feedback link



### Using Chrome's Element Inspector in Print Preview Mode?
- https://stackoverflow.com/questions/9540990/using-chromes-element-inspector-in-print-preview-mode/
- 右键-inspect 即可


## 怎样利用js点击print页面的print按钮？
- 因为print页面是一个独立与tab的页面，独立的进程
You can not access Chrome's internal windows (printing dialog in this case) directtly from a regular web page.

### stackoverflow

* problem: the code blocks of stackoverflow will pre-wrap, even when the code didn't reach the end of the line.

* 代码段有个.prettyprint样式，是干嘛的？
* 本身就有print style，只需要更改一下main的位置就行

* keyword： @media print   white-space: pre-wrap;
* reference: https://stackoverflow.com/questions/21535233/injecting-multiple-scripts-through-executescript-in-google-chrome





## reference

- http://cdc.tencent.com/2014/08/19/print-%E8%A2%AB%E5%9F%8B%E6%B2%A1%E7%9A%84media-type/