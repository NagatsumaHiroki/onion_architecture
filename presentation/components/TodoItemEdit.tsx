'use client';

interface TodoItemEditProps {
  title: string;
  description: string;
  onTitleChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
  onSave: () => void;
  onCancel: () => void;
}

export function TodoItemEdit({
  title,
  description,
  onTitleChange,
  onDescriptionChange,
  onSave,
  onCancel,
}: TodoItemEditProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-3 border-2 border-blue-500">
      <input
        type="text"
        value={title}
        onChange={(e) => onTitleChange(e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg mb-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
        placeholder="タイトル"
      />
      <textarea
        value={description}
        onChange={(e) => onDescriptionChange(e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg mb-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
        placeholder="説明"
        rows={3}
      />
      <div className="flex gap-2">
        <button
          onClick={onSave}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
        >
          保存
        </button>
        <button
          onClick={onCancel}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition font-medium"
        >
          キャンセル
        </button>
      </div>
    </div>
  );
}
