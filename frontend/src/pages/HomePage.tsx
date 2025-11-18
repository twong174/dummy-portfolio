import { HeroSection } from "../components/HeroSection";
import { FeaturedWorks } from "../components/FeaturedWorks";
import { OurPhilo } from "../components/OurPhilo";
import { Testimonials } from "../components/Testimonials";
import { ContactUs } from "../components/ContactUs";
import Footer from "../components/Footer";
import transition from "../transitions/Transition";

const HomePage: React.FC = () => {
  return (
    <div className="">
      <HeroSection />
      <FeaturedWorks />
      <OurPhilo />
      <Testimonials />
      <ContactUs />

      <Footer />
    </div>
  );
};

export default transition(HomePage);
