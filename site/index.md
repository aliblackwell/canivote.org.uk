---
title: Can I Vote
subtitle: Can I?
layout: layouts/base.njk
---

# Can I Vote?

## It's not just British citizens who can vote in UK elections.

<form id="country-selector" method="get" action="/">
  <label>
    <h3>Choose your country</h3>
    <select name="country">

      {%- for country in countries -%}
      <option value="{{ country.name.common | slug }}">{{ country.name.common }}</option>
      {%- endfor -%}
    </select>
    <button>Can I Vote?</button>
  </label>
</form>
