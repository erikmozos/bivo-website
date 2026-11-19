import React from "react";
import { useTranslation } from "react-i18next";
import { useLegalPath } from "@/hooks/useLegalPath";
import { openCookiePreferences } from "@/components/ConsentBanner";

/** English body of the Cookie Policy (mirror of the Spanish body in pages/CookiePolicy). */
const CookiePolicyContentEn = () => {
  const { t } = useTranslation();
  const { privacyPath } = useLegalPath();

  const sectionTitle = (index: number) => {
    const number = t(`legal.cookies.sections.${index}.number`);
    const title = t(`legal.cookies.sections.${index}.title`);
    return `${number}. ${title}`;
  };

  return (
      <div className="max-w-3xl mx-auto w-full min-w-0 [&_a]:break-all">
        <h1 className="text-3xl font-bold mb-6">{t("legal.cookies.heading")}</h1>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">{sectionTitle(0)}</h2>
          <p className="mb-4">
            This Cookie Policy forms part of the legal texts of Bivo Training S.L. and governs the use of cookies and similar technologies on the websites and web platforms owned by Bivo Training S.L. (hereinafter, jointly, the “Websites”), including the general BIVO TRAINING website, the sport-specific websites and the BIVO COACH web platform.
          </p>
          <p className="mb-4">
            The purpose of this Policy is to inform the User clearly and transparently about what cookies are, what types of cookies may be used, for what purposes, and how they can be managed.
          </p>
          <p className="mb-4">
            The use of cookies and similar technologies will be carried out in accordance with applicable law and with the preferences expressed by the User through the corresponding cookie settings panel.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">{sectionTitle(1)}</h2>
          <p className="mb-4">
            Cookies are small files that are downloaded and stored on the User’s device when accessing certain websites.
          </p>
          <p className="mb-4">
            Cookies may, among other purposes, remember information about the browsing habits of the User or their device and, depending on the information they contain and how the device is used, may be used to recognise the User.
          </p>
          <p className="mb-4">
            Cookies may be first-party, when they are managed directly by Bivo Training S.L., or third-party, when they are managed by external providers.
          </p>
          <p className="mb-4">
            They may also be session cookies, which are deleted when the browser is closed, or persistent cookies, which remain stored for a defined period.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">{sectionTitle(2)}</h2>
          <p className="mb-4">
            The Websites may use the following categories of cookies:
          </p>

          <h3 className="text-xl font-semibold mb-3">Strictly necessary cookies</h3>
          <p className="mb-4">
            These are required for the proper functioning of the Websites and to allow the User to browse and use their features.
          </p>
          <p className="mb-4">
            These cookies may be used, among other purposes, to manage sessions, ensure security, remember certain settings or manage the User’s consent preferences.
          </p>
          <p className="mb-6">
            As they are necessary for the operation of the Websites, they do not require consent when the requirements established by applicable law are met.
          </p>

          <h3 className="text-xl font-semibold mb-3">Functionality cookies</h3>
          <p className="mb-4">
            They allow certain User preferences to be remembered and improve the functionality and personalisation of the Websites.
          </p>
          <p className="mb-4">
            These cookies may be used, for example, to remember settings, preferences or certain options previously selected by the User.
          </p>
          <p className="mb-6">
            Where applicable law requires consent for their use, such cookies will only be installed after the User has given that consent.
          </p>

          <h3 className="text-xl font-semibold mb-3">Analytics or performance cookies</h3>
          <p className="mb-4">
            They allow analysis of how Users use the Websites and obtain statistical information about their performance.
          </p>
          <p className="mb-4">
            The information obtained makes it possible to know, among other things, which sections are most used, how Users interact with the Websites and to detect possible errors or areas for improvement.
          </p>
          <p className="mb-4">
            Bivo Training S.L. may use third-party services for these purposes, such as Google Analytics or equivalent tools.
          </p>
          <p className="mb-6">
            Where these cookies require consent under applicable law, they will only be used after the User has given that consent.
          </p>

          <h3 className="text-xl font-semibold mb-3">Advertising and measurement cookies</h3>
          <p className="mb-4">
            These cookies make it possible to measure the effectiveness of advertising campaigns and, where appropriate, to show advertising adapted to the User’s interests.
          </p>
          <p className="mb-4">
            Bivo Training S.L. may use third-party tools, such as those provided by Meta Platforms or equivalent providers, to analyse conversions, measure advertising campaigns or perform other advertising and marketing-related functions.
          </p>
          <p className="mb-4">
            These cookies will only be used where there is a valid legal basis and, where necessary, after obtaining the User’s consent.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">{sectionTitle(3)}</h2>
          <p className="mb-4">
            The Websites may use, among others, the following cookies and technologies:
          </p>

          <h3 className="text-xl font-semibold mb-3">Google Analytics</h3>
          <ul className="list-disc list-inside ml-4 mb-4 space-y-1">
            <li>_ga</li>
            <li>_ga_*</li>
            <li>_gid</li>
          </ul>
          <p className="mb-6">
            These cookies make it possible to obtain statistical information about the use of the Websites and to analyse Users’ interaction with them.
          </p>

          <h3 className="text-xl font-semibold mb-3">Meta</h3>
          <ul className="list-disc list-inside ml-4 mb-4 space-y-1">
            <li>_fbp</li>
            <li>_fbc</li>
            <li>fr</li>
          </ul>
          <p className="mb-6">
            These cookies may be used to measure the effectiveness of advertising campaigns, analyse conversions and perform advertising and marketing-related functions.
          </p>

          <h3 className="text-xl font-semibold mb-3">Consent management</h3>
          <p className="mb-4">
            The Websites may use the browser’s local storage (localStorage) or equivalent technologies to store the User’s preferences regarding the use of cookies.
          </p>
          <p className="mb-4">
            The specific use of these cookies or technologies may vary depending on the Website, the available features and the technology providers used at any given time.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">{sectionTitle(4)}</h2>
          <p className="mb-4">
            Cookies will be retained for the period necessary to fulfil the purposes for which they were installed.
          </p>
          <p className="mb-4">
            The duration may vary depending on whether they are session or persistent cookies and on the characteristics of each provider.
          </p>
          <p className="mb-4">
            Session cookies are normally deleted when the User closes the browser, while persistent cookies may remain stored for the period set for each of them.
          </p>
          <p className="mb-4">
            The User may delete cookies at any time from their browser settings.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">{sectionTitle(5)}</h2>
          <p className="mb-4">
            Certain cookies used on the Websites may be managed by third parties that provide technological, analytics or advertising services to Bivo Training S.L.
          </p>
          <p className="mb-4">
            Where these providers process data outside the European Economic Area (EEA), international data transfers will be carried out in accordance with the safeguards provided by applicable data protection law.
          </p>
          <p className="mb-4">
            These safeguards may include adequacy decisions of the European Commission, standard contractual clauses or other legally recognised mechanisms.
          </p>
          <p className="mb-4">
            For additional information on the processing carried out by these providers, the User may consult their respective privacy and cookie policies.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">{sectionTitle(6)}</h2>
          <p className="mb-4">
            When accessing the Websites, the User may manage their cookie preferences through the corresponding banner or settings panel.
          </p>
          <p className="mb-2">Where applicable, the User may:</p>
          <ul className="list-disc list-inside ml-4 mb-4 space-y-2">
            <li>accept all cookies;</li>
            <li>reject non-necessary cookies;</li>
            <li>configure preferences by category;</li>
            <li>later change the preferences selected.</li>
          </ul>
          <p className="mb-4">
            <button
              type="button"
              onClick={openCookiePreferences}
              className="text-bivo-green hover:underline font-medium"
            >
              {t("legal.cookies.configureButton")}
            </button>
          </p>
          <p className="mb-4">
            Withdrawal of consent will not affect the lawfulness of processing carried out previously.
          </p>
          <p className="mb-4">
            Strictly necessary cookies for the operation of the Websites may remain active where they do not require consent under applicable law.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">{sectionTitle(7)}</h2>
          <p className="mb-4">
            The User may also allow, block or delete cookies installed on their device through the settings of the browser used.
          </p>
          <p className="mb-4">
            Disabling certain cookies may cause some Website features to be unavailable or not to work correctly.
          </p>
          <p className="mb-4">
            The procedures for managing cookies may vary depending on the browser and device used.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">{sectionTitle(8)}</h2>
          <p className="mb-4">
            Where the use of cookies or similar technologies involves the processing of personal data, such processing will be carried out in accordance with the{" "}
            <a href={privacyPath} className="text-bivo-green hover:underline">Privacy Policy</a>
            {" "}of Bivo Training S.L.
          </p>
          <p className="mb-4">
            The User may exercise the rights recognised by applicable data protection law through the procedures set out in that Privacy Policy.
          </p>
          <p className="mb-2">For any question related to the use of cookies or the processing of personal data you may contact:</p>
          <p className="mb-4">
            <strong>Bivo Training S.L.</strong>
            <br />
            NIF: B-22728117
            <br />
            Av. des Camp Verd, 4
            <br />
            Centre Bit Menorca (Alaior)
            <br />
            Illes Balears, Spain
            <br />
            <a href="mailto:hello@bivotraining.com" className="text-bivo-green hover:underline">
              hello@bivotraining.com
            </a>
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">{sectionTitle(9)}</h2>
          <p className="mb-4">
            Bivo Training S.L. may amend this Cookie Policy to adapt it to legislative, case-law, technical or service-related changes.
          </p>
          <p className="mb-4">
            Where changes are material, the User will be informed by the means that are appropriate under applicable law.
          </p>
        </section>

        <div className="border-t pt-6">
          <p className="text-sm text-gray-600">
            <strong>{t("legal.cookies.lastUpdate")}</strong>
          </p>
          <p className="text-sm text-gray-600 mt-2">
            {t("legal.cookies.contact")}{" "}
            <a href="mailto:hello@bivotraining.com" className="text-bivo-green hover:underline">
              hello@bivotraining.com
            </a>
          </p>
        </div>
      </div>
  );
};

export default CookiePolicyContentEn;
