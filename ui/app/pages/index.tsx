import { Footer } from "../components/Footer";
import { Authentication } from "../components/Authentication";
import { Videos } from "../components/Videos";
import GrowthLogo from "../components/logos/GrowthSvg";
import FilesLogo from "../components/logos/FilesLogo";
import ConnectLogo from "../components/logos/ConnectLogo";
import LearnLogo from "../components/logos/LearnLogo";
import Features from "../components/Features";
import FeaturesSlider from "../components/FeaturesSlider";
import WaterDrop from "../components/logos/WaterDrop";
import React from "react";
import { TopSection } from "../components/TopSection";

export default function Home() {
  const features = [
    {
      image: "/image_1.png",
      imageDescription: "growth image",
      title: "Reach your target audience and Grow your water business",
      description:
        "Use eWaterGate's targeted water and environmental community to increase efficiency of your marketing campaigns. Create a free website in just 5 mins to increase your brand awareness and get more clients for your water or environmental business",
      logo: GrowthLogo,
    },
    {
      image: "/image_2.png",
      imageDescription: "files logo",
      title:
        "Tackle your water & sanitation challenges from your mobile device",
      description:
        "Prevent infectious diseases from poor water quality, be the first to know when your drinking water supply gets contaminated, get alerts on when to expect water scarcity, how and when to dispose your waste and wastewater. All delivered directly to your mobile device.",
      logo: FilesLogo,
    },
    {
      image: "/image_3.png",
      imageDescription: "connect image",
      title: "Connect & Build Professional Relationships to Grow your Career",
      description:
        "Create or join interest groups on specific water and environmental topics to get valuable knowledge and professional linkages to advance you career. Stay updated on the latest jobs, conferences, grant funding and other opportunities in the water sector.",
      logo: ConnectLogo,
    },
    {
      image: "/image_4.png",
      imageDescription: "learn image",
      title: "Learn and make money by sharing water knowledge ",
      description:
        "Create your free personalized page on eWaterGate and earn money being an online teacher, content creator or publisher. Share your knowledge and build credibility as a water and environmental expert while generating income.",
      logo: LearnLogo,
    },
  ];

  return (
    <main className="overflow-hidden bg-gray-50 max-w-screen">
      <TopSection />
      <SectionTitle text="Explore eWaterGate" id="explore" />
      <Features features={features} />
      <SectionTitle text="eWaterGate Features" id="features" />
      <FeaturesSlider />
      <SectionTitle text="Digital WaterTools" id="digital-tools" />
      <Videos />
      <SectionTitle text="Join eWaterGate" />
      <Authentication />
      <div className="py-24 text-center px-72 xl:px-32">
        <span className="text-lg font-semibold text-center bold-overline text-light-blue-900 ">
          Digital intelligence to provide water and sanitation for all
        </span>
      </div>

      <Footer />
    </main>
  );
}

export const SectionTitle: React.FC<{
  text: string;
  id?: string;
  style?: any;
  className?: string;
}> = ({ text, id, style, className = "" }) => {
  const lastLetters = text.substr(text.length - 3);
  const mainText = text.substr(0, text.length - 3);

  return (
    <h1
      className={
        "relative flex items-center justify-center pt-1 pb-16 mt-4 text-4xl font-bold text-center text-light-blue-900 " +
        className
      }
      id={id}
      style={style}
    >
      {mainText}
      <WaterDrop text={lastLetters} className="mb-3 w-14" />
    </h1>
  );
};
