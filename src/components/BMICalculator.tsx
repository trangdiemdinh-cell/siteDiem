"use client";

import { useState } from "react";
import { Calculator, Save, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";
import { saveBMIRecord } from "@/app/actions";
import { motion, AnimatePresence } from "framer-motion";

const categories = [
  { label: "Thiếu cân", range: [0, 18.5], color: "text-blue-500", bg: "bg-blue-100", border: "border-blue-200" },
  { label: "Bình thường", range: [18.5, 24.9], color: "text-green-500", bg: "bg-green-100", border: "border-green-200" },
  { label: "Tiền béo phì", range: [25, 29.9], color: "text-yellow-500", bg: "bg-yellow-100", border: "border-yellow-200" },
  { label: "Béo phì độ 1", range: [30, 34.9], color: "text-orange-500", bg: "bg-orange-100", border: "border-orange-200" },
  { label: "Béo phì độ 2", range: [35, 39.9], color: "text-red-500", bg: "bg-red-100", border: "border-red-200" },
  { label: "Béo phì độ 3", range: [40, 100], color: "text-red-700", bg: "bg-red-200", border: "border-red-300" },
];

export function BMICalculator() {
  const [weight, setWeight] = useState<string>("");
  const [height, setHeight] = useState<string>("");
  const [result, setResult] = useState<{ bmi: number; category: string } | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const calculateBMI = (e: React.FormEvent) => {
    e.preventDefault();
    const w = parseFloat(weight);
    const h = parseFloat(height) / 100; // convert cm to m

    if (w > 0 && h > 0) {
      const bmi = parseFloat((w / (h * h)).toFixed(1));
      let category = "Không xác định";
      for (const cat of categories) {
        if (bmi >= cat.range[0] && bmi <= cat.range[1]) {
          category = cat.label;
          break;
        }
      }
      setResult({ bmi, category });
    }
  };

  const handleSave = async () => {
    if (!result) return;
    setIsSaving(true);
    const res = await saveBMIRecord(parseFloat(weight), parseFloat(height), result.bmi, result.category);
    setIsSaving(false);
    if (res.success) {
      // Could add a toast notification here
      setWeight("");
      setHeight("");
      setResult(null);
    }
  };

  const getCategoryStyles = (label: string) => {
    return categories.find((c) => c.label === label) || categories[1];
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white rounded-3xl shadow-xl border border-gray-100">
      <div className="flex items-center gap-2 mb-6">
        <div className="p-2 bg-indigo-100 rounded-lg">
          <Calculator className="w-6 h-6 text-indigo-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800">Tính chỉ số BMI</h2>
      </div>

      <form onSubmit={calculateBMI} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Cân nặng (kg)</label>
          <input
            type="number"
            step="0.1"
            required
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
            placeholder="VD: 65"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Chiều cao (cm)</label>
          <input
            type="number"
            step="0.1"
            required
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
            placeholder="VD: 170"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl transition-all shadow-lg shadow-indigo-200 flex items-center justify-center gap-2"
        >
          <RefreshCw className="w-5 h-5" />
          Tính toán ngay
        </button>
      </form>

      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mt-8"
          >
            <div className={cn("p-6 rounded-2xl border text-center transition-all", getCategoryStyles(result.category).bg, getCategoryStyles(result.category).border)}>
              <p className="text-sm font-medium uppercase tracking-wider text-gray-500 mb-1">Chỉ số BMI của bạn</p>
              <h3 className="text-5xl font-black text-gray-800 mb-2">{result.bmi}</h3>
              <p className={cn("text-xl font-bold", getCategoryStyles(result.category).color)}>
                {result.category}
              </p>
            </div>

            <button
              onClick={handleSave}
              disabled={isSaving}
              className="mt-4 w-full flex items-center justify-center gap-2 py-3 border-2 border-dashed border-gray-200 hover:border-indigo-400 hover:text-indigo-600 rounded-xl transition-all text-gray-500 font-medium"
            >
              {isSaving ? <RefreshCw className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
              {isSaving ? "Đang lưu..." : "Lưu vào lịch sử"}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
