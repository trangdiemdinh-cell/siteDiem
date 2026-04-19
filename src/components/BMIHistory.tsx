"use client";

import { Trash2, History, Calendar } from "lucide-react";
import { deleteBMIRecord } from "@/app/actions";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface Record {
  id: number;
  weight: number;
  height: number;
  bmi: number;
  category: string;
  createdAt: Date;
}

export function BMIHistory({ records }: { records: Record[] }) {
  const handleDelete = async (id: number) => {
    await deleteBMIRecord(id);
  };

  const getCategoryColor = (category: string) => {
    if (category.includes("Thiếu cân")) return "bg-blue-100 text-blue-700";
    if (category.includes("Bình thường")) return "bg-green-100 text-green-700";
    if (category.includes("Tiền béo phì")) return "bg-yellow-100 text-yellow-700";
    return "bg-red-100 text-red-700";
  };

  return (
    <div className="w-full max-w-2xl mx-auto mt-12">
      <div className="flex items-center gap-2 mb-6">
        <History className="w-6 h-6 text-gray-400" />
        <h3 className="text-xl font-bold text-gray-800">Lịch sử tính toán</h3>
      </div>

      <div className="space-y-4">
        <AnimatePresence mode="popLayout">
          {records.length === 0 ? (
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12 text-gray-400 border-2 border-dashed border-gray-100 rounded-3xl"
            >
              Chưa có dữ liệu lịch sử.
            </motion.p>
          ) : (
            records.map((record) => (
              <motion.div
                key={record.id}
                layout
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-4">
                  <div className="flex flex-col items-center justify-center bg-gray-50 rounded-xl p-3 min-w-[60px]">
                    <span className="text-2xl font-black text-gray-800 leading-none">{record.bmi}</span>
                    <span className="text-[10px] font-bold text-gray-400 uppercase mt-1">BMI</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className={cn("text-xs font-bold px-2 py-0.5 rounded-full", getCategoryColor(record.category))}>
                        {record.category}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-500">
                      <span>{record.weight}kg</span>
                      <span className="text-gray-300">•</span>
                      <span>{record.height}cm</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="hidden md:flex flex-col items-end text-right">
                    <div className="flex items-center gap-1 text-xs text-gray-400">
                      <Calendar className="w-3 h-3" />
                      {new Date(record.createdAt).toLocaleDateString("vi-VN")}
                    </div>
                  </div>
                  <button
                    onClick={() => handleDelete(record.id)}
                    className="p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
