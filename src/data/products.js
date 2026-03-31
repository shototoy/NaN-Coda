import { Briefcase, Building2, Cloud, Database, Server } from 'lucide-react'
import pointOfSaleBrochure from '../assets/brochure/point-of-sale-system.pdf'
import schoolInformationBrochure from '../assets/brochure/school-information-system.pdf'
import internalDigitalPayrollBrochure from '../assets/brochure/internal-digital-payroll.pdf'
import hrInformationBrochure from '../assets/brochure/hr-information-system.pdf'
import pulsoBrochure from '../assets/brochure/pulso.pdf'

export const products = [
  {
    id: 1,
    slug: 'point-of-sale-system',
    icon: Server,
    category: 'Retail and Restaurant',
    name: 'Point of Sale System',
    headline: 'Run transactions, inventory, and reporting from one dependable sales platform.',
    description:
      'Complete POS solution for retail and restaurants. Inventory management, sales analytics, payment processing, and multi-location support.',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800',
    brochure: pointOfSaleBrochure,
    features: ['Payment Processing', 'Inventory Sync', 'Sales Analytics', 'Multi-Location'],
    highlights: [
      'Fast checkout flow for front-desk and cashier teams',
      'Inventory movement synced with each completed sale',
      'Clear revenue, item, and branch performance insights',
    ],
    modules: [
      {
        title: 'Checkout Operations',
        description: 'Handle cash, digital payments, and itemized transactions with a clean operator workflow.',
      },
      {
        title: 'Inventory Control',
        description: 'Track stock movement, low-stock alerts, and replenishment visibility in one place.',
      },
      {
        title: 'Branch Performance',
        description: 'Compare sales, team output, and product trends across one or more locations.',
      },
    ],
    idealFor: ['Retail stores', 'Restaurants', 'Businesses with multiple branches'],
    useCases: ['Counter sales', 'Menu item tracking', 'Centralized branch reporting'],
  },
  {
    id: 2,
    slug: 'school-information-system',
    icon: Cloud,
    category: 'Education Platform',
    name: 'School Information System',
    headline: 'Run enrollment, student records, attendance, grading, and parent communication from one campus platform.',
    description:
      'Comprehensive school information platform for student records, attendance, grading, scheduling, admissions, and parent communication in one connected system.',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800',
    brochure: schoolInformationBrochure,
    features: ['Student Records', 'Attendance Tracking', 'Grade Management', 'Parent Portal'],
    highlights: [
      'Centralized student and academic data',
      'Attendance workflows integrated directly into the wider school system',
      'Cleaner workflows for teachers, staff, and administrators',
      'Connected parent-facing updates, reports, and school notices',
    ],
    modules: [
      {
        title: 'Registrar and Enrollment',
        description: 'Manage admissions, enrollment, student profiles, and section placement from a single record system.',
      },
      {
        title: 'Attendance and Academics',
        description: 'Track attendance, encode grades, publish results, and support day-to-day academic operations.',
      },
      {
        title: 'Parent and Staff Access',
        description: 'Give administrators, teachers, and parents the right level of visibility in one connected platform.',
      },
    ],
    idealFor: ['K-12 schools', 'Private academies', 'Education teams replacing fragmented spreadsheets'],
    useCases: ['Enrollment management', 'Attendance monitoring', 'Grade publishing'],
  },
  {
    id: 3,
    slug: 'internal-digital-payroll',
    icon: Database,
    category: 'Finance and HR',
    name: 'Internal Digital Payroll',
    headline: 'Distribute salary, manage internal funds, and monitor payroll operations securely.',
    description:
      'Internal wallet and salary management platform similar to GCash. Employee payroll, fund transfers, expense tracking, and financial reporting.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
    brochure: internalDigitalPayrollBrochure,
    features: ['Digital Payroll', 'Employee Transfers', 'Fund Management', 'Financial Reports'],
    highlights: [
      'Digital salary distribution with traceable fund movement',
      'Employee wallet and transfer visibility in one system',
      'Finance-ready summaries for audits and reporting cycles',
    ],
    modules: [
      {
        title: 'Payroll Distribution',
        description: 'Release salaries and allowances with a structured, trackable internal payment workflow.',
      },
      {
        title: 'Employee Wallet Tools',
        description: 'Support balance checks, internal transfers, and employee-side transaction history.',
      },
      {
        title: 'Reporting and Controls',
        description: 'Review disbursement history, reconcile balances, and export finance summaries quickly.',
      },
    ],
    idealFor: ['Organizations with in-house payroll operations', 'HR and finance teams', 'Businesses digitizing manual fund release'],
    useCases: ['Payroll cycles', 'Employee fund transfers', 'Internal financial reporting'],
  },
  {
    id: 4,
    slug: 'hr-information-system',
    icon: Briefcase,
    category: 'People Operations',
    name: 'HR Information System',
    headline: 'Centralize employee records, leave workflows, timekeeping, and HR reporting in one platform.',
    description:
      'Comprehensive HR information system for employee records, onboarding, leave requests, attendance, organizational structure, and personnel analytics.',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800',
    brochure: hrInformationBrochure,
    features: ['Employee Records', 'Leave Management', 'Timekeeping', 'HR Reports'],
    highlights: [
      'Single source of truth for employee information and organizational structure',
      'Faster HR workflows for onboarding, leave approvals, and personnel updates',
      'Operational visibility through dashboards, reports, and workforce summaries',
    ],
    modules: [
      {
        title: 'Employee Records Core',
        description: 'Maintain structured employee profiles, requirements, positions, and department assignments.',
      },
      {
        title: 'Attendance and Leave',
        description: 'Track timekeeping, leave balances, approvals, and policy-based HR workflows in one place.',
      },
      {
        title: 'HR Reporting',
        description: 'Generate personnel summaries, workforce metrics, and administrative reports for decision-makers.',
      },
    ],
    idealFor: ['Growing organizations', 'HR departments', 'Operations teams modernizing personnel management'],
    useCases: ['Employee onboarding', 'Leave approvals', 'Workforce reporting'],
  },
  {
    id: 5,
    slug: 'pulso',
    icon: Building2,
    category: 'Public Service Technology',
    name: 'PULSO',
    headline: 'A barangay service request touch terminal and attendance system built for community-facing operations.',
    description:
      'PULSO streamlines barangay service requests, public queue handling, resident-facing touch terminal interactions, and attendance logging for frontline staff and community programs.',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800',
    brochure: pulsoBrochure,
    features: ['Touch Terminal', 'Service Requests', 'Attendance Logs', 'Queue Visibility'],
    highlights: [
      'Resident-friendly terminal flow for quick service intake',
      'Attendance support for barangay staff, visitors, and community activities',
      'Clear tracking for service request status and operational throughput',
    ],
    modules: [
      {
        title: 'Touch Terminal Intake',
        description: 'Guide residents through service request submission using a clear on-site touch interface.',
      },
      {
        title: 'Request and Queue Tracking',
        description: 'Record requests, monitor service progress, and improve visibility across barangay transactions.',
      },
      {
        title: 'Attendance Monitoring',
        description: 'Capture attendance for staff or scheduled community interactions with a structured audit trail.',
      },
    ],
    idealFor: ['Barangay halls', 'Local government service desks', 'Community-facing service teams'],
    useCases: ['Resident request intake', 'Front-desk service tracking', 'Attendance-based barangay workflows'],
  },
]

export function getProductBySlug(productSlug) {
  return products.find((product) => product.slug === productSlug)
}
