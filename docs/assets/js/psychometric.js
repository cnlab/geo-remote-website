// Psychometric Measures Interactive Table - Refactored
// This script handles CSV loading, parsing, and table interactions

// Global variables
let psychometricData = [];
let currentMeasure = null;

// Utility function to get column value with flexible column name matching
function getColumnValue(row, possibleNames) {
    for (const name of possibleNames) {
        if (row[name] !== undefined && row[name] !== null) {
            return row[name];
        }
    }
    return '';
}

// Check if a row is an instruction row
function isInstructionRow(row) {
    const variable = getColumnValue(row, ['Variable / Field Name', 'Variable', 'variable', 'field_name']);
    return variable.includes('_instructions') || 
           variable.includes('_intro') || 
           variable.endsWith('_inst') ||
           /^[a-zA-Z]+_0$/.test(variable);
}

// CSV parsing functions
function parseCSVRow(line) {
    const result = [];
    let current = '';
    let inQuotes = false;
    
    for (let i = 0; i < line.length; i++) {
        const char = line[i];
        
        if (char === '"') {
            if (inQuotes && i + 1 < line.length && line[i + 1] === '"') {
                current += '"';
                i++;
            } else {
                inQuotes = !inQuotes;
            }
        } else if (char === ',' && !inQuotes) {
            result.push(current.trim());
            current = '';
        } else {
            current += char;
        }
    }
    
    result.push(current.trim());
    
    return result.map(field => {
        field = field.trim();
        if (field.startsWith('"') && field.endsWith('"')) {
            field = field.slice(1, -1).replace(/""/g, '"');
        }
        return field;
    });
}

function parseCSV(csvText) {
    csvText = csvText.replace(/^\uFEFF/, ''); // Remove BOM
    
    const lines = [];
    let currentLine = '';
    let inQuotes = false;
    
    for (let i = 0; i < csvText.length; i++) {
        const char = csvText[i];
        
        if (char === '"') {
            if (inQuotes && i + 1 < csvText.length && csvText[i + 1] === '"') {
                currentLine += '""';
                i++;
            } else {
                inQuotes = !inQuotes;
                currentLine += char;
            }
        } else if (char === '\n' && !inQuotes) {
            if (currentLine.trim()) {
                lines.push(currentLine);
            }
            currentLine = '';
        } else if (char === '\r' && !inQuotes) {
            continue;
        } else {
            currentLine += char;
        }
    }
    
    if (currentLine.trim()) {
        lines.push(currentLine);
    }
    
    if (lines.length === 0) return [];
    
    const headers = parseCSVRow(lines[0]);
    console.log('CSV Headers:', headers);
    
    const data = [];
    for (let i = 1; i < lines.length; i++) {
        try {
            const values = parseCSVRow(lines[i]);
            if (values.length > 0) {
                const row = {};
                headers.forEach((header, index) => {
                    row[header] = values[index] || '';
                });
                data.push(row);
            }
        } catch (e) {
            console.warn(`Error parsing line ${i}:`, e.message);
        }
    }
    
    return data;
}

// Text cleaning functions
function cleanFieldLabel(fieldLabel, instructions) {
    if (!fieldLabel) return '';
    
    let cleaned = fieldLabel.trim();
    
    if (instructions && instructions.trim()) {
        const instructionText = instructions.trim();
        
        if (cleaned.startsWith(instructionText)) {
            cleaned = cleaned.substring(instructionText.length).trim();
        }
        
        const ellipsisMatch = cleaned.match(/^.*?\.\.\./);
        if (ellipsisMatch) {
            cleaned = cleaned.substring(ellipsisMatch[0].length).trim();
        }
        
        if (cleaned.includes(instructionText)) {
            cleaned = cleaned.replace(instructionText, '').trim();
        }
    }
    
    if (!cleaned) {
        cleaned = fieldLabel.trim();
    }
    
    cleaned = cleaned.replace(/^[.,:;\s]+/, '').trim();
    return cleaned;
}

function extractInstructions(measureData) {
    const instructionRows = measureData.filter(row => isInstructionRow(row));
    
    if (instructionRows.length > 0) {
        const instructionRow = instructionRows[0];
        const instructions = getColumnValue(instructionRow, ['Field Label']);
        return cleanFieldLabel(instructions, null);
    }
    
    return null;
}

// Slider creation functions
function createSlider(minOption, maxOption, options, minValue, maxValue) {
    const dataSourceInfo = `
        <div class="slider-data-source">
            <small>
                <strong>Scale:</strong> ${minOption.originalValue} to ${maxOption.originalValue} 
                ${minValue && maxValue ? '(from Text Validation Min/Max)' : '(from Choices)'}
                ${options.length > 2 ? ` | ${options.length} total options` : ''}
            </small>
        </div>
    `;
    
    let expandableOptions = '';
    if (options.length > 2) {
        const optionsList = options.map((opt, index) => {
            const numericValue = minValue && maxValue && options.length > 2 
                ? Math.round(parseInt(minValue) + (parseInt(maxValue) - parseInt(minValue)) * (index / (options.length - 1)))
                : index + 1;
            return `<li>${numericValue}: ${opt}</li>`;
        }).join('');
        
        expandableOptions = `
            <div class="slider-all-options">
                <details>
                    <summary>View all ${options.length} response options</summary>
                    <div class="response-options-small">
                        <p><strong>All options from left to right:</strong></p>
                        <ul>${optionsList}</ul>
                    </div>
                </details>
            </div>
        `;
    }
    
    return `
        <div class="slider-container">
            ${dataSourceInfo}
            <div class="slider-track">
                <div class="slider-endpoint slider-min">
                    <div class="slider-value">${minOption.originalValue}</div>
                    <div class="slider-label">${minOption.label}</div>
                </div>
                <div class="slider-bar">
                    <div class="slider-fill"></div>
                    <div class="slider-thumb slider-thumb-start"></div>
                    <div class="slider-thumb slider-thumb-end"></div>
                </div>
                <div class="slider-endpoint slider-max">
                    <div class="slider-value">${maxOption.originalValue}</div>
                    <div class="slider-label">${maxOption.label}</div>
                </div>
            </div>
            ${expandableOptions}
        </div>
    `;
}

function formatSliderOptions(choices, row) {
    if (!choices || choices.trim() === '') {
        return 'N/A';
    }
    
    console.log('🎛️ Processing slider:', choices);
    
    const minValue = getColumnValue(row, ['Text Validation Min']);
    const maxValue = getColumnValue(row, ['Text Validation Max']);
    
    console.log('  Min/Max values:', minValue, maxValue);
    
    const options = choices.split('|').map(opt => opt.trim()).filter(opt => opt !== '');
    console.log('  Choice options:', options);
    
    let minOption, maxOption;
    
    if (minValue && maxValue && options.length >= 2) {
        // Use Text Validation Min/Max with choice labels
        minOption = {
            originalValue: minValue,
            label: options[0],
            value: parseInt(minValue, 10)
        };
        
        maxOption = {
            originalValue: maxValue,
            label: options[options.length - 1],
            value: parseInt(maxValue, 10)
        };
        
        console.log('  ✓ Using Text Validation Min/Max');
    } else if (minValue && maxValue) {
        // Use Text Validation Min/Max with generic labels
        minOption = {
            originalValue: minValue,
            label: `Minimum (${minValue})`,
            value: parseInt(minValue, 10)
        };
        
        maxOption = {
            originalValue: maxValue,
            label: `Maximum (${maxValue})`,
            value: parseInt(maxValue, 10)
        };
        
        console.log('  ✓ Using Text Validation Min/Max with generic labels');
    } else {
        // Fallback to parsing choices
        const parsedOptions = options.map(option => {
            const parts = option.split(',').map(p => p.trim());
            if (parts.length >= 2) {
                const numericPart = parts[0].trim();
                const value = parseInt(numericPart, 10);
                const label = parts.slice(1).join(', ').trim();
                
                return {
                    value: isNaN(value) ? 0 : value,
                    originalValue: numericPart,
                    label: label
                };
            }
            return null;
        }).filter(opt => opt !== null);
        
        if (parsedOptions.length < 2) {
            console.log('  ⚠️ Cannot create slider - insufficient data');
            return formatResponseOptions(choices);
        }
        
        parsedOptions.sort((a, b) => a.value - b.value);
        minOption = parsedOptions[0];
        maxOption = parsedOptions[parsedOptions.length - 1];
        
        console.log('  ⚠️ Using fallback choice parsing');
    }
    
    return createSlider(minOption, maxOption, options, minValue, maxValue);
}

function formatResponseOptions(choices, fieldType = null, row = null) {
    if (!choices || choices.trim() === '') {
        // For text fields, we don't need choices content
        if (fieldType && fieldType.toLowerCase() === 'text') {
            return createTextBox(row);
        }
        return 'N/A';
    }
    
    // Handle text field type
    if (fieldType && fieldType.toLowerCase() === 'text') {
        return createTextBox(row);
    }
    
    // Handle slider field type
    if (fieldType && fieldType.toLowerCase() === 'slider') {
        return createSimpleSlider(choices, row);
    }
    
    // Handle regular radio/checkbox options
    const options = choices.split('|').map(opt => opt.trim());
    const parsedOptions = options.map(option => {
        const parts = option.split(',').map(p => p.trim());
        if (parts.length >= 2) {
            const numericPart = parts[0].trim();
            const value = parseInt(numericPart, 10);
            const label = parts.slice(1).join(', ').trim();
            
            return {
                value: isNaN(value) ? 9999 : value,
                originalValue: numericPart,
                label: label,
                display: `${numericPart}: ${label}`
            };
        }
        
        return {
            value: 9999,
            originalValue: option,
            label: '',
            display: option
        };
    });
    
    parsedOptions.sort((a, b) => {
        if (a.value !== b.value) {
            return a.value - b.value;
        }
        return a.display.localeCompare(b.display);
    });
    
    const formattedOptions = parsedOptions.map(opt => opt.display);
    
    // Add field type class for styling
    let fieldTypeClass = 'response-options';
    if (fieldType) {
        if (fieldType.toLowerCase() === 'radio') {
            fieldTypeClass += ' response-options-radio';
            console.log('🔘 Applied RADIO class:', fieldTypeClass);
        } else if (fieldType.toLowerCase() === 'checkbox') {
            fieldTypeClass += ' response-options-checkbox';
            console.log('☑️ Applied CHECKBOX class:', fieldTypeClass);
        } else {
            console.log('📋 Field type not radio/checkbox:', fieldType);
        }
    } else {
        console.log('❓ No field type specified, using default arrows');
    }
    
    return `<ul class="${fieldTypeClass}">${formattedOptions.map(opt => `<li>${opt}</li>`).join('')}</ul>`;
}

// Simple slider creation function
function createSimpleSlider(choices, row) {
    console.log('🎛️ Creating simple slider with choices:', choices);
    
    // Get Text Validation Min and Max
    const minValue = getColumnValue(row, ['Text Validation Min']);
    const maxValue = getColumnValue(row, ['Text Validation Max']);
    
    console.log('  Min Value:', minValue);
    console.log('  Max Value:', maxValue);
    
    // Split choices on | and clean up
    // Handle cases like "| |" by replacing with single "|" first
    const cleanChoices = choices.replace(/\|\s*\|/g, '|');
    const parts = cleanChoices.split('|').map(part => part.trim()).filter(part => part !== '');
    
    console.log('  Cleaned parts:', parts);
    
    // Get left and right labels
    const leftLabel = parts.length > 0 ? parts[0] : 'Min';
    const rightLabel = parts.length > 1 ? parts[parts.length - 1] : 'Max';
    
    console.log('  Left label:', leftLabel);
    console.log('  Right label:', rightLabel);
    
    // Build the slider HTML
    return `
        <div class="simple-slider-container">
            <div class="simple-slider-track">
                <div class="simple-slider-endpoint simple-slider-left">
                    <div class="simple-slider-label">${leftLabel}</div>
                </div>
                <div class="simple-slider-bar">
                    <div class="simple-slider-line"></div>
                    <div class="simple-slider-thumb simple-slider-thumb-left"></div>
                    <div class="simple-slider-thumb simple-slider-thumb-right"></div>
                </div>
                <div class="simple-slider-endpoint simple-slider-right">
                    <div class="simple-slider-label">${rightLabel}</div>
                </div>
            </div>
            ${minValue && maxValue ? `
                <div class="simple-slider-values">
                    <span class="simple-slider-min">${minValue}</span>
                    <span class="simple-slider-max">${maxValue}</span>
                </div>
            ` : ''}
        </div>
    `;
}

// Function to create a non-interactive text box
function createTextBox(row) {
    // Get any validation info that might be relevant for text fields
    const minLength = getColumnValue(row, ['Text Validation Min', 'min_length', 'Min Length']);
    const maxLength = getColumnValue(row, ['Text Validation Max', 'max_length', 'Max Length']);
    const validationType = getColumnValue(row, ['Text Validation Type OR Show Slider Number', 'validation_type', 'Validation Type']);
    
    console.log('📝 Creating text box');
    console.log('  Min Length:', minLength);
    console.log('  Max Length:', maxLength);
    console.log('  Validation Type:', validationType);
    
    // Create placeholder text based on validation info
    let placeholder = 'Enter text here...';
    if (validationType) {
        if (validationType.toLowerCase().includes('email')) {
            placeholder = 'Enter email address...';
        } else if (validationType.toLowerCase().includes('number')) {
            placeholder = 'Enter number...';
        } else if (validationType.toLowerCase().includes('phone')) {
            placeholder = 'Enter phone number...';
        } else if (validationType.toLowerCase().includes('date')) {
            placeholder = 'Enter date...';
        }
    }
    
    // Build validation info display
    let validationInfo = '';
    if (minLength || maxLength || validationType) {
        const validationParts = [];
        if (validationType) validationParts.push(`Type: ${validationType}`);
        if (minLength) validationParts.push(`Min: ${minLength} chars`);
        if (maxLength) validationParts.push(`Max: ${maxLength} chars`);
        
        validationInfo = `
            <div class="text-validation-info">
                <small>${validationParts.join(' | ')}</small>
            </div>
        `;
    }
    
    return `
        <div class="text-field-container">
            <input type="text" 
                   class="text-field-display" 
                   placeholder="${placeholder}" 
                   disabled 
                   readonly>
            ${validationInfo}
        </div>
    `;
}

// Data organization functions
function getUniqueMeasures(data) {
    if (data.length === 0) return ['All Items'];
    
    const possibleSectionNames = ['Section Header', 'section_header', 'SectionHeader', 'Section_Header'];
    const columns = Object.keys(data[0]);
    const sectionCol = possibleSectionNames.find(name => columns.includes(name));
    
    if (!sectionCol) {
        console.log('No section header column found. Available columns:', columns);
        return ['All Items'];
    }
    
    const measures = [...new Set(data.map(row => row[sectionCol]).filter(Boolean))];
    return measures.sort();
}

function formatMeasureName(measure) {
    return measure
        .replace(/_from_qualtrics/g, '')
        .replace(/_/g, ' ')
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
}

// UI functions
function createMeasureButtons(measures) {
    const container = document.getElementById('measure-buttons');
    container.innerHTML = '';
    
    measures.forEach(measure => {
        const button = document.createElement('button');
        button.className = 'measure-btn';
        button.textContent = measure === 'All Items' ? measure : formatMeasureName(measure);
        button.onclick = () => {
            if (measure === 'All Items') {
                selectAllItems();
            } else {
                selectMeasure(measure);
            }
        };
        container.appendChild(button);
    });
}

function selectMeasure(measure) {
    currentMeasure = measure;
    
    document.querySelectorAll('.measure-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.textContent === formatMeasureName(measure)) {
            btn.classList.add('active');
        }
    });
    
    const tableContainer = document.querySelector('.table-container');
    tableContainer.scrollTop = 0;
    
    const possibleSectionNames = ['Section Header', 'section_header', 'SectionHeader', 'Section_Header'];
    const sectionCol = possibleSectionNames.find(name => 
        psychometricData.length > 0 && Object.keys(psychometricData[0]).includes(name)
    );
    
    let measureData;
    if (sectionCol) {
        measureData = psychometricData.filter(row => row[sectionCol] === measure);
    } else {
        measureData = psychometricData;
    }
    
    updateMeasureInfo(measureData);
    updateTable(measureData);
}

function selectAllItems() {
    currentMeasure = 'All Items';
    
    document.querySelectorAll('.measure-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.textContent === 'All Items') {
            btn.classList.add('active');
        }
    });
    
    const tableContainer = document.querySelector('.table-container');
    tableContainer.scrollTop = 0;
    
    updateMeasureInfoAllItems(psychometricData);
    updateTable(psychometricData);
}

function updateMeasureInfo(measureData) {
    const infoDiv = document.getElementById('measure-info');
    
    if (measureData.length === 0) {
        infoDiv.style.display = 'none';
        return;
    }
    
    const firstRow = measureData[0];
    const codebookInfo = getColumnValue(firstRow, ['Codebook Info', 'codebook_info', 'CodebookInfo', 'Codebook_Info']);
    const formInfo = getColumnValue(firstRow, ['Form Info', 'form_info', 'FormInfo', 'Form_Info']);
    
    const instructions = extractInstructions(measureData);
    
    const actualQuestions = measureData.filter(row => {
        const fieldType = getColumnValue(row, ['Field Type']);
        return fieldType && fieldType.toLowerCase() !== 'descriptive' && !isInstructionRow(row);
    });
    
    let content = `<h3>${formatMeasureName(currentMeasure)} <span class="item-count">${actualQuestions.length} items</span></h3>`;
    
    if (instructions) {
        content += `<div class="measure-instructions" style="background: #f0f8ff; padding: 1rem; border-radius: 4px; margin: 1rem 0; border-left: 4px solid var(--secondary);">
            <h4 style="margin-top: 0; color: var(--secondary);">📋 Instructions</h4>
            <p style="margin-bottom: 0; font-style: italic;">${instructions}</p>
        </div>`;
    }
    
    if (formInfo) {
        content += `<div class="form-content">${formInfo}</div>`;
    }
    
    if (codebookInfo) {
        content += `<div class="citation-content">${codebookInfo}</div>`;
    }
    
    infoDiv.innerHTML = content;
    infoDiv.style.display = 'block';
}

function updateMeasureInfoAllItems(measureData) {
    const infoDiv = document.getElementById('measure-info');
    
    if (measureData.length === 0) {
        infoDiv.style.display = 'none';
        return;
    }
    
    const actualQuestions = measureData.filter(row => {
        const fieldType = getColumnValue(row, ['Field Type']);
        return fieldType && fieldType.toLowerCase() !== 'descriptive';
    });
    
    let content = `<h3>All Survey Items <span class="item-count">${actualQuestions.length} items</span></h3>`;
    content += `<p>Displaying all items from your CSV file. Sliders will be visualized with their Text Validation Min/Max values.</p>`;
    
    infoDiv.innerHTML = content;
    infoDiv.style.display = 'block';
}

function updateTable(measureData) {
    const tbody = document.getElementById('measures-table-body');
    const tableContainer = document.querySelector('.table-container');
    const scrollHint = document.getElementById('scroll-hint');
    
    if (measureData.length === 0) {
        tbody.innerHTML = '<tr><td colspan="3" class="no-data">No data available for this measure.</td></tr>';
        tableContainer.classList.remove('has-scroll');
        if (scrollHint) scrollHint.style.display = 'none';
        return;
    }
    
    const instructions = extractInstructions(measureData);
    
    const questionData = measureData.filter(row => {
        const fieldType = getColumnValue(row, ['Field Type']);
        return fieldType && fieldType.toLowerCase() !== 'descriptive' && !isInstructionRow(row);
    });
    
    if (questionData.length === 0) {
        tbody.innerHTML = '<tr><td colspan="3" class="no-data">No question items found for this measure.</td></tr>';
        tableContainer.classList.remove('has-scroll');
        if (scrollHint) scrollHint.style.display = 'none';
        return;
    }
    
    const rows = questionData.map(row => {
        const variable = getColumnValue(row, ['Variable / Field Name', 'Variable', 'variable', 'field_name']);
        const rawQuestion = getColumnValue(row, ['Field Label']);
        const question = cleanFieldLabel(rawQuestion, instructions);
        const fieldType = getColumnValue(row, ['Field Type']);
        const choicesRaw = getColumnValue(row, ['Choices, Calculations, OR Slider Labels']);
        
        console.log(`\n📋 Processing: ${variable}`);
        console.log(`  Field Type: ${fieldType}`);
        console.log(`  Question: ${question}`);
        console.log(`  Choices: ${choicesRaw}`);
        
        const responses = formatResponseOptions(choicesRaw, fieldType, row);
        
        return `
            <tr>
                <td class="variable-column">${variable}</td>
                <td class="question-column">${question}</td>
                <td class="response-column">${responses}</td>
            </tr>
        `;
    }).join('');
    
    tbody.innerHTML = rows;
    
    setTimeout(() => {
        if (tableContainer.scrollHeight > tableContainer.clientHeight) {
            tableContainer.classList.add('has-scroll');
            if (scrollHint) scrollHint.style.display = 'block';
            
            let hasScrolled = false;
            tableContainer.addEventListener('scroll', function hideHintOnScroll() {
                if (!hasScrolled) {
                    if (scrollHint) scrollHint.style.display = 'none';
                    hasScrolled = true;
                    tableContainer.removeEventListener('scroll', hideHintOnScroll);
                }
            });
        } else {
            tableContainer.classList.remove('has-scroll');
            if (scrollHint) scrollHint.style.display = 'none';
        }
    }, 100);
}

// Test data function
function loadTestData() {
    console.log('Loading test data with your CSV structure...');
    
    psychometricData = [
        {
            'Field Type': 'descriptive',
            'Field Label': 'Please respond to each pair of items below.',
            'Choices, Calculations, OR Slider Labels': '',
            'Field Note': '',
            'Text Validation Type OR Show Slider Number': '',
            'Text Validation Min': '',
            'Text Validation Max': '',
            'Section Header': 'semantic_differential_from_qualtrics',
            'Form Name': 'survey_measures',
            'Variable / Field Name': 'instructions_semantic'
        },
        {
            'Field Type': 'text',
            'Field Label': 'What is your full name?',
            'Choices, Calculations, OR Slider Labels': '',
            'Field Note': 'Please enter your first and last name',
            'Text Validation Type OR Show Slider Number': '',
            'Text Validation Min': '2',
            'Text Validation Max': '50',
            'Section Header': 'demographic_info_from_qualtrics',
            'Form Name': 'survey_measures',
            'Variable / Field Name': 'participant_name'
        },
        {
            'Field Type': 'text',
            'Field Label': 'What is your email address?',
            'Choices, Calculations, OR Slider Labels': '',
            'Field Note': 'We will use this to contact you about the study',
            'Text Validation Type OR Show Slider Number': 'email',
            'Text Validation Min': '',
            'Text Validation Max': '100',
            'Section Header': 'demographic_info_from_qualtrics',
            'Form Name': 'survey_measures',
            'Variable / Field Name': 'participant_email'
        },
        {
            'Field Type': 'slider',
            'Field Label': 'Continuing to smoke the number of tobacco cigarettes I am smoking right now would be: Foolish <-----> Wise',
            'Choices, Calculations, OR Slider Labels': 'Foolish | Wise',
            'Field Note': '',
            'Text Validation Type OR Show Slider Number': '',
            'Text Validation Min': '1',
            'Text Validation Max': '7',
            'Section Header': 'semantic_differential_from_qualtrics',
            'Form Name': 'survey_measures',
            'Variable / Field Name': 'semantic_wise'
        },
        {
            'Field Type': 'slider',
            'Field Label': 'How would you rate your financial situation?',
            'Choices, Calculations, OR Slider Labels': 'Worst off in the U.S. |  | Best off in the U.S.',
            'Field Note': '',
            'Text Validation Type OR Show Slider Number': '',
            'Text Validation Min': '1',
            'Text Validation Max': '10',
            'Section Header': 'financial_measures_from_qualtrics',
            'Form Name': 'survey_measures',
            'Variable / Field Name': 'financial_status'
        },
        {
            'Field Type': 'radio',
            'Field Label': 'Please indicate the extent to which you agree with the following statements...Smoking is part of my self-image.',
            'Choices, Calculations, OR Slider Labels': '1, Strongly disagree | 2, Disagree | 3, Somewhat disagree | 4, Neither agree nor disagree | 5, Somewhat agree | 6, Agree | 7, Strongly Agree',
            'Field Note': '',
            'Text Validation Type OR Show Slider Number': '',
            'Text Validation Min': '',
            'Text Validation Max': '',
            'Section Header': 'smoker_selfconcept_scale_from_qualtrics',
            'Form Name': 'survey_measures',
            'Variable / Field Name': 'sscs_1'
        },
        {
            'Field Type': 'radio',
            'Field Label': 'What is your highest level of education completed?',
            'Choices, Calculations, OR Slider Labels': '1, Less than high school | 2, High school diploma or GED | 3, Some college | 4, Associate degree | 5, Bachelor degree | 6, Graduate degree',
            'Field Note': '',
            'Text Validation Type OR Show Slider Number': '',
            'Text Validation Min': '',
            'Text Validation Max': '',
            'Section Header': 'demographic_info_from_qualtrics',
            'Form Name': 'survey_measures',
            'Variable / Field Name': 'education_level'
        },
        {
            'Field Type': 'checkbox',
            'Field Label': 'Which of the following health conditions do you currently have? (Select all that apply)',
            'Choices, Calculations, OR Slider Labels': '1, Diabetes | 2, High blood pressure | 3, Heart disease | 4, Asthma | 5, Depression | 6, Anxiety | 7, None of the above',
            'Field Note': 'Check all that apply to you',
            'Text Validation Type OR Show Slider Number': '',
            'Text Validation Min': '',
            'Text Validation Max': '',
            'Section Header': 'health_conditions_from_qualtrics',
            'Form Name': 'survey_measures',
            'Variable / Field Name': 'health_conditions'
        },
        {
            'Field Type': 'checkbox',
            'Field Label': 'Which social media platforms do you use regularly? (Select all that apply)',
            'Choices, Calculations, OR Slider Labels': '1, Facebook | 2, Instagram | 3, Twitter/X | 4, TikTok | 5, LinkedIn | 6, Snapchat | 7, YouTube | 8, None of these',
            'Field Note': 'Select all platforms you use at least once a week',
            'Text Validation Type OR Show Slider Number': '',
            'Text Validation Min': '',
            'Text Validation Max': '',
            'Section Header': 'social_media_from_qualtrics',
            'Form Name': 'survey_measures',
            'Variable / Field Name': 'social_media_use'
        }
    ];
    
    const measures = getUniqueMeasures(psychometricData);
    createMeasureButtons(measures);
    
    if (measures.length > 0) {
        if (measures[0] === 'All Items') {
            selectAllItems();
        } else {
            selectMeasure(measures[0]);
        }
    }
}

// CSV loading function
async function loadPsychometricData() {
    const tbody = document.getElementById('measures-table-body');
    
    try {
        console.log('Loading CSV data...');
        tbody.innerHTML = '<tr><td colspan="3" class="loading">Loading CSV file...</td></tr>';
        
        const possiblePaths = [
            window.CSV_PATH,
            '/assets/data/psychometric_data.csv',
            './assets/data/psychometric_data.csv',
            '../assets/data/psychometric_data.csv',
            'psychometric_data.csv'
        ].filter(Boolean);
        
        let csvText = null;
        
        for (const path of possiblePaths) {
            try {
                console.log('Trying path:', path);
                const response = await fetch(path);
                if (response.ok) {
                    csvText = await response.text();
                    console.log('Successfully loaded from:', path);
                    break;
                }
            } catch (e) {
                console.log('Failed to load from:', path, e.message);
            }
        }
        
        if (!csvText) {
            throw new Error('Could not load CSV from any path. Tried: ' + possiblePaths.join(', '));
        }
        
        tbody.innerHTML = '<tr><td colspan="3" class="loading">Parsing CSV data...</td></tr>';
        
        psychometricData = parseCSV(csvText);
        console.log('Parsed data length:', psychometricData.length);
        
        if (psychometricData.length > 0) {
            console.log('Available columns:', Object.keys(psychometricData[0]));
        }
        
        if (psychometricData.length === 0) {
            tbody.innerHTML = '<tr><td colspan="3" class="no-data">No data found in CSV file.</td></tr>';
            return;
        }
        
        const measures = getUniqueMeasures(psychometricData);
        console.log('Available measures:', measures);
        
        createMeasureButtons(measures);
        
        if (measures.length > 0) {
            if (measures[0] === 'All Items') {
                selectAllItems();
            } else {
                selectMeasure(measures[0]);
            }
        } else {
            tbody.innerHTML = '<tr><td colspan="3" class="no-data">No psychometric measures found in the data.</td></tr>';
        }
        
    } catch (error) {
        console.error('Error loading psychometric data:', error);
        tbody.innerHTML = `
            <tr><td colspan="3" class="no-data">
                <strong>Error loading data:</strong> ${error.message}<br>
                <small>Check the browser console for more details.</small><br>
                <small>Current page: ${window.location.href}</small><br>
                <small>CSV path: ${window.CSV_PATH || 'Not set'}</small>
            </td></tr>
        `;
    }
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', loadPsychometricData);