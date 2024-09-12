(function (extension) {
  'use strict';

  if (typeof showdown !== 'undefined') {
    // global (browser or nodejs global)
    extension(showdown);
  } else if (typeof define === 'function' && define.amd) {
    // AMD
    define(['showdown'], extension);
  } else if (typeof exports === 'object') {
    // Node, CommonJS-like
    module.exports = extension(require('showdown'));
  } else {
    // showdown was not found so we throw
    throw Error('Could not find showdown library');
  }

}(function (showdown) {
  'use strict';

  showdown.extension('footnotes', function () {
    var footnoteRefs = {};

    return [{
      type: 'lang',
      filter: function filter(text) {
        var refCounter = 1;

        return text.replace(/\[\^([\d\w]+)\](?!:)/mg, function (str, name) {
          var refId = name + '-' + refCounter;
          refCounter++;

          if (!footnoteRefs[name]) {
            footnoteRefs[name] = [];
          }
          footnoteRefs[name].push(refId);

          return '<a id="ref-' + refId + '" href="#footnote-' + name + '">'
                 + '<sup>[' + name + ']</sup></a>';
        });
      }
    }, {
      type: 'lang',
      filter: function filter(text) {
        return text.replace(/^\[\^([\d\w]+)\]:\s*((\n+(\s{2,4}|\t).+)+)$/mg, function (str, name, rawContent, _, padding) {
          var content = converter.makeHtml(rawContent.replace(new RegExp('^' + padding, 'gm'), ''));
          var backLinks = '';

          if (footnoteRefs[name]) {
            footnoteRefs[name].forEach(function(refId, index) {
              backLinks += ' <a href="#ref-' + refId + '">↵' + (index + 1) + '</a>';
            });
          }

          return '<div class="footnote" id="footnote-' + name + '">'
                 + '<a href="#footnote-' + name + '"><sup>[' + name + ']</sup></a>: '
                 + content
                 + backLinks
                 + '</div>';
        });
      }
    }, {
      type: 'lang',
      filter: function filter(text) {
        return text.replace(/^\[\^([\d\w]+)\]:( |\n)((.+\n)*.+)$/mg, function (str, name, _, content) {
          var backLinks = '';

          if (footnoteRefs[name]) {
            footnoteRefs[name].forEach(function(refId, index) {
              backLinks += ' <a href="#ref-' + refId + '">↵' + (index + 1) + '</a>';
            });
          }

          return '<small class="footnote" id="footnote-' + name + '">'
                 + '<a href="#footnote-' + name + '"><sup>[' + name + ']</sup></a>: '
                 + content
                 + backLinks
                 + '</small>';
        });
      }
    }];
  });
}));