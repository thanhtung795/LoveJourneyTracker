import { motion } from "framer-motion";

interface CharacteristicsProps {
  onNext: () => void;
  onPrev: () => void;
}

const Characteristics = ({ onNext, onPrev }: CharacteristicsProps) => {
  const traits = [
    {
      icon: "fa-heart",
      color: "primary",
      title: "Chân Thành",
      description: "Anh luôn muốn ở bên em với tất cả sự chân thành."
    },
    {
      icon: "fa-shield-alt",
      color: "secondary",
      title: "Bảo Vệ",
      description: "Anh sẽ luôn bảo vệ và chăm sóc em mỗi ngày."
    },
    {
      icon: "fa-comment-dots",
      color: "accent",
      title: "Lắng Nghe",
      description: "Anh sẽ luôn là người lắng nghe em trong mọi hoàn cảnh."
    },
    {
      icon: "fa-infinity",
      color: "primary",
      title: "Trọn Vẹn",
      description: "Tình yêu anh dành cho em sẽ mãi mãi không thay đổi."
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white shadow-lg rounded-2xl p-6 relative overflow-hidden"
    >
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-secondary/20 rounded-full"></div>
      <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-accent/20 rounded-full"></div>
      
      <h2 className="text-3xl font-bold font-playfair text-secondary mb-4 relative z-10">Điều Anh Trân Trọng</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {traits.map((trait, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="bg-background/40 p-4 rounded-lg flex flex-col items-center text-center"
          >
            <div className={`w-12 h-12 bg-${trait.color}/20 rounded-full flex items-center justify-center mb-2`}>
              <i className={`fas ${trait.icon} text-${trait.color}`}></i>
            </div>
            <h3 className="font-medium mb-1">{trait.title}</h3>
            <p className="text-sm text-gray-600">{trait.description}</p>
          </motion.div>
        ))}
      </div>
      
      <div className="mb-6 bg-gradient-to-r from-primary/10 to-secondary/10 p-4 rounded-lg border border-secondary/20">
        <p className="text-lg font-dancing text-dark italic text-center">
          "Anh yêu em không chỉ vì vẻ đẹp của em, mà còn vì cách em làm cho anh trở nên tốt hơn mỗi ngày."
        </p>
      </div>
      
      <div className="flex space-x-3">
        <button 
          onClick={onPrev}
          className="flex-1 border border-primary hover:bg-primary/10 text-primary font-semibold py-3 px-6 rounded-full transition duration-300 flex items-center justify-center"
        >
          <i className="fas fa-arrow-left mr-2"></i> Quay Lại
        </button>
        
        <button 
          onClick={onNext}
          className="flex-1 bg-secondary hover:bg-secondary/90 text-white font-semibold py-3 px-6 rounded-full transition duration-300 flex items-center justify-center"
        >
          Tiếp Theo <i className="fas fa-arrow-right ml-2"></i>
        </button>
      </div>
    </motion.div>
  );
};

export default Characteristics;
