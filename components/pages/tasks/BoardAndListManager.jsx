import { useState } from "react";
import CreateBoard from "./CreateBoard";
import CreateList from "./CreateList";

export default function BoardAndListManager({ boardId }) {
  const [isBoardModalOpen, setIsBoardModalOpen] = useState(false);
  const [isListModalOpen, setIsListModalOpen] = useState(false);

  return (
    <div className="space-y-5">
      {/* دکمه ایجاد تخته */}
      <button
        onClick={() => setIsBoardModalOpen(true)}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        ایجاد تخته جدید
      </button>
      <CreateBoard
        isOpen={isBoardModalOpen}
        onClose={() => setIsBoardModalOpen(false)}
      />

      {/* دکمه ایجاد لیست */}
      <button
        onClick={() => setIsListModalOpen(true)}
        className="bg-green-500 text-white px-4 py-2 rounded"
      >
        ایجاد لیست جدید
      </button>
      <CreateList
        isOpen={isListModalOpen}
        onClose={() => setIsListModalOpen(false)}
        boardId={boardId} // باید شناسه تخته موجود را ارسال کنیم
      />
    </div>
  );
}
