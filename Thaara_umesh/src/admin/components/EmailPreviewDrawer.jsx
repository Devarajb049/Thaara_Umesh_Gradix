import React from 'react';
import { X, Mail, Send, Check } from 'lucide-react';

const EmailPreviewDrawer = ({ isOpen, onClose, emailData }) => {
  if (!isOpen || !emailData) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-xs select-none">
      {/* Click outside to close */}
      <div className="absolute inset-0" onClick={onClose} />

      <div 
        className="w-full max-w-lg bg-white h-full relative shadow-2xl flex flex-col animate-slide-in"
        style={{ animationDuration: '0.25s' }}
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-zinc-150 flex items-center justify-between bg-zinc-50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center border border-primary/20">
              <Mail className="w-4.5 h-4.5" />
            </div>
            <div className="text-left">
              <h3 className="text-sm font-black text-zinc-900 uppercase tracking-widest leading-none">Email Log Receipt</h3>
              <p className="text-[10px] text-zinc-400 font-bold uppercase mt-1">Operational Notification Sent</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-zinc-200 text-zinc-400 hover:text-zinc-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Envelope Metadata */}
        <div className="px-6 py-4 bg-zinc-50/50 border-b border-zinc-150 text-left space-y-2">
          <div className="flex text-xs">
            <span className="w-16 font-bold text-zinc-400 uppercase tracking-wider">To:</span>
            <span className="font-semibold text-zinc-800">{emailData.to}</span>
          </div>
          <div className="flex text-xs">
            <span className="w-16 font-bold text-zinc-400 uppercase tracking-wider">Subject:</span>
            <span className="font-bold text-primary">{emailData.subject}</span>
          </div>
          <div className="flex text-xs">
            <span className="w-16 font-bold text-zinc-400 uppercase tracking-wider">From:</span>
            <span className="font-semibold text-zinc-500">no-reply@thaaraumesh.com</span>
          </div>
        </div>

        {/* HTML Content Body */}
        <div className="flex-grow p-6 overflow-y-auto bg-zinc-100 flex items-start justify-center">
          <div 
            className="w-full bg-white rounded-2xl shadow-sm border border-zinc-200 p-1 overflow-x-hidden"
            dangerouslySetInnerHTML={{ __html: emailData.body }}
          />
        </div>

        {/* Footer info */}
        <div className="p-4 border-t border-zinc-150 bg-zinc-50 text-center flex items-center justify-center gap-2 text-[10px] font-bold text-green-700 select-none">
          <div className="w-4 h-4 rounded-full bg-green-600 text-white flex items-center justify-center">
            <Check className="w-2.5 h-2.5" />
          </div>
          <span>Notification successfully processed and logged.</span>
        </div>
      </div>
    </div>
  );
};

export default EmailPreviewDrawer;
