export interface WorkDataProps {
    position: string;
    companyName: string;
    startFrom: string;
    endFrom?: string;
    detail: string;
}

export const workData: WorkDataProps[] = [
    {
        companyName: 'LeapXpert',
        detail: '',
        startFrom: 'December 2022',
        endFrom: '',
        position: 'Senior Software Engineer',
    },
    {
        companyName: 'PayOK In Partnership with Positive Thinking Company',
        detail: '',
        startFrom: 'March 2021',
        endFrom: 'December 2022',
        position: 'Senior Software Engineer',
    },
    {
        companyName: 'B13 Technology',
        detail: '',
        startFrom: 'February 2019',
        endFrom: '',
        position: 'Freelance Developer',
    },
    {
        companyName: 'KMS Technology',
        detail: '',
        startFrom: 'January 2017',
        endFrom: 'February 2019',
        position: 'Software Engineer',
    },
    {
        companyName: 'AdNovum',
        detail: '',
        startFrom: 'June 2016',
        endFrom: 'December 2016',
        position: 'Software Engineer',
    },
    {
        companyName: 'Freelancer',
        detail: '',
        startFrom: 'June 2014',
        endFrom: 'December 2017',
        position: 'Freelance Developer',
    },

];