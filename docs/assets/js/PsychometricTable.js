// Reusable Psychometric Table Class
class PsychometricTable {
    constructor(options = {}) {
        // Configuration options with defaults
        this.config = {
            containerId: options.containerId || 'psychometric-container',
            csvPath: options.csvPath || null,
            csvData: options.csvData || null,
            maxVisibleRows: options.maxVisibleRows || 5,
            showMeasureButtons: options.showMeasureButtons !== false, // default true
            showMeasureInfo: options.showMeasureInfo !== false, // default true
            title: options.title || 'Psychometric Measures',
            
            // Column mappings - can be customized for different CSV structures
            columnMappings: {
                variable: options.columnMappings?.variable || ['Variable / Field Name', 'Variable', 'variable', 'field_name'],
                fieldLabel: options.columnMappings?.fieldLabel || ['Field Label'],
                fieldType: options.columnMappings?.fieldType || ['Field Type'],
                choices: options.columnMappings?.choices || ['Choices, Calculations, OR Slider Labels'],
                sectionHeader: options.columnMappings?.sectionHeader || ['Section Header', 'section_header', 'SectionHeader', 'Section_Header'],
                textValidationMin: options.columnMappings?.textValidationMin || ['Text Validation Min'],
                textValidationMax: options.columnMappings?.textValidationMax || ['Text Validation Max'],
                textValidationType: options.columnMappings?.textValidationType || ['Text Validation Type OR Show Slider Number', 'validation_type', 'Validation Type'],
                codebookInfo: options.columnMappings?.codebookInfo || ['Codebook Info', 'codebook_info', 'CodebookInfo', 'Codebook_Info'],
                formInfo: options.columnMappings?.formInfo || ['Form Info', 'form_info', 'FormInfo', 'Form_Info']
            },
            
            // CSS classes - can be customized
            cssClasses: {
                container: 'psychometric-table-container',
                measureButtons: 'measure-buttons',
                measureBtn: 'measure-btn',
                measureInfo: 'measure-info',
                table: 'measures-table',
                tableContainer: 'table-container',
                scrollHint: 'scroll-hint'
            }
        };
        
        // Instance variables
        this.data = [];
        this.currentMeasure = null;
        this.container = null;
        this.tableBody = null;
        this.measureInfo = null;
        this.measureButtons = null;
        
        // Initialize
        this.init();
    }
    
    init() {
        this.container = document.getElementById(this.config.containerId);
        if (!this.container) {
            console.error(`Container with ID '${this.config.containerId}' not found`);
            return;
        }
        
        this.createHTML();
        this.loadData();
    }
    
    createHTML() {
        const html = `
            <div class="${this.config.cssClasses.container}">
                ${this.config.showMeasureButtons ? `
                    <div class="measure-selector">
                        <h3>${this.config.title}</h3>
                        <div class="${this.config.cssClasses.measureButtons}"></div>
                    </div>
                ` : ''}
                
                ${this.config.showMeasureInfo ? `
                    <div class="${this.config.cssClasses.measureInfo}" style="display: none;"></div>
                ` : ''}
                
                <div class="${this.config.cssClasses.tableContainer}">
                    <table class="${this.config.cssClasses.table}">
                        <thead>
                            <tr>
                                <th>Variable</th>
                                <th>Question/Item</th>
                                <th>Response Options</th>
                            </tr>
                        </thead>
                        <tbody></tbody>
                    </table>
                    <div class="${this.config.cssClasses.scrollHint}" style="display: none;">
                        <small>↓ Scroll down to see more items ↓</small>
                    </div>
                </div>
            </div>
        `;
        
        this.container.innerHTML = html;
        
        // Get references to key elements
        this.tableBody = this.container.querySelector('tbody');
        this.measureInfo = this.container.querySelector(`.${this.config.cssClasses.measureInfo}`);
        this.measureButtons = this.container.querySelector(`.${this.config.cssClasses.measureButtons}`);
    }
    
    async loadData() {
        try {
            if (this.config.csvData) {
                // Use provided data
                this.data = Array.isArray(this.config.csvData) ? this.config.csvData : this.parseCSV(this.config.csvData);
            } else if (this.config.csvPath) {
                // Load from CSV file
                const response = await fetch(this.config.csvPath);
                const csvText = await response.text();
                this.data = this.parseCSV(csvText);
            } else {
                throw new Error('No CSV data or path provided');
            }
            
            console.log(`Loaded ${this.data.length} rows for table ${this.config.containerId}`);
            
            if (this.data.length > 0) {
                const measures = this.getUniqueMeasures();
                if (this.config.showMeasureButtons) {
                    this.createMeasureButtons(measures);
                }
                
                // Select first measure or show all items
                if (measures.length > 0) {
                    if (measures[0] === 'All Items') {
                        this.selectAllItems();
                    } else {
                        this.selectMeasure(measures[0]);
                    }
                }
            } else {
                this.showError('No data found in CSV');
            }
            
        } catch (error) {
            console.error(`Error loading data for table ${this.config.containerId}:`, error);
            this.showError(error.message);
        }
    }
    
    // Utility function to get column value with flexible column name matching
    getColumnValue(row, possibleNames) {
        for (const name of possibleNames) {
            if (row[name] !== undefined && row[name] !== null) {
                return row[name];
            }
        }
        return '';
    }
    
    // Check if a row is an instruction row
    isInstructionRow(row) {
        const variable = this.getColumnValue(row, this.config.columnMappings.variable);
        return variable.includes('_instructions') || 
               variable.includes('_intro') || 
               variable.endsWith('_inst') ||
               /^[a-zA-Z]+_0$/.test(variable);
    }
    
    // CSV parsing functions
    parseCSVRow(line) {
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
    
    parseCSV(csvText) {
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
        
        const headers = this.parseCSVRow(lines[0]);
        const data = [];
        for (let i = 1; i < lines.length; i++) {
            try {
                const values = this.parseCSVRow(lines[i]);
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
    
    // Get unique measures from data
    getUniqueMeasures() {
        if (this.data.length === 0) return ['All Items'];
        
        const columns = Object.keys(this.data[0]);
        const sectionCol = this.config.columnMappings.sectionHeader.find(name => columns.includes(name));
        
        if (!sectionCol) {
            return ['All Items'];
        }
        
        const measures = [...new Set(this.data.map(row => row[sectionCol]).filter(Boolean))];
        return measures.sort();
    }
    
    formatMeasureName(measure) {
        return measure
            .replace(/_from_qualtrics/g, '')
            .replace(/_/g, ' ')
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(' ');
    }
    
    createMeasureButtons(measures) {
        if (!this.measureButtons) return;
        
        this.measureButtons.innerHTML = '';
        
        measures.forEach(measure => {
            const button = document.createElement('button');
            button.className = this.config.cssClasses.measureBtn;
            button.textContent = measure === 'All Items' ? measure : this.formatMeasureName(measure);
            button.onclick = () => {
                if (measure === 'All Items') {
                    this.selectAllItems();
                } else {
                    this.selectMeasure(measure);
                }
            };
            this.measureButtons.appendChild(button);
        });
    }
    
    selectMeasure(measure) {
        this.currentMeasure = measure;
        
        // Update button states
        if (this.measureButtons) {
            this.measureButtons.querySelectorAll('button').forEach(btn => {
                btn.classList.remove('active');
                if (btn.textContent === this.formatMeasureName(measure)) {
                    btn.classList.add('active');
                }
            });
        }
        
        // Filter data for this measure
        const sectionCol = this.config.columnMappings.sectionHeader.find(name => 
            this.data.length > 0 && Object.keys(this.data[0]).includes(name)
        );
        
        let measureData;
        if (sectionCol) {
            measureData = this.data.filter(row => row[sectionCol] === measure);
        } else {
            measureData = this.data;
        }
        
        this.updateMeasureInfo(measureData);
        this.updateTable(measureData);
    }
    
    selectAllItems() {
        this.currentMeasure = 'All Items';
        
        // Update button states
        if (this.measureButtons) {
            this.measureButtons.querySelectorAll('button').forEach(btn => {
                btn.classList.remove('active');
                if (btn.textContent === 'All Items') {
                    btn.classList.add('active');
                }
            });
        }
        
        this.updateMeasureInfoAllItems();
        this.updateTable(this.data);
    }
    
    updateMeasureInfo(measureData) {
        if (!this.measureInfo) return;
        
        if (measureData.length === 0) {
            this.measureInfo.style.display = 'none';
            return;
        }
        
        const firstRow = measureData[0];
        const codebookInfo = this.getColumnValue(firstRow, this.config.columnMappings.codebookInfo);
        const formInfo = this.getColumnValue(firstRow, this.config.columnMappings.formInfo);
        const instructions = this.extractInstructions(measureData);
        
        const actualQuestions = measureData.filter(row => {
            const fieldType = this.getColumnValue(row, this.config.columnMappings.fieldType);
            return fieldType && fieldType.toLowerCase() !== 'descriptive' && !this.isInstructionRow(row);
        });
        
        let content = `<h3>${this.formatMeasureName(this.currentMeasure)} <span class="item-count">${actualQuestions.length} items</span></h3>`;
        
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
        
        this.measureInfo.innerHTML = content;
        this.measureInfo.style.display = 'block';
    }
    
    updateMeasureInfoAllItems() {
        if (!this.measureInfo) return;
        
        const actualQuestions = this.data.filter(row => {
            const fieldType = this.getColumnValue(row, this.config.columnMappings.fieldType);
            return fieldType && fieldType.toLowerCase() !== 'descriptive';
        });
        
        let content = `<h3>All Survey Items <span class="item-count">${actualQuestions.length} items</span></h3>`;
        content += `<p>Displaying all items from the dataset.</p>`;
        
        this.measureInfo.innerHTML = content;
        this.measureInfo.style.display = 'block';
    }
    
    updateTable(measureData) {
        if (measureData.length === 0) {
            this.tableBody.innerHTML = '<tr><td colspan="3" class="no-data">No data available for this measure.</td></tr>';
            return;
        }
        
        const instructions = this.extractInstructions(measureData);
        
        const questionData = measureData.filter(row => {
            const fieldType = this.getColumnValue(row, this.config.columnMappings.fieldType);
            return fieldType && fieldType.toLowerCase() !== 'descriptive' && !this.isInstructionRow(row);
        });
        
        if (questionData.length === 0) {
            this.tableBody.innerHTML = '<tr><td colspan="3" class="no-data">No question items found for this measure.</td></tr>';
            return;
        }
        
        const rows = questionData.map(row => {
            const variable = this.getColumnValue(row, this.config.columnMappings.variable);
            const rawQuestion = this.getColumnValue(row, this.config.columnMappings.fieldLabel);
            const question = this.cleanFieldLabel(rawQuestion, instructions);
            const fieldType = this.getColumnValue(row, this.config.columnMappings.fieldType);
            const choicesRaw = this.getColumnValue(row, this.config.columnMappings.choices);
            
            const responses = this.formatResponseOptions(choicesRaw, fieldType, row);
            
            return `
                <tr>
                    <td class="variable-column">${variable}</td>
                    <td class="question-column">${question}</td>
                    <td class="response-column">${responses}</td>
                </tr>
            `;
        }).join('');
        
        this.tableBody.innerHTML = rows;
        
        // Set up scrolling behavior
        this.setupTableScrolling();
    }
    
    setupTableScrolling() {
        const tableContainer = this.container.querySelector(`.${this.config.cssClasses.tableContainer}`);
        const scrollHint = this.container.querySelector(`.${this.config.cssClasses.scrollHint}`);
        
        if (!tableContainer) return;
        
        // Calculate height for maxVisibleRows
        const firstRow = tableContainer.querySelector('tbody tr');
        if (firstRow) {
            const rowHeight = firstRow.offsetHeight;
            const headerHeight = tableContainer.querySelector('thead').offsetHeight;
            const maxHeight = headerHeight + (rowHeight * this.config.maxVisibleRows) + 2; // +2 for borders
            
            tableContainer.style.maxHeight = `${maxHeight}px`;
            tableContainer.style.overflowY = 'auto';
        }
        
        // Show scroll hint if needed
        setTimeout(() => {
            if (tableContainer.scrollHeight > tableContainer.clientHeight) {
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
                if (scrollHint) scrollHint.style.display = 'none';
            }
        }, 100);
    }
    
    // Text cleaning and formatting functions (simplified versions of original)
    cleanFieldLabel(fieldLabel, instructions) {
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
    
    extractInstructions(measureData) {
        const instructionRows = measureData.filter(row => this.isInstructionRow(row));
        
        if (instructionRows.length > 0) {
            const instructionRow = instructionRows[0];
            const instructions = this.getColumnValue(instructionRow, this.config.columnMappings.fieldLabel);
            return this.cleanFieldLabel(instructions, null);
        }
        
        return null;
    }
    
    formatResponseOptions(choices, fieldType = null, row = null) {
        if (!choices || choices.trim() === '') {
            if (fieldType && fieldType.toLowerCase() === 'text') {
                return this.createTextBox(row);
            }
            return 'N/A';
        }
        
        if (fieldType && fieldType.toLowerCase() === 'text') {
            return this.createTextBox(row);
        }
        
        if (fieldType && fieldType.toLowerCase() === 'slider') {
            return this.createSimpleSlider(choices, row);
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
        
        let fieldTypeClass = 'response-options';
        if (fieldType) {
            if (fieldType.toLowerCase() === 'radio') {
                fieldTypeClass += ' response-options-radio';
            } else if (fieldType.toLowerCase() === 'checkbox') {
                fieldTypeClass += ' response-options-checkbox';
            }
        }
        
        return `<ul class="${fieldTypeClass}">${formattedOptions.map(opt => `<li>${opt}</li>`).join('')}</ul>`;
    }
    
    createSimpleSlider(choices, row) {
        const minValue = this.getColumnValue(row, this.config.columnMappings.textValidationMin);
        const maxValue = this.getColumnValue(row, this.config.columnMappings.textValidationMax);
        
        const cleanChoices = choices.replace(/\|\s*\|/g, '|');
        const parts = cleanChoices.split('|').map(part => part.trim()).filter(part => part !== '');
        
        const leftLabel = parts.length > 0 ? parts[0] : 'Min';
        const rightLabel = parts.length > 1 ? parts[parts.length - 1] : 'Max';
        
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
    
    createTextBox(row) {
        const minLength = this.getColumnValue(row, this.config.columnMappings.textValidationMin);
        const maxLength = this.getColumnValue(row, this.config.columnMappings.textValidationMax);
        const validationType = this.getColumnValue(row, this.config.columnMappings.textValidationType);
        
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
            } else if (validationType.toLowerCase().includes('time')) {
                placeholder = 'Enter date...';
            }
        }
        
        let validationInfo = '';
        if (minLength || maxLength || validationType) {
            const validationParts = [];
            if (validationType) validationParts.push(`Type: ${validationType}`);
            if (minLength) validationParts.push(`Min: ${minLength}`);
            if (maxLength) validationParts.push(`Max: ${maxLength}`);
            
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
    
    showError(message) {
        this.tableBody.innerHTML = `
            <tr><td colspan="3" class="no-data">
                <strong>Error:</strong> ${message}
            </td></tr>
        `;
    }
    
    // Public method to refresh data
    refresh() {
        this.loadData();
    }
    
    // Public method to update configuration
    updateConfig(newConfig) {
        Object.assign(this.config, newConfig);
        this.refresh();
    }
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PsychometricTable;
}