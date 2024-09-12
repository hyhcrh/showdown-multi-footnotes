# Showdown-multi-notes

Fork of [showdown-footnotes](https://github.com/halbgut/showdown-footnotes). Supports multiple footnote citations.

## Usage
### NPM Package is NOT available. Please import `showdown-multi-notes.js` instead.

```html
<script src="js/showdown-multi-notes.js"></script>
```

```js
let converter = new showdown.Converter({ extensions: ['multi-footnotes'] });
```

---

The original project only supports for 1 citation per footnote, and you will not be able to go back to the origianl position in the website easily, for example:

```markdown
Some word or something that needs explaining[^1].
Some other thing that needs explaining[^1].
[^1]: The explanation.
```

That would look compile to this in [showdown-footnotes](https://github.com/halbgut/showdown-footnotes):

```html
<p>Some word or something that needs explaining<a href="#footnote-1"><sup>[1]</sup></a>.</p>
<p>Some other thing that needs explaining[^1].</p>
<p><small class="footnote" id="footnote-1"><a href="#footnote-1"><sup>[1]</sup></a>: The explanation.</small></p>
```

This project can compile all citations, instead of only the first one.

Also, it adds `↵` for each citations at the end of each footnotes, allowing you to go back by clicking it/them.

In this case, it looks like this:

```html
<p>Some word or something that needs explaining<a id="ref-1-1" href="#footnote-1"><sup>[1]</sup></a>.</p>
<p>Some other thing that needs explaining<a id="ref-1-2" href="#footnote-1"><sup>[1]</sup></a>.</p>
<p><small class="footnote" id="footnote-1"><a href="#footnote-1"><sup>[1]</sup></a>: The explanation. <a href="#ref-1-1">↵1</a> <a href="#ref-1-2">↵2</a></small></p></div>
```

<p>Some word or something that needs explaining<a id="ref-1-1" href="#footnote-1"><sup>[1]</sup></a>.</p>
<p>Some other thing that needs explaining<a id="ref-1-2" href="#footnote-1"><sup>[1]</sup></a>.</p>
<p><small class="footnote" id="footnote-1"><a href="#footnote-1"><sup>[1]</sup></a>: The explanation. <a href="#ref-1-1">↵1</a> <a href="#ref-1-2">↵2</a></small></p></div>

- [ ] Modify the original NPM package

# Credits

[showdown-footnotes](https://github.com/halbgut/showdown-footnotes)

[twitter-extension](https://github.com/showdownjs/twitter-extension) This project provides a way to import the extension js directly.

---

# Showdown Footnotes – 2.1.1

![CI build status](https://travis-ci.org/Kriegslustig/showdown-footnotes.svg?branch=master)

Simply footnotes for [Showdown](https://github.com/showdownjs/showdown).

## Install

I'd advice using this extension with something like [browserify](https://www.npmjs.com/package/browserify).

```bash
npm i --save showdown-footnotes
```

```js
const converter = new showdown.Converter({ extensions: [footnotes] });
```

## Usage

```md
Some word or something that needs explaining[^1].

[^1]: The explanation.
```

That would look compile to this.

```html
<p>Some word or something that needs explaining<a href="#footnote-1"><sup>[1]</sup></a>.</p>

<p><small class="footnote" id="footnote-1"><a href="#footnote-1"><sup>[1]</sup></a>: The explanation.</small></p>
```

### Single Line Comments

Single line footnotes can be written over multiple lines like this:

```md
[^1]: A single line
footnote
```

### Multi Line Footnotes

Shownotes-footnotes also supports multiline footnotes. You'll just need to indent the lines following the superscript.

```md
[^5]:
  This is a paragraph.

  _That_ is another paragraph which is still within the same footnote.
```

Multiline footnotes are wrapped in a `<div>` instead of a `<small>`.

```html
<div class="footnote" id="footnote-5">
  <a href="#footnote-5"><sup>[5]</sup></a>:
  <p>This is a paragraph.</p>
  <p><em>That</em> is another paragraph which is still within the same footnote.</p>
</div>
```

