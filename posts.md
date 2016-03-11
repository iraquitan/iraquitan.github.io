---
layout: page
title: Posts
permalink: /posts/
---
<div class="grid-items">
  {% for post in site.posts %}
    {% if post.image %}
      <a href="{{ post.url | prepend: site.baseurl }}" class="grid-item grid-item-big grid-item-image">
      <img src="{{ post.image }}" alt="">
    {% else %}
      <a href="{{ post.url | prepend: site.baseurl }}" class="grid-item">
      <img src="https://raw.githubusercontent.com/thoughtbot/refills/master/source/images/placeholder_logo_1.png" alt="">
    {% endif %}
    <h1>{{ post.title }}</h1>
    <p>{{ post.date | date: "%b %-d, %Y" }}</p>
    <!-- {{ post.excerpt }} -->
    </a>
  {% endfor %}
</div>