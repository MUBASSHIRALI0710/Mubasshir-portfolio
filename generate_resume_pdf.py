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

# Page margins in points: 10mm ~= 28pt (Max printable area for perfect 1-page ATS layout)
doc = SimpleDocTemplate(
    output_path,
    pagesize=A4,
    leftMargin=28,
    rightMargin=28,
    topMargin=24,
    bottomMargin=24,
)

styles = getSampleStyleSheet()

# Colors
primary_color = colors.HexColor("#0F172A")
accent_color = colors.HexColor("#C2410C")
text_color = colors.HexColor("#1E293B")
sub_color = colors.HexColor("#475569")
border_color = colors.HexColor("#CBD5E1")

style_name = ParagraphStyle(
    "Name",
    parent=styles["Normal"],
    fontName="Helvetica-Bold",
    fontSize=16.5,
    leading=19,
    textColor=primary_color,
    alignment=1,
    spaceAfter=1,
)

style_title = ParagraphStyle(
    "Title",
    parent=styles["Normal"],
    fontName="Helvetica-Bold",
    fontSize=9.5,
    leading=12,
    textColor=accent_color,
    alignment=1,
    spaceAfter=3,
)

style_contact = ParagraphStyle(
    "Contact",
    parent=styles["Normal"],
    fontName="Helvetica",
    fontSize=8.1,
    leading=10.5,
    textColor=sub_color,
    alignment=1,
    spaceAfter=4,
)

style_section_title = ParagraphStyle(
    "SectionTitle",
    parent=styles["Normal"],
    fontName="Helvetica-Bold",
    fontSize=8.8,
    leading=11,
    textColor=primary_color,
    spaceBefore=3.5,
    spaceAfter=1.5,
    textTransform="uppercase",
)

style_body = ParagraphStyle(
    "Body",
    parent=styles["Normal"],
    fontName="Helvetica",
    fontSize=8.1,
    leading=10.5,
    textColor=text_color,
)

style_bullet = ParagraphStyle(
    "Bullet",
    parent=styles["Normal"],
    fontName="Helvetica",
    fontSize=7.9,
    leading=10.1,
    textColor=text_color,
    leftIndent=10,
    firstLineIndent=-7,
    spaceAfter=1.2,
)

story = []

# --- Header ---
story.append(Paragraph("MUBASSHIR ALI", style_name))
story.append(Paragraph("AI / LLM Engineer &bull; Full Stack (Node.js &bull; TypeScript &bull; Next.js)", style_title))

contact_line = (
    "Pune, India &nbsp;|&nbsp; "
    "<a href='mailto:mubasshirali0710@gmail.com' color='#0284C7'>mubasshirali0710@gmail.com</a> &nbsp;|&nbsp; "
    "<a href='tel:+917003151313' color='#0284C7'>+91 70031 51313</a> &nbsp;|&nbsp; "
    "<a href='https://linkedin.com/in/mubasshir-ali0710' color='#0284C7'>LinkedIn</a> &nbsp;|&nbsp; "
    "<a href='https://github.com/MUBASSHIRALI0710' color='#0284C7'>GitHub</a> &nbsp;|&nbsp; "
    "<a href='https://leetcode.com/u/Mubasshirali0710' color='#0284C7'>LeetCode</a> &nbsp;|&nbsp; "
    "<a href='https://mubasshir-portfolio-henna.vercel.app' color='#0284C7'>Portfolio</a>"
)
story.append(Paragraph(contact_line, style_contact))
story.append(HRFlowable(width="100%", thickness=0.75, color=border_color, spaceBefore=0, spaceAfter=3))

# --- Professional Summary ---
story.append(Paragraph("PROFESSIONAL SUMMARY", style_section_title))
story.append(HRFlowable(width="100%", thickness=0.5, color=border_color, spaceBefore=0.5, spaceAfter=2.5))
summary_text = (
    "Hands-on AI/LLM and full-stack engineer who independently builds, ships, and maintains production AI-powered "
    "SaaS products. Integrated LLM APIs (OpenAI, AWS Bedrock with Amazon Nova Lite, Groq) into tool-calling agents; "
    "built Node.js/TypeScript backends and REST APIs with MongoDB, JWT security, schema validation, and Razorpay "
    "subscription billing with webhooks; deployed on Render, Vercel, and MongoDB Atlas. Strong in React/Next.js 15, "
    "third-party API integration, debugging, and security audits."
)
story.append(Paragraph(summary_text, style_body))

# --- Experience ---
story.append(Paragraph("EXPERIENCE", style_section_title))
story.append(HRFlowable(width="100%", thickness=0.5, color=border_color, spaceBefore=0.5, spaceAfter=2.5))

# Role 1: A1 Creations
exp1_table = Table(
    [
        [
            Paragraph("<b>Full Stack Development &amp; Deployment Engineer</b> &mdash; <i>A1 Creations</i>, Jaipur (Remote, Part-time)", style_body),
            Paragraph("<b>Oct 2026 &ndash; Present</b>", ParagraphStyle("Date", parent=style_body, alignment=2, textColor=sub_color)),
        ]
    ],
    colWidths=[420, 118],
)
exp1_table.setStyle(TableStyle([("VALIGN", (0, 0), (-1, -1), "TOP"), ("BOTTOMPADDING", (0, 0), (-1, -1), 0.5), ("TOPPADDING", (0, 0), (-1, -1), 0)]))
story.append(exp1_table)

story.append(Paragraph("&bull; Independently build new features and modify existing applications across frontend and backend for live client products.", style_bullet))
story.append(Paragraph("&bull; Integrate third-party APIs and AI services into existing applications.", style_bullet))
story.append(Paragraph("&bull; Deploy frontends, backends and databases; configure hosting, domains, DNS and SSL.", style_bullet))
story.append(Paragraph("&bull; Manage GitHub repositories; troubleshoot, debug and maintain live applications.", style_bullet))

# Role 2: AiKing Solutions
exp2_table = Table(
    [
        [
            Paragraph("<b>Next.js Developer Intern</b> &mdash; <i>AiKing Solutions</i>, Pune", style_body),
            Paragraph("<b>Aug 2026 &ndash; Nov 2026</b>", ParagraphStyle("Date", parent=style_body, alignment=2, textColor=sub_color)),
        ]
    ],
    colWidths=[420, 118],
)
exp2_table.setStyle(TableStyle([("VALIGN", (0, 0), (-1, -1), "TOP"), ("BOTTOMPADDING", (0, 0), (-1, -1), 0.5), ("TOPPADDING", (0, 0), (-1, -1), 0)]))
story.append(exp2_table)

story.append(Paragraph("&bull; Owned full-stack development of <b>NanoBrowser SaaS</b>, a subscription-based AI Chrome extension automating LinkedIn Easy Apply using LLM agents.", style_bullet))
story.append(Paragraph("&bull; Migrated core LLM layer from OpenAI to <b>AWS Bedrock (Amazon Nova Lite)</b> for tool-calling browser agents; designed Planner/Navigator architecture.", style_bullet))
story.append(Paragraph("&bull; Integrated Razorpay with 3-tier subscription plans and webhook-based billing, verified with end-to-end checkout testing.", style_bullet))
story.append(Paragraph("&bull; Built backend and REST APIs with Node.js, TypeScript, Express.js and MongoDB, secured with JWT authentication and Zod request validation.", style_bullet))
story.append(Paragraph("&bull; Ran security audits and resolved critical/high-severity findings; managed deployment on MongoDB Atlas and Render.", style_bullet))

# --- Projects ---
story.append(Paragraph("PROJECTS", style_section_title))
story.append(HRFlowable(width="100%", thickness=0.5, color=border_color, spaceBefore=0.5, spaceAfter=2.5))

# Project 1: AI Refund Agent
p1_table = Table(
    [
        [
            Paragraph("<b>AI Refund Support Agent</b> &bull; <i>Next.js 15, React 19, Node.js, Express.js, Groq LLM</i>", style_body),
            Paragraph("[<a href='https://github.com/MUBASSHIRALI0710/ai-refund-support-agent' color='#0284C7'>GitHub</a>]", ParagraphStyle("PDate", parent=style_body, alignment=2)),
        ]
    ],
    colWidths=[445, 93],
)
p1_table.setStyle(TableStyle([("VALIGN", (0, 0), (-1, -1), "TOP"), ("BOTTOMPADDING", (0, 0), (-1, -1), 0.5), ("TOPPADDING", (0, 0), (-1, -1), 0)]))
story.append(p1_table)
story.append(Paragraph("&bull; Built an agent validating refunds against 6 policy rules using 7 tool-calling functions, auto-approving or flagging high-value orders ($500+).", style_bullet))
story.append(Paragraph("&bull; Added backend verification layer to block ineligible refunds; passed 7/7 adversarial tests. Built real-time admin reasoning chain dashboard.", style_bullet))

# Project 2: AttendPro
p2_table = Table(
    [
        [
            Paragraph("<b>AttendPro &ndash; Smart Attendance Management System</b> &bull; <i>React.js, Node.js, Express.js, MongoDB, JWT</i>", style_body),
            Paragraph("[<a href='https://github.com/MUBASSHIRALI0710/AttendPro---Smart-Attendance-Management-System' color='#0284C7'>GitHub</a> &bull; <a href='https://attendpro-ruddy.vercel.app' color='#0284C7'>Demo</a>]", ParagraphStyle("PDate", parent=style_body, alignment=2)),
        ]
    ],
    colWidths=[400, 138],
)
p2_table.setStyle(TableStyle([("VALIGN", (0, 0), (-1, -1), "TOP"), ("BOTTOMPADDING", (0, 0), (-1, -1), 0.5), ("TOPPADDING", (0, 0), (-1, -1), 0)]))
story.append(p2_table)
story.append(Paragraph("&bull; Built full-stack system with CRUD APIs, date-wise tracking, search/filtering, duplicate roll validation, and analytics dashboards.", style_bullet))
story.append(Paragraph("&bull; Implemented JWT authentication with protected routes; deployed on Vercel and Render with MongoDB Atlas.", style_bullet))

# Project 3: Diabetes Prediction
p3_table = Table(
    [
        [
            Paragraph("<b>AI-Based Diabetes Prediction System</b> &bull; <i>Python, Scikit-learn, Flask, Docker</i>", style_body),
            Paragraph("[<a href='https://github.com/MUBASSHIRALI0710/DiabetesDiagnosisAI-ML' color='#0284C7'>GitHub</a> &bull; <a href='https://diabetesdiagnosis-ai-ml.onrender.com' color='#0284C7'>Demo</a>]", ParagraphStyle("PDate", parent=style_body, alignment=2)),
        ]
    ],
    colWidths=[400, 138],
)
p3_table.setStyle(TableStyle([("VALIGN", (0, 0), (-1, -1), "TOP"), ("BOTTOMPADDING", (0, 0), (-1, -1), 0.5), ("TOPPADDING", (0, 0), (-1, -1), 0)]))
story.append(p3_table)
story.append(Paragraph("&bull; Trained an SVM classifier (77.4% accuracy) on 8 clinical biometrics and served it through a lightweight Flask REST API deployed on Render.", style_bullet))

# --- Technical Skills ---
story.append(Paragraph("TECHNICAL SKILLS", style_section_title))
story.append(HRFlowable(width="100%", thickness=0.5, color=border_color, spaceBefore=0.5, spaceAfter=2.5))

skills_data = [
    [Paragraph("<b>AI &amp; LLM:</b>", style_body), Paragraph("OpenAI API, AWS Bedrock (Amazon Nova Lite), Groq, LLM Tool-Calling / Function Calling, Agentic Workflows, Prompt Engineering, RAG", style_body)],
    [Paragraph("<b>Languages:</b>", style_body), Paragraph("TypeScript, JavaScript (ES6+), Python, C++, SQL", style_body)],
    [Paragraph("<b>Frontend:</b>", style_body), Paragraph("React.js, Next.js 15, Redux Toolkit, Tailwind CSS, HTML5, CSS3", style_body)],
    [Paragraph("<b>Backend &amp; APIs:</b>", style_body), Paragraph("Node.js, Express.js, REST APIs, Third-Party API Integration, Webhooks, JWT Authentication, Zod Validation, Flask", style_body)],
    [Paragraph("<b>Databases:</b>", style_body), Paragraph("MongoDB, MongoDB Atlas, PostgreSQL, MySQL", style_body)],
    [Paragraph("<b>Cloud &amp; Payments:</b>", style_body), Paragraph("Razorpay Subscription Billing &amp; Webhooks, AWS Bedrock, Render, Vercel, Netlify, DNS/SSL/Domain Setup, Git, GitHub, Linux", style_body)],
    [Paragraph("<b>Fundamentals:</b>", style_body), Paragraph("Data Structures &amp; Algorithms, Postman, Security Audits, OOP, DBMS, Operating Systems, Computer Networks", style_body)],
]

skills_table = Table(skills_data, colWidths=[98, 440])
skills_table.setStyle(TableStyle([
    ("VALIGN", (0, 0), (-1, -1), "TOP"),
    ("TOPPADDING", (0, 0), (-1, -1), 0.4),
    ("BOTTOMPADDING", (0, 0), (-1, -1), 0.4),
]))
story.append(skills_table)

# --- Education & Achievements ---
story.append(Paragraph("EDUCATION &amp; ACHIEVEMENTS", style_section_title))
story.append(HRFlowable(width="100%", thickness=0.5, color=border_color, spaceBefore=0.5, spaceAfter=2.5))

edu_table = Table(
    [
        [
            Paragraph("<b>B.Tech in Computer Science &amp; Engineering</b> &mdash; Maulana Abul Kalam Azad University of Technology, West Bengal &bull; <b>GPA 8.57 / 10</b>", style_body),
            Paragraph("<b>2020 &ndash; 2024</b>", ParagraphStyle("EDate", parent=style_body, alignment=2, textColor=sub_color)),
        ]
    ],
    colWidths=[445, 93],
)
edu_table.setStyle(TableStyle([("VALIGN", (0, 0), (-1, -1), "TOP"), ("BOTTOMPADDING", (0, 0), (-1, -1), 0.5), ("TOPPADDING", (0, 0), (-1, -1), 0)]))
story.append(edu_table)

story.append(Paragraph("&bull; <b>LeetCode DSA:</b> Solved <b>200+ DSA problems</b> on LeetCode (<a href='https://leetcode.com/u/Mubasshirali0710' color='#0284C7'>leetcode.com/u/Mubasshirali0710</a>).", style_bullet))
story.append(Paragraph("&bull; <b>NASA Space Apps:</b> Participated in the <b>2023 NASA International Space Apps Challenge</b> (57,900+ participants, 152 countries) as part of a competing team.", style_bullet))
story.append(Paragraph("&bull; <b>Certifications:</b> C++ Data Structures &amp; Algorithms &ndash; Coder Army (2025) &bull; Legacy Responsive Web Design &ndash; freeCodeCamp (2026).", style_bullet))

# Build Document
doc.build(story)
print(f"Successfully generated clean ATS PDF resume at: {output_path}")
print(f"File size: {os.path.getsize(output_path)} bytes")
