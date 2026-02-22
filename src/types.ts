export interface User {
  id: string;
  username: string;
  email: string;
  profession: string;
  age_group: string;
  education_level: string;
  ancestry: string;
  ethnicity: string;
  iq: number | null;
  credits: number;
  score?: number;
}

export interface Opinion {
  id: string;
  user_id: string;
  content: string;
  keywords: string;
  created_at: string;
  profession?: string;
  age_group?: string;
  education_level?: string;
  ancestry?: string;
  ethnicity?: string;
  iq?: number | null;
  opinion_score: number;
  user_score: number;
}

export type AgeGroup = '18-24' | '25-34' | '35-44' | '45-54' | '55+';

export type EducationLevel = 
  | 'No Formal Education'
  | 'High School'
  | 'Vocational Training'
  | 'Associate Degree'
  | 'Bachelor\'s Degree'
  | 'Master\'s Degree'
  | 'Doctorate'
  | 'Post-Doctorate';

export const PROFESSIONS = [
  'Accountant', 'Actor', 'Architect', 'Artist', 'Athlete', 'Author', 'Baker', 'Banker', 'Barista', 'Biologist',
  'Carpenter', 'Chef', 'Chemist', 'Civil Engineer', 'Cleaner', 'Clergy', 'Coach', 'Construction Worker', 'Consultant', 'Cook',
  'Counselor', 'Courier', 'Customer Service', 'Dancer', 'Data Scientist', 'Delivery Driver', 'Dentist', 'Designer', 'Detective', 'Doctor',
  'Driver', 'Economist', 'Editor', 'Electrician', 'Engineer', 'Entrepreneur', 'Executive', 'Factory Worker', 'Farmer', 'Filmmaker',
  'Financial Advisor', 'Firefighter', 'Fisherman', 'Fitness Instructor', 'Flight Attendant', 'Florist', 'Gardener', 'Graphic Designer', 'Hairdresser', 'Historian',
  'Hotel Manager', 'Human Resources', 'Influencer', 'Information Technology', 'Insurance Agent', 'Interior Designer', 'Investigator', 'Janitor', 'Journalist', 'Judge',
  'Lawyer', 'Librarian', 'Lifeguard', 'Machinist', 'Manager', 'Marketer', 'Mechanic', 'Medical Assistant', 'Military Officer', 'Musician',
  'Nurse', 'Nutritionist', 'Office Worker', 'Optometrist', 'Painter', 'Paramedic', 'Pharmacist', 'Photographer', 'Physical Therapist', 'Physician',
  'Pilot', 'Plumber', 'Police Officer', 'Politician', 'Professor', 'Programmer', 'Psychologist', 'Public Relations', 'Real Estate Agent', 'Receptionist',
  'Researcher', 'Retired', 'Salesperson', 'Scientist', 'Social Worker', 'Software Developer', 'Student', 'Teacher', 'Technician', 'Unemployed',
  'Veterinarian', 'Waiter', 'Web Developer', 'Writer'
].sort();

export const AGE_GROUPS: AgeGroup[] = ['18-24', '25-34', '35-44', '45-54', '55+'];

export const EDUCATION_LEVELS: EducationLevel[] = [
  'No Formal Education',
  'High School',
  'Vocational Training',
  'Associate Degree',
  'Bachelor\'s Degree',
  'Master\'s Degree',
  'Doctorate',
  'Post-Doctorate'
];

export const ETHNICITIES = [
  'African',
  'Asian',
  'Caucasian',
  'Hispanic/Latino',
  'Middle Eastern',
  'Native American/Indigenous',
  'Pacific Islander',
  'Mixed/Other'
].sort();

export const COUNTRIES = [
  "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Australia", "Austria",
  "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan",
  "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia",
  "Cameroon", "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo", "Costa Rica",
  "Croatia", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt",
  "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia", "Fiji", "Finland", "France", "Gabon",
  "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana",
  "Haiti", "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel",
  "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Korea, North", "Korea, South", "Kosovo",
  "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania",
  "Luxembourg", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius",
  "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar", "Namibia",
  "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Macedonia", "Norway", "Oman",
  "Pakistan", "Palau", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar",
  "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia",
  "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa",
  "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan",
  "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu",
  "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela",
  "Vietnam", "Yemen", "Zambia", "Zimbabwe"
].sort();
