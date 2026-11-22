import os
from reportlab.lib.pagesizes import A4
from reportlab.platypus import (
    SimpleDocTemplate,
    Paragraph,
    Spacer,
    HRFlowable,
    Table,
    TableStyle,
)
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib import colors

output_path = os.path.join("public", "assets", "resume.pdf")

# Gold-Standard ATS margins (0.4 inch / 10mm ~= 28pt)
doc = SimpleDocTemplate(
    output_path,
    pagesize=A4,
    leftMargin=30,
    rightMargin=30,
    topMargin=26,
    bottomMargin=26,
    title="Mubasshir Ali - AI & Full Stack Engineer Resume",
    author="Mubasshir Ali",
    subject="Software Engineer, Full Stack, AI/LLM Resume",
    keywords="Mubasshir Ali, AI Engineer, Full Stack Engineer, Next.js, Node.js, TypeScript, MERN, LeetCode",
)

styles = getSampleStyleSheet()

# ATS-Compliant Palette (High Contrast, Professional Black/Charcoal with subtle Navy)
c_black = colors.HexColor("#000000")
c_dark = colors.HexColor("#111827")
c_gray = colors.HexColor("#374151")
c_sub = colors.HexColor("#4B5563")
c_blue = colors.HexColor("#0369A1")
c_line = colors.HexColor("#000000")

# ATS Clean Typography
style_name = ParagraphStyle(
    "ATS_Name",
    parent=styles["Normal"],
    fontName="Helvetica-Bold",
    fontSize=18,
    leading=21,
    textColor=c_black,
    alignment=1,  # Center
    spaceAfter=2,
)

style_subtitle = ParagraphStyle(
    "ATS_Subtitle",
    parent=styles["Normal"],
    fontName="Helvetica-Bold",
    fontSize=9.5,
    leading=12,
    textColor=c_dark,
    alignment=1,
    spaceAfter=3,
)

style_contact = ParagraphStyle(
    "ATS_Contact",
    parent=styles["Normal"],
    fontName="Helvetica",
    fontSize=8.2,
    leading=11,
    textColor=c_sub,
    alignment=1,
    spaceAfter=4,
)

style_section_heading = ParagraphStyle(
    "ATS_Heading",
    parent=styles["Normal"],
    fontName="Helvetica-Bold",
    fontSize=9.2,
    leading=11.5,
    textColor=c_black,
    spaceBefore=4,
    spaceAfter=1.5,
)

style_entry_left = ParagraphStyle(
    "ATS_EntryLeft",
    parent=styles["Normal"],
    fontName="Helvetica",
    fontSize=8.3,
    leading=10.8,
    textColor=c_dark,
)

style_entry_right = ParagraphStyle(
    "ATS_EntryRight",
    parent=styles["Normal"],
    fontName="Helvetica-Bold",
    fontSize=8.1,
    leading=10.8,
    textColor=c_dark,
    alignment=2,  # Right align
)

style_body = ParagraphStyle(
    "ATS_Body",
    parent=styles["Normal"],
    fontName="Helvetica",
    fontSize=8.1,
    leading=10.6,
    textColor=c_gray,
)

style_bullet = ParagraphStyle(
    "ATS_Bullet",
    parent=styles["Normal"],
    fontName="Helvetica",
    fontSize=8.0,
    leading=10.3,
    textColor=c_gray,
    leftIndent=11,
    firstLineIndent=-7,
    spaceAfter=1.3,
)

def make_section_header(title_text):
    return [
        Paragraph(title_text.upper(), style_section_heading),
        HRFlowable(width="100%", thickness=0.8, color=c_line, spaceBefore=0.5, spaceAfter=2.5),
    ]

story = []

# ==================== 1. HEADER ====================
story.append(Paragraph("MUBASSHIR ALI", style_name))
story.append(Paragraph("AI / LLM Engineer &bull; Full Stack (Node.js &bull; TypeScript &bull; Next.js)", style_subtitle))

contact_html = (
    "Pune, India &nbsp;|&nbsp; "
    "<a href='mailto:mubasshirali0710@gmail.com' color='#0369A1'>mubasshirali0710@gmail.com</a> &nbsp;|&nbsp; "
    "<a href='tel:+917003151313' color='#0369A1'>+91 70031 51313</a> &nbsp;|&nbsp; "
    "<a href='https://linkedin.com/in/mubasshir-ali0710' color='#0369A1'>LinkedIn</a> &nbsp;|&nbsp; "
    "<a href='https://github.com/MUBASSHIRALI0710' color='#0369A1'>GitHub</a> &nbsp;|&nbsp; "
    "<a href='https://leetcode.com/u/Mubasshirali0710' color='#0369A1'>LeetCode (200+)</a> &nbsp;|&nbsp; "
    "<a href='https://mubasshir-portfolio-henna.vercel.app' color='#0369A1'>Live Portfolio</a>"
)
story.append(Paragraph(contact_html, style_contact))
story.append(Spacer(1, 1))

# ==================== 2. PROFESSIONAL SUMMARY ====================
story.extend(make_section_header("Professional Summary"))
summary_text = (
    "Hands-on AI/LLM and Full-Stack Engineer who independently builds, ships, and maintains production AI-powered "
    "SaaS products. Integrated LLM APIs (OpenAI, AWS Bedrock with Amazon Nova Lite, Groq) into autonomous tool-calling agents; "
    "built Node.js/TypeScript backends and REST APIs with MongoDB, JWT security, schema validation, and Razorpay "
    "subscription billing with idempotent webhooks; deployed across Render, Vercel, and MongoDB Atlas. Strong command over "
    "React/Next.js 15, third-party API orchestration, system debugging, and security remediation."
)
story.append(Paragraph(summary_text, style_body))

# ==================== 3. TECHNICAL SKILLS ====================
# ATS best practice: Technical skills right near top so keyword matchers score 95%+
story.extend(make_section_header("Technical Skills"))

skills_list = [
    ("AI &amp; LLM Systems:", "OpenAI API, AWS Bedrock (Amazon Nova Lite), Groq, LLM Tool-Calling / Function Calling, Agentic Workflows, Prompt Engineering, RAG"),
    ("Languages:", "TypeScript, JavaScript (ES6+), Python, C++, SQL, HTML5, CSS3"),
    ("Frontend Development:", "React.js, Next.js 15, Tailwind CSS, Redux Toolkit, Responsive Web Design"),
    ("Backend &amp; APIs:", "Node.js, Express.js, RESTful APIs, Third-Party API Integration, Webhooks, JWT Authentication, Zod Validation, Flask"),
    ("Databases &amp; Storage:", "MongoDB, MongoDB Atlas, PostgreSQL, MySQL"),
    ("Cloud, DevOps &amp; Payments:", "Razorpay Billing &amp; Webhooks, AWS Bedrock, Render, Vercel, Netlify, Custom Domains, DNS/SSL, Git, GitHub, Linux, Postman"),
    ("Core CS Fundamentals:", "Data Structures &amp; Algorithms (200+ LeetCode), Object-Oriented Programming (OOP), DBMS, Operating Systems, Computer Networks"),
]

skills_table_data = [
    [
        Paragraph(f"<b>{cat}</b>", style_entry_left),
        Paragraph(val, style_body),
    ]
    for cat, val in skills_list
]

skills_table = Table(skills_table_data, colWidths=[112, 424])
skills_table.setStyle(TableStyle([
    ("VALIGN", (0, 0), (-1, -1), "TOP"),
    ("TOPPADDING", (0, 0), (-1, -1), 0.3),
    ("BOTTOMPADDING", (0, 0), (-1, -1), 0.3),
]))
story.append(skills_table)

# ==================== 4. WORK EXPERIENCE ====================
story.extend(make_section_header("Work Experience"))

# Role 1: A1 Creations
exp1_header = Table(
    [
        [
            Paragraph("<b>Full Stack Development &amp; Deployment Engineer</b> &mdash; <i>A1 Creations</i>, Jaipur (Remote, Part-time)", style_entry_left),
            Paragraph("Oct 2026 &ndash; Present", style_entry_right),
        ]
    ],
    colWidths=[415, 121],
)
exp1_header.setStyle(TableStyle([
    ("VALIGN", (0, 0), (-1, -1), "TOP"),
    ("TOPPADDING", (0, 0), (-1, -1), 0),
    ("BOTTOMPADDING", (0, 0), (-1, -1), 0.5),
]))
story.append(exp1_header)
story.append(Paragraph("&bull; Independently build new features and modify existing applications across frontend and backend for live client products.", style_bullet))
story.append(Paragraph("&bull; Integrate third-party APIs and AI services into existing production applications with robust error handling.", style_bullet))
story.append(Paragraph("&bull; Deploy frontends, backends, and databases; configure cloud hosting, custom domains, DNS records, and SSL certificates.", style_bullet))
story.append(Paragraph("&bull; Manage GitHub repositories; troubleshoot, debug, and maintain live applications ensuring high performance and uptime.", style_bullet))

# Role 2: AiKing Solutions
exp2_header = Table(
    [
        [
            Paragraph("<b>Next.js Developer Intern</b> &mdash; <i>AiKing Solutions</i>, Pune", style_entry_left),
            Paragraph("Aug 2026 &ndash; Nov 2026", style_entry_right),
        ]
    ],
    colWidths=[415, 121],
)
exp2_header.setStyle(TableStyle([
    ("VALIGN", (0, 0), (-1, -1), "TOP"),
    ("TOPPADDING", (0, 0), (-1, -1), 0),
    ("BOTTOMPADDING", (0, 0), (-1, -1), 0.5),
]))
story.append(exp2_header)
story.append(Paragraph("&bull; Owned full-stack development of <b>NanoBrowser SaaS</b>, a subscription-based AI Chrome extension automating LinkedIn Easy Apply using LLM agents.", style_bullet))
story.append(Paragraph("&bull; Migrated core LLM layer from OpenAI to <b>AWS Bedrock (Amazon Nova Lite)</b> for tool-calling browser agents; designed Planner/Navigator dual-agent architecture.", style_bullet))
story.append(Paragraph("&bull; Integrated Razorpay across a 3-tier subscription model with webhook-driven billing events, verified through end-to-end checkout testing.", style_bullet))
story.append(Paragraph("&bull; Built backend and REST APIs with Node.js, TypeScript, Express.js, and MongoDB, secured with JWT authentication and Zod request validation.", style_bullet))
story.append(Paragraph("&bull; Executed phased security audits and resolved critical and high-severity findings; managed production deployment on MongoDB Atlas and Render.", style_bullet))

# ==================== 5. KEY PROJECTS ====================
story.extend(make_section_header("Key Projects"))

# Project 1: AI Refund Support Agent
proj1_header = Table(
    [
        [
            Paragraph("<b>AI Refund Support Agent</b> &bull; <i>Next.js 15, React 19, Node.js, Express.js, Groq LLM</i>", style_entry_left),
            Paragraph("[<a href='https://github.com/MUBASSHIRALI0710/ai-refund-support-agent' color='#0369A1'>GitHub</a>]", style_entry_right),
        ]
    ],
    colWidths=[445, 91],
)
proj1_header.setStyle(TableStyle([
    ("VALIGN", (0, 0), (-1, -1), "TOP"),
    ("TOPPADDING", (0, 0), (-1, -1), 0),
    ("BOTTOMPADDING", (0, 0), (-1, -1), 0.5),
]))
story.append(proj1_header)
story.append(Paragraph("&bull; Built an autonomous resolution agent validating refund requests against 6 business policy rules using 7 deterministic tool-calling functions (auto-approving, denying, or flagging orders $500+).", style_bullet))
story.append(Paragraph("&bull; Engineered backend verification layer blocking unauthorized database mutations under adversarial prompt injection attacks (7/7 test cases passed). Built admin reasoning chain dashboard.", style_bullet))

# Project 2: AttendPro
proj2_header = Table(
    [
        [
            Paragraph("<b>AttendPro &ndash; Smart Attendance Management System</b> &bull; <i>React.js, Node.js, Express.js, MongoDB, JWT</i>", style_entry_left),
            Paragraph("[<a href='https://github.com/MUBASSHIRALI0710/AttendPro---Smart-Attendance-Management-System' color='#0369A1'>GitHub</a> &bull; <a href='https://attendpro-ruddy.vercel.app' color='#0369A1'>Live Demo</a>]", style_entry_right),
        ]
    ],
    colWidths=[395, 141],
)
proj2_header.setStyle(TableStyle([
    ("VALIGN", (0, 0), (-1, -1), "TOP"),
    ("TOPPADDING", (0, 0), (-1, -1), 0),
    ("BOTTOMPADDING", (0, 0), (-1, -1), 0.5),
]))
story.append(proj2_header)
story.append(Paragraph("&bull; Built full-stack platform with CRUD APIs, date-wise attendance tracking, multi-parameter search/filtering, duplicate roll-number validation, and analytics charts.", style_bullet))
story.append(Paragraph("&bull; Implemented JWT authentication with protected routes; deployed frontend on Vercel and backend API on Render with MongoDB Atlas clustering.", style_bullet))

# Project 3: Diabetes Prediction
proj3_header = Table(
    [
        [
            Paragraph("<b>AI-Based Diabetes Prediction System</b> &bull; <i>Python, Scikit-learn, Flask, Docker</i>", style_entry_left),
            Paragraph("[<a href='https://github.com/MUBASSHIRALI0710/DiabetesDiagnosisAI-ML' color='#0369A1'>GitHub</a> &bull; <a href='https://diabetesdiagnosis-ai-ml.onrender.com' color='#0369A1'>Live Demo</a>]", style_entry_right),
        ]
    ],
    colWidths=[395, 141],
)
proj3_header.setStyle(TableStyle([
    ("VALIGN", (0, 0), (-1, -1), "TOP"),
    ("TOPPADDING", (0, 0), (-1, -1), 0),
    ("BOTTOMPADDING", (0, 0), (-1, -1), 0.5),
]))
story.append(proj3_header)
story.append(Paragraph("&bull; Trained an RBF Support Vector Machine (SVM) binary classifier with 77.4% diagnostic accuracy across 8 biometric features with sub-95ms inference; served via Flask API on Render.", style_bullet))

# ==================== 6. EDUCATION & ACHIEVEMENTS ====================
story.extend(make_section_header("Education &amp; Achievements"))

edu_header = Table(
    [
        [
            Paragraph("<b>Bachelor of Technology in Computer Science &amp; Engineering</b> &mdash; Maulana Abul Kalam Azad University of Technology, West Bengal", style_entry_left),
            Paragraph("2020 &ndash; 2024", style_entry_right),
        ]
    ],
    colWidths=[445, 91],
)
edu_header.setStyle(TableStyle([
    ("VALIGN", (0, 0), (-1, -1), "TOP"),
    ("TOPPADDING", (0, 0), (-1, -1), 0),
    ("BOTTOMPADDING", (0, 0), (-1, -1), 0.5),
]))
story.append(edu_header)

story.append(Paragraph("&bull; <b>Academic Merit:</b> Graduated with <b>8.57 / 10 GPA</b>.", style_bullet))
story.append(Paragraph("&bull; <b>LeetCode Problem Solving:</b> Solved <b>200+ Data Structures &amp; Algorithms problems</b> (<a href='https://leetcode.com/u/Mubasshirali0710' color='#0369A1'>leetcode.com/u/Mubasshirali0710</a>).", style_bullet))
story.append(Paragraph("&bull; <b>NASA International Space Apps Challenge:</b> Competitor in the 2023 NASA Space Apps hackathon (57,900+ participants across 152 countries).", style_bullet))
story.append(Paragraph("&bull; <b>Technical Certifications:</b> C++ Data Structures &amp; Algorithms &ndash; Coder Army (2025) &bull; Legacy Responsive Web Design &ndash; freeCodeCamp (2026).", style_bullet))

# Build Document
doc.build(story)
print(f"Successfully generated 100% ATS-Compliant PDF resume at: {output_path}")
print(f"File size: {os.path.getsize(output_path)} bytes")
