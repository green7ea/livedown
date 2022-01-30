/* global io, hljs, $ */

var socket = io.connect(window.location.origin)

hljs.configure({ languages: [] })

socket.on('content', function (data) {
  $('.markdown-body').html(data)
  $('code').each(function (_, block) {
    $(this).parent().addClass($(this).attr('class'))
  })
  $('pre').each(function (_, block) {
    hljs.highlightBlock(block)
  })

  $('code.language-mermaid').addClass('mermaid')

  mermaid.initialize({
    startOnLoad: true,
  })
  mermaid.init()
})

socket.on('title', function (data) {
  $('title').html(data)
})

socket.on('kill', function () {
  window.open('', '_self', '')
  window.close()
})
