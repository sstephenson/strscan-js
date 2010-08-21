(exports ? this).StringScanner = class StringScanner
  constructor: (source) ->
    @source = source.toString()
    @reset()

  set: (values) ->
    @head     = values.head ? @head
    @last     = values.last ? @last
    @captures = values.captures ? []
    @match    = values.match

  reset: ->
    @set head: 0, last: 0

  terminate: ->
    @set head: @source.length, last: @head, match: null

  hasTerminated: ->
    @head is @source.length

  concat: (string) ->
    @source += string

  getSource: ->
    @source

  getPosition: ->
    @head

  getRemainder: ->
    @source.slice @head

  getPreMatch: ->
    @source.slice 0, @head - 1 if @match

  getMatch: ->
    @match

  getPostMatch: ->
    @source.slice @head + @match.length - 1 if @match

  scanChar: ->
    @scan /./

  scan: (regexp) ->
    if (matches = regexp.exec @getRemainder()) and matches.index is 0
      @set head: @head + matches[0].length, last: @head, match: matches[0], captures: matches.slice 1
    else
      @set match: null

  scanUntil: (regexp) ->
    if matches = regexp.exec @getRemainder()
      @set head: @head + matches.index + matches[0].length, last: @head, match: matches[0], captures: matches.slice 1
      @getPreMatch() + @match
    else
      @set match: null

  skip: (regexp) ->
    @match.length if @scan regexp

  skipUntil: (regexp) ->
    @head - @last if @scanUntil regexp

  peek: (length) ->
    @source.substr @head, length ? 1

  unscan: ->
    if @match
      @set head: @last, last: 0
    else
      throw "nothing to unscan"
