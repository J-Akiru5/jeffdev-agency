'use client';

/**
 * Quotes Table Client Component
 * ------------------------------
 * Uses TanStack Table for sortable, filterable quotes list.
 */

import { type ColumnDef } from '@tanstack/react-table';
import { DataTable } from '@/components/admin/data-table';
import { QuoteStatusSelector } from '@/components/admin/quote-status-selector';

interface Quote {
  id: string;
  refNo?: string;
  name: string;
  email: string;
  company?: string;
  projectType: string;
  budget: string;
  timeline: string;
  status: 'new' | 'contacted' | 'in-progress' | 'closed';
  createdAt: string;
}

const projectTypeLabels: Record<string, string> = {
  web: 'Web App',
  saas: 'SaaS',
  mobile: 'Mobile',
  ai: 'AI Integration',
  other: 'Other',
};

const columns: ColumnDef<Quote>[] = [
  {
    accessorKey: 'refNo',
    header: 'Ref No.',
    cell: ({ row }) => (
      <span className="font-mono text-xs text-white/60">
        {row.original.refNo || '—'}
      </span>
    ),
  },
  {
    accessorKey: 'name',
    header: 'Client',
    cell: ({ row }) => (
      <div>
        <div className="font-medium text-white">{row.original.name}</div>
        <div className="text-xs text-white/40">{row.original.email}</div>
      </div>
    ),
  },
  {
    accessorKey: 'projectType',
    header: 'Project',
    cell: ({ row }) => (
      <span className="text-white/70">
        {projectTypeLabels[row.original.projectType] || row.original.projectType}
      </span>
    ),
  },
  {
    accessorKey: 'budget',
    header: 'Budget',
    cell: ({ row }) => (
      <span className="font-mono text-xs text-white/50">{row.original.budget}</span>
    ),
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => (
      <QuoteStatusSelector
        quoteId={row.original.id}
        currentStatus={row.original.status}
      />
    ),
  },
  {
    accessorKey: 'createdAt',
    header: 'Date',
    cell: ({ row }) => (
      <span className="font-mono text-xs text-white/40">
        {new Date(row.original.createdAt).toLocaleDateString()}
      </span>
    ),
  },
];

interface QuotesTableProps {
  quotes: Quote[];
}

export function QuotesTable({ quotes }: QuotesTableProps) {
  return (
    <DataTable
      columns={columns}
      data={quotes}
      searchKey="name"
      searchPlaceholder="Search by client name..."
    />
  );
}
