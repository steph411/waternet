import React from "react";
import { FooterBottomBar } from "../components/Footer";
import Input from "../components/Input";
import { TopSection } from "../components/TopSection";

const ContactPage: React.FC = () => {
  return (
    <section className="bg-cold-gray-50">
      <TopSection noImage={true} searchBar={false}>
        <h2 className="w-3/4 pt-40 pb-32 mx-auto text-3xl font-bold text-white">
          Have a query? Want to partner with us? Contact us and our team will
          get in touch ASAP
        </h2>
      </TopSection>

      <div
        className={
          "w-1/3 px-6 py-8 -mt-56 text-center bg-white shadow-md lg:w-full rounded mx-auto my-16"
        }
      >
        <div className="flex justify-center">
          <img src="/logo_ewater_2.png" className="w-64" />
        </div>
        <h3 className="py-4 text-lg font-semibold text-center text-light-blue-800">
          eWaterGate is your partner of choice for water and environmental
          projects
        </h3>
        <form className="space-y-6 form">
          <Input type="text" placeholder="Name" />
          <Input type="email" placeholder="Email" />
          <textarea
            className="w-full px-3 py-2 border rounded-lg text-cold-gray-700 focus:outline-none focus:ring ring-light-blue-900"
            rows={6}
          ></textarea>
          <button
            className="w-full p-2 text-base text-white transition rounded bg-light-blue-900 hover:bg-light-blue-800"
            onClick={(e) => console.log(e)}
          >
            Submit
          </button>
        </form>
      </div>
      <FooterBottomBar />
    </section>
  );
};

export default ContactPage;
