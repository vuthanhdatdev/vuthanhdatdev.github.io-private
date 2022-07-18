export interface EducationDataProps {
    school: string;
    gpa: string;
    startFrom: string;
    endFrom?: string;
    degreeType: string;
    major?: string;
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