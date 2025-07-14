---
layout: psychometric
title: "Psychometric Measures"
---

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

## Ecological Momentary Assessment (EMA) through LifeData {#EMA}
<div class="method-card">
<h3>📱 What is EMA?</h3>
<p>We used LifeData's Real Life Exp app to deliver surveys to participants throughout the day for the entire study. Participants would choose a start time that fit with their schedule and would receive four surveys a day. In order to continue to the intervention phase of the study, participants needed to respond to at least 75% of surveys during the baseline phase.</p>
</div>

<div class="image-set-container">
    <div class="image-set-caption">
        <strong>EMA Schedule:</strong> Participants receive surveys at two set times a day, and twice at any point during a survey window. For an 8am start time, these windows are between 8am and 12pm, and 2pm and 6pm, and the set times are at 1pm and 7pm.
    </div>
    <div class="image-pair-small">
        <div>
            <img src="{{ '/assets/images/measures/Capstone_EMA_8AM.jpg' | relative_url }}" alt="8am start time schedule">
            <div class="image-individual-caption">A) 8am start time</div>
        </div>
        <div>
            <img src="{{ '/assets/images/measures/Capstone_EMA_10AM.png' | relative_url }}" alt="10am start time schedule">
            <div class="image-individual-caption">B) 10am start time</div>
        </div>
    </div>
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
<a href="#psychometric-measures" class="btn btn-primary">
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

---

## Psychometric Measures - Interactive Codebook

<div class="highlight-box">
<p><strong>Select a measure below</strong> to view the complete variable list, questions, and response options used in the GeoSmoking Study. The table is limited to 5 rows at a time - scroll within the table to see more items.</p>
</div>

<div id="psychometric-measures"></div>

<script>
document.addEventListener('DOMContentLoaded', function() {
    console.log('=== Psychometric Table Debug ===');
    console.log('PsychometricTable available:', typeof PsychometricTable);
    console.log('Container exists:', !!document.getElementById('psychometric-measures'));
    console.log('CSV path:', '{{ "/assets/data/psychometric_data.csv" | relative_url }}');
    
    // Check if PsychometricTable class is available
    if (typeof PsychometricTable === 'undefined') {
        console.error('❌ PsychometricTable class not found! Check that PsychometricTable.js is loaded.');
        document.getElementById('psychometric-measures').innerHTML = `
            <div style="padding: 2rem; text-align: center; background: #f8d7da; border: 1px solid #f5c6cb; border-radius: 4px; color: #721c24;">
                <h4>⚠️ JavaScript Error</h4>
                <p>PsychometricTable.js file not loaded. Check:</p>
                <ul style="text-align: left; display: inline-block;">
                    <li>File exists at: <code>docs/assets/js/PsychometricTable.js</code></li>
                    <li>Layout includes the script tag</li>
                    <li>No JavaScript errors in console</li>
                </ul>
            </div>
        `;
        return;
    }
    
    // Initialize the psychometric table with the new reusable class
    try {
        const psychometricTable = new PsychometricTable({
            containerId: 'psychometric-measures',
            csvPath: '{{ "/assets/data/psychometric_data.csv" | relative_url }}',
            maxVisibleRows: 5,
            title: 'Interactive Codebook',
            showMeasureButtons: true,
            showMeasureInfo: true
        });
        
        console.log('✅ Psychometric table initialized successfully');
    } catch (error) {
        console.error('❌ Error initializing table:', error);
        document.getElementById('psychometric-measures').innerHTML = `
            <div style="padding: 2rem; text-align: center; background: #f8d7da; border: 1px solid #f5c6cb; border-radius: 4px; color: #721c24;">
                <h4>⚠️ Initialization Error</h4>
                <p>Error: ${error.message}</p>
            </div>
        `;
    }
});
</script>