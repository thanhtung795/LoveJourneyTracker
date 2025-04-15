import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Clock, User, ThumbsUp, ThumbsDown } from "lucide-react";

const Dashboard = () => {
  interface ConfessionResults {
    total: number;
    accepted: number;
    rejected: number;
    responses: { id: string; result: string; timestamp: string }[];
  }

  const { data, isLoading } = useQuery<ConfessionResults>({
    queryKey: ['/api/confession/results'],
    enabled: true,
  });

  return (
    <div className="min-h-screen bg-background/50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold font-playfair text-primary">Kết Quả Tỏ Tình</h1>
          <Link href="/">
            <Button variant="outline" className="gap-2">
              <ArrowLeft size={16} />
              Quay Lại
            </Button>
          </Link>
        </div>
        
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-xl text-center font-poppins">Thống Kê</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex justify-center py-8">
                <div className="w-8 h-8 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-secondary/10 rounded-lg p-6 text-center">
                  <User className="w-8 h-8 mx-auto mb-2 text-secondary" />
                  <h3 className="text-lg font-medium">Tổng Số</h3>
                  <p className="text-3xl font-bold text-secondary">{data?.total || 0}</p>
                </div>
                
                <div className="bg-primary/10 rounded-lg p-6 text-center">
                  <ThumbsUp className="w-8 h-8 mx-auto mb-2 text-primary" />
                  <h3 className="text-lg font-medium">Đồng Ý</h3>
                  <p className="text-3xl font-bold text-primary">{data?.accepted || 0}</p>
                </div>
                
                <div className="bg-gray-100 rounded-lg p-6 text-center">
                  <ThumbsDown className="w-8 h-8 mx-auto mb-2 text-gray-500" />
                  <h3 className="text-lg font-medium">Từ Chối</h3>
                  <p className="text-3xl font-bold text-gray-500">{data?.rejected || 0}</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
        
        <h2 className="text-2xl font-bold font-playfair text-secondary mb-4">Lịch Sử Tỏ Tình</h2>
        
        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="w-10 h-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
          </div>
        ) : data?.responses && data.responses.length > 0 ? (
          <div className="space-y-4">
            {data.responses.map((response: any, index: number) => (
              <Card key={index}>
                <CardContent className="p-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      {response.result === 'accepted' ? (
                        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                          <ThumbsUp className="w-5 h-5 text-primary" />
                        </div>
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                          <ThumbsDown className="w-5 h-5 text-gray-500" />
                        </div>
                      )}
                      
                      <div>
                        <p className="font-medium">
                          {response.result === 'accepted' ? 'Đồng Ý' : 'Từ Chối'}
                        </p>
                        <p className="text-sm text-gray-500">ID: {response.id}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-1 text-gray-500">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm">
                        {new Date(response.timestamp).toLocaleString('vi-VN')}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="p-8 text-center">
              <p className="text-gray-500">Chưa có kết quả tỏ tình nào.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
