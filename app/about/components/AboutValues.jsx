import { BadgeCheck, Award, Lightbulb, Users, HeartHandshake } from "lucide-react";

const values = [
  { icon: BadgeCheck, title: "Integrity", text: "We do the right thing, always." },
  { icon: Award, title: "Excellence", text: "Committed to the highest standards." },
  { icon: Lightbulb, title: "Innovation", text: "Continuously improving and innovating." },
  { icon: Users, title: "Teamwork", text: "Together we achieve more." },
  { icon: HeartHandshake, title: "Customer Focus", text: "Dedicated to our customers' success." },
];

export default function AboutValues() {
  return (
    <section className="bg-white border-t border-gray-100">
      <div className="container mx-auto px-6 py-10">
        {/* Desktop: 5 columns with vertical dividers */}
        <div className="hidden md:grid md:grid-cols-5 md:divide-x md:divide-gray-200">
          {values.map((v) => (
            <div key={v.title} className="flex flex-col items-start gap-2 px-6 first:pl-0 last:pr-0">
              <v.icon className="w-6 h-6 text-primary" strokeWidth={1.5} />
              <h6 className="font-bold text-[14px] text-gray-900">{v.title}</h6>
              <p className="text-[12px] text-gray-500 leading-snug">{v.text}</p>
            </div>
          ))}
        </div>

        {/* Mobile: 2-column grid */}
        <div className="grid grid-cols-2 gap-6 md:hidden">
          {values.map((v) => (
            <div key={v.title} className="flex flex-col items-start gap-2">
              <v.icon className="w-5 h-5 text-primary" strokeWidth={1.5} />
              <h6 className="font-bold text-[13px] text-gray-900">{v.title}</h6>
              <p className="text-[11px] text-gray-500 leading-snug">{v.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
