---
layout: resources-subpage
title: "Study Log"
nav_title: "📋 Study Log"
parent_page: "/resources"
parent_name: "Resources"
show_breadcrumb: true
---

# How Our Advanced Study Log System Transformed Research Operations

<div class="highlight-box">
<p><strong>Managing your project with Google Sheets:</strong></p>
<ul>
<li>Our longitudinal behavioral research study successfully tracked over 300 participants through a complex multi-phase intervention using a sophisticated study log system, achieving high compliance and seamless team coordination. Our robust study log helped give us a visual overview of every participant's progress, compliance, and road-blocks. It was adaptable and provided a clear guide on the steps each participant required to ensure every participant received proper attention.</li>
<li>We have provided below a link to a sample template of the actual study log we used, containing sample data showcasing some of the logic and abilities of our study log. We encourage researchers to use it for inspiration or as a base to help manage your own project!</li>
<li>Please reach out with any questions you might have at 📧 <a href="mailto:geo@falklab.org">geo@falklab.org</a></li>
</ul>
</div>

<div class="cta-container">
<a href="#" class="btn btn-outline btn-disabled">
📋 Access Study Log Template
</a>
</div>

*The Study Log Template is a comprehensive Google Sheets workbook containing our actual study management system with example participant data. Explore the automated formulas, compliance tracking, and messaging systems that powered our 300+ participant study. Note, this is NOT real data.* 

## Study Overview

Our study involved a 6-week behavioral intervention examining store visit patterns with daily ecological momentary assessments (EMA). Participants progressed through recruitment, screening, 14-day baseline data collection, intervention assignment, 4-week intervention period, and follow-up assessments. The complexity of tracking daily compliance, automated messaging, payment calculations, and multi-platform data integration demanded a robust organizational system.

---

## The Challenge: Managing Complex Longitudinal Data

**Before implementing our advanced study log system, we faced:**

- **Scattered tracking**: Participant information spread across multiple platforms (REDCap, Qualtrics, LifeData, Calendly, Geo-tracking, Google Voice, Google Sheets, Slack)
- **Manual compliance monitoring**: Time-intensive daily checks of EMA completion rates
- **Inconsistent communication**: Ad-hoc participant messaging leading to compliance gaps
- **Complex payment calculation**: Complex payment rules ($95 base + EMA/store visit compliance bonuses + receipt payments)
- **Training bottlenecks**: New team members required extensive training to understand workflow complexities
- **Limited real-time oversight**: Difficulty identifying at-risk participants before problems escalated

---

## Our Solution: Integrated Study Log System

We developed a comprehensive Google Sheets workbook that served as the central nervous system for our entire study operation.

## 🌟 Template Highlights

**What makes our study log system exceptional:**

<div class="resource-grid">
    <div class="resource-item">
        <h4>📋 Step-by-Step Instructions</h4>
        <p>Comprehensive guidance for logging participant progress through online sessions, baseline data collection, and intervention tasks with clear protocols at every stage.</p>
    </div>
    <div class="resource-item">
        <h4>🤖 Automated Participant Rows</h4>
        <p>Self-generating participant entries that automatically propagate progress tracking throughout the entire study workflow without manual setup.</p>
    </div>
    <div class="resource-item">
        <h4>⚠️ Smart Task Highlighting</h4>
        <p>Automated highlighting system for tasks requiring manual updates including LifeData progress monitoring, receipt compliance checks, and participant text message updates.</p>
    </div>
</div>

---

### 🔄 Automated Workflow Management

<div class="resource-grid">
    <div class="resource-item">
        <h4>Seamless Participant Flow</h4>
        <p>Real-time tracking from initial Calendly scheduling through final payment with automated status updates and conditional formatting.</p>
    </div>
    <div class="resource-item">
        <h4>Task Generation</h4>
        <p>Automated task creation for staff based on participant progress, eliminating manual monitoring and ensuring no steps are missed. Comprehensive logs, conditionally highlighted tasks, dropdown completion to propagate participant statuses.</p>
    </div>
    <div class="resource-item">
        <h4>Platform Integration</h4>
        <p>Integration touchpoints with all external platforms (REDCap, Qualtrics, LifeData) for comprehensive cross-platform tracking.</p>
    </div>
</div>

### 📊 Intelligent Compliance Monitoring

<div class="resource-grid">
    <div class="resource-item">
        <h4>Daily EMA Tracking</h4>
        <p>Automated compliance calculations with cells highlighted for updates and real-time progress monitoring.</p>
    </div> 
    <div class="resource-item">
        <h4>Predictive Modeling</h4>
        <p>Early identification of participants at risk of falling below compliance thresholds before issues escalate.</p>
    </div>
    <div class="resource-item">
        <h4>Receipt Management</h4>
        <p>Store visit receipt tracking with automated progress updates and completion milestone alerts.</p>
    </div>
</div>

### 💬 Automated Participant Communication

Custom LAMBDA functions generated personalized compliance messages with tiered messaging based on performance:

| Performance Level | Compliance Rate | Message Type | Example |
|------------------|-----------------|--------------|---------|
| **High Performers** | 85-100% | Encouragement | *"Your response rate is well above the 75% mark. You are doing a great job!"* |
| **Moderate Performers** | 75-84% | Motivational | *"Your response rate is almost at the 75% mark, keep up the great job!"* |
| **At-Risk** | 60-74% | Support | *"Your response rate needs improvement. Let's discuss strategies to help you succeed."* |
| **Low Performers** | <60% | Intervention | *"Immediate support needed. Please contact our team to discuss next steps."* |

<div class="image-set-container">
    <div class="image-set-caption">
        <strong>Named Functions:</strong> As our functions became more complex, we began to utilize Google Sheet's Named Functions to create compound functions that let us manage our complex functions in a way that was easier to understand and edit.
    </div>
    <div class="image-pair-small">
         <div>
            <img src="{{ '/assets/images/resources/studylog/studylog_functions2.png' | relative_url }}" alt="EMA text function">
            <div class="image-individual-caption">We decoupled the generated text messages from the logic used to check a participant's potential progress</div>
        </div>
        <div>
            <img src="{{ '/assets/images/resources/studylog/studylog_functions1.png' | relative_url }}" alt="EMA calculation text function">
            <div class="image-individual-caption">We used a separate function to select the message based on the participant's current and potential progress</div>
        </div>
    </div>
</div>

### 💰 Sophisticated Payment Management

<div class="resource-grid">
    <div class="resource-item">
        <h4>Automated Calculations</h4>
        <p><strong>Base Payment:</strong> $95 completion bonus<br>
        <strong>EMA Compliance:</strong> Performance-based bonuses<br>
        <strong>Receipt Payments:</strong> $5 per receipt submitted<br>
        <strong>Performance Bonus:</strong> $50 for meeting all criteria</p>
    </div>
    <div class="resource-item">
        <h4>Real-Time Tracking</h4>
        <p>Live payment calculations preventing overpayments and underpayments with comprehensive audit trails for all decisions.</p>
    </div>
</div>

---

### Operational Achievements

<div class="research-grid">
    <div class="research-item">
        <h4>⚡ Efficiency Gains</h4>
        <p>Dramatic reduction in manual tracking time through comprehensive automation</p>
    </div>
    
    <div class="research-item">
        <h4>👥 Team Coordination</h4>
        <p>Seamless coordination enabling flexible research team management</p>
    </div>
    
    <div class="research-item">
        <h4>📈 Quality Improvement</h4>
        <p>Enhanced data quality and participant experience through systematic tracking</p>
    </div>
</div>

---

## How the System Drove High Compliance

### Proactive Intervention Strategy

Our system identified compliance patterns before they became problems. When participants showed early warning signs—delayed survey starts or consecutive missed days—automated flags triggered immediate staff outreach.

> **Result:** This proactive approach helped us achieve exceptional compliance rates and dramatically reduce participant attrition.

### Personalized Engagement

The automated messaging system delivered tailored communications based on individual performance, making participants feel individually monitored and supported rather than part of a mass study.

### Transparent Progress Tracking

Participants could see their real-time progress during check-ins, creating accountability and motivation. The system calculated exactly how many receipts were needed for full payment, providing clear, achievable goals.

---

## Progress Tracking

### Multi-Level Visibility Dashboard

The system provided different views optimized for different needs:

| View Level | Focus Area | Key Metrics |
|------------|------------|-------------|
| **Participant-Level** | Individual tracking | Complete history, current status, next actions |
| **Cohort-Level** | Group progress | Phase completion rates, timeline adherence |
| **Study-Level** | Overall metrics | Enrollment, retention, completion statistics |
| **Staff-Level** | Team management | Workload distribution, task completion |

### Conditional Highlighting

<div class="image-set-container">
    <div class="image-set-caption">
        <strong>Highlighting Tasks:</strong> We included many rules in our study log to give an easy overview of participant progress, highlighting cells to pay attention to or that need to be updated
    </div>
    <div class="image-pair-small">
         <div>
            <img src="{{ '/assets/images/resources/studylog/studylog_compliance.png' | relative_url }}" alt="EMA text function">
            <div class="image-individual-caption">Highlighted cells to alert research staff to update that date with the participant's EMA response rate for that day</div>
        </div>
        <div>
            <img src="{{ '/assets/images/resources/studylog/studylog_conditionalformatting.png' | relative_url }}" alt="EMA calculation text function">
            <div class="image-individual-caption">Conditional formatting was used in sheets to alert to dates that needed to be updated, dates when texts needed to be sent, surveys needed to be checked, or tasks needed to be completed</div>
        </div>
    </div>
</div>

### Intervention Monitoring

The system tracked which strategies worked best:

- **Message response rates** by participant demographics
- **Compliance improvement** following different outreach approaches
- **Payment incentive effectiveness** across participant profiles

---
## Training & Team Development Impact

### Rapid Onboarding

<div class="highlight-box">
<p><strong>Training Time Reduced:</strong> New team members became productive within <strong>3-5 days</strong> instead of the previous 2-3 weeks.</p>
</div>

**The system provided:**

<div class="resource-grid">
    <div class="resource-item">
        <h4>Visual Workflow Guidance</h4>
        <p>Each sheet included clear next-steps and decision trees for intuitive navigation</p>
    </div>
    
    <div class="resource-item">
        <h4>Built-in Quality Checks</h4>
        <p>Formulas and dropdown menus prevented common beginner mistakes and ensured consistency</p>
    </div>
    
    <div class="resource-item">
        <h4>Comprehensive Documentation</h4>
        <p>Every process was documented within the system for self-service learning</p>
    </div>
    
    <div class="resource-item">
        <h4>Standardized Procedures</h4>
        <p>Eliminated variability in how different staff handled similar situations</p>
    </div>
</div>

### Cross-Training Efficiency & Knowledge Preservation

Staff could easily cover for colleagues because all procedures were systematized. When experienced team members left, their expertise remained embedded in the system rather than walking out the door.

---

## Long-Term Impact & Lessons Learned

### Research Quality Enhancement

The comprehensive tracking enabled sophisticated analyses:

- **Detailed compliance trajectories** rather than simple completion rates
- **Intervention timing analysis** showing optimal contact strategies
- **Demographic-specific response patterns** informing future study design

**Long-term savings included:**
- Reduced staff time per participant managed
- Elimination of costly errors in payments and scheduling
- Increased retention through efficient operations
- Higher data quality reducing analysis complications

---

## Recommendations for Future Implementation

<div class="method-card">
    <h4>🏗️ Investment in Setup</h4>
    <p>Dedicate 2-3 weeks for initial system development and testing. This upfront investment pays dividends throughout the study lifecycle.</p>
</div>

<div class="method-card">
    <h4>👥 Team Training Priority</h4>
    <p>Train all staff on the system logic, not just their specific tasks. This creates flexibility and reduces single points of failure.</p>
</div>

<div class="method-card">
    <h4>🔄 Continuous Improvement</h4>
    <p>Build in feedback loops to refine the system based on real-world usage. Our system evolved significantly from initial design to final implementation.</p>
</div>

<div class="method-card">
    <h4>📚 Documentation Excellence</h4>
    <p>Maintain comprehensive documentation within the system itself. Future teams will thank you for embedded guidance and rationale.</p>
</div>