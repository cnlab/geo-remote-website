// Psychometric Measures Interactive Table
// This script handles CSV loading, parsing, and table interactions

// Global variables
let psychometricData = [];
let currentMeasure = null;

// Function to get column value with flexible column name matching
function getColumnValue(row, possibleNames) {
    for (const name of possibleNames) {
        if (row[name] !== undefined) {
            return row[name];
        }
    }
    return '';
}

// Function to check if a row is an instruction row
function isInstructionRow(row) {
    const variable = getColumnValue(row, ['Variable / Field Name', 'Variable', 'variable', 'field_name']);
    
    // Check for instruction patterns in variable name
    return variable.includes('_instructions') || 
           variable.includes('_intro') || 
           variable.endsWith('_inst') ||
           /^[a-zA-Z]+_0$/.test(variable); // Pattern like "bis_0" for instructions
}

// Function to extract instructions from measure data
function extractInstructions(measureData) {
    const instructionRows = measureData.filter(row => isInstructionRow(row));
    
    if (instructionRows.length > 0) {
        const instructionRow = instructionRows[0];
        const instructions = getColumnValue(instructionRow, ['Field Label', 'field_label', 'FieldLabel', 'Field_Label', 'label']);
        return cleanQuestionText(instructions); // Remove any "..." patterns if present
    }
    
    return null;
}

// Function to filter out instruction rows from measure data
function filterInstructionRows(measureData) {
    return measureData.filter(row => !isInstructionRow(row));
}

// Robust CSV row parser that handles quotes and commas properly
function parseCSVRow(line) {
    const result = [];
    let current = '';
    let inQuotes = false;
    let i = 0;
    
    while (i < line.length) {
        const char = line[i];
        
        if (char === '"') {
            if (inQuotes && line[i + 1] === '"') {
                // Escaped quote
                current += '"';
                i += 2;
            } else {
                // Toggle quote state
                inQuotes = !inQuotes;
                i++;
            }
        } else if (char === ',' && !inQuotes) {
            // End of field
            result.push(current.trim());
            current = '';
            i++;
        } else {
            current += char;
            i++;
        }
    }
    
    // Add the last field
    result.push(current.trim());
    
    // Clean up quotes from fields
    return result.map(field => {
        field = field.trim();
        if (field.startsWith('"') && field.endsWith('"')) {
            field = field.slice(1, -1);
        }
        return field;
    });
}

// Function to parse CSV data - more robust version
function parseCSV(csvText) {
    // Remove BOM if present
    csvText = csvText.replace(/^\uFEFF/, '');
    
    const lines = csvText.split('\n').filter(line => line.trim());
    if (lines.length === 0) return [];
    
    // Parse header line
    const headers = parseCSVRow(lines[0]);
    console.log('Parsed headers:', headers);
    console.log('Headers count:', headers.length);
    
    const data = [];
    for (let i = 1; i < lines.length; i++) {
        try {
            const values = parseCSVRow(lines[i]);
            if (values.length > 0) {
                const row = {};
                headers.forEach((header, index) => {
                    row[header] = values[index] || '';
                });
                
                // Debug BIS rows specifically during parsing
                if (values[0] && values[0].includes('bis_')) {
                    console.log(`\nParsing BIS row: ${values[0]}`);
                    console.log('  Raw line:', lines[i].substring(0, 200) + '...');
                    console.log('  Parsed values count:', values.length);
                    console.log('  Headers count:', headers.length);
                    console.log('  Values[5] (choices):', values[5]); // Assuming choices is column 5
                    console.log('  Full values array:', values);
                }
                
                data.push(row);
            }
        } catch (e) {
            console.warn('Error parsing line', i, ':', e.message);
            console.warn('Problematic line:', lines[i]);
        }
    }
    return data;
}

// Function to format response options
function formatResponseOptions(choices) {
    if (!choices || choices.trim() === '') {
        console.log('formatResponseOptions: choices is empty or null:', choices);
        return 'N/A';
    }
    
    console.log('formatResponseOptions called with:', choices);
    
    const options = choices.split('|').map(opt => opt.trim());
    console.log('Split options:', options);
    
    // Parse and sort options by their numeric value
    const parsedOptions = options.map(option => {
        console.log('Processing option:', option);
        const parts = option.split(',').map(p => p.trim());
        console.log('  Split parts:', parts);
        
        if (parts.length >= 2) {
            const numericPart = parts[0].trim();
            const value = parseInt(numericPart, 10);
            const label = parts.slice(1).join(', ').trim(); // Join with comma + space
            
            console.log('  Numeric part:', numericPart);
            console.log('  Parsed value:', value);
            console.log('  Label:', label);
            
            return {
                value: isNaN(value) ? 9999 : value, // Put non-numeric values at end
                originalValue: numericPart,
                label: label,
                display: `${numericPart}: ${label}`,
                original: option
            };
        }
        
        // Handle options that don't have the expected format
        console.log('  Option does not match expected format, treating as unparseable');
        return {
            value: 9999, // Put unparseable options at end
            originalValue: option,
            label: '',
            display: option,
            original: option
        };
    });
    
    console.log('Parsed options before sorting:', parsedOptions);
    
    // Sort by numeric value
    parsedOptions.sort((a, b) => {
        if (a.value !== b.value) {
            return a.value - b.value;
        }
        // If values are equal, sort by original string
        return a.original.localeCompare(b.original);
    });
    
    console.log('Parsed options after sorting:', parsedOptions);
    
    // Format for display
    const formattedOptions = parsedOptions.map(opt => opt.display);
    console.log('Final formatted options:', formattedOptions);
    
    const htmlResult = `<ul class="response-options">${formattedOptions.map(opt => `<li>${opt}</li>`).join('')}</ul>`;
    console.log('Generated HTML:', htmlResult);
    
    return htmlResult;
}

// Function to clean question text - simplified version
function cleanQuestionText(fieldLabel) {
    if (!fieldLabel) return '';
    
    // Simple approach: only handle the "..." pattern
    let cleaned = fieldLabel.replace(/^.*?\.\.\./g, '').trim();
    
    // If no "..." found, use the full text
    if (cleaned === '') cleaned = fieldLabel;
    
    return cleaned;
}

// Function to get unique measures from data
function getUniqueMeasures(data) {
    if (data.length === 0) return [];
    
    // Try different possible column names for section header
    const possibleSectionNames = ['Section Header', 'section_header', 'SectionHeader', 'Section_Header'];
    const columns = Object.keys(data[0]);
    const sectionCol = possibleSectionNames.find(name => columns.includes(name));
    
    if (!sectionCol) {
        console.error('Could not find section header column. Available columns:', columns);
        return [];
    }
    
    const measures = [...new Set(data.map(row => row[sectionCol]).filter(Boolean))];
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
    
    // Reset table scroll position
    const tableContainer = document.querySelector('.table-container');
    tableContainer.scrollTop = 0;
    
    // Filter data for this measure
    const possibleSectionNames = ['Section Header', 'section_header', 'SectionHeader', 'Section_Header'];
    const sectionCol = possibleSectionNames.find(name => 
        psychometricData.length > 0 && Object.keys(psychometricData[0]).includes(name)
    );
    
    const measureData = psychometricData.filter(row => row[sectionCol] === measure);
    
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
    const codebookInfo = getColumnValue(firstRow, ['Codebook Info', 'codebook_info', 'CodebookInfo', 'Codebook_Info']);
    const formInfo = getColumnValue(firstRow, ['Form Info', 'form_info', 'FormInfo', 'Form_Info']);
    
    // Extract instructions from the measure data
    const instructions = extractInstructions(measureData);
    
    // Filter out instruction rows for the actual count
    const actualQuestions = filterInstructionRows(measureData);
    
    let content = `<h3>${formatMeasureName(currentMeasure)} <span class="item-count">${actualQuestions.length} items</span></h3>`;
    
    // Add instructions if found
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

// Function to update table with measure data
function updateTable(measureData) {
    const tbody = document.getElementById('measures-table-body');
    const tableContainer = document.querySelector('.table-container');
    const scrollHint = document.getElementById('scroll-hint');
    
    if (measureData.length === 0) {
        tbody.innerHTML = '<tr><td colspan="3" class="no-data">No data available for this measure.</td></tr>';
        tableContainer.classList.remove('has-scroll');
        scrollHint.style.display = 'none';
        return;
    }
    
    // Filter out instruction rows from the table
    const questionData = filterInstructionRows(measureData);
    
    if (questionData.length === 0) {
        tbody.innerHTML = '<tr><td colspan="3" class="no-data">No question items found for this measure.</td></tr>';
        tableContainer.classList.remove('has-scroll');
        scrollHint.style.display = 'none';
        return;
    }
    
    const rows = questionData.map(row => {
        const variable = getColumnValue(row, ['Variable / Field Name', 'Variable', 'variable', 'field_name']);
        const question = cleanQuestionText(getColumnValue(row, ['Field Label', 'field_label', 'FieldLabel', 'Field_Label', 'label']));
        
        console.log(`\nProcessing row for variable: ${variable}`);
        console.log(`  Available columns in this row:`, Object.keys(row));
        console.log(`  Question: ${question}`);
        
        const choicesRaw = getColumnValue(row, ['Choices, Calculations, OR Slider Labels', 'Choices', 'choices', 'options', 'response_options']);
        console.log(`  Raw choices: ${choicesRaw}`);
        console.log(`  Choices column check:`);
        console.log(`    'Choices, Calculations, OR Slider Labels': "${row['Choices, Calculations, OR Slider Labels']}"`);
        
        const responses = formatResponseOptions(choicesRaw);
        console.log(`  Formatted responses: ${responses}`);
        
        return `
            <tr>
                <td class="variable-column">${variable}</td>
                <td class="question-column">${question}</td>
                <td class="response-column">${responses}</td>
            </tr>
        `;
    }).join('');
    
    tbody.innerHTML = rows;
    
    // Check if table needs scrolling and add visual indicator
    setTimeout(() => {
        if (tableContainer.scrollHeight > tableContainer.clientHeight) {
            tableContainer.classList.add('has-scroll');
            scrollHint.style.display = 'block';
            
            // Hide hint after user scrolls
            let hasScrolled = false;
            tableContainer.addEventListener('scroll', function hideHintOnScroll() {
                if (!hasScrolled) {
                    scrollHint.style.display = 'none';
                    hasScrolled = true;
                    tableContainer.removeEventListener('scroll', hideHintOnScroll);
                }
            });
        } else {
            tableContainer.classList.remove('has-scroll');
            scrollHint.style.display = 'none';
        }
    }, 100);
}

// Test data function for debugging
function loadTestData() {
    console.log('Loading test data...');
    
    psychometricData = [
        {
            'Variable / Field Name': 'sscs_1',
            'Form Name': 'survey_measures',
            'Section Header': 'smoker_selfconcept_scale_from_qualtrics',
            'Field Label': 'Please indicate the extent to which you agree with the following statements...Smoking is part of my self-image.',
            'Choices, Calculations, OR Slider Labels': '7, Strongly Agree | 1, Strongly disagree | 3, Somewhat disagree | 5, Somewhat agree | 2, Disagree | 4, Neither agree nor disagree | 6, Agree',
            'Codebook Info': '<b>Smoker Self Concept Scale</b> <p>All five questions are asked, plus one addition ("Smoking defines me as a person")</p>',
            'Form Info': 'Citation info would go here'
        },
        {
            'Variable / Field Name': 'sscs_2',
            'Form Name': 'survey_measures',
            'Section Header': 'smoker_selfconcept_scale_from_qualtrics',
            'Field Label': 'Please indicate the extent to which you agree with the following statements...Smoking is part of "who I am."',
            'Choices, Calculations, OR Slider Labels': '7, Strongly Agree | 1, Strongly disagree | 3, Somewhat disagree | 5, Somewhat agree | 2, Disagree | 4, Neither agree nor disagree | 6, Agree',
            'Codebook Info': '<b>Smoker Self Concept Scale</b> <p>All five questions are asked, plus one addition ("Smoking defines me as a person")</p>',
            'Form Info': 'Citation info would go here'
        },
        {
            'Variable / Field Name': 'sscs_3',
            'Form Name': 'survey_measures',
            'Section Header': 'smoker_selfconcept_scale_from_qualtrics',
            'Field Label': 'Please indicate the extent to which you agree with the following statements...Smoking is a part of my personality.',
            'Choices, Calculations, OR Slider Labels': '7, Strongly Agree | 1, Strongly disagree | 3, Somewhat disagree | 5, Somewhat agree | 2, Disagree | 4, Neither agree nor disagree | 6, Agree',
            'Codebook Info': '<b>Smoker Self Concept Scale</b> <p>All five questions are asked, plus one addition ("Smoking defines me as a person")</p>',
            'Form Info': 'Citation info would go here'
        },
        {
            'Variable / Field Name': 'sscs_4',
            'Form Name': 'survey_measures',
            'Section Header': 'smoker_selfconcept_scale_from_qualtrics',
            'Field Label': 'Please indicate the extent to which you agree with the following statements...Smoking is a large part of my daily life.',
            'Choices, Calculations, OR Slider Labels': '7, Strongly Agree | 1, Strongly disagree | 3, Somewhat disagree | 5, Somewhat agree | 2, Disagree | 4, Neither agree nor disagree | 6, Agree',
            'Codebook Info': '<b>Smoker Self Concept Scale</b> <p>All five questions are asked, plus one addition ("Smoking defines me as a person")</p>',
            'Form Info': 'Citation info would go here'
        },
        {
            'Variable / Field Name': 'sscs_5',
            'Form Name': 'survey_measures',
            'Section Header': 'smoker_selfconcept_scale_from_qualtrics',
            'Field Label': 'Please indicate the extent to which you agree with the following statements...Others view smoking as part of my personality.',
            'Choices, Calculations, OR Slider Labels': '7, Strongly Agree | 1, Strongly disagree | 3, Somewhat disagree | 5, Somewhat agree | 2, Disagree | 4, Neither agree nor disagree | 6, Agree',
            'Codebook Info': '<b>Smoker Self Concept Scale</b> <p>All five questions are asked, plus one addition ("Smoking defines me as a person")</p>',
            'Form Info': 'Citation info would go here'
        },
        {
            'Variable / Field Name': 'alcohol_1',
            'Form Name': 'survey_measures',
            'Section Header': 'alcohol_questions_from_qualtrics',
            'Field Label': 'How often did you have a drink containing alcohol in the past 6 months?',
            'Choices, Calculations, OR Slider Labels': '11, Every day | 10, 5-6 times a week | 9, 3-4 times a week | 8, Twice a week | 7, Once a week | 6, 2-3 times a month | 5, Once a month | 4, 3-5 times in the past 6 months | 3, 1-2 times in the past 6 months | 2, I did not drink alcohol in the last 6 months, but I did drink in the past | 1, I never drank any alcohol in my life',
            'Codebook Info': '<b>Alcohol Questions</b> <p>Standard alcohol consumption screening</p>',
            'Form Info': 'Alcohol consumption patterns and history'
        },
        {
            'Variable / Field Name': 'cesd_1',
            'Form Name': 'survey_measures',
            'Section Header': 'cesd_depression_from_qualtrics',
            'Field Label': 'Below is a list of the ways you might have felt or behaved. Please tell me how often you have felt this way during the past week...I was bothered by things that usually don\'t bother me.',
            'Choices, Calculations, OR Slider Labels': '3, Most or all of the time (5-7 days) | 0, Rarely or none of the time (less than 1 day) | 2, Occasionally or a moderate amount of time (3-4 days) | 1, Some or a little of the time (1-2 days)',
            'Codebook Info': '<b>CESD Depression Scale</b> <p>Center for Epidemiologic Studies Depression Scale</p>',
            'Form Info': 'Standard depression screening instrument'
        },
        {
            'Variable / Field Name': 'cesd_2',
            'Form Name': 'survey_measures',
            'Section Header': 'cesd_depression_from_qualtrics',
            'Field Label': 'Below is a list of the ways you might have felt or behaved. Please tell me how often you have felt this way during the past week...I did not feel like eating; my appetite was poor.',
            'Choices, Calculations, OR Slider Labels': '3, Most or all of the time (5-7 days) | 0, Rarely or none of the time (less than 1 day) | 2, Occasionally or a moderate amount of time (3-4 days) | 1, Some or a little of the time (1-2 days)',
            'Codebook Info': '<b>CESD Depression Scale</b> <p>Center for Epidemiologic Studies Depression Scale</p>',
            'Form Info': 'Standard depression screening instrument'
        },
        {
            'Variable / Field Name': 'bis_1',
            'Form Name': 'survey_measures',
            'Section Header': 'barratt_impulsiveness_scale_from_qualtrics',
            'Field Label': 'People differ in the ways they act and think in different situations. This is a test to measure some of the ways in which you act and think. Read each statement and select the appropriate response. Do not spend too much time on any statement. Answer quickly and honestly. I plan tasks carefully.',
            'Choices, Calculations, OR Slider Labels': '1, Rarely/Never | 2, Occasionally | 3, Often | 4, Almost Always',
            'Codebook Info': '<b>Barratt Impulsiveness Scale</b> <p>Measures behavioral and cognitive impulsiveness</p>',
            'Form Info': 'Standard impulsiveness assessment tool'
        }
    ];
    
    const measures = getUniqueMeasures(psychometricData);
    createMeasureButtons(measures);
    
    if (measures.length > 0) {
        selectMeasure(measures[0]);
    }
}

// Function to load CSV data
async function loadPsychometricData() {
    const tbody = document.getElementById('measures-table-body');
    
    try {
        // Add debug info
        console.log('Attempting to load CSV data...');
        tbody.innerHTML = '<tr><td colspan="3" class="loading">Loading CSV file...</td></tr>';
        
        // Use the path set by Jekyll, with fallbacks
        const possiblePaths = [
            window.CSV_PATH, // Set by Jekyll in the HTML
            '/assets/data/psychometric_data.csv',
            './assets/data/psychometric_data.csv',
            '../assets/data/psychometric_data.csv',
            'psychometric_data.csv'
        ].filter(Boolean); // Remove undefined values
        
        let csvText = null;
        let loadedPath = null;
        
        for (const path of possiblePaths) {
            try {
                console.log('Trying path:', path);
                const response = await fetch(path);
                if (response.ok) {
                    csvText = await response.text();
                    loadedPath = path;
                    console.log('Successfully loaded from:', path);
                    break;
                } else {
                    console.log('Response not ok for path:', path, 'Status:', response.status);
                }
            } catch (e) {
                console.log('Failed to load from:', path, e.message);
            }
        }
        
        if (!csvText) {
            throw new Error('Could not load CSV from any path. Tried: ' + possiblePaths.join(', '));
        }
        
        tbody.innerHTML = '<tr><td colspan="3" class="loading">Parsing CSV data...</td></tr>';
        
        console.log('CSV text length:', csvText.length);
        console.log('First 200 characters:', csvText.substring(0, 200));
        
        // Debug: Look for BIS data in the raw CSV text
        const bisLinesInCSV = csvText.split('\n').filter(line => 
            line.includes('bis_') || line.includes('barratt_impulsiveness')
        );
        console.log('BIS lines found in raw CSV:', bisLinesInCSV.length);
        bisLinesInCSV.forEach((line, index) => {
            console.log(`BIS CSV line ${index + 1}:`, line.substring(0, 150) + '...');
        });
        
        psychometricData = parseCSV(csvText);
        console.log('Parsed data length:', psychometricData.length);
        console.log('Sample row:', psychometricData[0]);
        
        // Debug: Look for any BIS rows in the raw parsed data
        const rawBisData = psychometricData.filter(row => {
            const variable = row['Variable / Field Name'] || '';
            return variable.includes('bis_') || 
                   (row['Section Header'] && row['Section Header'].includes('barratt'));
        });
        console.log('Raw BIS data found:', rawBisData.length, 'rows');
        rawBisData.forEach((row, index) => {
            const variable = row['Variable / Field Name'] || '';
            const choices = row['Choices, Calculations, OR Slider Labels'] || '';
            console.log(`Raw BIS row ${index + 1}: ${variable}`);
            console.log(`  Raw choices data: "${choices}"`);
            console.log(`  Raw choices length: ${choices.length}`);
        });
        
        // Check column names
        if (psychometricData.length > 0) {
            console.log('Available columns:', Object.keys(psychometricData[0]));
        }
        
        // Filter for survey measures only - try different possible column name variations
        const possibleFormNames = ['Form Name', 'form_name', 'FormName', 'Form_Name'];
        const possibleSectionNames = ['Section Header', 'section_header', 'SectionHeader', 'Section_Header'];
        
        let formNameCol = null;
        let sectionCol = null;
        
        if (psychometricData.length > 0) {
            const columns = Object.keys(psychometricData[0]);
            formNameCol = possibleFormNames.find(name => columns.includes(name));
            sectionCol = possibleSectionNames.find(name => columns.includes(name));
            
            console.log('Found form name column:', formNameCol);
            console.log('Found section column:', sectionCol);
        }
        
        if (formNameCol && sectionCol) {
            psychometricData = psychometricData.filter(row => 
                row[formNameCol] === 'survey_measures' && 
                row[sectionCol] && 
                row[sectionCol].trim() !== ''
            );
        } else {
            console.warn('Could not find expected column names, showing all data');
        }
        
        console.log('Filtered data length:', psychometricData.length);
        
        // Debug: Check specifically for BIS data
        const bisData = psychometricData.filter(row => 
            row[sectionCol] && row[sectionCol].includes('barratt_impulsiveness')
        );
        console.log('BIS data found:', bisData.length, 'rows');
        bisData.forEach((row, index) => {
            const variable = row['Variable / Field Name'] || '';
            const choices = row['Choices, Calculations, OR Slider Labels'] || '';
            console.log(`BIS row ${index + 1}: ${variable}`);
            console.log(`  Choices data: "${choices}"`);
            console.log(`  Choices length: ${choices.length}`);
            console.log(`  Full row:`, row);
        });
        
        if (psychometricData.length === 0) {
            tbody.innerHTML = '<tr><td colspan="3" class="no-data">No survey measures found. Check the Form Name and Section Header columns.</td></tr>';
            return;
        }
        
        const measures = getUniqueMeasures(psychometricData);
        console.log('Found measures:', measures);
        
        createMeasureButtons(measures);
        
        // Select first measure by default
        if (measures.length > 0) {
            selectMeasure(measures[0]);
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