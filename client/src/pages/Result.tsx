import { motion } from "framer-motion";
import { Link } from "wouter";

interface ResultProps {
  result: 'accepted' | 'rejected' | null;
  onRestart: () => void;
}

const Result = ({ result, onRestart }: ResultProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white shadow-lg rounded-2xl p-6 relative overflow-hidden"
    >
      <div className="absolute top-2 right-2">
        <Link href="/view-result">
          <button className="text-sm text-gray-500 hover:text-primary">
            <i className="fas fa-eye mr-1"></i> Xem kết quả
          </button>
        </Link>
      </div>
      {result === 'accepted' && (
        <div>
          <div className="text-center mb-6">
            <div className="inline-block p-4 bg-primary/20 rounded-full">
              <i className="fas fa-heart text-5xl text-primary animate-pulse"></i>
            </div>
            <h2 className="text-3xl font-bold font-playfair text-primary mt-4">Tình Yêu Được Đáp Lại!</h2>
            <p className="text-gray-600 mt-2">Cảm ơn em đã đồng ý! Đây là khởi đầu của một hành trình tuyệt vời.</p>
          </div>
          
          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-6 rounded-xl mb-6">
            <p className="text-center font-dancing text-lg text-gray-700">
              "Tình yêu không phải là nhìn nhau mà là cùng nhìn về một hướng."
            </p>
            <p className="text-right text-sm text-gray-500 mt-2">- Antoine de Saint-Exupéry</p>
          </div>
          
          <div className="flex justify-center mb-6">
            <div className="rounded-lg shadow-md w-full h-48 bg-gray-200 overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1518199266791-5375a83190b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80" 
                alt="Happy couple" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          
          <div className="text-center">
            <p className="text-gray-600 mb-4">
              Anh hứa sẽ luôn yêu thương, chăm sóc và trân trọng em mỗi ngày.
            </p>
            <button 
              onClick={() => {
                alert('Chức năng chia sẻ đang được phát triển! Hãy kể cho bạn bè về tình yêu của bạn!');
              }}
              className="bg-secondary hover:bg-secondary/90 text-white font-semibold py-3 px-6 rounded-full transition duration-300 inline-flex items-center"
            >
              <i className="fas fa-share-alt mr-2"></i> Chia Sẻ Hạnh Phúc
            </button>
          </div>
        </div>
      )}
      
      {result === 'rejected' && (
        <div>
          <div className="text-center mb-6">
            <div className="inline-block p-4 bg-gray-200 rounded-full">
              <i className="fas fa-heart-broken text-5xl text-gray-400"></i>
            </div>
            <h2 className="text-3xl font-bold font-playfair text-gray-700 mt-4">Đôi Khi Tình Yêu Cần Thời Gian</h2>
            <p className="text-gray-600 mt-2">Cảm ơn em vì đã thành thật. Anh tôn trọng quyết định của em.</p>
          </div>
          
          <div className="bg-gray-100 p-6 rounded-xl mb-6">
            <p className="text-center font-dancing text-lg text-gray-700">
              "Tình bạn đôi khi là mầm mống đẹp nhất của tình yêu."
            </p>
            <p className="text-right text-sm text-gray-500 mt-2">- Unknown</p>
          </div>
          
          <div className="flex justify-center mb-6">
            <div className="rounded-lg shadow-md w-full h-48 bg-gray-200 overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1499957545774-e78fa557d72d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80" 
                alt="Person reflecting" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          
          <div className="text-center">
            <p className="text-gray-600 mb-4">
              Anh vẫn sẽ luôn ở đây nếu em cần. Tình bạn của chúng ta vẫn quý giá.
            </p>
            <button 
              onClick={onRestart}
              className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-3 px-6 rounded-full transition duration-300 inline-flex items-center"
            >
              <i className="fas fa-redo mr-2"></i> Bắt Đầu Lại
            </button>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default Result;
