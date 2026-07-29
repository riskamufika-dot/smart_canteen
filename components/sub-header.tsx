'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

interface SubHeaderProps {

  title: string;
  backUrl?: string;
}

export default function SubHeader({ title, backUrl = '/home' }: SubHeaderProps) {
  return (
    <div className="flex items-center gap-4 mb-8">
      <Link href={backUrl} className="text-black hover:text-gray-600 transition-colors">
        <ArrowLeft className="w-6 h-6 stroke-[2.5]" />
      </Link>
      <h1 className="text-xl md:text-2xl font-bold text-black">{title}</h1>
    </div>
  );
}