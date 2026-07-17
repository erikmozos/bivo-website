import React from "react";
import Layout from "@/components/layout/Layout";
import PrivacyPolicyContent from "@/components/legal/PrivacyPolicyContent";

const PrivacyPolicy = () => (
  <Layout>
    <div className="min-h-screen bg-white text-black pt-28 pb-16 px-4 sm:px-6 md:px-8 lg:px-12 w-full min-w-0 box-border">
      <PrivacyPolicyContent />
    </div>
  </Layout>
);

export default PrivacyPolicy;
