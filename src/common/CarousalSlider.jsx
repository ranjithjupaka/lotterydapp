import bingo1 from "../assets/images/bingo1.png";
import lotto from "../assets/images/lotto.png";
import bingobaner from "../assets/images/bingobaner.png";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import SwiperCore from "swiper";
import { useRef } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";

const WORKS = [
  {
    image: bingo1,
  },
  {
    image: lotto,
  },
  {
    image: bingobaner,
  },
];

function CarousalSlider() {
  const navigationPrevRef = useRef(null);
  const navigationNextRef = useRef(null);
  SwiperCore.use([Navigation]);
  return (
    <>
      <div>
        <section id="ourWorks" className="bg-azureRadiance bg-opacity-5">
          <div className="container mx-auto">
            <Swiper
              pagination={{
                clickable: true,
              }}
              wrapperClass=" pt-[50px]"
              spaceBetween={16}
              loop={true}
              autoplay={{
                delay: 2000,
                disableOnInteraction: true,
              }}
              slidesPerView={1}
              navigation={{
                prevEl: navigationPrevRef.current,
                nextEl: navigationNextRef.current,
              }}
              onSwiper={(swiper) => {
                setTimeout(() => {
                  swiper.params.navigation.prevEl = navigationPrevRef.current;
                  swiper.params.navigation.nextEl = navigationNextRef.current;
                  swiper.navigation.destroy();
                  swiper.navigation.init();
                  swiper.navigation.update();
                });
              }}
              modules={[Navigation, Pagination, Autoplay]}
            >
              {WORKS.map((item, i) => {
                return (
                  <SwiperSlide className='' key={i}>
                    <div className=' rounded-xl sm:p-4 md:p-6 lg:p-2'>
                      <img
                        src={item.image}
                        className='rounded-md w-full lg:h-[360px] object-fill sm:h-[240px]'
                        alt=''
                      />
                    </div>
                  </SwiperSlide>
                )
              })}
            </Swiper>
          </div>
          {/* </div> */}
        </section>
      </div>
    </>
  );
}
export default CarousalSlider;
