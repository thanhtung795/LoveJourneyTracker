import { motion } from "framer-motion";

interface FirstImpressionProps {
  onNext: () => void;
}

const FirstImpression = ({ onNext }: FirstImpressionProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white shadow-lg rounded-2xl p-6 relative overflow-hidden"
    >
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-accent/20 rounded-full"></div>
      <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-secondary/10 rounded-full"></div>
      
      <h2 className="text-3xl font-bold font-playfair text-primary mb-4 relative z-10">Lần Đầu Gặp Em</h2>
      
      <p className="text-gray-600 mb-6 relative z-10">
        Khoảnh khắc đầu tiên nhìn thấy em, thế giới như ngừng lại. Nụ cười của em tỏa sáng cả không gian, và trái tim anh đã rung động.
      </p>
      
      <div className="mb-6 bg-background/50 p-4 rounded-lg border border-accent/30 relative z-10">
        <p className="text-lg font-dancing text-secondary italic">
          "Anh không thể quên được cảm giác bồi hồi khi lần đầu tiên chúng ta bắt gặp ánh mắt nhau."
        </p>
      </div>
      
      <div className="flex justify-center mb-2">
        <div className="rounded-lg shadow-md w-full h-48 bg-gray-200 overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1523301343968-6a6ebf63c672?ixlib=rb-4.0.3&auto=format&fit=crop&w=1169&q=80" 
            alt="Couple holding hands" 
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      
      <p className="text-gray-600 mb-6 relative z-10">
        Mỗi khoảnh khắc bên em đều khiến anh cảm thấy như đang sống trong một giấc mơ đẹp. Nụ cười của em, ánh mắt ấy, và cách em nói chuyện... tất cả đều khiến anh không thể rời mắt.
      </p>
      
      <button 
        onClick={onNext}
        className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-3 px-6 rounded-full transition duration-300 flex items-center justify-center"
      >
        Tiếp Theo <i className="ml-2 fas fa-arrow-right"></i>
      </button>
    </motion.div>
  );
};

export default FirstImpression;
