import React from "react";
import Layout from "@/components/layout/Layout";
import Footer from "@/components/layout/Footer";
import SportLegalHeader from "@/components/layout/SportLegalHeader";
import PrivacyPolicyContent from "@/components/legal/PrivacyPolicyContent";
import { useLegalPath } from "@/hooks/useLegalPath";

const PrivacyPolicy = () => {
  const { sport } = useLegalPath();

  const content = (
    <div className="min-h-screen bg-white text-black pt-28 pb-16 px-4 sm:px-6 md:px-8 lg:px-12 w-full min-w-0 box-border">
      <PrivacyPolicyContent />
    </div>
  );

  if (sport) {
    return (
      <>
        <SportLegalHeader sport={sport} />
        {content}
        <Footer />
      </>
    );
  }

  return <Layout>{content}</Layout>;
};

export default PrivacyPolicy;
