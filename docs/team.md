---
layout: default
title: Research Team
---

# Study Team

{% include authors_grid.html %}

<div class="affil-key">
  <p><span class="cofirst-label">*</span> = Co-first authors</p>
</div>

## Full Affiliations Key
{% for item in site.data.affiliations %}
  <sup>{{ item[0] }}</sup> {{ item[1] }}  
{% endfor %}