SyntaxHighlighter.brushes.Latex=function(){this.regexList=[{regex:new RegExp("%.*","gm"),css:"comments"},{regex:SyntaxHighlighter.regexLib.doubleQuotedString,css:"string"},{regex:new RegExp("\\\\\\w*","gm"),css:"keyword"},{regex:new RegExp(this.getKeywords("if fi then elif else for do done until while break continue case function return in eq ne gt lt ge le"),"gm"),css:"function"}]},SyntaxHighlighter.brushes.Latex.prototype=new SyntaxHighlighter.Highlighter,SyntaxHighlighter.brushes.Latex.aliases=["latex","tex"];