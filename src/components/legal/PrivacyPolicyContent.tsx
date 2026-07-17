import React from "react";
import { useTranslation } from "react-i18next";

const PrivacyPolicyContent = () => {
  const { t } = useTranslation();

  return (
  <div className="max-w-3xl mx-auto w-full min-w-0 [&_a]:break-all">
    <h1 className="text-3xl font-bold mb-6">{t("legal.privacy.heading")}</h1>

    <p className="mb-4 font-medium">{t("legal.privacy.intro")}</p>

    <p className="mb-8">{t("legal.privacy.introNote")}</p>

    <section className="mb-12">
      <h2 className="text-2xl font-semibold mb-4">{t("legal.privacy.sections.0.title")}</h2>
      <p className="mb-4">
        {t("legal.privacy.sections.0.content.0")}
      </p>
      <p className="mb-4">{t("legal.privacy.sections.0.content.1")}</p>
      <p className="mb-4">{t("legal.privacy.sections.0.content.2")}</p>
      <p className="mb-4">{t("legal.privacy.sections.0.content.3")}</p>
    </section>

    <section className="mb-12">
      <h2 className="text-2xl font-semibold mb-4">{t("legal.privacy.sections.1.title")}</h2>
      <p className="mb-4">{t("legal.privacy.sections.1.content.0")}</p>
      <p className="mb-4">{t("legal.privacy.sections.1.content.1")}</p>

      <h3 className="text-xl font-semibold mb-3">{t("legal.privacy.sections.1.subsections.0.title")}</h3>
      <p className="mb-4">{t("legal.privacy.sections.1.subsections.0.content.0")}</p>
      <ul className="list-disc list-inside ml-4 mb-4 space-y-2">
        <li>{t("legal.privacy.sections.1.subsections.0.content.1")}</li>
        <li>{t("legal.privacy.sections.1.subsections.0.content.2")}</li>
        <li>{t("legal.privacy.sections.1.subsections.0.content.3")}</li>
      </ul>
      <p className="mb-4">{t("legal.privacy.sections.1.subsections.0.content.4")}</p>
      <p className="mb-4">{t("legal.privacy.sections.1.subsections.0.content.5")}</p>

      <h3 className="text-xl font-semibold mb-3">{t("legal.privacy.sections.1.subsections.1.title")}</h3>
      {[0, 1, 2, 3, 4, 5, 6].map((idx) => (
        <p key={idx} className="mb-4">{t(`legal.privacy.sections.1.subsections.1.content.${idx}`)}</p>
      ))}
    </section>

    <section className="mb-12">
      <h2 className="text-2xl font-semibold mb-4">{t("legal.privacy.sections.2.title")}</h2>
      {[0, 1, 2, 3, 4, 5].map((idx) => (
        <p key={idx} className="mb-4">{t(`legal.privacy.sections.2.content.${idx}`)}</p>
      ))}

      <p className="mb-2 font-medium">{t("legal.privacy.sections.2.subsections.0.title")}</p>
      <ul className="list-disc list-inside ml-4 mb-4 space-y-2">
        {[0, 1, 2, 3, 4, 5].map((idx) => (
          <li key={idx}>{t(`legal.privacy.sections.2.subsections.0.items.${idx}`)}</li>
        ))}
      </ul>

      <p className="mb-2 font-medium">{t("legal.privacy.sections.2.subsections.1.title")}</p>
      <ul className="list-disc list-inside ml-4 mb-4 space-y-2">
        {[0, 1].map((idx) => (
          <li key={idx}>{t(`legal.privacy.sections.2.subsections.1.items.${idx}`)}</li>
        ))}
      </ul>

      <p className="mb-2 font-medium">{t("legal.privacy.sections.2.subsections.2.title")}</p>
      <ul className="list-disc list-inside ml-4 mb-4 space-y-2">
        {[0, 1, 2, 3, 4, 5].map((idx) => (
          <li key={idx}>{t(`legal.privacy.sections.2.subsections.2.items.${idx}`)}</li>
        ))}
      </ul>

      <p className="mb-4">
        Podrá revocar este consentimiento en cualquier momento, así como ejercitar sus derechos de acceso, rectificación, supresión, limitación del tratamiento, olvido, portabilidad de datos y oposición por los medios indicados en el capítulo "EJERCICIO DE DERECHOS" del presente documento.
      </p>
    </section>

    <section className="mb-12">
      <h2 className="text-2xl font-semibold mb-4">{t("legal.privacy.sections.3.title")}</h2>
      <p className="mb-4">{t("legal.privacy.sections.3.content.0")}</p>
      <p className="mb-4">{t("legal.privacy.sections.3.content.1")}</p>
    </section>

    <section className="mb-12">
      <h2 className="text-2xl font-semibold mb-4">{t("legal.privacy.sections.4.title")}</h2>
      <p className="mb-4">
        Utilizamos su información personal para ofrecer, mantener y mejorar nuestros servicios, garantizando su seguridad y optimizando su experiencia en nuestra plataforma. Nuestro objetivo es brindarle una experiencia segura y personalizada, al tiempo que cumplimos con todas las obligaciones legales correspondientes. Los usos específicos de su información incluyen:
      </p>
      <ul className="list-disc list-inside ml-4 mb-4 space-y-2">
        <li>Utilizamos su información para crear y gestionar su cuenta, facilitando su acceso y uso efectivo de nuestra plataforma.</li>
        <li>Su información nos permite ofrecerle soporte, responder a sus consultas y resolver cualquier problema que pueda surgir mientras utiliza nuestros servicios.</li>
        <li>Utilizamos sus datos para mantenernos en contacto con usted respecto a nuestros servicios, incluidas actualizaciones, notificaciones y cambios en nuestros términos o políticas.</li>
        <li>Adaptamos nuestros servicios a sus preferencias y comportamiento, mejorando su experiencia de usuario. Esto incluye recomendaciones personalizadas y la adaptación del contenido en función de sus intereses y actividades.</li>
        <li>Podemos usar su información para ejecutar y medir la efectividad de nuestras campañas publicitarias, asegurando que los anuncios que vea sean relevantes para sus intereses.</li>
        <li>Al analizar su uso de nuestros servicios, podemos identificar áreas de mejora y desarrollar nuevas funciones que satisfagan mejor sus necesidades.</li>
        <li>Nos comprometemos a proteger a nuestros usuarios. Su información nos ayuda a prevenir, detectar y combatir el fraude, el abuso y otras actividades ilícitas en nuestra plataforma.</li>
        <li>Procesamos su información para cumplir con nuestras obligaciones legales, incluyendo la colaboración con las autoridades cuando sea necesario, y para garantizar que nuestras prácticas estén alineadas con las regulaciones vigentes.</li>
      </ul>

      <h3 className="text-xl font-semibold mb-3">{t("legal.privacy.sections.4.subsections.0.title")}</h3>
      <p className="mb-2">La información que recopilamos se procesa para los siguientes propósitos:</p>
      <ul className="list-disc list-inside ml-4 mb-4 space-y-2">
        {[0, 1, 2, 3].map((idx) => (
          <li key={idx}>{t(`legal.privacy.sections.4.subsections.0.items.${idx}`)}</li>
        ))}
      </ul>
      <p className="mb-4">
        Conservamos su información personal únicamente durante el tiempo necesario para cumplir con los fines descritos anteriormente y de acuerdo con los requisitos legales. Una vez que los datos ya no sean necesarios para estos fines, los eliminaremos de forma segura o los anonimizaremos.
      </p>

      <h3 className="text-xl font-semibold mb-3">{t("legal.privacy.sections.4.subsections.1.title")}</h3>
      <p className="mb-4">{t("legal.privacy.sections.4.subsections.1.content")}</p>

      <h3 className="text-xl font-semibold mb-3">{t("legal.privacy.sections.4.subsections.2.title")}</h3>
      <p className="mb-4">{t("legal.privacy.sections.4.subsections.2.content")}</p>

      <h3 className="text-xl font-semibold mb-3">{t("legal.privacy.sections.4.subsections.3.title")}</h3>
      <p className="mb-4">{t("legal.privacy.sections.4.subsections.3.content")}</p>
    </section>

    <section className="mb-12">
      <h2 className="text-2xl font-semibold mb-4">{t("legal.privacy.sections.5.title")}</h2>
      <p className="mb-4">{t("legal.privacy.sections.5.content.0")}</p>
      <ul className="list-disc list-inside ml-4 mb-4 space-y-2">
        {[0, 1, 2, 3, 4].map((idx) => (
          <li key={idx}>{t(`legal.privacy.sections.5.items.${idx}`)}</li>
        ))}
      </ul>
    </section>

    <section className="mb-12">
      <h2 className="text-2xl font-semibold mb-4">{t("legal.privacy.sections.6.title")}</h2>
      <p className="mb-4">
        Nos comprometemos a garantizar que sus datos personales estén protegidos, independientemente de dónde se procesen o almacenen. En determinadas circunstancias, sus datos podrán ser tratados o transferidos a países fuera del Espacio Económico Europeo (EEE), por ejemplo cuando utilizamos proveedores tecnológicos o servicios de infraestructura necesarios para el funcionamiento, desarrollo, mantenimiento y almacenamiento de la Plataforma, tales como servicios de alojamiento, bases de datos, analítica o herramientas tecnológicas (por ejemplo, Google, Firebase, Vercel u otros proveedores equivalentes). En tales casos, BIVO TRAINING aplicará las garantías legales adecuadas conforme a la normativa de protección de datos aplicable para asegurar un nivel de protección equivalente al del EEE.
      </p>
      <p className="mb-4">
        Cuando transferimos sus datos personales fuera del EEE, nos aseguramos de que dichas transferencias se realicen de conformidad con las regulaciones de protección de datos aplicables. Utilizamos las siguientes salvaguardas para proteger sus datos:
      </p>
      <ul className="list-disc list-inside ml-4 mb-8 space-y-2">
        <li>Utilizamos las cláusulas contractuales estándar de la Comisión Europea, que están diseñadas para garantizar que sus datos personales reciban el mismo nivel de protección que recibirían dentro del EEE.</li>
        <li>En algunos casos, podemos transferir sus datos a países que la Comisión Europea ha considerado que proporcionan un nivel adecuado de protección de datos.</li>
        <li>Cuando es necesario, implementamos salvaguardas adicionales, como reglas corporativas vinculantes, para garantizar que sus datos estén protegidos durante las transferencias internacionales. Al emplear estos mecanismos y salvaguardas legales, nos esforzamos por garantizar que sus datos permanezcan seguros y que se respeten sus derechos de privacidad, sin importar dónde se procesen sus datos.</li>
      </ul>

      <h3 className="text-xl font-semibold mb-3 mt-8">Sus derechos y opciones</h3>
      <p className="mb-4">
        Nos comprometemos a brindarle opciones claras y accesibles para administrar sus datos personales. Dependiendo de su ubicación, puede tener ciertos derechos legales con respecto a sus datos personales, y hemos implementado herramientas y configuraciones para ayudarlo a ejercer estos derechos.
      </p>
      <h3 className="text-xl font-semibold mb-3">Herramientas y configuraciones:</h3>
      <ul className="list-disc list-inside ml-4 mb-4 space-y-2">
        <li>Puede acceder y actualizar su información personal directamente dentro de nuestro servicio.</li>
        <li>Tiene control sobre la configuración de su dispositivo, lo que le permite administrar la recopilación y el uso de sus datos por parte de nuestros servicios.</li>
        <li>Si elige eliminar su cuenta, puede hacerlo directamente a través de la interfaz del servicio. Una vez que se elimine su cuenta, sus datos se manejarán de acuerdo con nuestra Política de retención de datos.</li>
      </ul>
      <h3 className="text-xl font-semibold mb-3">Supresión de datos y eliminación de cuenta</h3>
      <p className="mb-4">
        Tras la eliminación de la cuenta, los datos personales serán bloqueados y conservados únicamente durante los plazos necesarios para el cumplimiento de obligaciones legales o para la atención de posibles responsabilidades, tras lo cual serán eliminados o anonimizados de forma segura.
      </p>
    </section>

    <section className="mb-12">
      <h2 className="text-2xl font-semibold mb-4">{t("legal.privacy.sections.7.title")}</h2>
      <p className="mb-4">{t("legal.privacy.sections.7.content.0")}</p>

      <h3 className="text-xl font-semibold mb-3">{t("legal.privacy.sections.7.subsections.0.title")}</h3>
      <p className="mb-2">Sin los datos solicitados no será posible la prestación del servicio.</p>
      <p className="mb-4">
        Los datos personales, así como los relativos al servicio, serán conservados durante el tiempo necesario para la ejecución de la relación contractual y para atender posibles responsabilidades derivadas del servicio prestado, con carácter general durante un plazo de cinco (5) años.
      </p>
      <p className="mb-4">
        En caso de que la contratación se realizara directamente con BIVO TRAINING, los datos relativos a la facturación serán conservados durante el tiempo necesario para cumplir con las obligaciones legales y fiscales aplicables, con carácter general durante el plazo establecido por la normativa tributaria vigente.
      </p>
      <p className="mb-4">
        Cuando la contratación se realice a través de plataformas de terceros, como Apple App Store o Google Play, la gestión del pago y facturación será realizada por dichas plataformas conforme a sus propias condiciones, sin perjuicio de que BIVO TRAINING pueda tratar los datos necesarios para la gestión del servicio, control de suscripciones y cumplimiento de obligaciones legales.
      </p>
      <p className="mb-6">
        Sobre este tratamiento de datos, el Usuario podrá ejercer, cuando lo considere oportuno, los derechos de acceso y rectificación en los términos previstos en la normativa aplicable.
      </p>

      <h3 className="text-xl font-semibold mb-3">{t("legal.privacy.sections.7.subsections.1.title")}</h3>
      <p className="mb-4">{t("legal.privacy.sections.7.subsections.1.content")}</p>
      <p className="mb-2">
        Sobre este tratamiento de datos, Usted podrá, en caso de que lo considere necesario, ejercer los siguientes derechos:
      </p>
      <ul className="list-disc list-inside ml-4 mb-6 space-y-2">
        <li>De acceso para conocer qué datos conservamos y tratamos.</li>
        <li>De oposición y limitación, para que los datos personales no sean tratados -desde que se tramite su solicitud- para la finalidad del servicio de información.</li>
        <li>De rectificación en el caso que considere que los datos no son correctos o bien porque han cambiado.</li>
        <li>De borrado o supresión en caso de que nos retire su consentimiento para este tratamiento.</li>
      </ul>

      <h3 className="text-xl font-semibold mb-3">{t("legal.privacy.sections.7.subsections.2.title")}</h3>
      <p className="mb-4">{t("legal.privacy.sections.7.subsections.2.content")}</p>
      <p className="mb-4">
        Estas encuestas se efectúan por medios electrónicos (se recibe un e-mail con enlace a la web donde se realiza la encuesta) y en ellas no se recoge ningún dato personal adicional a los que Usted nos haya proporcionado previamente.
      </p>
      <p className="mb-4">
        En cualquier caso, los datos personales de contacto recopilados con el fin de enviarle la encuesta de calidad únicamente serán utilizados si usted nos otorga su consentimiento explícito.
      </p>
      <p className="mb-4">Los datos personales referentes a este tratamiento serán conservados para ello durante 3 meses.</p>
      <p className="mb-2">
        Sobre este tratamiento de datos Usted podrá, en caso de que lo considere necesario, ejercer los siguientes derechos:
      </p>
      <ul className="list-disc list-inside ml-4 mb-6 space-y-2">
        <li>De oposición y limitación, para que los datos personales no sean tratados -desde que se tramite su solicitud- para la finalidad del servicio de calidad.</li>
        <li>De rectificación en el caso que considere que los datos no son correctos o bien porque han cambiado.</li>
      </ul>

      <h3 className="text-xl font-semibold mb-3">{t("legal.privacy.sections.7.subsections.3.title")}</h3>
      <p className="mb-4">{t("legal.privacy.sections.7.subsections.3.content")}</p>
      <p className="mb-4">
        Por otra parte, en cada comunicación enviada se le ofrecerá la oportunidad de darse de baja de las mismas; adicionalmente usted puede ejercer los derechos indicados a continuación en cualquier momento.
      </p>
      <p className="mb-2">
        Sobre este tratamiento de datos Usted podrá, en caso de que lo considere necesario, ejercer los siguientes derechos:
      </p>
      <ul className="list-disc list-inside ml-4 mb-6 space-y-2">
        <li>De oposición y limitación, para que los datos personales no sean tratados -desde que se tramite su solicitud- para la finalidad del servicio de información.</li>
        <li>De rectificación en el caso que considere que los datos no son correctos o bien porque han cambiado.</li>
        <li>De borrado o supresión en caso de que nos retire su consentimiento para este tratamiento.</li>
      </ul>

      <h3 className="text-xl font-semibold mb-3">{t("legal.privacy.sections.7.subsections.4.title")}</h3>
      <p className="mb-4">{t("legal.privacy.sections.7.subsections.4.content")}</p>
      <p className="mb-4">
        Utilizamos esta información para analizar tendencias, intereses de los usuarios, administrar el sitio, rastrear los movimientos de los usuarios alrededor del sitio y para recopilar información demográfica sobre nuestra base de usuarios en su conjunto.
      </p>
    </section>

    <section className="mb-12">
      <h2 className="text-2xl font-semibold mb-4">{t("legal.privacy.sections.8.title")}</h2>
      <p className="mb-4">{t("legal.privacy.sections.8.content.0")}</p>
      <p className="mb-4">{t("legal.privacy.sections.8.content.1")}</p>
      <p className="mb-4">
        Google podrá transmitir dicha información a terceros cuando así se lo requiera la legislación, o cuando dichos terceros procesen la información por cuenta de Google. Google no asociará su dirección IP con ningún otro dato del que disponga Google.
      </p>
      <p className="mb-4">{t("legal.privacy.sections.8.content.2")}</p>
      <p className="mb-4">{t("legal.privacy.sections.8.content.3")}</p>
    </section>

    <section className="mb-12">
      <h2 className="text-2xl font-semibold mb-4">{t("legal.privacy.sections.9.title")}</h2>
      <p className="mb-4">{t("legal.privacy.sections.9.content.0")}</p>
      <p className="mb-2">
        <strong>{t("legal.privacy.sections.9.contact.company")}</strong>
        <br />
        {t("legal.privacy.sections.9.contact.cif")}
        <br />
        {t("legal.privacy.sections.9.contact.note")}
        <br />
        <a href="mailto:hello@bivotraining.com" className="text-bivo-green hover:underline">
          {t("legal.privacy.sections.9.contact.email")}
        </a>
      </p>
      <p className="mb-4">{t("legal.privacy.sections.9.contact.channels")}</p>
      <p className="mb-4">{t("legal.privacy.sections.9.contact.emailChannel")}</p>
      <p className="mb-4">{t("legal.privacy.sections.9.contact.identityNote")}</p>
      <p className="mb-4">{t("legal.privacy.sections.9.contact.reclaimNote")}</p>
      <ol className="list-decimal list-inside ml-4 mb-4 space-y-2">
        {[0, 1, 2].map((idx) => (
          <li key={idx}>{t(`legal.privacy.sections.9.contact.reclaimItems.${idx}`)}</li>
        ))}
      </ol>
      <p className="mb-4">
        {t("legal.privacy.sections.9.contact.infoLink")}{" "}
        <a
          href="https://www.agpd.es"
          target="_blank"
          rel="noopener noreferrer"
          className="text-bivo-green hover:underline"
        >
          www.agpd.es
        </a>
      </p>
    </section>

    <div className="border-t pt-6">
      <p className="text-sm text-gray-600">
        <strong>{t("legal.privacy.lastUpdate")}</strong>
      </p>
      <p className="text-sm text-gray-600 mt-2">
        {t("legal.privacy.contactQuestion")}{" "}
        <a href="mailto:hello@bivotraining.com" className="text-bivo-green hover:underline">
          hello@bivotraining.com
        </a>
      </p>
    </div>
  </div>
  );
};

export default PrivacyPolicyContent;
