import Hero from '../components/Hero.jsx';
import PhotoBand from '../components/PhotoBand.jsx';
import Hallmarks from '../components/Hallmarks.jsx';
import Features from '../components/Features.jsx';
import Testimonials from '../components/Testimonials.jsx';
import { PHOTO_BANDS } from '../data/home.js';

/** Original pageMap.hero — hero, band-1, hallmarks, band-2, features, band-3, testimonials */
export default function HomePage() {
  return (
    <>
      <Hero />
      <PhotoBand id={PHOTO_BANDS[0].id} image={PHOTO_BANDS[0].image} />
      <Hallmarks />
      <PhotoBand id={PHOTO_BANDS[1].id} image={PHOTO_BANDS[1].image} />
      <Features />
      <PhotoBand id={PHOTO_BANDS[2].id} image={PHOTO_BANDS[2].image} />
      <Testimonials />
    </>
  );
}
