import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MessageSquare, Send, User, Building2, CheckCircle2, ArrowRight } from 'lucide-react';
import { NegotiationModal } from '../../components/common/NegotiationModal';

export const FarmerEnquiries: React.FC = () => {
  const { enquiries, replyEnquiry, currentUser, listings } = useApp();
  const [selectedEnquiryId, setSelectedEnquiryId] = useState<string>(enquiries[0]?.id || '');
  const [replyText, setReplyText] = useState('');
  const [showNegotiationModal, setShowNegotiationModal] = useState(false);

  const currentEnquiry = enquiries.find(e => e.id === selectedEnquiryId) || enquiries[0];

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim() || !currentEnquiry) return;
    replyEnquiry(currentEnquiry.id, replyText.trim());
    setReplyText('');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display font-extrabold text-2xl text-stone-900">Buyer Enquiries & Direct Chats</h1>
        <p className="text-xs text-stone-500 mt-0.5">
          Communicate with prospective buyers, clarify harvest windows, and convert discussions to offers.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-xs min-h-[500px]">
        
        {/* Left Enquiries List */}
        <div className="md:col-span-5 border-r border-stone-200 flex flex-col">
          <div className="p-4 border-b border-stone-100 bg-stone-50/60 font-display font-bold text-xs uppercase text-stone-500">
            Inbox ({enquiries.length})
          </div>

          <div className="divide-y divide-stone-100 overflow-y-auto flex-1">
            {enquiries.map((enq) => {
              const isSelected = enq.id === selectedEnquiryId;
              return (
                <button
                  key={enq.id}
                  onClick={() => setSelectedEnquiryId(enq.id)}
                  className={`w-full p-4 text-left transition-colors flex flex-col gap-1 ${
                    isSelected ? 'bg-emerald-50/70 border-l-4 border-emerald-600' : 'hover:bg-stone-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-stone-900">{enq.buyerName}</span>
                    <span className="text-[10px] text-stone-400 font-mono">#{enq.id}</span>
                  </div>
                  <span className="text-xs font-semibold text-agri-800">{enq.requestedQuantity} {enq.unit} of {enq.product}</span>
                  <p className="text-[11px] text-stone-500 line-clamp-1">{enq.message}</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Chat Thread */}
        <div className="md:col-span-7 flex flex-col justify-between">
          {currentEnquiry ? (
            <>
              {/* Top Chat Header */}
              <div className="p-4 border-b border-stone-200 flex items-center justify-between bg-stone-50">
                <div>
                  <div className="font-bold text-sm text-stone-900">{currentEnquiry.buyerName}</div>
                  <span className="text-xs text-stone-500">Subject: {currentEnquiry.requestedQuantity} {currentEnquiry.unit} {currentEnquiry.product}</span>
                </div>

                <button
                  onClick={() => setShowNegotiationModal(true)}
                  className="px-3.5 py-1.5 rounded-xl bg-agri-700 hover:bg-agri-800 text-white font-bold text-xs shadow-xs transition-colors flex items-center gap-1"
                >
                  <span>Create Official Offer</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Message History */}
              <div className="p-4 overflow-y-auto flex-1 space-y-3">
                {currentEnquiry.messages.map((m, idx) => {
                  const isMe = m.senderRole === 'farmer';
                  return (
                    <div key={idx} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-md p-3.5 rounded-2xl text-xs space-y-1 ${
                        isMe ? 'bg-agri-700 text-white rounded-br-none' : 'bg-stone-100 text-stone-900 rounded-bl-none'
                      }`}>
                        <div className="flex items-center justify-between gap-4 font-semibold text-[10px] opacity-80">
                          <span>{m.senderName}</span>
                          <span>{m.timestamp}</span>
                        </div>
                        <p className="leading-relaxed">{m.text}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Reply Input Form */}
              <form onSubmit={handleSendReply} className="p-3 border-t border-stone-200 flex items-center gap-2 bg-stone-50">
                <input
                  type="text"
                  placeholder="Type your reply to buyer..."
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  className="flex-1 px-4 py-2.5 bg-white border border-stone-300 rounded-xl text-xs text-stone-900 focus:ring-2 focus:ring-agri-500"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 rounded-xl bg-agri-700 hover:bg-agri-800 text-white font-bold text-xs shadow-xs transition-colors flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send</span>
                </button>
              </form>
            </>
          ) : (
            <div className="p-8 text-center text-xs text-stone-400">Select an enquiry to view conversation</div>
          )}
        </div>

      </div>

      {showNegotiationModal && currentEnquiry && (
        <NegotiationModal
          isOpen={showNegotiationModal}
          onClose={() => setShowNegotiationModal(false)}
          listing={listings[0]}
        />
      )}
    </div>
  );
};
