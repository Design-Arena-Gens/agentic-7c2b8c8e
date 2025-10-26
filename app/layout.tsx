import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Student Project Planner',
  description:
    'A simple full-stack planner app for students to manage project milestones and tasks.',
  icons: {
    icon: '/favicon.svg'
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
