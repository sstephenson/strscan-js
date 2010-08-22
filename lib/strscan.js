(function() {
  var StringScanner;
  ((typeof exports !== "undefined" && exports !== null) ? exports : this).StringScanner = (function() {
    StringScanner = function(source) {
      this.source = source.toString();
      this.reset();
      return this;
    };
    StringScanner.prototype.set = function(values) {
      var _a, _b, _c;
      this.head = (typeof (_a = values.head) !== "undefined" && _a !== null) ? _a : this.head;
      this.last = (typeof (_b = values.last) !== "undefined" && _b !== null) ? _b : this.last;
      this.captures = (typeof (_c = values.captures) !== "undefined" && _c !== null) ? _c : [];
      return (this.match = values.match);
    };
    StringScanner.prototype.reset = function() {
      return this.set({
        head: 0,
        last: 0
      });
    };
    StringScanner.prototype.terminate = function() {
      return this.set({
        head: this.source.length,
        last: this.head,
        match: null
      });
    };
    StringScanner.prototype.hasTerminated = function() {
      return this.head === this.source.length;
    };
    StringScanner.prototype.concat = function(string) {
      return this.source += string;
    };
    StringScanner.prototype.getSource = function() {
      return this.source;
    };
    StringScanner.prototype.getPosition = function() {
      return this.head;
    };
    StringScanner.prototype.getRemainder = function() {
      return this.source.slice(this.head);
    };
    StringScanner.prototype.getPreMatch = function() {
      if (this.match) {
        return this.source.slice(0, this.head - this.match.length);
      }
    };
    StringScanner.prototype.getMatch = function() {
      return this.match;
    };
    StringScanner.prototype.getPostMatch = function() {
      if (this.match) {
        return this.source.slice(this.head);
      }
    };
    StringScanner.prototype.getCapture = function(index) {
      return this.captures[index];
    };
    StringScanner.prototype.scanChar = function() {
      return this.scan(/./);
    };
    StringScanner.prototype.scan = function(regexp) {
      var matches;
      return (matches = regexp.exec(this.getRemainder())) && matches.index === 0 ? this.set({
        head: this.head + matches[0].length,
        last: this.head,
        match: matches[0],
        captures: matches.slice(1)
      }) : this.set({
        match: null
      });
    };
    StringScanner.prototype.scanUntil = function(regexp) {
      var matches;
      if (matches = regexp.exec(this.getRemainder())) {
        this.set({
          head: this.head + matches.index + matches[0].length,
          last: this.head,
          match: matches[0],
          captures: matches.slice(1)
        });
        return this.getPreMatch() + this.match;
      } else {
        return this.set({
          match: null
        });
      }
    };
    StringScanner.prototype.skip = function(regexp) {
      if (this.scan(regexp)) {
        return this.match.length;
      }
    };
    StringScanner.prototype.skipUntil = function(regexp) {
      if (this.scanUntil(regexp)) {
        return this.head - this.last;
      }
    };
    StringScanner.prototype.peek = function(length) {
      return this.source.substr(this.head, (typeof length !== "undefined" && length !== null) ? length : 1);
    };
    StringScanner.prototype.unscan = function() {
      if (this.match) {
        return this.set({
          head: this.last,
          last: 0
        });
      } else {
        throw "nothing to unscan";
      }
    };
    return StringScanner;
  })();
})();
