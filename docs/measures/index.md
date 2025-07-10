---
layout: default
title: "Psychometric Measures"
---

<link rel="stylesheet" href="{{ '/assets/css/psychometric.css' | relative_url }}">
# Data

<div class="highlight-box">
<p><strong>The GeoSmoking Study</strong> collected comprehensive data across multiple domains to understand the relationship between tobacco retail environments and smoking behavior.</p>
</div>

## Data Overview

<div class="research-grid">
<div class="research-item">
<h4>📍 Geospatial Data</h4>
<p>GPS coordinates, retail environment mapping, and tobacco outlet exposure measures collected continuously throughout the study.</p>
<div class="key-statistic">
<span class="statistic-number">2.1M+</span>
<span class="statistic-description">GPS coordinates collected</span>
</div>
</div>
<div class="research-item">
<h4>📱 EMA Data</h4>
<p>Real-time ecological momentary assessments of craving, mood, and smoking behavior via smartphone app.</p>
<div class="key-statistic">
<span class="statistic-number">15,000+</span>
<span class="statistic-description">EMA responses collected</span>
</div>
</div>
<div class="research-item">
<h4>📊 Survey Data</h4>
<p>Validated psychometric instruments and custom measures collected at multiple timepoints.</p>
<div class="key-statistic">
<span class="statistic-number">25+</span>
<span class="statistic-description">survey instruments administered</span>
</div>
</div>
</div>

## Data Collection Timeline

<div class="research-timeline">
<div class="timeline-item">
<span class="timeline-marker">Baseline</span>
<h4>Initial Assessment</h4>
<p>Demographics, smoking history, psychometric measures, location tracking setup</p>
</div>
<div class="timeline-item">
<span class="timeline-marker">Continuous</span>
<h4>Real-Time Data</h4>
<p>EMA surveys, GPS tracking, image rating tasks throughout study period</p>
</div>
<div class="timeline-item">
<span class="timeline-marker">Follow-up</span>
<h4>Post-Intervention</h4>
<p>Repeated measures, fMRI data, study completion assessments</p>
</div>
</div>

## Data Categories

<div class="method-card">
<h3>📋 Demographics & Screening</h3>
<p>Participant characteristics, eligibility criteria, and baseline smoking behavior collected during initial screening and enrollment.</p>
</div>

**Key Variables:**
- Age, gender, race/ethnicity, education, income
- Smoking history and current patterns
- Geographic location and mobility
- COVID-19 vaccination status

<div class="method-card">
<h3>📱 Ecological Momentary Assessment (EMA)</h3>
<p>Real-time data collected via smartphone app throughout the study period to capture moment-to-moment experiences and behaviors.</p>
</div>

**Assessment Domains:**
- Cigarette craving intensity and triggers
- Current mood and stress levels
- Recent smoking behavior
- Location and social context
- Environmental cues and exposures

<div class="method-card">
<h3>📍 Geospatial & Environmental Data</h3>
<p>GPS coordinates and environmental context data used to assess tobacco retail exposure and mobility patterns.</p>
</div>

**Spatial Measures:**
- Continuous GPS tracking data
- Tobacco retail outlet locations
- Proximity to tobacco retailers
- Exposure duration and frequency
- Mobility patterns and activity spaces

<div class="method-card">
<h3>🧠 Neuroimaging Data</h3>
<p>fMRI data collected during tobacco cue reactivity tasks to measure neural responses to smoking and retail environment cues.</p>
</div>

**Imaging Components:**
- Task-based fMRI during image rating
- T1-weighted structural scans
- T2-weighted structural scans
- Fieldmap scans for distortion correction

<div class="method-card">
<h3>📊 Psychometric Assessments</h3>
<p>Validated survey instruments administered at multiple timepoints to assess smoking-related behaviors, cognitions, and individual differences.</p>
</div>

**Instrument Categories:**
- Smoking dependence and motivation
- Stress and coping measures
- Personality and individual differences
- Social and environmental factors
- Cessation intentions and self-efficacy

## Interactive Data Codebook

<div class="cta-container">
<a href="#" class="btn btn-primary">
📊 Explore Variable Codebook
</a>
<a href="#" class="btn btn-outline">
📁 Download Data Dictionary
</a>
</div>

## Data Access & Documentation

<div class="side-by-side">
<div>
<h4>📄 Documentation</h4>
<ul>
<li>Complete variable codebook with descriptions</li>
<li>Data collection protocols and procedures</li>
<li>Quality control and validation methods</li>
<li>Missing data patterns and handling</li>
</ul>
</div>
<div>
<h4>🔒 Data Access</h4>
<ul>
<li>De-identified datasets available for research</li>
<li>Data use agreements required</li>
<li>Secure data sharing protocols</li>
<li>Collaborative analysis opportunities</li>
</ul>
</div>
</div>

<div class="psychometric-container">
    <h1>Psychometric Measures</h1>
    
    <div class="highlight-box">
        <p><strong>Interactive Codebook:</strong> Select a psychometric measure below to view the complete variable list, questions, and response options used in the GeoSmoking Study.</p>
    </div>

    <div class="measure-selector">
        <h3>Select a Measure:</h3>
        <div style="margin-bottom: 15px;">
            <button onclick="loadTestData()" class="test-data-btn">
                🧪 Load Test Data (if CSV not working)
            </button>
        </div>
        <div class="measure-buttons" id="measure-buttons">
            <!-- Buttons will be populated by JavaScript -->
        </div>
    </div>

    <div class="measure-info" id="measure-info" style="display: none;">
        <!-- Measure description and citation will appear here -->
    </div>

    <div class="table-container">
        <table class="measures-table">
            <thead>
                <tr>
                    <th class="variable-column">Variable</th>
                    <th class="question-column">Question/Item</th>
                    <th class="response-column">Response Options</th>
                </tr>
            </thead>
            <tbody id="measures-table-body">
                <tr>
                    <td colspan="3" class="loading">
                        Loading psychometric measures...
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</div>

<script>
    // Pass the correct CSV path to JavaScript (Jekyll processes this)
    window.CSV_PATH = '{{ "/assets/data/psychometric_data.csv" | relative_url }}';
</script>
<script src="{{ '/assets/js/psychometric.js' | relative_url }}"></script>