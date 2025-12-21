import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private contactInfo: any[] = [
    {
      id: '1',
      title: 'Faculty of Science - Main Office',
      description: 'General inquiries and administrative services',
      phone: ['+20 95 237 1200', '+20 95 237 1201'],
      email: ['info@science.luxor.edu.eg', 'admin@science.luxor.edu.eg'],
      address: 'Faculty of Science, Luxor University, Luxor Governorate, Egypt',
      officeHours: 'Sunday - Thursday: 8:00 AM - 4:00 PM',

      mapUrl:
        'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3593.0258622713013!2d32.8040167!3d25.769709300000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14491592597f70b1%3A0xccac387a294f12e5!2z2KzYp9mF2LnYqSDYp9mE2KPZgti12LE!5e0!3m2!1sar!2seg!4v1764072187781!5m2!1sar!2seg',
    },
    {
      id: '2',
      title: 'Student Affairs Office',
      description: 'Student services, registration, and academic support',
      phone: ['+20 95 237 1210', '+20 95 237 1211'],
      email: [
        'students@science.luxor.edu.eg',
        'registration@science.luxor.edu.eg',
      ],
      address:
        'Student Services Building, Faculty of Science, Luxor University',
      officeHours: 'Sunday - Thursday: 8:30 AM - 3:30 PM',
    },
    {
      id: '3',
      title: 'Research and Graduate Studies',
      description: 'Research inquiries, graduate programs, and collaboration',
      phone: ['+20 95 237 1220', '+20 95 237 1221'],
      email: ['research@science.luxor.edu.eg', 'graduate@science.luxor.edu.eg'],
      address: 'Research Complex, Faculty of Science, Luxor University',
      officeHours: 'Sunday - Thursday: 9:00 AM - 4:00 PM',
    },
    {
      id: '4',
      title: 'Laboratory Services',
      description: 'Testing services, equipment rental, and technical support',
      phone: ['+20 95 237 1230'],
      email: [
        'lab.services@science.luxor.edu.eg',
        'technical@science.luxor.edu.eg',
      ],
      address: 'Laboratory Complex, Faculty of Science, Luxor University',
      officeHours:
        'Sunday - Thursday: 8:00 AM - 5:00 PM, Saturday: 9:00 AM - 2:00 PM',
    },
  ];

  private staffContacts: any[] = [
    {
      id: '1',
      name: 'Prof. Dr. Ahmed El-Masry',
      position: 'Dean of Faculty',
      department: 'Administration',
      email: 'dean@science.luxor.edu.eg',
      phone: '+20 95 237 1200',
      officeLocation: 'Administration Building, Room 101',
      officeHours: 'Sunday, Tuesday, Thursday: 10:00 AM - 12:00 PM',
      specialization: 'Academic Leadership and Strategic Planning',
      image: './assets/icon.jpg',
    },
    {
      id: '2',
      name: 'Prof. Dr. Fatma El-Zahra',
      position: 'Vice Dean for Research and Graduate Studies',
      department: 'Research Administration',
      email: 'research@science.luxor.edu.eg',
      phone: '+20 95 237 1220',
      officeLocation: 'Research Complex, Room 201',
      officeHours: 'Monday, Wednesday: 11:00 AM - 1:00 PM',
      specialization: 'Research Management and Graduate Education',
      image: './assets/icon.jpg',
    },
    {
      id: '3',
      name: 'Dr. Mona Hassan',
      position: 'Vice Dean for Student Affairs',
      department: 'Student Affairs',
      email: 'students@science.luxor.edu.eg',
      phone: '+20 95 237 1210',
      officeLocation: 'Student Services Building, Room 105',
      officeHours: 'Sunday - Thursday: 9:00 AM - 2:00 PM',
      specialization: 'Student Development and Support Services',
      image: './assets/icon.jpg',
    },
    {
      id: '4',
      name: 'Dr. Mohamed Abdel Rahman',
      position: 'Head of Geology Department',
      department: 'Geology',
      email: 'geology@science.luxor.edu.eg',
      phone: '+20 95 237 1250',
      officeLocation: 'Geology Building, Room 301',
      officeHours: 'Monday, Wednesday, Thursday: 10:00 AM - 12:00 PM',
      specialization: 'Structural Geology and Tectonics',
      image: './assets/icon.jpg',
    },
    {
      id: '5',
      name: 'Prof. Ibrahim El-Sayed',
      position: 'Head of Mathematics Department',
      department: 'Mathematics',
      email: 'mathematics@science.luxor.edu.eg',
      phone: '+20 95 237 1260',
      officeLocation: 'Mathematics Building, Room 205',
      officeHours: 'Sunday, Tuesday: 11:00 AM - 1:00 PM',
      specialization: 'Applied Mathematics and Numerical Analysis',
      image: './assets/icon.jpg',
    },
    {
      id: '6',
      name: 'Dr. Ahmed Mahmoud',
      position: 'Head of Physics Department',
      department: 'Physics',
      email: 'physics@science.luxor.edu.eg',
      phone: '+20 95 237 1270',
      officeLocation: 'Physics Building, Room 302',
      officeHours: 'Monday, Wednesday: 2:00 PM - 4:00 PM',
      specialization: 'Quantum Physics and Materials Science',
      image: './assets/icon.jpg',
    },
    {
      id: '7',
      name: 'Prof. Sarah Ali',
      position: 'Head of Chemistry Department',
      department: 'Chemistry',
      email: 'chemistry@science.luxor.edu.eg',
      phone: '+20 95 237 1280',
      officeLocation: 'Chemistry Building, Room 401',
      officeHours: 'Sunday, Thursday: 10:00 AM - 12:00 PM',
      specialization: 'Organic Chemistry and Pharmaceutical Sciences',
      image: './assets/icon.jpg',
    },
    {
      id: '8',
      name: 'Dr. Norhan El-Sayed',
      position: 'Head of Botany and Microbiology Department',
      department: 'Botany and Microbiology',
      email: 'botany@science.luxor.edu.eg',
      phone: '+20 95 237 1290',
      officeLocation: 'Biology Building, Room 203',
      officeHours: 'Tuesday, Thursday: 11:00 AM - 1:00 PM',
      specialization: 'Plant Biotechnology and Microbial Ecology',
      image: './assets/icon.jpg',
    },
    {
      id: '9',
      name: 'Dr. Reham Mohamed',
      position: 'Head of Zoology Department',
      department: 'Zoology',
      email: 'zoology@science.luxor.edu.eg',
      phone: '+20 95 237 1300',
      officeLocation: 'Biology Building, Room 305',
      officeHours: 'Monday, Wednesday: 9:00 AM - 11:00 AM',
      specialization: 'Animal Behavior and Conservation Biology',
      image: './assets/icon.jpg',
    },
    {
      id: '10',
      name: 'Eng. Khaled Ahmed',
      position: 'IT Director',
      department: 'Information Technology',
      email: 'it@science.luxor.edu.eg',
      phone: '+20 95 237 1241',
      officeLocation: 'IT Building, Room 101',
      officeHours: 'Sunday - Thursday: 8:00 AM - 4:00 PM',
      specialization: 'Network Administration and Cybersecurity',
      image: './assets/icon.jpg',
    },
  ];

  getContactInfo(): any[] {
    return this.contactInfo;
  }

  getContactById(id: string): any | undefined {
    return this.contactInfo.find((c) => c.id === id);
  }

  getStaffContacts(): any[] {
    return this.staffContacts;
  }

  getStaffById(id: string): any | undefined {
    return this.staffContacts.find((s) => s.id === id);
  }

  getStaffByDepartment(department: string): any[] {
    return this.staffContacts.filter((s) =>
      s.department.toLowerCase().includes(department.toLowerCase())
    );
  }

  searchStaff(query: string): any[] {
    const q = query.toLowerCase();
    return this.staffContacts.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        s.position.toLowerCase().includes(q) ||
        s.department.toLowerCase().includes(q) ||
        s.specialization?.toLowerCase().includes(q)
    );
  }
}
