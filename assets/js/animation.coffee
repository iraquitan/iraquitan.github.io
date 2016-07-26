---
# Coffescript files need frontmatter to work
---
$ ->
  # Add scrollspy to <body>
  $("body").scrollspy({target: ".navbar", offset: 50})
  # Add smooth scrolling to all links inside a navbar and to #brand-title and
  #brand-image
  $("#navbar-scrollspy a, #brand-title, #brand-image, #about-button").on 'click', (event) ->
    # Make sure this.hash has a value before overriding default behavior
    if $(this.hash).length  # Check if hash contains any element
      # Prevent default anchor click behavior
      event.preventDefault()
      # Store hash (#)
      hash = this.hash
      # Using jQuery's animate() method to add smooth page scroll
      # The optional number (800) specifies the number of milliseconds it takes
      # to scroll to the specified area (the speed of the animation)
      $('html, body').animate
        scrollTop: $(hash).offset().top
        800
        ->
          # Add hash (#) to URL when done scrolling (default click behavior)
          window.location.hash = hash
