/**
 * SyntaxHighlighter
 * http://alexgorbatchev.com/
 *
 * SyntaxHighlighter is donationware. If you are using it, please donate.
 * http://alexgorbatchev.com/wiki/SyntaxHighlighter:Donate
 *
 * @version
 * 2.0.296 (March 01 2009)
 * 
 * @copyright
 * Copyright (C) 2004-2009 Alex Gorbatchev.
 * Copyright (C) 2010 Hiroyuki Tanaka
 *
 * @license
 * This file is part of SyntaxHighlighter.
 * 
 * SyntaxHighlighter is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * 
 * SyntaxHighlighter is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public License
 * along with SyntaxHighlighter.  If not, see <http://www.gnu.org/licenses/>.
 * 
 * 
 * Very simple Latex brush
 * http://www.jorgemarsal.com/blog/
 */
;(function()
{
  // CommonJS
  typeof(require) != 'undefined' ? SyntaxHighlighter = require('shCore').SyntaxHighlighter : null;

  function Brush()
  {
    var keywords = 'address annote author booktitle chapter ' +
                   'crossref edition editor howpublished ' +
                   'institution journal key month note ' +
                   'number organization pages publisher ' +
                   'school series title type volume year ' + 
                   'abstract isbn issn keywords url';
    
    this.regexList = [
      { regex: /^\s*@\w+/gm, css: 'function bold' },
      { regex: /\{.*\}/gm, css: 'string' },
      { regex: /\".*\"/gm, css: 'string' },
      { regex: new RegExp(this.getKeywords(keywords), 'gm'), css: 'keyword' }
    ];
  }

  Brush.prototype  = new SyntaxHighlighter.Highlighter();
  Brush.aliases  = ['bibtex','bib'];

  SyntaxHighlighter.brushes.bibtex = Brush;

  // CommonJS
  typeof(exports) != 'undefined' ? exports.Brush = Brush : null;
})();

