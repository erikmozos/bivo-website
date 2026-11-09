import React from "react";
import { useTranslation } from "react-i18next";
import { useLegalPath } from "@/hooks/useLegalPath";

/** English body of the Terms and Conditions (mirror of TermsConditionsContent). */
const TermsConditionsContentEn = () => {
  const { t } = useTranslation();
  const { privacyPath, cookiesPath } = useLegalPath();

  const sectionTitle = (index: number) => {
    const number = t(`legal.terms.sections.${index}.number`);
    const title = t(`legal.terms.sections.${index}.title`);
    return `${number}. ${title}`;
  };

  const privacyLink = (
    <a href={privacyPath} className="text-bivo-green hover:underline">Privacy Policy</a>
  );

  const emailLink = (
    <a href="mailto:hello@bivotraining.com" className="text-bivo-green hover:underline">
      hello@bivotraining.com
    </a>
  );

  return (
  <div className="max-w-3xl mx-auto w-full min-w-0 [&_a]:break-all">
    <h1 className="text-3xl font-bold mb-6">{t("legal.terms.heading")}</h1>

    <p className="mb-6">{t("legal.terms.intro")}</p>
    <p className="mb-6">{t("legal.terms.complianceNote")}</p>

    <div className="overflow-x-auto mb-8">
      <table className="min-w-full border border-gray-300">
        <tbody>
          <tr>
            <td className="border border-gray-300 px-4 py-2 font-medium bg-gray-50 w-48">{t("legal.terms.entityInfo.identity")}</td>
            <td className="border border-gray-300 px-4 py-2">{t("legal.terms.entityInfo.identityValue")}</td>
          </tr>
          <tr>
            <td className="border border-gray-300 px-4 py-2 font-medium bg-gray-50">{t("legal.terms.entityInfo.nif")}</td>
            <td className="border border-gray-300 px-4 py-2">{t("legal.terms.entityInfo.nifValue")}</td>
          </tr>
          <tr>
            <td className="border border-gray-300 px-4 py-2 font-medium bg-gray-50">{t("legal.terms.entityInfo.address")}</td>
            <td className="border border-gray-300 px-4 py-2">{t("legal.terms.entityInfo.addressValue")}</td>
          </tr>
          <tr>
            <td className="border border-gray-300 px-4 py-2 font-medium bg-gray-50">{t("legal.terms.entityInfo.email")}</td>
            <td className="border border-gray-300 px-4 py-2">
              <a href="mailto:hello@bivotraining.com" className="text-bivo-green hover:underline">
                {t("legal.terms.entityInfo.emailValue")}
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <p className="mb-12">{t("legal.terms.acceptanceNote")}</p>

    <section className="mb-12">
      <h2 className="text-2xl font-semibold mb-4">{sectionTitle(0)}</h2>
      <p className="mb-4">{t("legal.terms.sections.0.content.0")}</p>
      <p className="mb-4">{t("legal.terms.sections.0.content.1")}</p>
    </section>

    <section className="mb-12">
      <h2 className="text-2xl font-semibold mb-4">{sectionTitle(1)}</h2>
      <h3 className="text-xl font-semibold mb-3">2.1 Sign-up and registration as a User</h3>
      <p className="mb-4">
        The Platform may be used by natural persons over 18 years of age with sufficient legal capacity, as well as by duly represented legal entities. Minors may access and use BIVO TRAINING’s services in accordance with the “Minors” section of these Terms and Conditions, always respecting the age requirements and other provisions laid down by applicable law.
      </p>
      <p className="mb-4">
        The information provided upon registration must be accurate, complete and up to date. The account holder is responsible for safeguarding their credentials and for all activity carried out from their account, and must immediately notify any unauthorised access or security breaches.
      </p>
      <p className="mb-2">To become a User of the Platform it is essential to:</p>
      <ul className="list-disc list-inside ml-4 mb-4 space-y-2">
        <li>Truthfully complete the mandatory fields of the registration form.</li>
        <li>
          Accept these Terms and Conditions, as well as the {privacyLink} and, where applicable, the{" "}
          <a href={cookiesPath} className="text-bivo-green hover:underline">Cookie Policy</a>
          , and complete the sign-up process.
        </li>
      </ul>
      <p className="mb-4">
        To sign up as a User, the interested person must provide a valid email address and complete the data requested in the registration form, which may include identification and contact information and any other information necessary for the proper provision of the service.
      </p>
      <p className="mb-4">
        BIVO TRAINING may modify, update or expand the data required in the registration process in order to improve the service, adapt the Platform to new features or comply with legal obligations.
      </p>
      <p className="mb-4">
        It is possible to register using a User account on other platforms such as Google or similar. When using such accounts, personal data will be processed in accordance with the respective privacy policies.
      </p>
      <p className="mb-4">
        After truthfully completing the mandatory fields of the registration form, the User may, where applicable, be required to verify ownership of the email address or other data provided through the technical mechanisms that BIVO TRAINING determines at any given time.
      </p>
      <p className="mb-4">
        The User warrants that all data concerning their identity provided to BIVO TRAINING are true, accurate and complete and undertakes to keep them up to date.
      </p>
      <p className="mb-4">
        If the User provides any false, inaccurate or incomplete data, or if BIVO TRAINING considers that there are well-founded reasons to doubt their truthfulness, accuracy or completeness, BIVO TRAINING may deny present or future access to and use of the Platform or any of its content and/or services, as well as deregister the User and cancel their account.
      </p>
      <p className="mb-4">
        The User undertakes not to disclose their password or make it accessible to third parties. Since BIVO TRAINING cannot guarantee the identity of registered Users, the User will be responsible in the event of use of the password by third parties.
      </p>
      <p className="mb-4">
        Users undertake to immediately notify BIVO TRAINING of the theft, disclosure, loss or unauthorised use of their credentials by communication to {emailLink}.
      </p>
      <p className="mb-6">
        Once the corresponding registration process has been completed and, where applicable, the data provided have been verified, BIVO TRAINING will enable access to the features that correspond according to the type of registration, channel used — website, mobile application or application stores — and the level of service contracted or available.
      </p>

      <h3 className="text-xl font-semibold mb-3">2.2 Access to the Platform</h3>
      <p className="mb-4">
        Access is offered under a subscription model or paid plans. The fees and features of each plan will be communicated to the User prior to the commencement of the commercial relationship between the parties and may be modified, with reasonable advance notice before renewal.
      </p>
      <p className="mb-4">
        Subscriptions, where applicable, may be periodic with automatic renewal for successive periods until cancelled by the User before the start of the next billing cycle.
      </p>
      <p className="mb-4">
        Where the contract is entered into through application stores, such as the Apple App Store or Google Play, the management of charging, applicable currency, taxes, renewals, cancellations and billing conditions will be governed by the policies and terms of the corresponding platform.
      </p>
      <p className="mb-4">
        In other cases, prices will be shown in the indicated currency and will or will not include applicable taxes as specified at any given time. Plan changes may involve prorated adjustments in accordance with the policy in force.
      </p>
    </section>

    <section className="mb-12">
      <h2 className="text-2xl font-semibold mb-4">{sectionTitle(2)}</h2>
      <p className="mb-4">
        BIVO TRAINING acts, in general, as a provider of information society services that makes available to Users a technological infrastructure through which they can access training sessions designed by physical trainers specialised in racket sports, adapted to their level and goals.
      </p>
    </section>

    <section className="mb-12">
      <h2 className="text-2xl font-semibold mb-4">{sectionTitle(3)}</h2>
      <p className="mb-4">
        BIVO COACH is the service of Bivo Training S.L. intended for sports clubs, academies, federations, gyms, personal trainers, strength and conditioning coaches and other sports professionals or entities (hereinafter, the “Entity”), which allows them to manage, plan, supervise and monitor the physical preparation of their athletes, clients, students, users or members.
      </p>
      <p className="mb-4">
        BIVO COACH is a technological tool to support physical preparation, which includes or may include artificial intelligence features to facilitate the planning, personalisation, management and monitoring of training and sporting activity.
      </p>
      <p className="mb-4">
        The Entity may use BIVO COACH to create and manage profiles or groups, link athletes, create, modify or assign workouts, monitor them, consult information about their activity and progress and use the other features available at any given time in accordance with the contracted or enabled service.
      </p>
      <p className="mb-4">
        Contracting BIVO COACH grants the Entity a limited, non-exclusive and non-transferable licence to use the platform during the contracted period, in accordance with these Terms and Conditions and with the particular conditions set out in the corresponding offer, proposal, order, contract or commercial agreement.
      </p>
      <p className="mb-4">
        The Entity undertakes to use BIVO COACH exclusively for legitimate purposes related to its activity and will be responsible for the truthfulness, lawfulness and proper use of the information it enters or manages on the Platform.
      </p>
      <p className="mb-4">
        When the Entity incorporates, manages or provides personal data of athletes, clients, students, users, members or other persons, it must have a valid legal basis to do so and comply with the obligations applicable to it under data protection law. Where required, it must have previously obtained the corresponding authorisations or consents.
      </p>
      <p className="mb-4">
        The Entity will be responsible for properly managing the registration, deregistration and access permissions of its administrators, coaches, strength and conditioning coaches, technicians, employees or collaborators, as well as for withdrawing such access when they are no longer authorised to use BIVO COACH on its behalf. The accounts and credentials enabled for these professionals are personal and must not be shared between different people.
      </p>
      <p className="mb-4">
        Information accessible through BIVO COACH must be used exclusively for the sporting, management and monitoring purposes linked to the relationship existing between the Entity or professional and the athlete, client, student, user or member, and any unauthorised use or use unrelated to those purposes is prohibited.
      </p>
      <p className="mb-4">
        When the relationship between the Entity and an athlete, client, student, user or member ends, the Entity must cease accessing their information through BIVO COACH when there is no longer a legitimate basis for such access, without prejudice to any retention periods that may legally apply.
      </p>
      <p className="mb-4">
        BIVO COACH is a supporting technological tool and does not replace the professional judgement of the coach, strength and conditioning coach or technician in charge. Supervision of training and the final decision on its application, modification or adaptation will rest with the Entity or the professional in charge when the athlete is under their supervision. Likewise, BIVO COACH is not a medical or healthcare service and does not replace, where applicable, the assessment or judgement of doctors, physiotherapists or other healthcare professionals.
      </p>
      <p className="mb-4">
        When a User’s access to BIVO TRAINING is linked to a licence, subscription or agreement contracted by an Entity, such access may end or be modified if the relationship between the Entity and BIVO TRAINING ends, is suspended or is cancelled, or if the Entity stops including the User among its beneficiaries.
      </p>
      <p className="mb-4">
        The end of such access will not, as a general rule, entail the loss of the User’s account or of their activity and training history, which will be kept in accordance with the {privacyLink}. The User may, if they wish, directly contract any of the available BIVO TRAINING plans and continue using the service independently.
      </p>
      <p className="mb-4">
        Bivo Training S.L. will provide BIVO COACH in accordance with the contracted or enabled features and will process the information in accordance with the purposes, instructions and responsibilities that apply in each case.
      </p>
      <p className="mb-4">
        Contracting and using BIVO COACH implies that the Entity acknowledges and accepts that Bivo Training S.L., through authorised personnel, may access its management environment when necessary to provide technical support, carry out maintenance tasks, resolve incidents or ensure the security and proper functioning of the service, respecting at all times the confidentiality of the information and applicable data protection law.
      </p>
      <p className="mb-4">
        The economic conditions, method and frequency of payment, duration, renewal, number of users or licences, features, included services and other particular conditions of BIVO COACH will be set out, where applicable, in the corresponding offer, proposal, order, contract or commercial agreement accepted by the Entity, which will supplement these Terms and Conditions.
      </p>
    </section>

    <section className="mb-12">
      <h2 className="text-2xl font-semibold mb-4">{sectionTitle(4)}</h2>
      <p className="mb-4">
        BIVO TRAINING may be used by minors directly or through their link with sports clubs, academies, federations, gyms, personal trainers and other sports professionals or entities.
      </p>
      <p className="mb-4">
        Access and registration of minors may be subject to age requirements or restrictions depending on the country of residence and applicable law.
      </p>
      <p className="mb-4">
        Where under applicable legislation the intervention, authorisation or consent of the father, mother or legal guardian is required, use of the Platform and processing of the minor’s data must have such authorisation.
      </p>
      <p className="mb-4">
        Where the minor accesses or is incorporated into BIVO TRAINING through an Entity, it shall be for that Entity to have the necessary legitimisation to incorporate and manage the minor and to obtain from their legal representatives any authorisations that may be required, including those related to the processing and disclosure of their personal data.
      </p>
      <p className="mb-4">
        The Entity must adequately inform the minor and, where applicable, their legal representatives about the use of BIVO TRAINING in the context of the sports services it provides.
      </p>
      <p className="mb-4">
        Use of the workouts and sports content by minors must take into account their age, physical condition, sporting level and state of health, and under the supervision that is appropriate given their age and circumstances.
      </p>
      <p className="mb-4">
        BIVO TRAINING does not replace the assessment or supervision of medical or healthcare professionals. Where the minor has injuries, pathologies, heart problems, cardiovascular history, epilepsy, physical limitations or other conditions that may be affected by physical activity, a qualified healthcare professional must be consulted before carrying out the workouts.
      </p>
    </section>

    <section className="mb-12">
      <h2 className="text-2xl font-semibold mb-4">{sectionTitle(5)}</h2>
      <p className="mb-4">
        The User may at any time request the deletion of their profile and account through the mechanisms available on the Platform or application, or by sending an email from their registered address to {emailLink}, indicating the data necessary to identify the account.
      </p>
      <p className="mb-4">
        After deletion of the account, personal data will be processed in accordance with the {privacyLink}.
      </p>
      <p className="mb-4">
        BIVO TRAINING may suspend or deregister a User and, therefore, suspend or terminate the contractual relationship, in the event of breach of any of the obligations set out in these Terms and Conditions.
      </p>
    </section>

    <section className="mb-12">
      <h2 className="text-2xl font-semibold mb-4">{sectionTitle(6)}</h2>
      <p className="mb-4">
        The BIVO TRAINING Platform makes available to its Users a set of technological tools aimed at improving physical condition and sports performance in padel, tennis, pickleball and any other racket sports that may be incorporated in the future, with a particular focus on training, physical preparation and sports development.
      </p>
      <p className="mb-4">
        BIVO TRAINING is a digital training and sports performance improvement platform accessible primarily through its mobile application. The website also provides information, registration, access and other service-related features that may be available at any given time.
      </p>
      <p className="mb-4">
        BIVO TRAINING reserves the right to expand, modify, limit or remove Platform features, content or services in order to improve its operation, adapt to market needs or incorporate new technologies.
      </p>
      <p className="mb-4">
        Such updates may be implemented automatically or communicated to the User through official channels, including the website, the mobile application or email.
      </p>
    </section>

    <section className="mb-12">
      <h2 className="text-2xl font-semibold mb-4">{sectionTitle(7)}</h2>
      <p className="mb-4">
        Users are responsible for access to and proper use of their profile and Platform features, subject to the law in force, whether national or international, as well as to the principles of good faith, morality, good customs and public order.
      </p>
      <p className="mb-2">In particular and by way of illustration and without limitation, Users undertake to:</p>
      <ul className="list-disc list-inside ml-4 mb-4 space-y-2">
        <li>Provide truthful and up-to-date information in any communication with BIVO TRAINING.</li>
        <li>Not use personal data, whether their own or of third parties, containing sensitive information relating to identifiable or identified persons, except where their processing is permitted under applicable law and the Platform’s features.</li>
        <li>Not use false identities or impersonate third parties.</li>
        <li>Not create, use or maintain false, fictitious or simulated profiles, nor use the Platform under a concealed identity for analysis, monitoring, covert testing, “mystery shopper”, reverse engineering, data collection, competitive benchmarking, industrial espionage or any commercial, professional or strategic purpose not expressly authorised by BIVO TRAINING.</li>
        <li>Not obtain, collect, extract, reproduce, exploit or use technical, functional, commercial or strategic information of the Platform without prior written authorisation from BIVO TRAINING.</li>
        <li>Not use the Platform for illegal or unauthorised purposes.</li>
        <li>Not host, store, disclose, publish, distribute or share content that infringes fundamental rights to honour, image or personal and family privacy of third parties and, especially, of minors.</li>
        <li>Not alter or modify the Platform in whole or in part, nor circumvent, disable or manipulate its functions or services.</li>
        <li>Comply with the {privacyLink} and personal data protection legislation.</li>
        <li>Not introduce, store or disseminate content that infringes intellectual or industrial property rights or confidential information of third parties.</li>
        <li>Not use the Platform to insult, defame, intimidate, harass or infringe the rights of other Users.</li>
        <li>Not access other Users’ accounts.</li>
        <li>Not introduce, store or disseminate programs, data, codes, viruses, defective files or other elements liable to cause damage or alterations to the systems of BIVO TRAINING, other Users or third parties.</li>
        <li>Not destroy, alter, disable or damage data, information, programs or electronic documents of BIVO TRAINING, its Users or third parties.</li>
      </ul>
      <p className="mb-4">
        BIVO TRAINING reserves the right to investigate, suspend, block or delete any account in respect of which there are reasonable indications of a non-authentic identity, fraudulent use or use of the Platform for purposes other than those provided for in these Terms, as well as to take such legal action as may be appropriate for the defence of its legitimate interests, including the protection of its technology, confidential information, business model and trade secrets.
      </p>
      <p className="mb-4">
        Those who breach these obligations will be liable for any loss or damage they cause. To the maximum extent permitted by applicable law, BIVO TRAINING will not be liable for the consequences, damage or loss arising from unlawful access to or use of the Platform by third parties.
      </p>
      <p className="mb-4">
        Likewise, any User must comply with the respective tax and fiscal obligations applicable to them.
      </p>
    </section>

    <section className="mb-12">
      <h2 className="text-2xl font-semibold mb-4">{sectionTitle(8)}</h2>
      <p className="mb-4">
        Creation of a User profile may be necessary for the provision of certain services offered by BIVO TRAINING. During the registration process, the User must accept the {privacyLink} and the processing of their data in accordance with it.
      </p>
      <p className="mb-4">
        Where the User expressly gives their consent through the mechanisms enabled for that purpose, BIVO TRAINING may send commercial, promotional or informational communications related to its products, services or news.
      </p>
      <p className="mb-4">
        The User may revoke this consent at any time through the mechanisms enabled on the Platform or by communication to BIVO TRAINING, without this affecting the provision of the service.
      </p>
    </section>

    <section className="mb-12">
      <h2 className="text-2xl font-semibold mb-4">{sectionTitle(9)}</h2>
      <p className="mb-4">
        Certain Platform features may require access to permissions on the User’s device, such as the camera, photographs or gallery, and notifications.
      </p>
      <p className="mb-4">
        Where necessary, such access will be requested beforehand through the corresponding operating system permissions and will only take place when the User authorises it.
      </p>
      <p className="mb-4">
        Where the use of such permissions involves the processing of personal data, BIVO TRAINING will inform about the purposes and other aspects required by applicable law in accordance with its {privacyLink}.
      </p>
      <p className="mb-4">
        The User may refuse or revoke these permissions at any time from their device or browser settings, although that decision may affect the availability or proper functioning of certain Platform features.
      </p>
    </section>

    <section className="mb-12">
      <h2 className="text-2xl font-semibold mb-4">{sectionTitle(10)}</h2>
      <p className="mb-4">
        BIVO TRAINING is the owner or licensee of all intellectual and industrial property rights included in the Platform and over the content accessible through it, especially, but not only, texts, images, photographs, videos, workouts, graphic design, navigation structure, information, technology, source code, databases and any other content.
      </p>
      <p className="mb-4">
        Authorisation for the User to access and use the Platform and the services offered does not entail any assignment of intellectual or industrial property rights.
      </p>
      <p className="mb-4">
        BIVO TRAINING grants the User a limited licence to access and make personal use of the Platform and the services offered. Such licence is non-exclusive, worldwide and limited to the duration of the User’s contractual relationship with BIVO TRAINING in accordance with these Terms and Conditions.
      </p>
    </section>

    <section className="mb-12">
      <h2 className="text-2xl font-semibold mb-4">{sectionTitle(11)}</h2>
      <p className="mb-4">
        BIVO TRAINING will comply with applicable legislation on Artificial Intelligence.
      </p>
      <p className="mb-4">
        The Artificial Intelligence systems that may be used for the provision of the services will be technical and functional in nature and may be used, among other purposes, to analyse Platform usage, personalise workouts, generate sports recommendations and improve the service.
      </p>
      <p className="mb-4">
        Images, videos, recordings or materials that, where applicable, the User uploads to the Platform may be stored and processed to enable technical analysis, monitoring of sports progress and improvement of the service, and automated or artificial intelligence systems may be involved.
      </p>
      <p className="mb-4">
        Such processing is not medical in nature and does not constitute a health diagnosis.
      </p>
      <p className="mb-4">
        Where required, processing will be carried out on the corresponding legal basis under data protection law.
      </p>
    </section>

    <section className="mb-12">
      <h2 className="text-2xl font-semibold mb-4">{sectionTitle(12)}</h2>
      <p className="mb-4">
        On the Platform the User may find links to websites, applications or resources managed by third parties. The establishment of links, redirects or associations from the Platform does not imply the existence of any relationship, collaboration or dependence between BIVO TRAINING and the owner of the linked site or resource, unless expressly indicated.
      </p>
      <p className="mb-4">
        BIVO TRAINING assumes no responsibility for the content, information, services, legal terms, privacy policies or practices of third parties, nor does it guarantee their availability, truthfulness, accuracy or legality.
      </p>
      <p className="mb-4">
        Access to such external sites or resources takes place under the User’s responsibility.
      </p>
      <p className="mb-4">
        Where the Platform includes links to collaborators, partners or third parties related to the services offered, such links may reflect the existence of collaboration, integration or commercial relationship agreements where expressly indicated.
      </p>
    </section>

    <section className="mb-12">
      <h2 className="text-2xl font-semibold mb-4">{sectionTitle(13)}</h2>
      <p className="mb-4">
        The liability of BIVO TRAINING, as a provider of telematic services through a digital platform, is limited to making such Platform available so that Users can use the contracted services.
      </p>
      <p className="mb-4">
        BIVO TRAINING has the obligation and responsibility to keep the Platform in good working order, carrying out the appropriate maintenance and updates during the term of the commercial relationship.
      </p>
      <p className="mb-4">
        BIVO TRAINING will make reasonable efforts to maintain the proper functioning of the service, although it does not guarantee the absolute absence of interruptions, errors or technical failures.
      </p>
      <p className="mb-4">
        If a critical error is detected, BIVO TRAINING will carry out the maintenance tasks necessary to remedy it as soon as possible and without undue delay.
      </p>
      <p className="mb-4">
        BIVO TRAINING will not be liable for indirect damages, including, among others, loss of income, profits or data, except where such damages are caused by gross negligence or wilful misconduct of BIVO TRAINING.
      </p>
    </section>

    <section className="mb-12">
      <h2 className="text-2xl font-semibold mb-4">{sectionTitle(14)}</h2>
      <p className="mb-4">
        The services offered by BIVO TRAINING are aimed at the improvement of physical condition and sports performance and in no case constitute medical, healthcare, physiotherapeutic or clinical diagnostic services.
      </p>
      <p className="mb-4">
        The User acknowledges and accepts that the practice of physical activity entails inherent risks, including, among others, muscular, joint, cardiovascular or other injuries.
      </p>
      <p className="mb-4">
        Consequently, the User is responsible for assessing their state of health before using the services offered by the Platform and must consult a qualified healthcare professional where they suffer from or suspect they may suffer from injuries, pathologies, heart problems, cardiovascular history, epilepsy, physical limitations or other medical conditions that may be affected by physical activity.
      </p>
      <p className="mb-4">
        The User will be responsible for the use they make of the workouts, exercises, recommendations or content offered by the Platform, especially if they are injured, in a recovery process or under any physical condition that could be affected by sports activity.
      </p>
      <p className="mb-4">
        BIVO TRAINING will not be liable for injuries, physical damage, health problems, cardiovascular episodes or any other consequence arising from use of the Platform, except in cases where applicable law expressly provides otherwise.
      </p>
      <p className="mb-4">
        Use of the Platform by minors must take place with appropriate supervision given their age and circumstances. Such supervision may correspond to their parents or legal guardians and, where the minor uses BIVO TRAINING through BIVO COACH, may be complemented by the sports supervision of clubs, academies, federations, gyms, personal trainers or other sports professionals or entities that have the minor under their care or sports monitoring.
      </p>
      <p className="mb-4">
        In all cases, the conditions set out in the “Minors” section of these Terms and Conditions will also apply.
      </p>
      <p className="mb-4">
        Sports results or physical improvements that may derive from the use of BIVO TRAINING depend on multiple personal factors, including physical condition, consistency in training, state of health, nutrition, rest and other external factors. Therefore, BIVO TRAINING does not guarantee the achievement of sports results, specific physical improvements or a particular level of performance.
      </p>
    </section>

    <section className="mb-12">
      <h2 className="text-2xl font-semibold mb-4">{sectionTitle(15)}</h2>
      <p className="mb-4">
        If any of the clauses of these Terms and Conditions were null and void or voidable, it shall be deemed not to have been included.
      </p>
      <p className="mb-4">
        Such declaration of nullity will not invalidate the rest of the Terms and Conditions, which will remain in force and effect.
      </p>
    </section>

    <section className="mb-12">
      <h2 className="text-2xl font-semibold mb-4">{sectionTitle(16)}</h2>
      <p className="mb-4">
        BIVO TRAINING reserves the right to modify, update or improve the structure, configuration, design, features and content of the website, application or Platform.
      </p>
      <p className="mb-4">
        It may likewise modify these Terms and Conditions and the {privacyLink} in accordance with applicable legislation.
      </p>
      <p className="mb-4">
        Updated versions will be permanently available through the Platform.
      </p>
      <p className="mb-4">
        BIVO TRAINING does not guarantee the absolute absence of interruptions or errors in access to the Platform or its content. Nevertheless, it will, where reasonably possible, take the actions necessary to remedy errors, restore communications and keep its services up to date.
      </p>
    </section>

    <section className="mb-12">
      <h2 className="text-2xl font-semibold mb-4">{sectionTitle(17)}</h2>
      <p className="mb-4">
        The validity, performance and interpretation of these Terms and Conditions will be governed in all respects by Spanish law.
      </p>
      <p className="mb-4">
        In the event of any conflict or discrepancy in the interpretation or application of these Terms and Conditions, it will be submitted to the Courts and Tribunals of Palma de Mallorca (Balearic Islands, Spain), unless applicable consumer and user legislation establishes another mandatory venue.
      </p>
    </section>

    <section className="mb-12">
      <h2 className="text-2xl font-semibold mb-4">{sectionTitle(18)}</h2>
      <p className="mb-4">
        BIVO TRAINING reserves the right to modify these Terms and Conditions to adapt them to legislative or case-law developments, changes in its services, new features or Platform improvements.
      </p>
      <p className="mb-4">
        Where required under applicable law, the modifications will be communicated to Users.
      </p>
    </section>

    <div className="border-t pt-6">
      <p className="text-sm text-gray-600">
        <strong>{t("legal.terms.lastUpdate")}</strong>
      </p>
      <p className="text-sm text-gray-600 mt-2">
        {t("legal.terms.contact")} {emailLink}
      </p>
    </div>
  </div>
  );
};

export default TermsConditionsContentEn;
