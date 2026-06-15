import connectMongoDB from "../config/mongodb.config.js";
import dotenv from "dotenv";
import resume from '../models/resume.model.js'


dotenv.config()

const seedResume = async () => {
    try {
        await connectMongoDB()

        // Delete existing data first
        await resume.deleteMany({})

        // Insert your real resume
        await resume.create({
            name: 'Shaahil Abraham Kuruvilla',
            title: 'Senior Full Stack Developer',
            location: 'Brisbane Australia',
            email: 'shaahilabraham1996@gmail.com',
            phone: '0470354818',
            github: 'https://github.com/ShaahilAbraham',
            linkedin: 'https://www.linkedin.com/in/shaahil-abraham-350a301bb/',
            summary: 'Brisbane-based Senior Software Engineer with 7+ years of enterprise SaaS experience — Java,\n' +
                'Spring Boot, React, and Microservices at scale across global clients. Experienced in AI-integrated\n' +
                'systems including RAG pipelines, LLM APIs, and Spring AI. AWS Certified. Recently relocated to\n' +
                'Brisbane with full Australian work rights, no sponsorship required.',

            experience: [
                {
                    company: 'Alight Solutions',
                    role: 'IT Software Engineer',
                    location: 'Noida India',
                    from: 'Sep 2025',
                    to: 'Jan 2026',
                    bullets: [
                        'Owned end-to-end production support across 50+ enterprise clients, maintaining 99.9%\n' +
                        'application stability, resolving 4+ incidents per week within SLA and reducing aging backlog\n' +
                        'by 30% in 3 months with ticket re-open rates below 5%',
                        'Delivered backend enhancements using Spring Boot microservices and REST APIs, driving\n' +
                        'continuous platform improvement across the CBA system'
                    ],
                    tech: ['Java', 'Spring Boot', 'Microservices', 'REST APIs', 'Oracle SQL', 'Jenkins']
                },
                {
                    company: 'Wipro',
                    role: 'Senior Software Engineer',
                    location: 'Noida India',
                    from: 'Jul 2022',
                    to: 'Sep 2025',
                    bullets: [
                        'Led deployment automation for the CBA platform, cutting manual intervention by 50% and\n' +
                        'accelerating release cycles through full CI/CD ownership — resolved 4+ high-priority tickets\n' +
                        'per week as part of the SWAT team, reducing critical incident closure time by 40% using Java,\n' +
                        'Spring Boot microservices and REST APIs',
                        'Recognised with 7 organisational awards — Dazzle, Victory League, and Illuminate — for\n' +
                        'deployment ownership, backlog reduction, and delivering complex features ahead of schedule'
                    ],
                    tech: ['Java', 'Spring Boot', 'Microservices', 'REST APIs', 'Oracle SQL', 'Jenkins', 'CI/CD']
                },
                {
                    company: 'Tata Consultancy Services',
                    role: 'Engineer: Automation Tester - Full Stack Developer',
                    location: 'Gurugram India',
                    from: 'Jan 2019',
                    to: 'Jul 2022',
                    bullets: [
                        'Built 5+ Angular modules and 50+ REST APIs using Spring Boot and Oracle SQL, reducing\n' +
                        'manual processing time by 25% — integrated Kore.ai conversational AI with Angular UI,\n' +
                        'enabling real-time query handling and cutting resolution time by 20%',
                        'Developed 50+ Selenium and Core Java automation scripts, increasing test coverage by 60%\n' +
                        'and reducing manual effort by 40%'
                    ],
                    tech: ['Java', 'Spring Boot', 'Microservices', 'REST APIs', 'Oracle SQL', 'Jenkins', 'Angular', 'TypeScript', 'Selenium']
                }
            ],

            education: [
                {
                    university: 'Sastra University',
                    Degree : 'Master of Computer Applications',
                    to: 'Jul 2021'
                },
                {
                    university: 'Guru Gobind Singh Indraprastha University',
                    Degree : 'Bachelor of Computer Applications',
                    to: 'Apr 2018'
                }
            ],

            certifications: [
                {
                    name: 'AWS Certified Cloud Practitioner',
                    issuer : 'AWS',
                    expiry : 'Oct 2027',
                    certificateId : 'AWS04695504'

                }
            ],

            projects: [
                {
                    title: 'Support IQ',
                    description : ['Built AI-powered ticket APIs using Spring AI and GPT-4o-mini with a RAG pipeline (Qdrant),\n' +
                    'JDBC-backed chat memory, Tool Calling for live PostgreSQL queries, custom MCP Server with\n' +
                    'MCP Client integration, gRPC inter-service communication, and streaming responses via Spring AI\n' +
                    'ChatClient.\n' +
                    'Secured endpoints with JWT (Spring Security), built a React + Vite frontend for live AI chat,\n' +
                    'configured full observability with Prometheus, Grafana, and Jaeger — containerised via Docker\n' +
                    'Compose and deployed to Kubernetes (K8s) with GitHub Actions CI/CD.'],
                    github : 'https://github.com/ShaahilAbraham/supportiq',
                    tech: ['Java', 'Spring Boot', 'React', 'Spring AI', 'PostgreSQL', 'Docker', 'Kubernetes', 'GitHub Actions'],
                    from: 'Feb 2026',
                    to: 'May 2026'
                }
            ],

            skills: [
                { category: 'Backend', items: ['gRPC', 'Java / J2EE', 'Microservices',
                        'PL/SQL', 'REST APIs', 'Spring Boot', 'Spring MVC',
                        'Spring Security', 'Spring Cloud'] },
                { category: 'Front-End ', items: ['Angular', 'JavaScript (ES6+)', 'React',
                        'React Hooks', 'Redux', 'TypeScript'] },
                { category: 'AI & ML ', items: ['Spring AI', 'RAG Pipelines', 'LLMIntegration', 'OpenAI API (GPT-4o-mini)', 'VectorEmbeddings', 'Qdrant', 'MCP Client & Server', 'PromptEngineering'] },
                { category: 'Cloud & DevOps ', items: ['AWS (Cloud Practitioner)', 'Docker' ,
                    'Docker Compose', 'Kubernetes (K8s)', 'GitHub Actions', 'Jenkins', 'CI/CD', 'Cloud-native', 'Deployment Automation'] },
                { category: 'Databases ', items: ['PostgreSQL', 'Oracle SQL,', 'Microsoft SQL Sever',
                        'Hibernate/JPA'] },
                { category: 'Observability & Testing ', items: ['Prometheus', 'Grafana', 'Jaeger',
                        'Spring Boot Actuator', 'JUnit', 'Selenium','Spring AI Evaluators'] },
            ]
        })

        console.log(' Resume seeded successfully')
        process.exit(0)

    } catch (error) {
        console.error(' Seed failed:', error)
        process.exit(1)
    }
}

seedResume()