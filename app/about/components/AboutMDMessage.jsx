import Image from "next/image";

export default function AboutMDMessage() {
  return (
    <section
      id="message"
      className="py-16 md:py-24 border-y border-gray-100 scroll-mt-24"
      style={{
        background:
          "radial-gradient(120% 140% at 85% 30%, rgba(147,181,255,0.35) 0%, rgba(219,234,254,0.6) 45%, rgba(255,255,255,1) 85%)",
      }}
    >
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
              Managing Director,SA Thread & Accessories Ltd.
            </div>
          </div>
          {/* Right: illustration graphic, no card/badge — edges feathered so the illustration's blue backdrop melts into the page instead of showing as a hard box */}
          <div className="flex-1 w-full lg:max-w-[42%] flex justify-center lg:justify-end">
            <div
              className="relative w-full max-w-[420px] aspect-square"
              style={{
                WebkitMaskImage:
                  "radial-gradient(ellipse 78% 78% at center, black 62%, transparent 100%)",
                maskImage:
                  "radial-gradient(ellipse 78% 78% at center, black 62%, transparent 100%)",
              }}
            >
              <Image
                src="/mdmessage.png"
                alt="Team collaborating around a table"
                fill
                sizes="(max-width: 1024px) 100vw, 420px"
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}