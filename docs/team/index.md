---
layout: default
title: Research Team
---
<div class="team-hero">
  <div class="collaborate-section">
    <h2>Collaborate with Us</h2>
    <p>We would love to help make these data useful for purposes beyond our initial aims. If you'd like to collaborate with us, please <a href="https://tinyurl.com/geoscan-data-request" target="_blank" rel="noopener noreferrer">complete our data request form</a>.</p>
    <p>Final research data, with all identity-related information deleted and in consultation with the relevant IRBs, will be made available to the scientific community for collaborative research with members of the study team, upon request. The data will be shared in spreadsheet format for all non-imaging data and in NIFTI format for fMRI data.</p>
    <p>Data will be shared upon request in consultation with relevant IRBs for further analysis, once the study's primary results have been published. Qualified investigators who wish to access the study materials can complete a form on the <a href="https://github.com/cnlab/Geoscan-public" target="_blank" rel="noopener noreferrer">main project website on GitHub</a>, which describes the study and delineates the specifics of data use.</p>
    <p>The requests will be reviewed and approved by the investigators and by the relevant IRBs. To protect participant privacy, data that may be difficult to de-identify (including geolocation data) will be shared at an aggregate level, with restrictions as developed in consultation with the IRB at the University of Pennsylvania. The requested research data files will be accompanied by a description of variables and how they were collected. The study will also share protocols relevant to data collection procedures as needed, and in consultation with other interested researchers.</p>
  </div>
  
  <div class="contact-sidebar">
    <h3>Questions?</h3>
    <p>For any questions about our research, please reach out:</p>
    <a href="mailto:geoscan@falklab.org" class="contact-email" target="_blank" rel="noopener noreferrer">
      <span class="email-icon">✉</span>
      geoscan@falklab.org
    </a>
  </div>
</div>

---

## Principal Investigators

<div class="pi-grid">
  {% for author in site.data.authors %}
    {% if author.role == "pi" %}
      <div class="pi-card">
        <img src="{{ '/assets/images/team/' | relative_url }}{{ author.photo }}" alt="{{ author.name }}" class="pi-photo">
        <h3>{{ author.name }}</h3>
        <p class="pi-title">Principal Investigator</p>
        <p class="pi-bio">
          {% if author.name contains "Falk" %}
            Emily Falk is a professor of Communication, Psychology, Marketing, and OID at the University of Pennsylvania, where she is also the director of the Communication Neuroscience Lab, the vice dean of the Annenberg School for Communication, and the director of the Climate Communication Division of the Annenberg Public Policy Center. Falk is an expert in the science of attitude and behavior change. She is the author of "What We Value", a book on the neuroscience of choice and change.
          {% elsif author.name contains "Cooper" %}
            Nicole Cooper is the Managing Director of Research at the Communication Neuroscience Lab. She is interested in understanding the links between brain activity and health-related behaviors and outcomes. She received her B.S. from Brandeis University and her Ph.D. in Neuroscience from the University of Pennsylvania.
          {% endif %}
        </p>
      </div>
    {% endif %}
  {% endfor %}
</div>

---

## Graduate Students

{% include authors_grid.html role="graduate" %}

## Research Staff

{% include authors_grid.html role="staff" %}

## Collaborators

{% include authors_grid.html role="collaborator" %}

## Full Affiliations Key
{% for item in site.data.affiliations %}
  <sup>{{ item[0] }}</sup> {{ item[1] }}  
{% endfor %}