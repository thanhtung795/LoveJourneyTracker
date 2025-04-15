import React from 'react';
import { motion } from "framer-motion";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";

interface ConfessionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onResponse: (response: 'accepted' | 'rejected') => void;
}

const ConfessionModal = ({ isOpen, onClose, onResponse }: ConfessionModalProps) => {
  const { mutate: sendResponse, isPending } = useMutation({
    mutationFn: async (response: 'accepted' | 'rejected') => {
      const res = await apiRequest('POST', '/api/confession/response', { response });
      return res.json();
    },
    onSuccess: (data, variables) => {
      // Lưu kết quả vào localStorage
      localStorage.setItem('confessionResult', variables);
      localStorage.setItem('confessionTimestamp', new Date().toISOString());
      onResponse(variables);
      onClose();
    },
  });

  const handleResponse = (response: 'accepted' | 'rejected') => {
    sendResponse(response);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white max-w-md mx-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-playfair text-primary text-center">Lời Tỏ Tình</DialogTitle>
          <DialogDescription className="text-center mt-2">
            Em có đồng ý làm người yêu của anh không?
          </DialogDescription>
        </DialogHeader>

        <div className="relative p-4 mb-6 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-xl border border-primary/20">
          <div className="absolute -top-3 -left-3 w-6 h-6 text-primary text-2xl">"</div>
          <div className="absolute -bottom-3 -right-3 w-6 h-6 text-primary text-2xl">"</div>
          
          <p className="text-gray-600 mb-3 relative z-10 text-center">
            Từ ngày gặp em, anh đã biết trái tim mình thuộc về ai. Em là người anh muốn dành trọn cuộc đời này để yêu thương và chăm sóc.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 my-6">
          <motion.button 
            disabled={isPending}
            onClick={() => handleResponse('accepted')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-primary hover:bg-primary/90 text-white font-semibold py-4 px-6 rounded-xl transition duration-300 flex flex-col items-center justify-center h-28"
          >
            <i className="fas fa-check-circle text-3xl mb-2"></i>
            <span className="text-lg">Đồng Ý</span>
            <span className="text-xs mt-1">Em cũng yêu anh</span>
          </motion.button>
          
          <motion.button 
            disabled={isPending}
            onClick={() => handleResponse('rejected')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-4 px-6 rounded-xl transition duration-300 flex flex-col items-center justify-center h-28"
          >
            <i className="fas fa-times-circle text-3xl mb-2"></i>
            <span className="text-lg">Từ Chối</span>
            <span className="text-xs mt-1">Em xin lỗi</span>
          </motion.button>
        </div>

        <DialogFooter>
          {isPending && (
            <div className="w-full text-center">
              <div className="inline-block w-6 h-6 border-2 border-primary/20 border-t-primary rounded-full animate-spin"></div>
            </div>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConfessionModal;