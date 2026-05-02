interface SuggestedQuestionsProps {
  onSelect: (question: string) => void;
  disabled: boolean;
}

const QUESTIONS = [
  "Hạo phù hợp với vị trí nào?",
  "Project PaaS trên Kubernetes có gì nổi bật?",
  "Hạo đã thực hành backend như thế nào?",
  "Cho tôi tóm tắt các dự án chính.",
];

export function SuggestedQuestions({
  onSelect,
  disabled,
}: SuggestedQuestionsProps) {
  return (
    <div
      className="chat-suggested-questions"
      role="group"
      aria-label="Câu hỏi gợi ý"
    >
      {QUESTIONS.map((question) => (
        <button
          key={question}
          type="button"
          className="chat-suggestion-chip"
          disabled={disabled}
          onClick={() => onSelect(question)}
        >
          {question}
        </button>
      ))}
    </div>
  );
}
