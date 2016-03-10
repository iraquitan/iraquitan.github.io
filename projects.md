---
layout: page
title: Projects
permalink: /projects/
---
Here I will display my projects:

{% for project in site.projects %}
  [{{ project.title }}]({{ project.url | prepend: site.baseurl }}){:target="_blank"}
{% endfor %}
