import { ReactNode } from "react";

interface WorkCardProps {
  step: ReactNode;
  title: ReactNode;
  subtitle?: ReactNode;
  text?: ReactNode;
  note?: ReactNode;
}

export default function WorkCard({ step, title, subtitle, text, note }: WorkCardProps) {
  return (
    <div className="relative border border-gray-700 backdrop-blur-[1px] p-6 shadow-[0_0_20px_rgba(255,255,255,0.05)] hover:shadow-[0_0_25px_rgba(255,255,255,0.15)] transition-all duration-300  font-[HyperBlob]">
      <h3 className="text-white font-semibold text-lg tracking-wide">{step}</h3>

      <div className="mt-4 border border-gray-700 rounded-lg p-5 bg-black/50 backdrop-blur-[1px]">
        <h4 className="text-white/90 font-semibold text-lg">{title}</h4>
        <p className="text-lg font-semibold mt-2 text-white/80">{subtitle}</p>
        <p className="text-gray-300 mt-2 leading-relaxed">{text}</p>
        <p className="italic text-gray-500 mt-2">{note}</p>
      </div>
    </div>
  );
}