import { useState } from "react";
import { motion } from "framer-motion";
import ConfessionModal from "@/components/ConfessionModal";

interface ConfessionProps {
  onNext: () => void;
  onPrev: () => void;
  onResponse: (response: 'accepted' | 'rejected') => void;
}

const Confession = ({ onNext, onPrev, onResponse }: ConfessionProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="w-full">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white shadow-lg rounded-2xl p-6 relative overflow-hidden"
      >
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/20 rounded-full"></div>
        <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-accent/10 rounded-full"></div>
        
        <div className="text-center mb-4">
          <i className="fas fa-envelope-open-text text-5xl text-primary animate-bounce-slow"></i>
        </div>
        
        <h2 className="text-3xl font-bold font-playfair text-center text-primary mb-4 relative z-10">Lời Tỏ Tình</h2>
        
        <div className="relative mb-8 bg-gradient-to-r from-primary/5 to-secondary/5 p-6 rounded-xl border border-primary/20">
          <div className="absolute -top-3 -left-3 w-6 h-6 text-primary text-2xl">"</div>
          <div className="absolute -bottom-3 -right-3 w-6 h-6 text-primary text-2xl">"</div>
          
          <p className="text-lg font-dancing text-gray-700 mb-4 text-center">
            Em thân yêu,
          </p>
          
          <p className="text-gray-600 mb-3 relative z-10">
            Từ ngày gặp em, anh đã biết trái tim mình thuộc về ai. Mỗi ngày trôi qua, anh càng thấm thía rằng em là người anh muốn dành trọn cuộc đời này để yêu thương và chăm sóc.
          </p>
          
          <p className="text-gray-600 mb-3 relative z-10">
            Nụ cười của em là ánh nắng trong ngày mưa của anh. Anh muốn được thấy nụ cười ấy mỗi ngày khi thức dậy và trước khi đi ngủ.
          </p>
          
          <p className="text-primary font-medium text-lg text-center mt-4 relative z-10">
            Em có đồng ý làm người yêu của anh không?
          </p>
        </div>
        
        <div className="flex space-x-3 mb-4">
          <button 
            onClick={onPrev}
            className="flex-1 border border-primary hover:bg-primary/10 text-primary font-semibold py-3 px-6 rounded-full transition duration-300 flex items-center justify-center"
          >
            <i className="fas fa-arrow-left mr-2"></i> Quay Lại
          </button>
          
          <button 
            onClick={handleOpenModal}
            className="flex-1 bg-primary hover:bg-primary/90 text-white font-semibold py-3 px-6 rounded-full transition duration-300 flex items-center justify-center"
          >
            Tiếp Tục <i className="fas fa-heart ml-2"></i>
          </button>
        </div>
      </motion.div>
      
      {/* Modal Tỏ Tình */}
      <ConfessionModal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
        onResponse={onResponse} 
      />
    </div>
  );
};

export default Confession;
