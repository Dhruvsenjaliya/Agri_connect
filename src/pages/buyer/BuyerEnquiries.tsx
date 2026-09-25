import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MessageSquare, Send, Tractor, ArrowRight } from 'lucide-react';
import { NegotiationModal } from '../../components/common/NegotiationModal';

export const BuyerEnquiries: React.FC = () => {
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
        <h1 className="font-display font-extrabold text-2xl text-stone-900">Farmer Discussions & Enquiries</h1>
        <p className="text-xs text-stone-500 mt-0.5">
          Ask questions about packaging, sorting grades, or transit windows directly to the producer.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-xs min-h-[480px]">
        
        {/* Left List */}
        <div className="md:col-span-5 border-r border-stone-200 flex flex-col">
          <div className="p-4 border-b border-stone-100 bg-stone-50/60 font-display font-bold text-xs uppercase text-stone-500">
            Active Chats ({enquiries.length})
          </div>

          <div className="divide-y divide-stone-100 overflow-y-auto flex-1">
            {enquiries.map((enq) => {
              const isSelected = enq.id === selectedEnquiryId;
              return (
                <button
                  key={enq.id}
                  onClick={() => setSelectedEnquiryId(enq.id)}
                  className={`w-full p-4 text-left transition-colors flex flex-col gap-1 ${
                    isSelected ? 'bg-blue-50/70 border-l-4 border-blue-600' : 'hover:bg-stone-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-stone-900">{enq.farmerName}</span>
                    <span className="text-[10px] text-stone-400 font-mono">#{enq.id}</span>
                  </div>
                  <span className="text-xs font-semibold text-blue-900">{enq.requestedQuantity} {enq.unit} of {enq.product}</span>
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
              <div className="p-4 border-b border-stone-200 flex items-center justify-between bg-stone-50">
                <div>
                  <div className="font-bold text-sm text-stone-900">{currentEnquiry.farmerName} (Farmer)</div>
                  <span className="text-xs text-stone-500">{currentEnquiry.requestedQuantity} {currentEnquiry.unit} {currentEnquiry.product}</span>
                </div>

                <button
                  onClick={() => setShowNegotiationModal(true)}
                  className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xs transition-colors flex items-center gap-1"
                >
                  <span>Submit Commercial Offer</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="p-4 overflow-y-auto flex-1 space-y-3">
                {currentEnquiry.messages.map((m, idx) => {
                  const isMe = m.senderRole === 'buyer';
                  return (
                    <div key={idx} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-md p-3.5 rounded-2xl text-xs space-y-1 ${
                        isMe ? 'bg-blue-600 text-white rounded-br-none' : 'bg-stone-100 text-stone-900 rounded-bl-none'
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

              <form onSubmit={handleSendReply} className="p-3 border-t border-stone-200 flex items-center gap-2 bg-stone-50">
                <input
                  type="text"
                  placeholder="Type message to farmer..."
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  className="flex-1 px-4 py-2.5 bg-white border border-stone-300 rounded-xl text-xs text-stone-900 focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xs"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            </>
          ) : (
            <div className="p-8 text-center text-xs text-stone-400">Select an enquiry</div>
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
