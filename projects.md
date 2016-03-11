---
layout: page
title: Projects
permalink: /projects/
---
<div class="flex-boxes">
  {% for project in site.projects %}
    {% if project.image %}
      <a href="{{ project.url | prepend: site.baseurl }}" class="flex-box flex-box-big grid-item-image">
      <img src="{{ project.image }}" alt="">
    {% else %}
      <a href="{{ project.url | prepend: site.baseurl }}" class="grid-item">
      <img src="https://raw.githubusercontent.com/thoughtbot/refills/master/source/images/placeholder_logo_1_dark.png" alt="">
    {% endif %}
    <h1 class="flex-title">{{ project.title }}</h1>
    <!-- <p>{{ post.date | date: "%b %-d, %Y" }}</p> -->
    {{ project.excerpt }}
    </a>
  {% endfor %}
</div>
