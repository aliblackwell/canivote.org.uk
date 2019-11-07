---
title: Can I Vote
subtitle: Can I?
layout: layouts/base.njk
---

<h1 class="ws-bold"><img src="/img/can-i-vote-tick.svg" alt="Can I vote?" /></h1>

<h2 class="ws-semibold">It's not just British citizens who can vote in UK elections.</h2>

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
