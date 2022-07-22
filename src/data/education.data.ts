export interface EducationDataProps {
    school: string;
    gpa?: string;
    startFrom: string;
    endFrom?: string;
    degreeType: string;
    major?: string;
}

export interface CertificationDataProps {
    name: string;
    startFrom?: string;
    endFrom?: string;
    score?: string;
    providedBy: string;
}

export const educationData: EducationDataProps[] = [
    {
        startFrom: 'September 2012',
        endFrom: 'June 2016',
        school: 'Lotus University',
        gpa: '3.0',
        degreeType: 'Bachelor',
        major: 'Software Engineering'
    },
];

export const certificationData: CertificationDataProps[] = [
    {
        startFrom: 'May 2022',
        endFrom: 'May 2025',
        name: 'AWS Solution Architect Associate',
        providedBy: 'Amazon'
    },
    {
        name: 'Oracle Certified Professional, Java SE 8 Programmer',
        providedBy: 'Oracle',
    },
    {
        name: 'IELTS',
        score: '7.0',
        startFrom: 'August 2018',
        endFrom: 'August 2020',
        providedBy: 'British Council'
    }
];