
export interface UserProfile {
  name: string;
  email: string;
  role: string;
  company: {
    companyName: string;
    taxId: string;
    industry: string;
    employeeCount: string;
    department: string;
    officeLocation: string;
    workEmail: string;
    phone: string;
  };
}

export enum TicketStatus {
  OPEN = 'Abierto',
  IN_PROGRESS = 'En Progreso',
  ACTION_REQUIRED = 'Acción Requerida',
  CLOSED = 'Cerrado'
}

export interface Ticket {
  id: string;
  title: string;
  description: string;
  status: TicketStatus;
  createdAt: string;
  priority: 'Baja' | 'Media' | 'Alta' | 'Crítica';
  category: string;
}
