---
layout: default
title: "Measures"
---

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Psychometric Measures</title>
    <link rel="stylesheet" href="{{ '/assets/css/style.css' | relative_url }}">
    <style>
        .psychometric-container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 2rem;
        }

        .measure-selector {
            margin-bottom: 2rem;
        }

        .measure-buttons {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
            margin-bottom: 20px;
        }

        .measure-btn {
            padding: 10px 20px;
            border: 2px solid var(--primary);
            background: white;
            color: var(--primary);
            border-radius: 6px;
            cursor: pointer;
            transition: all 0.3s ease;
            font-size: 14px;
            font-weight: 500;
        }

        .measure-btn:hover {
            background: var(--primary);
            color: white;
        }

        .measure-btn.active {
            background: var(--primary);
            color: white;
            box-shadow: 0 4px 8px rgba(44, 108, 177, 0.3);
        }

        .measure-info {
            background: var(--light-bg);
            border-left: 4px solid var(--primary);
            padding: 1.5rem;
            margin-bottom: 2rem;
            border-radius: 0 8px 8px 0;
        }

        .measure-info h3 {
            margin-top: 0;
            color: var(--primary);
        }

        .citation {
            font-family: 'Georgia', serif;
            font-size: 14px;
            line-height: 1.6;
            color: #444;
            margin: 12px 0;
            padding: 15px 20px;
            background-color: #fafafa;
            border-left: 3px solid #e15759;
            border-radius: 4px;
        }

        .citation .author { font-weight: 600; color: #333; }
        .citation .year { color: #666; }
        .citation .title { font-style: italic; }
        .citation .journal { color: #555; }
        .citation .volume, .citation .pages { color: #666; }
        .citation .url { word-break: break-all; margin-top: 8px; }
        .citation .url a { color: #4e79a7; text-decoration: none; border-bottom: 1px dotted #4e79a7; }
        .citation .url a:hover { color: #e15759; border-bottom-style: solid; }

        .measures-table {
            width: 100%;
            border-collapse: collapse;
            background: white;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }

        .measures-table th {
            background: var(--primary);
            color: white;
            font-weight: 600;
            padding: 15px 12px;
            text-align: left;
            font-size: 14px;
        }

        .measures-table td {
            padding: 12px;
            border-bottom: 1px solid var(--border);
            vertical-align: top;
            font-size: 14px;
            line-height: 1.5;
        }

        .measures-table tr:nth-child(even) {
            background-color: #f8f9fa;
        }

        .measures-table tr:hover {
            background-color: rgba(44, 108, 177, 0.05);
        }

        .variable-column { 
            font-family: 'Courier New', monospace; 
            font-weight: 600;
            color: var(--primary);
            width: 15%;
        }

        .question-column { 
            width: 45%; 
            line-height: 1.4;
        }

        .response-column { 
            width: 40%; 
            font-size: 13px;
        }

        .response-options {
            margin: 0;
            padding: 0;
            list-style: none;
        }

        .response-options li {
            margin-bottom: 4px;
            padding: 2px 6px;
            background: #f1f3f4;
            border-radius: 3px;
            font-size: 12px;
        }

        .loading {
            text-align: center;
            padding: 2rem;
            color: var(--text-muted);
        }

        .no-data {
            text-align: center;
            padding: 2rem;
            color: var(--text-muted);
            font-style: italic;
        }

        .item-count {
            background: var(--secondary);
            color: white;
            padding: 4px 8px;
            border-radius: 12px;
            font-size: 12px;
            font-weight: 600;
            margin-left: 8px;
        }

        @media (max-width: 768px) {
            .psychometric-container {
                padding: 1rem;
            }
            
            .measure-buttons {
                flex-direction: column;
            }
            
            .measure-btn {
                width: 100%;
                text-align: center;
            }
            
            .measures-table {
                font-size: 12px;
            }
            
            .measures-table th,
            .measures-table td {
                padding: 8px;
            }
        }
    </style>
</head>

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

## Summary Statistics

<div class="research-grid">
<div class="research-item">
<h4>Participants</h4>
<div class="key-statistic">
<span class="statistic-number">N = XXX</span>
<span class="statistic-description">completed study protocol</span>
</div>
</div>
<div class="research-item">
<h4>Data Points</h4>
<div class="key-statistic">
<span class="statistic-number">XX,XXX</span>
<span class="statistic-description">total observations collected</span>
</div>
</div>
<div class="research-item">
<h4>Variables</h4>
<div class="key-statistic">
<span class="statistic-number">XXX+</span>
<span class="statistic-description">unique variables measured</span>
</div>
</div>


<div class="psychometric-container">
    <h1>Psychometric Measures</h1>
    
    <div class="highlight-box">
        <p><strong>Interactive Codebook:</strong> Select a psychometric measure below to view the complete variable list, questions, and response options used in the GeoSmoking Study.</p>
    </div>

    <div class="measure-selector">
        <h3>Select a Measure:</h3>
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
    // This will hold your CSV data
    let psychometricData = [];
    let currentMeasure = null;

    // Function to parse CSV data
    function parseCSV(csvText) {
        const lines = csvText.split('\n').filter(line => line.trim());
        const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));
        
        const data = [];
        for (let i = 1; i < lines.length; i++) {
            const values = parseCSVLine(lines[i]);
            if (values.length === headers.length) {
                const row = {};
                headers.forEach((header, index) => {
                    row[header] = values[index];
                });
                data.push(row);
            }
        }
        return data;
    }

    // Helper function to parse CSV line (handles quotes)
    function parseCSVLine(line) {
        const result = [];
        let current = '';
        let inQuotes = false;
        
        for (let i = 0; i < line.length; i++) {
            const char = line[i];
            
            if (char === '"') {
                inQuotes = !inQuotes;
            } else if (char === ',' && !inQuotes) {
                result.push(current.trim());
                current = '';
            } else {
                current += char;
            }
        }
        result.push(current.trim());
        return result;
    }

    // Function to format response options
    function formatResponseOptions(choices) {
        if (!choices || choices.trim() === '') return 'N/A';
        
        const options = choices.split('|').map(opt => opt.trim());
        const formattedOptions = options.map(option => {
            // Handle "1, Strongly agree" format
            const parts = option.split(',').map(p => p.trim());
            if (parts.length === 2) {
                return `${parts[0]}: ${parts[1]}`;
            }
            return option;
        });
        
        return `<ul class="response-options">${formattedOptions.map(opt => `<li>${opt}</li>`).join('')}</ul>`;
    }

    // Function to clean question text
    function cleanQuestionText(fieldLabel) {
        if (!fieldLabel) return '';
        
        // Remove instruction prefixes like "Please indicate the extent..."
        let cleaned = fieldLabel.replace(/^.*?\.\.\./g, '').trim();
        
        // If no "..." found, use the full text
        if (cleaned === '') cleaned = fieldLabel;
        
        return cleaned;
    }

    // Function to get unique measures from data
    function getUniqueMeasures(data) {
        const measures = [...new Set(data.map(row => row['Section Header']).filter(Boolean))];
        return measures.sort();
    }

    // Function to create measure buttons
    function createMeasureButtons(measures) {
        const container = document.getElementById('measure-buttons');
        container.innerHTML = '';
        
        measures.forEach(measure => {
            const button = document.createElement('button');
            button.className = 'measure-btn';
            button.textContent = formatMeasureName(measure);
            button.onclick = () => selectMeasure(measure);
            container.appendChild(button);
        });
    }

    // Function to format measure name for display
    function formatMeasureName(measure) {
        return measure
            .replace(/_from_qualtrics/g, '')
            .replace(/_/g, ' ')
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(' ');
    }

    // Function to select and display a measure
    function selectMeasure(measure) {
        currentMeasure = measure;
        
        // Update button states
        document.querySelectorAll('.measure-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.textContent === formatMeasureName(measure)) {
                btn.classList.add('active');
            }
        });
        
        // Filter data for this measure
        const measureData = psychometricData.filter(row => row['Section Header'] === measure);
        
        // Update measure info
        updateMeasureInfo(measureData);
        
        // Update table
        updateTable(measureData);
    }

    // Function to update measure info section
    function updateMeasureInfo(measureData) {
        const infoDiv = document.getElementById('measure-info');
        
        if (measureData.length === 0) {
            infoDiv.style.display = 'none';
            return;
        }
        
        const firstRow = measureData[0];
        const codebookInfo = firstRow['Codebook Info'] || '';
        const formInfo = firstRow['Form Info'] || '';
        
        let content = `<h3>${formatMeasureName(currentMeasure)} <span class="item-count">${measureData.length} items</span></h3>`;
        
        if (formInfo) {
            content += `<div class="form-content">${formInfo}</div>`;
        }
        
        if (codebookInfo) {
            content += `<div class="citation-content">${codebookInfo}</div>`;
        }
        
        infoDiv.innerHTML = content;
        infoDiv.style.display = 'block';
    }

    // Function to update table with measure data
    function updateTable(measureData) {
        const tbody = document.getElementById('measures-table-body');
        
        if (measureData.length === 0) {
            tbody.innerHTML = '<tr><td colspan="3" class="no-data">No data available for this measure.</td></tr>';
            return;
        }
        
        const rows = measureData.map(row => {
            const variable = row['Variable / Field Name'] || '';
            const question = cleanQuestionText(row['Field Label'] || '');
            const responses = formatResponseOptions(row['Choices, Calculations, OR Slider Labels'] || '');
            
            return `
                <tr>
                    <td class="variable-column">${variable}</td>
                    <td class="question-column">${question}</td>
                    <td class="response-column">${responses}</td>
                </tr>
            `;
        }).join('');
        
        tbody.innerHTML = rows;
    }

    // Function to load CSV data
    async function loadPsychometricData() {
        try {
            // Replace this URL with the path to your CSV file
            const response = await fetch('{{ "/assets/data/psychometric_data.csv" | relative_url }}');
            const csvText = await response.text();
            
            psychometricData = parseCSV(csvText);
            
            // Filter for survey measures only
            psychometricData = psychometricData.filter(row => 
                row['Form Name'] === 'survey_measures' && 
                row['Section Header']
            );
            
            const measures = getUniqueMeasures(psychometricData);
            createMeasureButtons(measures);
            
            // Select first measure by default
            if (measures.length > 0) {
                selectMeasure(measures[0]);
            } else {
                document.getElementById('measures-table-body').innerHTML = 
                    '<tr><td colspan="3" class="no-data">No psychometric measures found in the data.</td></tr>';
            }
            
        } catch (error) {
            console.error('Error loading psychometric data:', error);
            document.getElementById('measures-table-body').innerHTML = 
                '<tr><td colspan="3" class="no-data">Error loading data. Please check the CSV file path.</td></tr>';
        }
    }

    // Initialize when page loads
    document.addEventListener('DOMContentLoaded', loadPsychometricData);
</script>

</html>