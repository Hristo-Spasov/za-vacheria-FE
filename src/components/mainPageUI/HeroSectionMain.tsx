import Image from "next/image";

const HeroSectionMain = () => {
  return (
 <div className="relative w-full lg:h-[70dvh] md:h-[50dvh] h-[30dvh] overflow-hidden z-1">
      <Image
        src="/main_page_hero.png"
        alt="Main page hero image"
        priority
        fill
        className="object-cover lg:object-[30%_30%] object-left"
      />
    </div>
  );
};

export default HeroSectionMain;
