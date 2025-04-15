import { useState, useEffect } from 'react';
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const ViewResult = () => {
  const [result, setResult] = useState<'accepted' | 'rejected' | null>(null);
  const [timestamp, setTimestamp] = useState<string | null>(null);
  
  useEffect(() => {
    // Lấy kết quả từ localStorage
    const savedResult = localStorage.getItem('confessionResult');
    const savedTimestamp = localStorage.getItem('confessionTimestamp');
    
    if (savedResult) {
      setResult(savedResult as 'accepted' | 'rejected');
    }
    
    if (savedTimestamp) {
      setTimestamp(savedTimestamp);
    }
  }, []);
  
  // Format timestamp để hiển thị
  const formattedTime = timestamp 
    ? new Date(timestamp).toLocaleString('vi-VN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }) 
    : '';
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFF0F5] to-[#FFE6F0] py-12 px-4">
      <div className="max-w-md mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold font-playfair text-primary">Kết Quả Lời Tỏ Tình</h1>
          <Link href="/">
            <Button variant="outline" className="gap-2">
              <ArrowLeft size={16} />
              Quay Lại
            </Button>
          </Link>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white shadow-lg rounded-2xl p-6 relative overflow-hidden"
        >
          {!result && (
            <div className="text-center py-8">
              <div className="inline-block p-4 bg-gray-100 rounded-full">
                <i className="fas fa-search text-3xl text-gray-400"></i>
              </div>
              <h2 className="text-xl font-medium mt-4 mb-2">Không Tìm Thấy Kết Quả</h2>
              <p className="text-gray-600">
                Chưa có ai trả lời lời tỏ tình của bạn.
              </p>
              <Link href="/">
                <Button className="mt-4">
                  Quay Lại Trang Chính
                </Button>
              </Link>
            </div>
          )}
          
          {result === 'accepted' && (
            <div>
              <div className="text-center mb-6">
                <div className="inline-block p-4 bg-primary/20 rounded-full">
                  <i className="fas fa-heart text-4xl text-primary animate-pulse"></i>
                </div>
                <h2 className="text-2xl font-bold font-playfair text-primary mt-4">Lời Tỏ Tình Được Chấp Nhận!</h2>
                <p className="text-gray-600 mt-2">
                  Chúc mừng! Lời tỏ tình của bạn đã được chấp nhận.
                </p>
                
                {timestamp && (
                  <div className="mt-3 text-sm text-gray-500">
                    <i className="fas fa-clock mr-1"></i> {formattedTime}
                  </div>
                )}
              </div>
              
              <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-4 rounded-xl mb-6">
                <p className="text-center font-dancing text-lg text-gray-700">
                  "Tình yêu đích thực bắt đầu từ khoảnh khắc 'có' được thốt lên."
                </p>
              </div>
            </div>
          )}
          
          {result === 'rejected' && (
            <div>
              <div className="text-center mb-6">
                <div className="inline-block p-4 bg-gray-200 rounded-full">
                  <i className="fas fa-heart-broken text-4xl text-gray-400"></i>
                </div>
                <h2 className="text-2xl font-bold font-playfair text-gray-700 mt-4">Lời Tỏ Tình Chưa Được Chấp Nhận</h2>
                <p className="text-gray-600 mt-2">
                  Lời tỏ tình của bạn đã được từ chối. Đừng nản lòng, hãy tiếp tục phát triển bản thân.
                </p>
                
                {timestamp && (
                  <div className="mt-3 text-sm text-gray-500">
                    <i className="fas fa-clock mr-1"></i> {formattedTime}
                  </div>
                )}
              </div>
              
              <div className="bg-gray-100 p-4 rounded-xl mb-6">
                <p className="text-center font-dancing text-lg text-gray-700">
                  "Thất bại trong tình yêu không phải là kết thúc, mà là một khởi đầu mới."
                </p>
              </div>
            </div>
          )}
          
          <div className="flex justify-center mt-4">
            <Link href="/">
              <Button variant="secondary">
                <i className="fas fa-redo mr-2"></i> Thử Lại
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ViewResult;