'use client';
import { User } from '@/constants/data';
import { ColumnDef } from '@tanstack/react-table';
import Image from 'next/image';
import { CellAction } from './cell-action';

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: 'profile_picture',
    header: 'IMAGE',
    cell: ({ row }) => {
      return (
        <div className="relative aspect-square">
          <Image
            src={row.getValue('profile_picture')}
            alt={row.getValue('name')}
            fill
            className="rounded-lg"
          />
        </div>
      );
    }
  },
  {
    accessorKey: 'username',
    header: 'USERNAME'
  },
  {
    accessorKey: 'email',
    header: 'EMAIL'
  },
  {
    accessorKey: 'phone',
    header: 'PHONE'
  },
  {
    accessorKey: 'status',
    header: 'STATUS'
  },
  {
    accessorKey: 'achievement',
    header: 'ACHEIVEMENT'
  },
  {
    accessorKey: 'badge',
    header: 'BADGE'
  },

  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />
  }
];
