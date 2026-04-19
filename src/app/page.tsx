import { BMICalculator } from "@/components/BMICalculator";
import { BMIHistory } from "@/components/BMIHistory";
import { getBMIRecords } from "@/app/actions";
import { Heart, Activity, Info, ChevronRight } from "lucide-react";

export default async function Home() {
  const { data: records = [] } = await getBMIRecords();

  return (
    <main className="min-h-screen bg-gray-50/50 pb-20">
      {/* Hero Section */}
      <div className="bg-indigo-600 pt-16 pb-24 px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-indigo-500 rounded-full opacity-20 blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-blue-400 rounded-full opacity-20 blur-3xl"></div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-indigo-500/30 px-4 py-2 rounded-full text-indigo-100 text-sm font-medium mb-6 backdrop-blur-sm border border-indigo-400/20">
            <Activity className="w-4 h-4" />
            <span>Sức khỏe là vàng</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">
            Theo dõi chỉ số <span className="text-blue-200 italic underline decoration-blue-400/50 underline-offset-8">BMI</span> của bạn
          </h1>
          <p className="text-indigo-100 text-lg md:text-xl max-w-2xl mx-auto opacity-90 leading-relaxed">
            Chỉ số khối cơ thể (BMI) là một công cụ giúp đánh giá tình trạng sức khỏe dựa trên sự cân đối giữa cân nặng và chiều cao.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 -mt-16 relative z-20">
        <div className="grid lg:grid-cols-12 gap-12">
          {/* Left Column: Calculator */}
          <div className="lg:col-span-5">
            <BMICalculator />
          </div>

          {/* Right Column: Info & History */}
          <div className="lg:col-span-7 flex flex-col gap-8">
            {/* Info Card */}
            <div className="bg-white p-8 rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100">
              <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <Info className="w-6 h-6 text-indigo-600" />
                Hiểu về chỉ số BMI
              </h3>
              
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-blue-50 border border-blue-100">
                  <span className="text-xs font-bold text-blue-600 uppercase mb-1 block">Dưới 18.5</span>
                  <p className="text-blue-900 font-bold mb-1">Thiếu cân</p>
                  <p className="text-blue-700/70 text-sm">Bạn cần bổ sung thêm dinh dưỡng.</p>
                </div>
                <div className="p-4 rounded-2xl bg-green-50 border border-green-100">
                  <span className="text-xs font-bold text-green-600 uppercase mb-1 block">18.5 - 24.9</span>
                  <p className="text-green-900 font-bold mb-1">Bình thường</p>
                  <p className="text-green-700/70 text-sm">Tình trạng cân nặng lý tưởng.</p>
                </div>
                <div className="p-4 rounded-2xl bg-yellow-50 border border-yellow-100">
                  <span className="text-xs font-bold text-yellow-600 uppercase mb-1 block">25.0 - 29.9</span>
                  <p className="text-yellow-900 font-bold mb-1">Tiền béo phì</p>
                  <p className="text-yellow-700/70 text-sm">Cần chú ý điều chỉnh chế độ ăn.</p>
                </div>
                <div className="p-4 rounded-2xl bg-red-50 border border-red-100">
                  <span className="text-xs font-bold text-red-600 uppercase mb-1 block">Trên 30.0</span>
                  <p className="text-red-900 font-bold mb-1">Béo phì</p>
                  <p className="text-red-700/70 text-sm">Cần tham khảo ý kiến bác sĩ.</p>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-gray-100">
                <p className="text-gray-500 text-sm italic">
                  * Lưu ý: BMI không đo trực tiếp lượng mỡ cơ thể và không phân biệt được mỡ và cơ.
                </p>
              </div>
            </div>

            {/* History */}
            <BMIHistory records={records as any} />
          </div>
        </div>
      </div>

      {/* Tips Section */}
      <div className="max-w-6xl mx-auto px-6 mt-20">
        <h2 className="text-3xl font-black text-gray-800 mb-10 text-center">Lời khuyên cho sức khỏe</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center mb-4 text-green-600">
              <Activity className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-gray-800 mb-2">Vận động thường xuyên</h4>
            <p className="text-gray-500 text-sm leading-relaxed">
              Dành ít nhất 30 phút mỗi ngày cho các hoạt động như đi bộ, chạy bộ hoặc bơi lội để duy trì cơ bắp và đốt cháy năng lượng.
            </p>
          </div>
          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center mb-4 text-blue-600">
              <Heart className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-gray-800 mb-2">Chế độ ăn cân bằng</h4>
            <p className="text-gray-500 text-sm leading-relaxed">
              Tăng cường rau xanh, trái cây và ngũ cốc nguyên hạt. Hạn chế đường, muối và các thực phẩm chế biến sẵn.
            </p>
          </div>
          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center mb-4 text-purple-600">
              <Info className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-gray-800 mb-2">Ngủ đủ giấc</h4>
            <p className="text-gray-500 text-sm leading-relaxed">
              Giấc ngủ chất lượng từ 7-8 tiếng mỗi đêm giúp cơ thể phục hồi và cân bằng các hormone kiểm soát sự thèm ăn.
            </p>
          </div>
        </div>
      </div>

      {/* Footer CTA */}
      <div className="max-w-4xl mx-auto px-6 mt-20 text-center">
        <div className="bg-white p-10 rounded-[2.5rem] shadow-2xl shadow-indigo-100/50 border border-indigo-50 flex flex-col items-center">
          <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center mb-6">
            <Heart className="w-8 h-8 text-red-500 fill-red-500/20" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Bạn muốn duy trì vóc dáng?</h2>
          <p className="text-gray-500 max-w-md mx-auto mb-8 leading-relaxed">
            Ngoài việc theo dõi BMI, hãy kết hợp tập luyện thể thao đều đặn và chế độ ăn uống lành mạnh.
          </p>
          <button className="flex items-center gap-2 text-indigo-600 font-bold hover:gap-3 transition-all">
            Tìm hiểu thêm về sức khỏe <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </main>
  );
}
