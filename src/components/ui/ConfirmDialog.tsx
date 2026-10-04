"use client";

import React from "react";
import { Modal } from "./Modal";
import { Button } from "./Button";
import { AlertTriangle, AlertCircle, HelpCircle } from "lucide-react";

interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  variant?: "danger" | "warning" | "info";
  isLoading?: boolean;
}

export function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmText = "Confirm",
  cancelText = "Cancel",
  variant = "danger",
  isLoading = false,
}: ConfirmDialogProps) {
  const iconConfig = {
    danger: {
      icon: <AlertTriangle className="w-6 h-6 text-rose-600 dark:text-rose-400" />,
      bg: "bg-rose-50 dark:bg-rose-950/50",
      buttonVariant: "danger" as const,
    },
    warning: {
      icon: <AlertCircle className="w-6 h-6 text-amber-600 dark:text-amber-400" />,
      bg: "bg-amber-50 dark:bg-amber-950/50",
      buttonVariant: "primary" as const,
    },
    info: {
      icon: <HelpCircle className="w-6 h-6 text-brand-600 dark:text-brand-400" />,
      bg: "bg-brand-50 dark:bg-brand-950/50",
      buttonVariant: "primary" as const,
    },
  };

  const config = iconConfig[variant];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      footer={
        <div className="flex items-center justify-end gap-2 w-full">
          <Button variant="outline" size="sm" onClick={onClose} disabled={isLoading}>
            {cancelText}
          </Button>
          <Button
            variant={config.buttonVariant}
            size="sm"
            onClick={onConfirm}
            isLoading={isLoading}
          >
            {confirmText}
          </Button>
        </div>
      }
    >
      <div className="flex items-start gap-4">
        <div className={`p-3 rounded-2xl shrink-0 ${config.bg}`}>
          {config.icon}
        </div>
        <div className="space-y-1">
          <h4 className="text-base font-bold text-gray-900 dark:text-white">
            {title}
          </h4>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </Modal>
  );
}
