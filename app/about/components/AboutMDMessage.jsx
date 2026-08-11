import ProtectedImage from "@/app/components/ProtectedImage";

export default function AboutMDMessage() {
  return (
    <section className="bg-gradient-to-r from-blue-50 to-blue-100/50 py-16 md:py-24 border-y border-gray-100">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          {/* Left: Message Text */}
          <div className="flex-1 lg:max-w-[60%]">
            <h2 className="text-primary text-[18px] md:text-[20px] font-bold uppercase tracking-wider mb-8">
              MESSAGE FROM MANAGING DIRECTOR
            </h2>
            <div className="space-y-6 text-gray-700 text-[14px] md:text-[15px] leading-[1.7]">
              <p>At SA Thread & Accessories Ltd, we believe that excellence is built by integrating quality, commitment, and trust. Since the beginning of our operation, we have been dedicated to serving the garments industry with premium accessories solutions that meet international standards and customer expectations.</p>
              <p>Bangladesh has established itself as one of the {"world's"} leading apparel manufacturers, and we are really proud to contribute to this growth by supporting our valued clients with reliable, and sustainable accessories products. Our commitment to continuous improvement, ethical business practices, and timely delivery has helped us build long-term partnerships with our clients.</p>
              <p>We understand that in our current competitive market, success depends not only on product quality but also on responsibility, adaptability, and customer satisfaction. Therefore, our team continuously works to enhance operational efficiency, adapt modern technologies, and maintain environmentally conscious practices.</p>
              <p>I would like to express my sincere gratitude to our clients, partners, employees, and stakeholders for their trust and support. Together, we will continue to move forward with integrity, innovation, and a shared vision for sustainable growth.</p>
            </div>
            <div className="mt-8 text-gray-900 font-medium text-[15px] leading-relaxed">
              Thank you<br />
              Mohammed Shahidul Islam<br />
              Managing Director SA Thread & Accessories Ltd.
            </div>
          </div>
          {/* Right: MD Photo */}
          <div className="flex-1 w-full lg:max-w-[38%] flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[360px]">
              <ProtectedImage
                src="/Employee Photograph/Mohammed Shahidul Islam- Managing Director.jpg"
                alt="Mohammed Shahidul Islam — Managing Director"
                fill
                className="object-cover object-top"
                wrapperClassName="relative w-full aspect-[3/4] rounded-2xl overflow-hidden shadow-xl border-4 border-white"
              >
                {/* Name Badge */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#2C3B52]/90 to-transparent px-5 py-6 z-20 pointer-events-none">
                  <p className="text-white font-bold text-[16px] leading-tight">Mohammed Shahidul Islam</p>
                  <p className="text-[#B8863B] text-[12px] font-semibold tracking-wide mt-1">Managing Director</p>
                  <p className="text-white/60 text-[11px] mt-0.5">SA Thread & Accessories Ltd.</p>
                </div>
              </ProtectedImage>
              {/* Decorative accent */}
              <div className="absolute -bottom-3 -right-3 w-full h-full border-2 border-dashed border-[#B8863B]/40 rounded-2xl -z-10" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
