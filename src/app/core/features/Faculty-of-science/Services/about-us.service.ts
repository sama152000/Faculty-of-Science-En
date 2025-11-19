import { Injectable } from '@angular/core';
import { AboutUsData } from '../model/about-us.model';

@Injectable({
  providedIn: 'root'
})
export class AboutUsService {
  private aboutUsData: AboutUsData[] = [
    {
      id: 1,
      title: "Introduction",
      description: "The Faculty of Science at Luxor University stands as a beacon of scientific excellence and innovation in Upper Egypt. Established with the vision of advancing scientific knowledge and preparing future generations of scientists, our faculty has been at the forefront of scientific education and research for decades. We are committed to fostering an environment that encourages critical thinking, scientific inquiry, and technological advancement.",
      establishedYear: 1995,
      achievements: [
        "Over 5,000 graduates working in various scientific fields",
        "50+ research publications in international journals annually",
        "State-of-the-art laboratories and research facilities",
        "Partnerships with leading international universities"
      ]
    },
    {
      id: 2,
      title: "Vision",
      vision: "To be a leading faculty in scientific education and research, recognized regionally and globally for excellence in preparing distinguished scientists who contribute to sustainable development and technological advancement in Egypt and the Arab world."
    },
    {
      id: 3,
      title: "Mission",
      mission: "To graduate distinguished students capable of contributing to scientific and societal development through high-quality education, innovative research, and community service. We strive to provide a stimulating academic environment that promotes scientific thinking, ethical values, and lifelong learning while addressing the challenges facing our society and contributing to Egypt's Vision 2030."
    },
    {
      id: 4,
      title: "Objectives",
      objectives: [
        "Provide high-quality scientific education that meets international standards",
        "Conduct innovative research that addresses local and global challenges",
        "Develop students' critical thinking and problem-solving skills",
        "Foster collaboration between academia and industry",
        "Promote scientific literacy in the community",
        "Prepare graduates for successful careers in science and technology",
        "Contribute to sustainable development goals",
        "Maintain ethical standards in all scientific endeavors"
      ]
    },
    {
      id: 5,
      title: "History of the Faculty",
      history: "The Faculty of Science at Luxor University was established in 1995 as part of the university's commitment to advancing scientific education in Upper Egypt. Starting with three departments - Physics, Chemistry, and Biology - the faculty has grown significantly over the years. In 2005, we added the Computer Science department, followed by Mathematics in 2010. Our faculty has continuously evolved, adapting to technological advances and societal needs. Today, we house modern laboratories, research centers, and state-of-the-art facilities that support both undergraduate and postgraduate education. Our journey has been marked by numerous achievements, including international accreditations, research collaborations, and the establishment of specialized research units."
    },
    {
      id: 6,
      title: "Message from the Dean",
      messageFromDean: "Welcome to the Faculty of Science at Luxor University. As we stand at the threshold of a new era in scientific discovery and technological innovation, I am proud to lead an institution that has consistently demonstrated excellence in education, research, and community service. Our faculty is home to distinguished professors, dedicated researchers, and bright students who together form a vibrant academic community. We are committed to providing our students with the knowledge, skills, and values necessary to become leaders in their chosen fields. Through our comprehensive programs, cutting-edge research, and strong industry partnerships, we prepare our graduates to meet the challenges of the 21st century. I invite you to explore the opportunities that await you at our faculty and join us in our mission to advance scientific knowledge for the betterment of humanity.",
      deanName: "Prof. Dr. Ahmed Hassan Mohamed",
      deanTitle: "Dean of Faculty of Science",
      deanImage: "https://images.pexels.com/photos/5212317/pexels-photo-5212317.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=1"
    }
  ];

  getAboutContent(): AboutUsData[] {
    return this.aboutUsData;
  }

  getSectionById(id: number): AboutUsData | undefined {
    return this.aboutUsData.find(section => section.id === id);
  }

  getIntroduction(): AboutUsData | undefined {
    return this.getSectionById(1);
  }

  getVision(): AboutUsData | undefined {
    return this.getSectionById(2);
  }

  getMission(): AboutUsData | undefined {
    return this.getSectionById(3);
  }

  getObjectives(): AboutUsData | undefined {
    return this.getSectionById(4);
  }

  getHistory(): AboutUsData | undefined {
    return this.getSectionById(5);
  }

  getDeanMessage(): AboutUsData | undefined {
    return this.getSectionById(6);
  }
}