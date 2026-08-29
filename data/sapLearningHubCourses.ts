export interface SAPCourse {
  id: string;
  title: string;
  topic: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  certification?: string;
  description: string;
}

export const sapLearningHubCourses: SAPCourse[] = [
  {
    id: 'sap-course-1',
    title: 'SAP AI Fundamentals & Business AI Concepts (DEV100)',
    topic: 'Artificial Intelligence & Machine Learning',
    level: 'Beginner',
    duration: '12 Hours',
    certification: 'SAP Certified Associate - Business AI',
    description: 'Learn foundational concepts of Generative AI, machine learning pipelines, and ethics in enterprise Business AI.',
  },
  {
    id: 'sap-course-2',
    title: 'Developing with SAP AI Core & SAP AI Launchpad (DEV260)',
    topic: 'AI Operations & MLOps',
    level: 'Intermediate',
    duration: '24 Hours',
    certification: 'SAP Certified Development Associate - AI Core',
    description: 'Hands-on deployment of machine learning models, batch inferencing, model evaluation, and monitoring using SAP AI Core.',
  },
  {
    id: 'sap-course-3',
    title: 'SAP Business Technology Platform (BTP) Extension Suite (CLD200)',
    topic: 'Cloud Development & Integration',
    level: 'Intermediate',
    duration: '30 Hours',
    certification: 'SAP Certified Citizen Developer Associate - SAP BTP',
    description: 'Build enterprise cloud applications, microservices, and API integrations on SAP BTP.',
  },
  {
    id: 'sap-course-4',
    title: 'Data Modeling & Analytics with SAP HANA Cloud (DAT100)',
    topic: 'Data Engineering & Analytics',
    level: 'Intermediate',
    duration: '20 Hours',
    certification: 'SAP Certified Application Associate - SAP HANA Cloud',
    description: 'Design relational database models, advanced SQL views, and real-time streaming analytics.',
  },
  {
    id: 'sap-course-5',
    title: 'Enterprise Process Automation with SAP Build Process Automation (SPA100)',
    topic: 'RPA & Automation',
    level: 'Beginner',
    duration: '16 Hours',
    description: 'Automate business workflows, document processing, and robotic process automation (RPA) without code.',
  },
  {
    id: 'sap-course-6',
    title: 'SAP Security, Identity & Governance Fundamentals (SEC100)',
    topic: 'Cybersecurity & Governance',
    level: 'Intermediate',
    duration: '18 Hours',
    description: 'Role-based access control, encryption standards, identity authentication, and AI safety governance.',
  },
];
