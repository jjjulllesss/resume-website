// Resume Data - Update this file to maintain your resume
const resumeData = {
    // Personal Information
    name: "Jules MERMET-HUSSON",
    role: "Global Cloud Solutions Architect & AI Enthusiast",
    profileImage: "/Jules_Mermet-Husson.jpg", // Place your profile image in the public/ directory
    
    // Social Media Links
    socialLinks: [
        {
            platform: "LinkedIn",
            url: "https://www.linkedin.com/in/jmermethusson/",
            icon: "fab fa-linkedin"
        },
        {
            platform: "GitHub",
            url: "https://github.com/jjjulllesss",
            icon: "fab fa-github"
        },
        {
            platform: "Email",
            url: "mailto:j.mermethusson@gmail.com",
            icon: "fas fa-envelope"
        }
    ],
    
    // Bio
    bio: "Cloud Solutions Architect combining business skills with solid technical knowledge in multi-cloud infrastructure (AWS, GCP, Oracle Cloud) and scalable AI systems for enterprises. Experienced in international roles in Paris (France) and Denver (USA) contributing to multi-million-dollar projects, FinOps cost savings, and practical work with Kubernetes, Terraform (IaC), Generative AI, MCP servers, AI agents, and RAG optimization.",
    
    // Career History
    // Each company can have multiple positions
    "career": [
        {
            "company": "Ateme",
            "logo": "/ateme.png",
            "positions": [
                {
                    "position": "Global Cloud Solutions Architect",
                    "period": "2023 - Present",
                    "description": "Lead cloud architecture and AI initiatives for strategic customers across AWS, GCP, and Oracle Cloud. Designed reference architectures, strengthened technical partnerships, and built a subtitling workflow using Gemini models on Vertex AI. Drove 30% annual cost savings through FinOps governance and forecasting. Recognized as GCP Partner of the Year 2024."
                  },
                  {
                    "position": "EMEA Cloud Engineer",
                    "period": "2021 - 2023",
                    "description": "Supported the EMEA presales organization across the full sales lifecycle/discovery, solution design, sizing, POC demos, and reference architecture creation, enabling the company’s first public cloud projects in the region."
                  },
                  {
                    "position": "Lab Administrator",
                    "period": "2018 - 2021",
                    "description": "Apprenticeship managing lab infrastructure for international pre- and post-sales teams. Built an AWS transcoding calculator and automation scripts as an end-of-study project."
                  }
            ]
        },
        {
            "company": "ESF - Ecole du Ski Français",
            "logo": "/esf.jpeg",
            "positions": [
                {
                    "position": "Alpine Ski & Snowboard Instructor",
                    "period": "2017 - Present",
                    "description": "Instruct skiing and snowboarding to students of all levels in Les Rousses, France (Jura)."
                }
            ]
        }
    ],
    
    // Education History
    education: [
        {
            "institution": "ENSEA - National School of Electronics and its Applications",
            "logo": "/ensea.jpg",
            "degree": "Engineering Degree (Bac+5) - Electronics and Industrial Computing Specialization, Digital Audiovisual Systems Track",
            "field": "Digital Audiovisual Systems, Networks & Telecommunications",
            "period": "2018–2021",
            "description": "Three-year work-study (apprenticeship) Master's-level engineering program (Bac+5, RNCP level 7) specializing in digital audiovisual systems. Developed expertise in electronics, industrial computing, networks, telecommunications, and real-time media processing. Program features specialized audiovisual modules delivered in partnership with INA (National Audiovisual Institute).",
            "location": "Cergy-Pontoise, France"
        },
        {
            "institution": "INA - National Audiovisual Institute",
            "logo": "/ina.jpg",
            "degree": "Engineering Degree (Bac+5) - Electronics and Industrial Computing Specialization, Digital Audiovisual Systems Track",
            "field": "Audiovisual Engineering & Digital Media Technologies",
            "period": "2018–2021",
            "description": "Collaborative partner institution providing specialized training in audiovisual signal processing, broadcast workflows, and digital media engineering within ENSEA's apprenticeship program. Focused on preparing engineers for digital TV, streaming protocols, and multimedia network systems.",
            "location": "Bry-sur-Marne, France"
        }        
    ],
    
    // Medium Posts
    mediumUsername: "j.mermethusson", 
    
    // Activities (Publications, Awards, Certifications, Talks, Blog Posts)
    // Authorized activity types:
    // - "certification" - Professional certifications and courses
    // - "blog-post" - Blog posts and articles (use lowercase with hyphen)
    // - "talks" - Talks, podcasts
    // - "publication" - Published papers and articles
    // - "award" - Awards and recognitions
    // Date format: "YYYY-MM-DD" or "YYYY-MM" for sorting (newest first)
    activities: [
        {
            type: "certification",
            title: "DeepLearning.ai - Retrieval Augmented Generation (RAG)",
            details: "Production-ready RAG systems that enhance LLM accuracy through vector database retrieval, advanced chunking, and robust evaluation frameworks",
            date: "2026-01-15",
            link: "https://learn.deeplearning.ai/certificates/2ffab8aa-2af8-4f78-968d-cb25d2cb3be8"
        },
        {
            type: "certification",
            title: "Hugging Face - Model Context Protocol Course",
            details: "MCP concepts, SDK usage in Python, end-to-end applications, and deployment with partners like Anthropic for context-aware AI integrating external tools and data.",
            date: "2025-12-22",
            link: null
        },
        {
            type: "certification",
            title: "Kaggle / Google - 5-day AI Agents Intensive Course",
            details: "Intensive Course with Google, gaining hands-on expertise in designing, evaluating, and deploying production-ready AI agents using Gemini APIs, Google's Agent Development Kit (ADK), LangGraph, MCP, and Vertex AI.",
            date: "2025-12-18",
            link: "https://www.kaggle.com/certification/badges/julesmermethusson/105"
        },
        {
            type: "certification",
            title: "Google - Networking Pre-sales Technical Expert",
            details: "Partner learning path on networking solutions, business value discovery, requires one active Google Cloud Professional certification.",
            date: "2025-11-18",
            link: "https://www.credly.com/badges/064a9555-da1a-409d-9977-d50fe689d5d1/public_url"
        },
        {
            type: "certification",
            title: "Google Cloud Certified Professional Cloud Architect",
            details: "Validates skills in designing scalable, secure GCP solutions, managing infrastructure, and ensuring reliability across hybrid/multi-cloud setups.",
            date: "2025-10-27",
            link: "https://www.credly.com/badges/150f37d6-366f-4beb-b701-73ceb49dc44e/public_url"
        },
        {
            type: "certification",
            title: "Hugging Face - Agents Course",
            details: "Covers building AI agents using LLMs, hands-on libraries, real-world use cases, and GAIA benchmark challenges in pre-configured environments.",
            date: "2025-05-04",
            link: null
        },
        {
            type: "certification",
            title: "Google Cloud Certified Professional Cloud Network Engineer",
            details: "Demonstrates expertise in implementing VPCs, hybrid connectivity, network services, and security for enterprise GCP networks.",
            date: "2023-11-20",
            link: "https://www.credly.com/badges/5d2fdb38-f247-4ac9-a019-8b3a0b0d8b20/public_url"
        },
        {
            type: "certification",
            title: "Amazon Web Services Advanced Networking Specialty",
            details: "Certifies deep knowledge of AWS networking like Direct Connect, Transit Gateway, hybrid designs, and high-performance routing.",
            date: "2022-07-08",
            link: "https://www.credly.com/badges/1b5108f6-d883-4bc4-88b8-445015b9d7b9/public_url"
        },
        {
            type: "certification",
            title: "FinOps Certified Practitioner",
            details: "Equips practitioners with frameworks for cloud financial management, cost allocation, forecasting, and collaborative optimization across teams.",
            date: "2023-06-28",
            link: "https://www.credly.com/badges/209ebbba-21df-42f2-9eef-18babd6fd6a8/public_url"
        },
        {
            type: "certification",
            title: "Google Cloud Certified Professional Cloud Architect",
            details: "Validates skills in designing scalable, secure GCP solutions, managing infrastructure, and ensuring reliability across hybrid/multi-cloud setups.",
            date: "2022-11-25",
            link: "https://www.credly.com/badges/1b763ee7-474b-4144-a05f-017b6a846bbc/public_url"
        },
        {
            type: "certification",
            title: "AWS Certified Solutions Architect - Associate (SAA)",
            details: "Proves ability to design distributed systems, resilient architectures, and cost-optimized AWS deployments.",
            date: "2020-12-08",
            link: "https://www.credly.com/badges/1c279c8a-f49d-40ec-861b-fd2d463d7eef/public_url"
        },
        {
            type: "certification",
            title: "HashiCorp Certified: Terraform Associate (002)",
            details: "Validates foundational skills in Infrastructure as Code (IaC) using Terraform, including resource lifecycle management, configuration syntax, modules, state handling, provider setup, and HCP Terraform collaboration workflows for cloud engineers.",
            date: "2021-05-02",
            link: "https://www.credly.com/badges/ee522d9f-7674-484a-83e2-82b1508246b3/public_url"
        },
        {
            type: "blog-post",
            title: "Ateme: Revolutionizing video subtitling industry with Google Cloud AI",
            details: "Ateme is revolutionizing the video subtitling industry with Google Cloud AI. This article explores how Ateme is using Google Cloud AI to improve the accuracy and efficiency of video subtitling.",
            date: "2025-09-01",
            link: "https://cloud.google.com/customers/ateme"
        },
        {
            type: "talks",
            title: "Titan Solutions by Ateme",
            details: "Discussion on Ateme Titan Solutions for low-latency streaming, contribution/distribution workflows, VOD transcoding on AWS with Graviton processors, emphasizing scalability, cost-efficiency, and FinOps practices.",
            date: "2025-03-01",
            link: "https://www.youtube.com/watch?v=yTXDBlGLW3s"
        },
        {
            type: "talks",
            title: "Cloud public ou on-prem pour les chaînes de TV et telcos ?",
            details: "Podcast exploring hybrid cloud/on-premises architectures for TV channels and telcos, covering challenges in event/sports use cases, file transcoding overflow, and disaster recovery plans.",
            date: "2023-09-01",
            link: "https://aws.amazon.com/fr/blogs/france/podcasts/#177"
        },
        {
            type: "talks",
            title: "Ateme enregistre la télé dans le cloud",
            details: "Podcast on Ateme's Cloud DVR solution using AWS S3 for TV program recording from operator feeds, Kubernetes orchestration, and infrastructure-as-code for scalable video storage and processing.",
            date: "2023-03-31",
            link: "https://aws.amazon.com/fr/blogs/france/podcasts/#155"
        },
        {
            type: "talks",
            title: "AWS re:invent re:Cap",
            details: "Debrief and Vegas atmosphere from AWS re:Invent with Chrys and Jules discussing highlights like EKS updates, SageMaker Studio...",
            date: "2024-12-03",
            link: "https://francais.podcast.go-aws.com/web/episodes/266/index.html"
        },
        {
            type: "blog-post",
            title: "7 Insights from FinOps Meetup Paris",
            details: "A summary of the key takeaways from the FinOps meetup in Paris where Jules and Chrys presented how they implemented FinOps at Ateme.",
            date: "2023-06-12",
            link: "https://www.linkedin.com/pulse/7-insights-from-finops-meetup-paris-cloudfinops/"
        }
    ]    
};

export { resumeData };
