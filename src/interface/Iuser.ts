export interface User {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    image?: string;
    specialization?: string; // Optional for Trainer
    dateOfBirth?: string; // Optional for Student
    address?: string; // Optional for Student
    status: boolean;
    type: string;
    connections?: [];
  }