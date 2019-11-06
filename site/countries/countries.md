---
pagination:
    data: countries
    size: 1
    alias: country
permalink: /{{ country.name.common | slug }}/
title: country.cca3


---

{{ country.name.common }} 

<img src="/flags/{{ country.cca3 }}.svg"  alt="{{ country.name.common }} Flag" />