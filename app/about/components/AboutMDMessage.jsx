import Image from "next/image";

export default function AboutMDMessage() {
  return (
    <section
      id="message"
      className="relative overflow-hidden bg-gradient-to-r from-white via-[#eaf0fd] to-[#b7cbf6] py-16 md:py-20 scroll-mt-24"
    >
      {/* Illustration — fills the right side and bleeds off the edge, as in the design */}
      <div className="hidden lg:block absolute inset-y-0 right-0 w-[52%] pointer-events-none">
        <Image
          src="/mdmessage.png"
          alt="Team collaborating around a table"
          fill
          className="object-cover object-center"
        />
        {/* fade the illustration's straight left edge into the section background */}
        <div className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-[#eaf0fd] to-transparent" />
      </div>

      <div className="container mx-auto px-6 relative">
        <div className="lg:max-w-[58%]">
          <p className="text-primary text-[12px] font-bold uppercase tracking-[2px] mb-6">
            Message from Managing Director
          </p>
          <div className="space-y-5 text-gray-700 text-[14px] leading-[1.7]">
            <p>At SA Thread &amp; Accessories Ltd, we believe that excellence is built by integrating quality, commitment, and trust. Since the beginning of our operation, we have been dedicated to serving the garments industry with premium accessories solutions that meet international standards and customer expectations.</p>
            <p>Bangladesh has established itself as one of the {"world's"} leading apparel manufacturers, and we are really proud to contribute to this growth by supporting our valued clients with reliable, and sustainable accessories products. Our commitment to continuous improvement, ethical business practices, and timely delivery has helped us build long-term partnerships with our clients.</p>
            <p>We understand that in our current competitive market, success depends not only on product quality but also on responsibility, adaptability, and customer satisfaction. Therefore, our team continuously works to enhance operational efficiency, adapt modern technologies, and maintain environmentally conscious practices.</p>
            <p>I would like to express my sincere gratitude to our clients, partners, employees, and stakeholders for their trust and support. Together, we will continue to move forward with integrity, innovation, and a shared vision for sustainable growth.</p>
          </div>
          <div className="mt-8 text-gray-700 text-[14px] leading-[1.7]">
            Thank you<br />
            Mohammed Shahidul Islam<br />
            Managing Director SA Thread &amp; Accessories Ltd.
          </div>
        </div>

        {/* Illustration on small screens, where the bleeding version is hidden */}
        <div className="lg:hidden mt-12 flex justify-center">
          <div className="relative w-full max-w-[420px] aspect-square">
            <Image
              src="/mdmessage.png"
              alt="Team collaborating around a table"
              fill
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
