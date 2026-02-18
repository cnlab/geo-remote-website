---
layout: resources-subpage
title: "Lifedata Platform"
nav_title: "📱 LifeData Platform"
parent_page: "/resources"
parent_name: "Resources"
show_breadcrumb: true
description: Learn more about how our study team used Lifedata to collect EMA data.
---

# Lifedata for EMA: Real-Time Data Collection

<div class="highlight-box">
<p><strong>Ecological Momentary Assessment Platform:</strong> We leveraged Lifedata's Real Life Exp app to collect real-time participant data through randomized surveys, receipt photo uploads, and comprehensive compliance monitoring throughout our longitudinal study.</p>
</div>

## 🔬 Why EMA? Scientific Foundation

<div class="resource-card">
<h3>📚 Research-Based Approach</h3>
<p>Our implementation of Ecological Momentary Assessment was grounded in established scientific methodology designed to capture real-world behavior patterns.</p>

<div class="highlight-box">
<p>"Assessment in clinical psychology typically relies on global retrospective self-reports collected at research or clinic visits, which are limited by recall bias and are not well suited to address how behavior changes over time and across contexts...EMA aims to minimize recall bias, maximize ecological validity, and allow study of microprocesses that influence behavior in real-world contexts."</p>
<p><em>Shiffman S, Stone AA, Hufford MR. Ecological momentary assessment. Annu Rev Clin Psychol. 2008;4:1-32. doi: 10.1146/annurev.clinpsy.3.022806.091415. PMID: 18509902.</em></p>
</div>

<h4>Application in Our Study</h4>
<p>EMA methodology enabled participants to regularly record their mood and daily events that could influence their tobacco cravings or cigarette habits. This real-time data collection approach provided several critical advantages:</p>

<div class="resource-grid">
    <div class="resource-item">
        <h4>🕒 Real-Time Mood Tracking</h4>
        <p>Capture participants' emotional states and experiences as they occurred, eliminating recall bias from retrospective reporting.</p>
    </div>
    <div class="resource-item">
        <h4>🏪 Environmental Context</h4>
        <p>Our study let us pair participant EMA responses to their real-time exposure to tobacco marketing</p>
    </div>  
    <div class="resource-item">
        <h4>📍 Ecological Validity</h4>
        <p>Ensure data collection occurred in participants' natural environments rather than artificial laboratory settings.</p>
    </div>
</div>

</div>


## Platform Overview

**Lifedata** provides a comprehensive mobile-based platform for ecological momentary assessment (EMA) through their Real Life Exp app. This established and professional application enabled our participants to easily engage with our study protocols while providing researchers with powerful tools for data collection and monitoring.

While Lifedata has its limitations, it provided significant freedom in survey development and rollout, while maintaining an intuitive user experience that made it easy for participants to get set up and consistently engage with our study requirements.

---

## 📊 Platform Capabilities & Assessment

<div class="side-by-side">
    <div>
        <h4>✅ Strengths & Advantages</h4>
        <ul>
            <li><strong>Professional app platform</strong> that participants could easily download and configure on their phones</li>
            <li><strong>Advanced survey randomization</strong> with ability to send surveys randomly within time windows and at predetermined times</li>
            <li><strong>Photo upload functionality</strong> allowing participants to submit receipt photos from store visits</li>
            <li><strong>Comprehensive dashboards</strong> for real-time monitoring of participant compliance, survey completion rates, and receipt uploads</li>
            <li><strong>Data management tools</strong> with ability to download individual datasets and request bulk data exports</li>
        </ul>
    </div>
    
    <div>
        <h4>⚠️ Limitations & Challenges</h4>
        <ul>
            <li><strong>No API access</strong> requiring manual widget creation and regular manual data entry, creating our primary automation bottleneck</li>
            <li><strong>Manual lifepack management</strong> necessitating creation of new lifepacks for every survey timeframe, update, and study phase (baseline vs. intervention)</li>
            <li><strong>Limited integration capabilities</strong> with other research platforms and data management systems</li>
            <li><strong>Time-intensive setup</strong> for complex longitudinal studies with multiple survey variations</li>
        </ul>
    </div>
</div>

---

## 📱 Participant Onboarding with Real Life Exp

<div class="resource-card">
<h3>🚀 Comprehensive Setup Process</h3>
<p>Our study team developed detailed instructions for both iPhone and Android users to ensure seamless app setup and lifepack configuration. After starting the Qualtrics survey to setup their Lifepak, participants selected the response windows they would be available to answer surveys during. Then they selected their phone type and were given instructions to download the Real Life Exp app and a QR code to download their time-specific lifepack.</p>

<p>Our instructions were very specific and contained step by step instructions and images to walk participants through every step of their setup, followed by a directed practice session given at the start of every study period. Only a few participants needed help from a research assistant, who could easily walk them through downloading their lifepack over the phone.</p>

<h4>Flexible Scheduling Options</h4>
<p>Participants could customize their study experience by choosing from multiple start times to accommodate their personal schedules:</p>

<div class="resource-grid">
    <div class="resource-item">
        <h4>Standard Response Windows</h4>
        <p><strong>Available options:</strong><br>
        • 6:00 AM - 5:00 PM<br>
        • 8:00 AM - 7:00 PM<br>
        • 10:00 AM - 9:00 PM<br>
        • 12:00 PM - 11:00 PM</p>
    </div>
    <div class="resource-item">
        <h4>Custom Scheduling</h4>
        <p><strong>Personalized timing:</strong><br>
        Custom start times were available for participants with non-standard schedules or specific timing needs</p>
    </div>
</div>

</div>

<div class="scheduling-grid">
    <div class="scheduling-grid-item">
        <img src="{{ '/assets/images/resources/lifedata/Capstone_EMA_6AM.png' | relative_url }}" alt="6am Start Time Option">
        <div class="scheduling-grid-caption">
            <h5>6:00 AM Start</h5>
        </div>
    </div>   
    <div class="scheduling-grid-item">
        <img src="{{ '/assets/images/resources/lifedata/Capstone_EMA_8AM.jpg' | relative_url }}" alt="8am Start Time Option">
        <div class="scheduling-grid-caption">
            <h5>8:00 AM Start</h5>
        </div>
    </div>    
    <div class="scheduling-grid-item">
        <img src="{{ '/assets/images/resources/lifedata/Capstone_EMA_10AM.png' | relative_url }}" alt="10am Start Time Option">
        <div class="scheduling-grid-caption">
            <h5>10:00 AM Start</h5>
        </div>
    </div>
    <div class="scheduling-grid-item">
        <img src="{{ '/assets/images/resources/lifedata/Capstone_EMA_12PM.png' | relative_url }}" alt="12pm Start Time Option">
        <div class="scheduling-grid-caption">
            <h5>12:00 PM Start</h5>
        </div>
    </div>
</div>

### Push Notifications Sent Throughout The Day

<div class="resource-card">
<h4>Collecting Real-Time Behavioral Data</h4>
<p>Lifedata allowed us to send surveys both at set times and randomly during time-windows. Participants were able to respond to surveys until the time that the next survey was sent. Over the 6-week study period, this let us collect behavioral data at a variety of timepoints throughout the participant's day, giving us insight into their day-to-day behavior</p>
</div>

<div class="image-feature">
    <img src="{{ '/assets/images/resources/lifedata/survey_setup.png' | relative_url }}" alt="Lifedata survey setup" class="img-responsive center-block">
    <div class="image-caption">A portion of the survey setup for the first check-in session, sent randomly between 10am and 2pm, for the 10am start time lifepack</div>
</div>

### Behavioral Data Collected

<div class="resource-card">

<strong>Smoking Habits, Stress, and Mood:</strong>
<ul>
<li><strong>Check-ins:</strong> Sent 4 times a day, participants were asked about their mood and cigarette cravings and consumption</li>
<li><strong>Summary 1:</strong> Sent once in the afternoon, participants were asked when they woke up and how many cigarettes they have smoked since then</li>
<li><strong>Summary 2:</strong> Participants were asked many questions about their cigarette smoking, the conversations they've had, and sources of stress they may have experienced</li>
</ul>
<p>View the specific questions we asked over ema throughout the study</p>
<a href="{{ '/measures#interactive_ema_codebook' | relative_url }}" class="btn btn-primary">
📊 View EMA Codebook
</a>
</div>

<div class="image-set-container">
    <div class="image-set-caption">
        <strong>Stress question:</strong> Asked once a day during Summary 2, participants were shown a sliding scale that ranged from 0-100 where they could select the amount of stress they felt that day by dragging their finger along the scale.
    </div>
    <div class="image-pair-small">
        <div>
            <img src="{{ '/assets/images/resources/lifedata/stress_setup.png' | relative_url }}" alt="stress setup">
            <div class="image-individual-caption">Setting up the stress question</div>
        </div>
        <div>
            <img src="{{ '/assets/images/resources/lifedata/stress_question.png' | relative_url }}" alt="stress preview">
            <div class="image-individual-caption">Preview of the stress question</div>
        </div>
    </div>
</div>

### 📈 Real-Time Monitoring & Support

<div class="resource-card">
<h4>Proactive Participant Support</h4>
<p>Lifedata's dashboard capabilities enabled our research team to provide immediate support and intervention when needed.</p>

<strong>Participant Monitoring:</strong>
<ul>
<li><strong>Real-time response tracking:</strong> Live updates on survey completion rates</li>
<li><strong>Compliance monitoring:</strong> Immediate alerts for missed surveys or technical issues</li>
<li><strong>Flexible setup:</strong> Participants who paused their participation were able to easily resume by downloading a new lifepack</li>
<li><strong>Ongoing assistance:</strong> Monitoring of the online dashboard let researchers quickly reach out to participants having trouble answering surveys</li>
</ul>
</div>

<div class="image-feature">
    <img src="{{ '/assets/images/resources/lifedata/lifedata_ema_compliance.png' | relative_url }}" alt="Lifedata compliance dashboard" class="img-responsive center-block">
    <div class="image-caption">Lifedata dashboard showing real-time participant compliance and response rates</div>
</div>

---

## Key Outcomes & Benefits

<div class="research-grid">
    <div class="research-item">
        <h4>📱 User Experience</h4>
        <p>Intuitive app interface resulted in high participant satisfaction and consistent engagement</p>
    </div>
    <div class="research-item">
        <h4>🔄 Flexible Data Collection</h4>
        <p>Randomized surveys and customizable scheduling accommodated diverse participant needs</p>
    </div>
    <div class="research-item">
        <h4>📈 Real-Time Insights</h4>
        <p>Immediate compliance monitoring enabled proactive participant support and high compliance rates</p>
    </div>
</div>

---
