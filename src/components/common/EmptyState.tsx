import React from 'react';
import { LucideIcon, PackageOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

interface EmptyStateProps {
  title: string;
  description: string;
  icon?: LucideIcon;
  actionText?: string;
  actionLink?: string;
  onActionClick?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  icon: Icon = PackageOpen,
  actionText,
  actionLink,
  onActionClick
}) => {
  return (
    <div className="bg-white rounded-3xl border border-stone-200/90 p-8 sm:p-12 text-center max-w-md mx-auto my-6 space-y-4">
      <div className="w-16 h-16 rounded-2xl bg-stone-100 text-stone-400 flex items-center justify-center mx-auto ring-8 ring-stone-50">
        <Icon className="w-8 h-8" />
      </div>

      <div className="space-y-1">
        <h3 className="font-display font-bold text-base text-stone-900">{title}</h3>
        <p className="text-xs text-stone-500 leading-relaxed max-w-xs mx-auto">
          {description}
        </p>
      </div>

      {(actionText && actionLink) && (
        <Link
          to={actionLink}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-agri-700 hover:bg-agri-800 text-white font-semibold text-xs shadow-xs transition-colors"
        >
          <span>{actionText}</span>
        </Link>
      )}

      {(actionText && onActionClick) && (
        <button
          onClick={onActionClick}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-agri-700 hover:bg-agri-800 text-white font-semibold text-xs shadow-xs transition-colors"
        >
          <span>{actionText}</span>
        </button>
      )}
    </div>
  );
};
