import React from "react";
import { useTranslation } from "react-i18next";
import { useLegalPath } from "@/hooks/useLegalPath";

/** English body of the Privacy Policy (mirror of PrivacyPolicyContent). */
const PrivacyPolicyContentEn = () => {
  const { t } = useTranslation();
  const { cookiesPath } = useLegalPath();

  return (
  <div className="max-w-3xl mx-auto w-full min-w-0 [&_a]:break-all">
    <h1 className="text-3xl font-bold mb-6">{t("legal.privacy.heading")}</h1>

    <h2 className="text-2xl font-semibold mb-4">{t("legal.privacy.importantTitle")}</h2>
    <p className="mb-4">{t("legal.privacy.intro")}</p>
    <p className="mb-8">{t("legal.privacy.introNote")}</p>

    <section className="mb-12">
      <h2 className="text-2xl font-semibold mb-4">{t("legal.privacy.sections.0.title")}</h2>
      <p className="mb-4">
        This privacy statement of Bivo Training S.L. is public and accessible to all users and customers of Bivo Training S.L., and applies to all websites, applications, events and other services of Bivo Training S.L., with bivotraining.com being the main site or domain.
      </p>
      <p className="mb-4">
        In particular, this Privacy Policy applies to the BIVO TRAINING website, the BIVO TRAINING mobile application available for iOS and Android devices, and the BIVO COACH web platform.
      </p>
      <p className="mb-4">
        It also applies to those documents or messages issued by Bivo Training S.L. that link to this privacy policy or statement or, as the case may be, indicate that it should be accessed so that the User can understand how Bivo Training S.L. uses their personal data.
      </p>
      <p className="mb-4">
        Some services may have their own privacy policies. If so, those policies will apply instead of this one.
      </p>
      <p className="mb-4">
        Below we provide general information about the uses of your personal information. Those uses and processing activities are then set out in more detail.
      </p>
    </section>

    <section className="mb-12">
      <h2 className="text-2xl font-semibold mb-4">{t("legal.privacy.sections.1.title")}</h2>
      <p className="mb-4">
        This Privacy Policy also applies to the use of the BIVO TRAINING mobile application, available for devices with Android operating systems, through the Google Play Store, and iOS, through the Apple App Store.
      </p>
      <p className="mb-4">
        When the User downloads, installs, registers for or uses the mobile application, BIVO TRAINING may process the personal data necessary for the provision of the service, the creation and management of the user account, the technical operation of the application, the personalisation of workouts and features, and the continuous improvement of the service, in accordance with this Privacy Policy.
      </p>

      <h3 className="text-xl font-semibold mb-3">Device permissions</h3>
      <p className="mb-4">
        The application may request access to certain device features only when necessary for the operation of its services. These permissions may include, among others:
      </p>
      <ul className="list-disc list-inside ml-4 mb-4 space-y-2">
        <li>notifications;</li>
        <li>access to the camera;</li>
        <li>access to photos or device storage.</li>
      </ul>
      <p className="mb-4">
        These permissions will always be requested with the User’s consent and may be accepted, refused or revoked at any time from the device settings.
      </p>
      <p className="mb-6">
        The use of these permissions will be limited exclusively to the provision of the service and no different use will be made without the User’s consent.
      </p>

      <h3 className="text-xl font-semibold mb-3">Subscriptions and trial period</h3>
      <p className="mb-4">
        BIVO TRAINING may offer the User a free trial period to access certain features of the application.
      </p>
      <p className="mb-4">
        The duration of the trial period may vary depending on promotions, campaigns or specific conditions communicated at any given time.
      </p>
      <p className="mb-4">
        Once the trial period has ended, access to certain features may require taking out a subscription.
      </p>
      <p className="mb-4">
        Subscriptions may be monthly or annual and will renew automatically for successive equal periods, unless the User cancels the subscription before the renewal date.
      </p>
      <p className="mb-4">
        The User may cancel the subscription at any time from their account settings on the corresponding platform (Google Play Store or Apple App Store).
      </p>
      <p className="mb-4">
        Payments, renewals, cancellations and billing of subscriptions made through the Google Play Store or Apple App Store will be managed directly by those platforms in accordance with their own terms and policies.
      </p>
      <p className="mb-4">
        BIVO TRAINING does not store or directly process the User’s payment data when the purchase is made through those platforms.
      </p>
    </section>

    <section className="mb-12">
      <h2 className="text-2xl font-semibold mb-4">{t("legal.privacy.sections.2.title")}</h2>
      <p className="mb-4">
        The processing of personal data is carried out in accordance with Regulation (EU) 2016/679 of the European Parliament and of the Council of 27 April 2016 (GDPR) and Organic Law 3/2018 of 5 December on the Protection of Personal Data and Guarantee of Digital Rights (LOPDGDD).
      </p>
      <p className="mb-4">
        Bivo Training S.L. respects your right to privacy and applies all applicable legislation in order to protect the personal data of its customers and users.
      </p>
      <p className="mb-4">
        Your personal data is processed with the utmost confidentiality, Bivo Training S.L., as Data Controller, having adopted the necessary technical and organisational measures to guarantee the confidentiality and security of personal data, preventing its alteration, loss, processing or unauthorised access.
      </p>
      <p className="mb-4">
        In order for you to receive information and, where appropriate, book, contract or use the products and services that Bivo Training S.L. offers through its websites, applications and other services, it may be necessary to provide certain personal data that allow your account to be created and managed, the service to be provided and your experience to be personalised.
      </p>
      <p className="mb-4">
        The User is responsible for keeping their personal data up to date.
      </p>

      <h3 className="text-xl font-semibold mb-3">Types of personal data we may process</h3>
      <p className="mb-4">
        Depending on how the User uses BIVO TRAINING’s services, we may process the following categories of data:
      </p>
      <ul className="list-disc list-inside ml-4 mb-4 space-y-2">
        <li>
          <strong>Identification data:</strong> such as name, email address or other data necessary for the creation and management of the user account.
        </li>
        <li>
          <strong>Profile data:</strong> information provided by the User to personalise their experience on the Platform, such as age, gender, date of birth, sporting level or other similar data.
        </li>
        <li>
          <strong>Sports activity data:</strong> information related to workouts completed, progress, performance, use of workouts or metrics associated with physical exercise within the Platform.
        </li>
        <li>
          <strong>Platform usage data:</strong> information about how the User interacts with our services, features used, frequency of use and activities carried out.
        </li>
        <li>
          <strong>Technical and device data:</strong> information about the devices used to access our services, operating system, technical identifiers or other data necessary for the proper functioning of the service.
        </li>
        <li>
          <strong>User-generated content:</strong> images, videos or other content that the User decides to upload or share on the Platform when such features are available.
        </li>
      </ul>
      <p className="mb-4">
        When the purchase is made through the App Store, Google Play or any other application store for mobile devices, payment information will be managed by those platforms in accordance with their own policies.
      </p>
      <p className="mb-2">We may also process information in order to:</p>
      <ul className="list-disc list-inside ml-4 mb-6 space-y-2">
        <li>handle service requests;</li>
        <li>provide the contracted services;</li>
        <li>send messages related to the status or operation of the services;</li>
        <li>carry out quality or satisfaction surveys;</li>
        <li>send promotions where there is a corresponding legal basis.</li>
      </ul>

      <h3 className="text-xl font-semibold mb-3">Information we receive from others</h3>
      <p className="mb-4">
        Other members may provide information about you when they interact with our services.
      </p>
      <p className="mb-6">
        We may receive information from partners or providers for purposes related to the provision, security, analysis or promotion of our services, where there is a legal basis that allows such processing.
      </p>

      <h3 className="text-xl font-semibold mb-3">Automatically collected information</h3>
      <p className="mb-4">
        We may collect data about the activities carried out within our services and about the devices used to access them.
      </p>
      <p className="mb-4">
        On the websites we may use cookies and similar technologies. For more information you may consult our{" "}
        <a href={cookiesPath} className="text-bivo-green hover:underline">Cookie Policy</a>
        .
      </p>
      <p className="mb-4">
        Where the Platform incorporates features that require geolocation, the data will only be collected with the User’s consent and may be disabled at any time from the device.
      </p>
      <p className="mb-4">
        With the User’s consent we may process additional information, such as photographs or videos.
      </p>
      <p className="mb-4">
        Where certain features involve the use of the camera, images or videos will only be processed with the User’s prior consent and for the technical, sporting, analytical or service-improvement purposes previously communicated.
      </p>
      <p className="mb-4">
        The User may revoke such permissions at any time from their device settings.
      </p>
    </section>

    <section className="mb-12">
      <h2 className="text-2xl font-semibold mb-4">{t("legal.privacy.sections.3.title")}</h2>
      <p className="mb-4">
        BIVO TRAINING’s services may be used by minors, directly or through clubs, academies, federations, gyms, coaches or other entities or professionals.
      </p>
      <p className="mb-4">
        Access and registration may be subject to age requirements or restrictions depending on the User’s country of residence and applicable law.
      </p>
      <p className="mb-4">
        Where, under applicable legislation, the authorisation or consent of the father, mother or legal guardian is required for the processing of the minor’s personal data, such processing must have the corresponding authorisation.
      </p>
      <p className="mb-4">
        Where access to BIVO TRAINING takes place through a club, academy, federation, gym, coach or other entity or professional, it shall be for that entity or professional to have a valid legal basis for the processing and disclosure of the minor’s data and to obtain the authorisations of their legal representatives where required.
      </p>
      <p className="mb-4">
        Bivo Training S.L. will process minors’ data in accordance with the purposes and responsibilities that apply to it in each case and will apply the protection measures provided for by applicable law.
      </p>
    </section>

    <section className="mb-12">
      <h2 className="text-2xl font-semibold mb-4">{t("legal.privacy.sections.4.title")}</h2>
      <p className="mb-4">
        BIVO COACH is the service of Bivo Training S.L. intended for sports clubs, academies, federations, gyms, personal trainers and other sports professionals or entities, which allows them to manage and monitor their athletes, clients, students, users or members.
      </p>
      <p className="mb-2">Through BIVO COACH the following may be processed, among others:</p>
      <ul className="list-disc list-inside ml-4 mb-4 space-y-2">
        <li>
          <strong>Entity or professional data:</strong> identification, contact, professional, tax and billing data necessary to manage the account, contracting and provision of the service.
        </li>
        <li>
          <strong>Data of the managed persons:</strong> identification and contact data of athletes, clients, students, users or members, as well as profile data, sports activity, workouts, progress and other information necessary for BIVO COACH features.
        </li>
      </ul>
      <p className="mb-4">
        When an entity or professional incorporates, manages or provides personal data of third parties through BIVO COACH, it must have a valid legal basis for their processing and disclosure to Bivo Training S.L., as well as obtain any authorisations required under applicable law, especially where minors are concerned.
      </p>
      <p className="mb-4">
        Athletes, clients, students, users or members may share certain data and information about their activity with the entity or professional to which they are linked through BIVO COACH, in accordance with the features and configuration of the service.
      </p>
      <p className="mb-4">
        The entity or professional linked to the User may access those profile data, sports activity, workouts, progress and other information that is necessary for the management and monitoring features offered through BIVO COACH.
      </p>
      <h3 className="text-xl font-semibold mb-3">Access for maintenance and technical support</h3>
      <p className="mb-4">
        Bivo Training S.L., through its duly authorised personnel, may access the BIVO COACH environment of the entities and professionals using the service when necessary to carry out maintenance, technical support, incident resolution or security tasks, or to ensure the proper functioning of the Platform.
      </p>
      <p className="mb-4">
        Such access will be limited to the information and features necessary for these purposes and will be carried out under criteria of confidentiality, security and restricted access, in accordance with applicable data protection law.
      </p>
      <p className="mb-4">
        Bivo Training S.L. will process such data in accordance with the purposes, instructions and responsibilities that apply to it in each case, adopting the measures necessary to guarantee their security and confidentiality.
      </p>
    </section>

    <section className="mb-12">
      <h2 className="text-2xl font-semibold mb-4">{t("legal.privacy.sections.5.title")}</h2>
      <p className="mb-4">
        Bivo Training S.L. may collect personal data through different channels, including its websites, applications, forms, customer support services and other means made available by BIVO TRAINING.
      </p>
      <p className="mb-4">
        In all cases and whenever applicable, the User will be offered the possibility of objecting to or not consenting to the use of their data for advertising purposes or commercial communications.
      </p>
    </section>

    <section className="mb-12">
      <h2 className="text-2xl font-semibold mb-4">{t("legal.privacy.sections.6.title")}</h2>
      <p className="mb-4">
        We use your personal information to offer, maintain and improve our services, ensuring their security and optimising your experience on our Platform.
      </p>
      <p className="mb-2">The specific uses of your information include:</p>
      <ul className="list-disc list-inside ml-4 mb-4 space-y-2">
        <li>creating and managing your account, facilitating effective access to and use of the Platform;</li>
        <li>providing BIVO TRAINING’s services and features;</li>
        <li>offering support, responding to enquiries and resolving incidents;</li>
        <li>staying in contact with the User regarding our services, including updates, notifications and changes to our terms or policies;</li>
        <li>adapting our services to your preferences and behaviour, including personalised recommendations and content adaptation;</li>
        <li>analysing the use of our services to identify areas for improvement and develop new features;</li>
        <li>preventing, detecting and combating fraud, abuse or other unlawful activities;</li>
        <li>complying with our legal obligations and cooperating with the authorities where necessary;</li>
        <li>running and measuring the effectiveness of advertising campaigns where there is a legal basis that allows such processing.</li>
      </ul>
      <p className="mb-6">
        Where the User has given their consent, we may also send promotional or informational communications related to BIVO TRAINING’s services.
      </p>

      <h3 className="text-xl font-semibold mb-3">Processing of personal data</h3>
      <p className="mb-2">The information we collect is processed, among other purposes, for the following:</p>
      <ul className="list-disc list-inside ml-4 mb-4 space-y-2">
        <li>creating, managing and maintaining the User’s account;</li>
        <li>providing our services;</li>
        <li>adapting the services to your preferences and offering a personalised experience;</li>
        <li>protecting our users and our systems;</li>
        <li>preventing, detecting and addressing security threats, fraud and illegal activities;</li>
        <li>complying with our legal and regulatory obligations.</li>
      </ul>
    </section>

    <section className="mb-12">
      <h2 className="text-2xl font-semibold mb-4">{t("legal.privacy.sections.7.title")}</h2>
      <p className="mb-2">The processing of personal data is carried out on the following legal bases:</p>
      <ul className="list-disc list-inside ml-4 mb-4 space-y-2">
        <li>performance of the contract for the provision of the service;</li>
        <li>the User’s consent where required, for example for commercial communications, camera, geolocation or other optional processing;</li>
        <li>compliance with legal obligations;</li>
        <li>legitimate interest in ensuring security, improving the service and preventing misuse, always respecting the User’s rights.</li>
      </ul>
    </section>

    <section className="mb-12">
      <h2 className="text-2xl font-semibold mb-4">{t("legal.privacy.sections.8.title")}</h2>
      <p className="mb-4">
        In the context of providing the service, BIVO TRAINING may process data related to physical activity, sports progress, performance, use of workouts and metrics associated with exercise for the purpose of providing the service, personalising the experience, carrying out technical analysis and improving the Platform.
      </p>
      <p className="mb-4">
        These data are not medical or health data.
      </p>
    </section>

    <section className="mb-12">
      <h2 className="text-2xl font-semibold mb-4">{t("legal.privacy.sections.9.title")}</h2>
      <p className="mb-4">
        BIVO TRAINING may use automated systems, including algorithms or artificial intelligence technologies, to analyse Platform usage, adapt content, personalise workouts, generate recommendations and improve the service.
      </p>
      <p className="mb-4">
        These processing activities are technical and functional in nature; they do not constitute automated decisions with legal effects on the User, nor medical diagnosis.
      </p>
    </section>

    <section className="mb-12">
      <h2 className="text-2xl font-semibold mb-4">{t("legal.privacy.sections.10.title")}</h2>
      <p className="mb-4">
        Primarily, we may share information with service providers and partners that help us manage, provide and improve our services.
      </p>
      <p className="mb-2">In particular:</p>
      <ul className="list-disc list-inside ml-4 mb-4 space-y-2">
        <li>we may share information with other members when the User discloses it through the service;</li>
        <li>we share the necessary data with providers that support our operations, such as hosting, infrastructure, analytics or customer support services;</li>
        <li>we may share information with BIVO TRAINING affiliates for operational and security reasons;</li>
        <li>we may disclose information to comply with legal processes or to protect the security of our users and services;</li>
        <li>we may share information with third parties where we have the User’s consent.</li>
      </ul>
    </section>

    <section className="mb-12">
      <h2 className="text-2xl font-semibold mb-4">{t("legal.privacy.sections.11.title")}</h2>
      <p className="mb-4">
        We are committed to ensuring that your personal data is protected regardless of where it is processed or stored.
      </p>
      <p className="mb-4">
        In certain circumstances, your data may be processed or transferred to countries outside the European Economic Area (EEA), for example when we use technology providers or infrastructure services necessary for the operation, development, maintenance and storage of the Platform, such as hosting, databases, analytics or technological tools, including among others Google, Firebase, Vercel or other equivalent providers.
      </p>
      <p className="mb-4">
        In such cases, BIVO TRAINING will apply the appropriate legal safeguards under applicable data protection law to ensure a level of protection equivalent to that of the EEA.
      </p>
      <p className="mb-4">
        When we transfer personal data outside the EEA, we ensure that such transfers are carried out in accordance with applicable law.
      </p>
      <p className="mb-2">To that end we may use, as appropriate:</p>
      <ul className="list-disc list-inside ml-4 mb-4 space-y-2">
        <li>standard contractual clauses approved by the European Commission;</li>
        <li>transfers to countries in respect of which there is an adequacy decision of the European Commission;</li>
        <li>other safeguards recognised by applicable law.</li>
      </ul>
    </section>

    <section className="mb-12">
      <h2 className="text-2xl font-semibold mb-4">{t("legal.privacy.sections.12.title")}</h2>
      <p className="mb-4">
        We are committed to providing the User with clear and accessible options to manage their personal data.
      </p>
      <p className="mb-2">Depending on the service used:</p>
      <ul className="list-disc list-inside ml-4 mb-4 space-y-2">
        <li>you may access and update certain personal information directly within our services;</li>
        <li>you may manage certain permissions from your device settings;</li>
        <li>you may delete your account directly through the service interface when this feature is available.</li>
      </ul>
    </section>

    <section className="mb-12">
      <h2 className="text-2xl font-semibold mb-4">{t("legal.privacy.sections.13.title")}</h2>
      <p className="mb-4">
        We retain personal information only for as long as necessary to fulfil the purposes described in this Policy and in accordance with applicable legal requirements.
      </p>
      <p className="mb-4">
        Once the data are no longer necessary, they will be securely deleted or anonymised.
      </p>
      <p className="mb-4">
        After an account is deleted, personal data will be blocked and retained only for the periods necessary to comply with legal obligations or to address possible liabilities, after which they will be securely deleted or anonymised.
      </p>
    </section>

    <section className="mb-12">
      <h2 className="text-2xl font-semibold mb-4">{t("legal.privacy.sections.14.title")}</h2>
      <p className="mb-6">
        The User may revoke at any time the authorisation they have given to allow their data to be used in a specific way. Such revocation will not have retroactive effect.
      </p>

      <h3 className="text-xl font-semibold mb-3">Performance and management of the contracted service and billing</h3>
      <p className="mb-4">
        Without the necessary data it will not be possible to provide certain services.
      </p>
      <p className="mb-4">
        Personal data, as well as data relating to the service, will be retained for the time necessary for the performance of the contractual relationship and to address possible liabilities arising from the service provided, generally for a period of five (5) years.
      </p>
      <p className="mb-4">
        Where the contract is entered into directly with BIVO TRAINING, billing-related data will be retained for the time necessary to comply with applicable legal and tax obligations, generally for the period established by the tax legislation in force.
      </p>
      <p className="mb-6">
        Where the contract is entered into through third-party platforms, such as the Apple App Store or Google Play, payment and billing management will be carried out by those platforms in accordance with their own terms, without prejudice to BIVO TRAINING’s ability to process the data necessary for service management, subscription control and compliance with legal obligations.
      </p>

      <h3 className="text-xl font-semibold mb-3">Handling of enquiries</h3>
      <p className="mb-4">
        The personal and contact data provided will be retained for the time necessary to manage and respond to the request made.
      </p>
      <p className="mb-6">
        The User may exercise the rights recognised by applicable law under the terms set out in the Exercise of rights section.
      </p>

      <h3 className="text-xl font-semibold mb-3">Quality of service</h3>
      <p className="mb-4">
        To fulfil our quality commitments, BIVO TRAINING may carry out surveys aimed at understanding the satisfaction of customers and users and improving our services.
      </p>
      <p className="mb-4">
        Where it is necessary to use personal contact data to send such surveys, they will be used in accordance with the applicable legal basis.
      </p>
      <p className="mb-6">
        Personal data processed specifically for this purpose will be retained for the period necessary to carry out and analyse that activity and, where applicable, for the period established to address possible liabilities.
      </p>

      <h3 className="text-xl font-semibold mb-3">Information about Bivo Training S.L. services</h3>
      <p className="mb-4">
        To keep the User informed about the services provided by Bivo Training S.L. and occasional promotions, we may process their contact data where there is consent or another legal basis that allows such processing.
      </p>
      <p className="mb-4">
        Commercial communications will offer the mechanisms necessary to unsubscribe from future communications.
      </p>
    </section>

    <section className="mb-12">
      <h2 className="text-2xl font-semibold mb-4">{t("legal.privacy.sections.15.title")}</h2>
      <p className="mb-4">
        When browsing BIVO TRAINING’s websites, technical and browsing data may be collected, such as the IP address, information about the device and browser, logs of the use of the services and other data related to browsing.
      </p>
      <p className="mb-4">
        This information may be used to administer the websites, ensure their operation and security, analyse their use and improve the services.
      </p>
      <p className="mb-4">
        BIVO TRAINING may use cookies and similar technologies in accordance with applicable law.
      </p>
      <p className="mb-4">
        The User may consult more detailed information about the cookies used, their purposes and the options to accept, reject or configure them in the corresponding{" "}
        <a href={cookiesPath} className="text-bivo-green hover:underline">Cookie Policy</a>
        .
      </p>
    </section>

    <section className="mb-12">
      <h2 className="text-2xl font-semibold mb-4">{t("legal.privacy.sections.16.title")}</h2>
      <p className="mb-4">
        BIVO TRAINING’s websites may use Google Analytics, a web analytics service provided by Google, to obtain information about the use of the websites and improve our services.
      </p>
      <p className="mb-4">
        Google Analytics may use cookies or other technologies to collect information related to browsing and use of the website.
      </p>
      <p className="mb-4">
        BIVO TRAINING will use Google Analytics applying, where applicable, consent mechanisms and the privacy measures required by applicable law.
      </p>
      <p className="mb-4">
        The User may manage or reject analytics cookies through the options available in the websites’ cookie management system.
      </p>
    </section>

    <section className="mb-12">
      <h2 className="text-2xl font-semibold mb-4">{t("legal.privacy.sections.17.title")}</h2>
      <p className="mb-2">The User may exercise the rights recognised by data protection law, including:</p>
      <ul className="list-disc list-inside ml-4 mb-4 space-y-2">
        <li>access;</li>
        <li>rectification;</li>
        <li>erasure;</li>
        <li>objection;</li>
        <li>restriction of processing;</li>
        <li>data portability.</li>
      </ul>
      <p className="mb-2">Requests may be addressed to:</p>
      <p className="mb-4">
        <strong>Bivo Training S.L.</strong>
        <br />
        B-22728117
        <br />
        <a href="mailto:hello@bivotraining.com" className="text-bivo-green hover:underline">
          hello@bivotraining.com
        </a>
      </p>
      <p className="mb-4">
        BIVO TRAINING may request the additional information or documentation necessary to confirm the identity of the person making the request.
      </p>
      <p className="mb-4">
        The User may also lodge a complaint with the Spanish Data Protection Agency (AEPD) where they consider that the processing of their personal data does not comply with applicable law.
      </p>
    </section>

    <div className="border-t pt-6">
      <p className="text-sm text-gray-600">
        <strong>{t("legal.privacy.lastUpdate")}</strong>
      </p>
      <p className="mb-0 text-sm text-gray-600 mt-2">
        {t("legal.privacy.contactQuestion")}{" "}
        <a href="mailto:hello@bivotraining.com" className="text-bivo-green hover:underline">
          hello@bivotraining.com
        </a>
      </p>
    </div>
  </div>
  );
};

export default PrivacyPolicyContentEn;
