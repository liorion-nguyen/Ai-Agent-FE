'use client';

import { cn } from '@/lib/utils';
import { Dialog, Transition } from '@headlessui/react';
import { Slot } from '@radix-ui/react-slot';
import { VariantProps, cva } from 'class-variance-authority';
import { ChevronDown, X } from 'lucide-react';
import * as React from 'react';
import { Fragment } from 'react';

// Modal Variants
const modalContentVariants = cva(
  'w-full max-w-md transform overflow-hidden rounded-lg bg-white p-6 shadow-xl transition-all',
  {
    variants: {
      size: {
        sm: 'max-w-sm',
        md: 'max-w-md',
        lg: 'max-w-lg',
        xl: 'max-w-xl',
        '2xl': 'max-w-2xl',
        '3xl': 'max-w-3xl',
        '4xl': 'max-w-4xl',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  },
);

// Modal Component
const Modal = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<'div'> & {
    isOpen: boolean;
    onClose: () => void;
    size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';
  }
>(({ isOpen, onClose, size = 'md', className, children }, ref) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <ModalOverlay />
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel
                ref={ref}
                className={cn(modalContentVariants({ size }), className)}
              >
                {children}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
});
Modal.displayName = 'Modal';

// Modal Overlay
const ModalOverlay = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<'div'>
>(({ className, ...props }, ref) => (
  <Transition.Child
    as={Fragment}
    enter="ease-out duration-300"
    enterFrom="opacity-0"
    enterTo="opacity-100"
    leave="ease-in duration-200"
    leaveFrom="opacity-100"
    leaveTo="opacity-0"
  >
    <div
      ref={ref}
      className={cn(
        'fixed inset-0 bg-black bg-opacity-100 backdrop-blur-sm',
        className,
      )}
      {...props}
    />
  </Transition.Child>
));
ModalOverlay.displayName = 'ModalOverlay';

// Modal Header
const ModalHeader = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<'div'>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex items-center justify-between mb-4', className)}
    {...props}
  />
));
ModalHeader.displayName = 'ModalHeader';

// Modal Title
const ModalTitle = React.forwardRef<
  HTMLHeadingElement,
  React.ComponentProps<'h3'> & { asChild?: boolean }
>(({ className, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : 'h3';
  return (
    <Dialog.Title
      as={Comp}
      ref={ref}
      className={cn('text-lg font-semibold text-gray-900', className)}
      {...props}
    />
  );
});
ModalTitle.displayName = 'ModalTitle';

// Modal Close Button
const ModalCloseButton = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<'button'>
>(({ className, ...props }, ref) => (
  <button
    ref={ref}
    className={cn('text-gray-400 hover:text-gray-600', className)}
    {...props}
  >
    <X className="w-5 h-5" />
    <span className="sr-only">Đóng modal</span>
  </button>
));
ModalCloseButton.displayName = 'ModalCloseButton';

// Modal Body
const ModalBody = React.forwardRef<HTMLDivElement, React.ComponentProps<'div'>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('space-y-6', className)} {...props} />
  ),
);
ModalBody.displayName = 'ModalBody';

// Modal Footer
const ModalFooter = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<'div'>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex justify-end gap-3', className)}
    {...props}
  />
));
ModalFooter.displayName = 'ModalFooter';

// Modal Input
const ModalInput = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<'input'>
>(({ className, ...props }, ref) => (
  <input
    ref={ref}
    className={cn(
      'w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500',
      className,
    )}
    {...props}
  />
));
ModalInput.displayName = 'ModalInput';

// Modal Select
const ModalSelect = React.forwardRef<
  HTMLSelectElement,
  React.ComponentProps<'select'>
>(({ className, children, ...props }, ref) => (
  <div className="relative">
    <select
      ref={ref}
      className={cn(
        'w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 appearance-none',
        className,
      )}
      {...props}
    >
      {children}
    </select>
    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" />
  </div>
));
ModalSelect.displayName = 'ModalSelect';

// Modal Color Picker
const ModalColorPicker = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<'input'> & { value: string }
>(({ className, value, ...props }, ref) => (
  <div className="flex items-center gap-2 border border-gray-300 rounded-lg p-3">
    <input
      ref={ref}
      type="color"
      className={cn('w-8 h-8 rounded-lg outline-none', className)}
      value={value}
      {...props}
    />
    <span className="text-gray-700">{value}</span>
  </div>
));
ModalColorPicker.displayName = 'ModalColorPicker';

// Modal Button Variants
const modalButtonVariants = cva(
  'text-sm font-medium rounded-lg focus:outline-none focus:ring-4',
  {
    variants: {
      variant: {
        primary:
          'text-white bg-purple-600 hover:bg-purple-700 focus:ring-purple-300 disabled:opacity-50',
        secondary:
          'text-gray-900 bg-white border border-gray-200 hover:bg-gray-100 hover:text-purple-700 focus:ring-gray-100',
      },
      size: {
        sm: 'px-3 py-2',
        md: 'px-5 py-2.5',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  },
);

// Modal Button
const ModalButton = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<'button'> & VariantProps<typeof modalButtonVariants>
>(({ className, variant, size, ...props }, ref) => (
  <button
    ref={ref}
    className={cn(modalButtonVariants({ variant, size }), className)}
    {...props}
  />
));
ModalButton.displayName = 'ModalButton';

// Modal Error
const ModalError = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<'div'> & { message: string }
>(({ className, message, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'text-sm text-red-700 bg-red-100 px-3 py-2 rounded',
      className,
    )}
    {...props}
  >
    {message}
  </div>
));
ModalError.displayName = 'ModalError';

export {
  Modal,
  ModalBody,
  ModalButton,
  ModalCloseButton,
  ModalColorPicker,
  ModalError,
  ModalFooter,
  ModalHeader,
  ModalInput,
  ModalOverlay,
  ModalSelect,
  ModalTitle,
};
