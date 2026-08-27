import React from "react";
import { useTranslation } from "react-i18next";
import { useLegalPath } from "@/hooks/useLegalPath";

const PrivacyPolicyContent = () => {
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
        Esta declaración de privacidad de Bivo Training S.L. es pública y accesible a todos los usuarios y clientes de Bivo Training S.L., y se aplica a todos los sitios web, aplicaciones, eventos y otros servicios de Bivo Training S.L., siendo bivotraining.com el sitio o dominio principal.
      </p>
      <p className="mb-4">
        En particular, esta Política de Privacidad se aplica al sitio web de BIVO TRAINING, a la aplicación móvil BIVO TRAINING disponible para dispositivos iOS y Android y a la plataforma web BIVO COACH.
      </p>
      <p className="mb-4">
        También se aplica a aquellos documentos o mensajes emitidos por Bivo Training S.L. que enlacen a esta política o declaración de privacidad o, en su caso, indiquen que se acceda a ella para que el Usuario conozca el uso que hace Bivo Training S.L. de sus datos personales.
      </p>
      <p className="mb-4">
        Algunos servicios pueden tener sus propias políticas de privacidad. Si es así, esas políticas se aplicarán en lugar de esta.
      </p>
      <p className="mb-4">
        A continuación, le informamos de manera general sobre los usos de su información personal. Posteriormente se detallan dichos usos y tratamientos.
      </p>
    </section>

    <section className="mb-12">
      <h2 className="text-2xl font-semibold mb-4">{t("legal.privacy.sections.1.title")}</h2>
      <p className="mb-4">
        La presente Política de Privacidad también se aplica al uso de la aplicación móvil BIVO TRAINING, disponible para dispositivos con sistemas operativos Android, a través de Google Play Store, y iOS, a través de Apple App Store.
      </p>
      <p className="mb-4">
        Cuando el Usuario descarga, instala, se registra o utiliza la aplicación móvil, BIVO TRAINING podrá tratar los datos personales necesarios para la prestación del servicio, la creación y gestión de la cuenta de usuario, el funcionamiento técnico de la aplicación, la personalización de entrenamientos y funcionalidades y la mejora continua del servicio, conforme a lo dispuesto en esta Política de Privacidad.
      </p>

      <h3 className="text-xl font-semibold mb-3">Permisos del dispositivo</h3>
      <p className="mb-4">
        La aplicación podrá solicitar acceso a determinadas funciones del dispositivo únicamente cuando sea necesario para el funcionamiento de sus servicios. Estos permisos pueden incluir, entre otros:
      </p>
      <ul className="list-disc list-inside ml-4 mb-4 space-y-2">
        <li>notificaciones;</li>
        <li>acceso a la cámara;</li>
        <li>acceso a fotos o almacenamiento del dispositivo.</li>
      </ul>
      <p className="mb-4">
        Estos permisos se solicitarán siempre con el consentimiento del Usuario y podrán ser aceptados, rechazados o revocados en cualquier momento desde la configuración del dispositivo.
      </p>
      <p className="mb-6">
        El uso de estos permisos se limitará exclusivamente a la prestación del servicio y no se realizará un uso distinto sin el consentimiento del Usuario.
      </p>

      <h3 className="text-xl font-semibold mb-3">Suscripciones y periodo de prueba</h3>
      <p className="mb-4">
        BIVO TRAINING podrá ofrecer al Usuario un periodo de prueba gratuito para acceder a determinadas funcionalidades de la aplicación.
      </p>
      <p className="mb-4">
        La duración del periodo de prueba podrá variar en función de promociones, campañas o condiciones específicas informadas en cada momento.
      </p>
      <p className="mb-4">
        Una vez finalizado el periodo de prueba, el acceso a determinadas funcionalidades podrá requerir la contratación de una suscripción.
      </p>
      <p className="mb-4">
        Las suscripciones podrán tener periodicidad mensual o anual y se renovarán automáticamente por periodos sucesivos iguales, salvo que el Usuario cancele la suscripción antes de la fecha de renovación.
      </p>
      <p className="mb-4">
        El Usuario podrá cancelar la suscripción en cualquier momento desde la configuración de su cuenta en la plataforma correspondiente (Google Play Store o Apple App Store).
      </p>
      <p className="mb-4">
        Los pagos, renovaciones, cancelaciones y facturación de las suscripciones realizadas a través de Google Play Store o Apple App Store serán gestionados directamente por dichas plataformas conforme a sus propias condiciones y políticas.
      </p>
      <p className="mb-4">
        BIVO TRAINING no almacena ni procesa directamente los datos de pago del Usuario cuando la contratación se realiza a través de dichas plataformas.
      </p>
    </section>

    <section className="mb-12">
      <h2 className="text-2xl font-semibold mb-4">{t("legal.privacy.sections.2.title")}</h2>
      <p className="mb-4">
        El tratamiento de datos de carácter personal se realiza según lo dispuesto en el Reglamento (UE) 2016/679 del Parlamento Europeo y del Consejo, de 27 de abril de 2016 (RGPD) y la Ley Orgánica 3/2018, de 5 de diciembre, de Protección de Datos Personales y Garantía de los Derechos Digitales (LOPDGDD).
      </p>
      <p className="mb-4">
        Bivo Training S.L. respeta su derecho a la intimidad y aplica toda la normativa vigente con objeto de proteger los datos personales de sus clientes y usuarios.
      </p>
      <p className="mb-4">
        Sus datos personales son tratados con la máxima confidencialidad, habiendo adoptado Bivo Training S.L., como Responsable del Tratamiento, las medidas de orden técnico y organizativo necesarias para garantizar la confidencialidad y seguridad de los datos personales, evitando su alteración, pérdida, tratamiento o acceso no autorizado.
      </p>
      <p className="mb-4">
        Para que Usted pueda recibir información y, en su caso, reservar, contratar o utilizar los productos y servicios que Bivo Training S.L. ofrece a través de sus sitios web, aplicaciones y demás servicios, puede ser necesario proporcionar determinados datos personales que permitan crear y gestionar su cuenta, prestar el servicio y personalizar su experiencia.
      </p>
      <p className="mb-4">
        El Usuario es responsable de mantener actualizados sus datos personales.
      </p>

      <h3 className="text-xl font-semibold mb-3">Tipos de datos personales que podemos tratar</h3>
      <p className="mb-4">
        Dependiendo del uso que el Usuario haga de los servicios de BIVO TRAINING, podremos tratar las siguientes categorías de datos:
      </p>
      <ul className="list-disc list-inside ml-4 mb-4 space-y-2">
        <li>
          <strong>Datos identificativos:</strong> como nombre, dirección de correo electrónico u otros datos necesarios para la creación y gestión de la cuenta de usuario.
        </li>
        <li>
          <strong>Datos de perfil:</strong> información facilitada por el Usuario para personalizar su experiencia en la Plataforma, como edad, género, fecha de nacimiento, nivel deportivo u otros datos similares.
        </li>
        <li>
          <strong>Datos de actividad deportiva:</strong> información relacionada con los entrenamientos realizados, progreso, rendimiento, uso de entrenamientos o métricas asociadas al ejercicio físico dentro de la Plataforma.
        </li>
        <li>
          <strong>Datos de uso de la Plataforma:</strong> información sobre cómo el Usuario interactúa con nuestros servicios, funcionalidades utilizadas, frecuencia de uso y actividades realizadas.
        </li>
        <li>
          <strong>Datos técnicos y del dispositivo:</strong> información sobre los dispositivos utilizados para acceder a nuestros servicios, sistema operativo, identificadores técnicos u otros datos necesarios para el correcto funcionamiento del servicio.
        </li>
        <li>
          <strong>Contenido generado por el Usuario:</strong> imágenes, vídeos u otros contenidos que el Usuario decida subir o compartir en la Plataforma cuando dichas funcionalidades estén disponibles.
        </li>
      </ul>
      <p className="mb-4">
        Cuando la contratación se realice a través de App Store, Google Play o cualquier otra tienda de aplicaciones para dispositivos móviles, la información de pago será gestionada por dichas plataformas conforme a sus propias políticas.
      </p>
      <p className="mb-2">Asimismo, podemos tratar información para:</p>
      <ul className="list-disc list-inside ml-4 mb-6 space-y-2">
        <li>atender solicitudes de servicios;</li>
        <li>prestar los servicios contratados;</li>
        <li>enviar mensajes relacionados con el estado o funcionamiento de los servicios;</li>
        <li>realizar encuestas de calidad o satisfacción;</li>
        <li>enviar promociones cuando exista la base jurídica correspondiente.</li>
      </ul>

      <h3 className="text-xl font-semibold mb-3">Información que recibimos de otros</h3>
      <p className="mb-4">
        Otros miembros pueden proporcionar información sobre Usted cuando interactúan con nuestros servicios.
      </p>
      <p className="mb-6">
        Podemos recibir información de socios o proveedores para fines relacionados con la prestación, seguridad, análisis o promoción de nuestros servicios, cuando exista una base jurídica que permita dicho tratamiento.
      </p>

      <h3 className="text-xl font-semibold mb-3">Información recopilada automáticamente</h3>
      <p className="mb-4">
        Podemos recopilar datos sobre las actividades realizadas dentro de nuestros servicios y sobre los dispositivos utilizados para acceder a ellos.
      </p>
      <p className="mb-4">
        En los sitios web podemos utilizar cookies y tecnologías similares. Para obtener más información puede consultar nuestra{" "}
        <a href={cookiesPath} className="text-bivo-green hover:underline">Política de Cookies</a>
        .
      </p>
      <p className="mb-4">
        En caso de que la Plataforma incorpore funciones que requieran geolocalización, los datos solo se recopilarán con consentimiento del Usuario y podrán desactivarse en cualquier momento desde el dispositivo.
      </p>
      <p className="mb-4">
        Con el consentimiento del Usuario podremos tratar información adicional, como fotografías o vídeos.
      </p>
      <p className="mb-4">
        Cuando determinadas funcionalidades impliquen el uso de la cámara, las imágenes o vídeos únicamente serán tratados con el consentimiento previo del Usuario y para las finalidades técnicas, deportivas, analíticas o de mejora del servicio previamente informadas.
      </p>
      <p className="mb-4">
        El Usuario podrá revocar dichos permisos en cualquier momento desde la configuración de su dispositivo.
      </p>
    </section>

    <section className="mb-12">
      <h2 className="text-2xl font-semibold mb-4">{t("legal.privacy.sections.3.title")}</h2>
      <p className="mb-4">
        Los servicios de BIVO TRAINING podrán ser utilizados por menores de edad, directamente o a través de clubes, academias, federaciones, gimnasios, entrenadores u otras entidades o profesionales.
      </p>
      <p className="mb-4">
        El acceso y registro podrán estar sujetos a requisitos o restricciones de edad en función del país de residencia del Usuario y de la normativa aplicable.
      </p>
      <p className="mb-4">
        Cuando, conforme a la legislación aplicable, sea necesaria la autorización o consentimiento del padre, madre o tutor legal para el tratamiento de los datos personales del menor, dicho tratamiento deberá contar con la correspondiente autorización.
      </p>
      <p className="mb-4">
        Cuando el acceso a BIVO TRAINING se produzca a través de un club, academia, federación, gimnasio, entrenador u otra entidad o profesional, corresponderá a dicha entidad o profesional disponer de una base jurídica válida para el tratamiento y comunicación de los datos del menor y obtener las autorizaciones de sus representantes legales cuando resulten necesarias.
      </p>
      <p className="mb-4">
        Bivo Training S.L. tratará los datos de los menores conforme a las finalidades y responsabilidades que le correspondan en cada caso y aplicará las medidas de protección previstas por la normativa aplicable.
      </p>
    </section>

    <section className="mb-12">
      <h2 className="text-2xl font-semibold mb-4">{t("legal.privacy.sections.4.title")}</h2>
      <p className="mb-4">
        BIVO COACH es el servicio de Bivo Training S.L. destinado a clubes deportivos, academias, federaciones, gimnasios, entrenadores personales y otros profesionales o entidades deportivas, que permite gestionar y realizar el seguimiento de sus deportistas, clientes, alumnos, usuarios o federados.
      </p>
      <p className="mb-2">A través de BIVO COACH podrán tratarse, entre otros:</p>
      <ul className="list-disc list-inside ml-4 mb-4 space-y-2">
        <li>
          <strong>Datos de la entidad o profesional:</strong> datos identificativos, de contacto, profesionales, fiscales y de facturación necesarios para gestionar la cuenta, contratación y prestación del servicio.
        </li>
        <li>
          <strong>Datos de las personas gestionadas:</strong> datos identificativos y de contacto de deportistas, clientes, alumnos, usuarios o federados, así como datos de perfil, actividad deportiva, entrenamientos, progreso y demás información necesaria para las funcionalidades de BIVO COACH.
        </li>
      </ul>
      <p className="mb-4">
        Cuando una entidad o profesional incorpore, gestione o facilite datos personales de terceros a través de BIVO COACH, deberá disponer de una base jurídica válida para su tratamiento y comunicación a Bivo Training S.L., así como obtener las autorizaciones que resulten necesarias conforme a la normativa aplicable, especialmente cuando se trate de menores de edad.
      </p>
      <p className="mb-4">
        Los deportistas, clientes, alumnos, usuarios o federados podrán compartir determinados datos e información de su actividad con la entidad o profesional al que se encuentren vinculados mediante BIVO COACH, de acuerdo con las funcionalidades y configuración del servicio.
      </p>
      <p className="mb-4">
        La entidad o profesional vinculada al Usuario podrá acceder a aquellos datos de perfil, actividad deportiva, entrenamientos, progreso y demás información que resulte necesaria para las funcionalidades de gestión y seguimiento ofrecidas a través de BIVO COACH.
      </p>
      <p className="mb-4">
        Bivo Training S.L. tratará dichos datos de acuerdo con las finalidades, instrucciones y responsabilidades que le correspondan en cada caso, adoptando las medidas necesarias para garantizar su seguridad y confidencialidad.
      </p>
    </section>

    <section className="mb-12">
      <h2 className="text-2xl font-semibold mb-4">{t("legal.privacy.sections.5.title")}</h2>
      <p className="mb-4">
        Bivo Training S.L. puede recoger datos personales a través de distintos canales, incluyendo sus sitios web, aplicaciones, formularios, servicios de atención al usuario y otros medios habilitados por BIVO TRAINING.
      </p>
      <p className="mb-4">
        En todo caso y siempre que sea aplicable, se ofrecerá al Usuario la posibilidad de oponerse o no consentir el uso de sus datos con fines publicitarios o de comunicaciones comerciales.
      </p>
    </section>

    <section className="mb-12">
      <h2 className="text-2xl font-semibold mb-4">{t("legal.privacy.sections.6.title")}</h2>
      <p className="mb-4">
        Utilizamos su información personal para ofrecer, mantener y mejorar nuestros servicios, garantizando su seguridad y optimizando su experiencia en nuestra Plataforma.
      </p>
      <p className="mb-2">Los usos específicos de su información incluyen:</p>
      <ul className="list-disc list-inside ml-4 mb-4 space-y-2">
        <li>crear y gestionar su cuenta, facilitando el acceso y uso efectivo de la Plataforma;</li>
        <li>prestar los servicios y funcionalidades de BIVO TRAINING;</li>
        <li>ofrecer soporte, responder a consultas y resolver incidencias;</li>
        <li>mantenernos en contacto con el Usuario respecto a nuestros servicios, incluidas actualizaciones, notificaciones y cambios en nuestros términos o políticas;</li>
        <li>adaptar nuestros servicios a sus preferencias y comportamiento, incluyendo recomendaciones personalizadas y adaptación de contenidos;</li>
        <li>analizar el uso de nuestros servicios para identificar áreas de mejora y desarrollar nuevas funcionalidades;</li>
        <li>prevenir, detectar y combatir fraude, abuso u otras actividades ilícitas;</li>
        <li>cumplir nuestras obligaciones legales y colaborar con las autoridades cuando resulte necesario;</li>
        <li>ejecutar y medir la efectividad de campañas publicitarias cuando exista una base jurídica que permita dicho tratamiento.</li>
      </ul>
      <p className="mb-6">
        Cuando el Usuario haya otorgado su consentimiento, también podremos enviar comunicaciones promocionales o informativas relacionadas con los servicios de BIVO TRAINING.
      </p>

      <h3 className="text-xl font-semibold mb-3">Procesamiento de datos personales</h3>
      <p className="mb-2">La información que recopilamos se procesa, entre otras, para las siguientes finalidades:</p>
      <ul className="list-disc list-inside ml-4 mb-4 space-y-2">
        <li>crear, gestionar y mantener la cuenta del Usuario;</li>
        <li>prestar nuestros servicios;</li>
        <li>adaptar los servicios a sus preferencias y ofrecer una experiencia personalizada;</li>
        <li>proteger a nuestros usuarios y nuestros sistemas;</li>
        <li>prevenir, detectar y abordar amenazas de seguridad, fraude y actividades ilegales;</li>
        <li>cumplir nuestras obligaciones legales y normativas.</li>
      </ul>
    </section>

    <section className="mb-12">
      <h2 className="text-2xl font-semibold mb-4">{t("legal.privacy.sections.7.title")}</h2>
      <p className="mb-2">El tratamiento de datos personales se realiza sobre las siguientes bases legales:</p>
      <ul className="list-disc list-inside ml-4 mb-4 space-y-2">
        <li>ejecución del contrato para la prestación del servicio;</li>
        <li>consentimiento del Usuario cuando resulte necesario, por ejemplo para comunicaciones comerciales, cámara, geolocalización u otros tratamientos opcionales;</li>
        <li>cumplimiento de obligaciones legales;</li>
        <li>interés legítimo para garantizar la seguridad, mejorar el servicio y prevenir usos indebidos, respetando en todo caso los derechos del Usuario.</li>
      </ul>
    </section>

    <section className="mb-12">
      <h2 className="text-2xl font-semibold mb-4">{t("legal.privacy.sections.8.title")}</h2>
      <p className="mb-4">
        En el marco de la prestación del servicio, BIVO TRAINING podrá tratar datos relacionados con la actividad física, el progreso deportivo, el rendimiento, el uso de entrenamientos y métricas asociadas al ejercicio con la finalidad de prestar el servicio, personalizar la experiencia, realizar análisis técnicos y mejorar la Plataforma.
      </p>
      <p className="mb-4">
        Estos datos no tienen carácter médico ni sanitario.
      </p>
    </section>

    <section className="mb-12">
      <h2 className="text-2xl font-semibold mb-4">{t("legal.privacy.sections.9.title")}</h2>
      <p className="mb-4">
        BIVO TRAINING podrá utilizar sistemas automatizados, incluidos algoritmos o tecnologías de inteligencia artificial, para analizar el uso de la Plataforma, adaptar contenidos, personalizar entrenamientos, generar recomendaciones y mejorar el servicio.
      </p>
      <p className="mb-4">
        Estos tratamientos tienen carácter técnico y funcional, no constituyen decisiones automatizadas con efectos jurídicos sobre el Usuario ni diagnóstico médico.
      </p>
    </section>

    <section className="mb-12">
      <h2 className="text-2xl font-semibold mb-4">{t("legal.privacy.sections.10.title")}</h2>
      <p className="mb-4">
        Principalmente, podemos compartir información con proveedores de servicios y socios que nos ayudan a gestionar, prestar y mejorar nuestros servicios.
      </p>
      <p className="mb-2">En particular:</p>
      <ul className="list-disc list-inside ml-4 mb-4 space-y-2">
        <li>podemos compartir información con otros miembros cuando el Usuario la divulgue a través del servicio;</li>
        <li>compartimos los datos necesarios con proveedores que respaldan nuestras operaciones, como servicios de alojamiento, infraestructura, análisis o atención al cliente;</li>
        <li>podemos compartir información con afiliados de BIVO TRAINING por motivos operativos y de seguridad;</li>
        <li>podemos divulgar información para cumplir con procesos legales o proteger la seguridad de nuestros usuarios y servicios;</li>
        <li>podemos compartir información con terceros cuando contemos con el consentimiento del Usuario.</li>
      </ul>
    </section>

    <section className="mb-12">
      <h2 className="text-2xl font-semibold mb-4">{t("legal.privacy.sections.11.title")}</h2>
      <p className="mb-4">
        Nos comprometemos a garantizar que sus datos personales estén protegidos independientemente de dónde se procesen o almacenen.
      </p>
      <p className="mb-4">
        En determinadas circunstancias, sus datos podrán ser tratados o transferidos a países fuera del Espacio Económico Europeo (EEE), por ejemplo cuando utilizamos proveedores tecnológicos o servicios de infraestructura necesarios para el funcionamiento, desarrollo, mantenimiento y almacenamiento de la Plataforma, tales como servicios de alojamiento, bases de datos, analítica o herramientas tecnológicas, entre ellos Google, Firebase, Vercel u otros proveedores equivalentes.
      </p>
      <p className="mb-4">
        En tales casos, BIVO TRAINING aplicará las garantías legales adecuadas conforme a la normativa de protección de datos aplicable para asegurar un nivel de protección equivalente al del EEE.
      </p>
      <p className="mb-4">
        Cuando transferimos datos personales fuera del EEE, nos aseguramos de que dichas transferencias se realicen de conformidad con la normativa aplicable.
      </p>
      <p className="mb-2">Para ello podremos utilizar, según corresponda:</p>
      <ul className="list-disc list-inside ml-4 mb-4 space-y-2">
        <li>cláusulas contractuales tipo aprobadas por la Comisión Europea;</li>
        <li>transferencias a países respecto de los cuales exista una decisión de adecuación de la Comisión Europea;</li>
        <li>otras salvaguardas reconocidas por la normativa aplicable.</li>
      </ul>
    </section>

    <section className="mb-12">
      <h2 className="text-2xl font-semibold mb-4">{t("legal.privacy.sections.12.title")}</h2>
      <p className="mb-4">
        Nos comprometemos a brindar al Usuario opciones claras y accesibles para administrar sus datos personales.
      </p>
      <p className="mb-2">Dependiendo del servicio utilizado:</p>
      <ul className="list-disc list-inside ml-4 mb-4 space-y-2">
        <li>puede acceder y actualizar determinada información personal directamente dentro de nuestros servicios;</li>
        <li>puede gestionar determinados permisos desde la configuración de su dispositivo;</li>
        <li>puede eliminar su cuenta directamente a través de la interfaz del servicio cuando esta funcionalidad esté disponible.</li>
      </ul>
    </section>

    <section className="mb-12">
      <h2 className="text-2xl font-semibold mb-4">{t("legal.privacy.sections.13.title")}</h2>
      <p className="mb-4">
        Conservamos la información personal únicamente durante el tiempo necesario para cumplir con las finalidades descritas en esta Política y de acuerdo con los requisitos legales aplicables.
      </p>
      <p className="mb-4">
        Una vez que los datos ya no sean necesarios, serán eliminados de forma segura o anonimizados.
      </p>
      <p className="mb-4">
        Tras la eliminación de una cuenta, los datos personales serán bloqueados y conservados únicamente durante los plazos necesarios para el cumplimiento de obligaciones legales o la atención de posibles responsabilidades, tras lo cual serán eliminados o anonimizados de forma segura.
      </p>
    </section>

    <section className="mb-12">
      <h2 className="text-2xl font-semibold mb-4">{t("legal.privacy.sections.14.title")}</h2>
      <p className="mb-6">
        El Usuario podrá revocar en todo momento la autorización que haya otorgado para permitir que sus datos sean utilizados de una manera específica. Dicha revocación no tendrá efectos retroactivos.
      </p>

      <h3 className="text-xl font-semibold mb-3">Realización y gestión del servicio contratado y facturación</h3>
      <p className="mb-4">
        Sin los datos necesarios no será posible la prestación de determinados servicios.
      </p>
      <p className="mb-4">
        Los datos personales, así como los relativos al servicio, serán conservados durante el tiempo necesario para la ejecución de la relación contractual y para atender posibles responsabilidades derivadas del servicio prestado, con carácter general durante un plazo de cinco (5) años.
      </p>
      <p className="mb-4">
        En caso de que la contratación se realice directamente con BIVO TRAINING, los datos relativos a la facturación serán conservados durante el tiempo necesario para cumplir con las obligaciones legales y fiscales aplicables, con carácter general durante el plazo establecido por la normativa tributaria vigente.
      </p>
      <p className="mb-6">
        Cuando la contratación se realice a través de plataformas de terceros, como Apple App Store o Google Play, la gestión del pago y facturación será realizada por dichas plataformas conforme a sus propias condiciones, sin perjuicio de que BIVO TRAINING pueda tratar los datos necesarios para la gestión del servicio, control de suscripciones y cumplimiento de obligaciones legales.
      </p>

      <h3 className="text-xl font-semibold mb-3">Tratamiento de consultas</h3>
      <p className="mb-4">
        Los datos personales y de contacto facilitados serán conservados durante el tiempo necesario para gestionar y responder a la solicitud realizada.
      </p>
      <p className="mb-6">
        El Usuario podrá ejercer los derechos reconocidos por la normativa aplicable en los términos indicados en el apartado Ejercicio de derechos.
      </p>

      <h3 className="text-xl font-semibold mb-3">Servicio de calidad</h3>
      <p className="mb-4">
        Para cumplir con nuestros compromisos de calidad, BIVO TRAINING podrá realizar encuestas destinadas a conocer la satisfacción de clientes y usuarios y mejorar nuestros servicios.
      </p>
      <p className="mb-4">
        Cuando sea necesario utilizar datos personales de contacto para el envío de dichas encuestas, se utilizarán de acuerdo con la base jurídica aplicable.
      </p>
      <p className="mb-6">
        Los datos personales tratados específicamente para esta finalidad serán conservados durante el plazo necesario para realizar y analizar dicha actuación y, cuando corresponda, durante el plazo establecido para atender posibles responsabilidades.
      </p>

      <h3 className="text-xl font-semibold mb-3">Información sobre los servicios de Bivo Training S.L.</h3>
      <p className="mb-4">
        Para mantener al Usuario informado sobre los servicios prestados por Bivo Training S.L. y promociones puntuales, podremos tratar sus datos de contacto cuando exista consentimiento u otra base jurídica que permita dicho tratamiento.
      </p>
      <p className="mb-4">
        En las comunicaciones comerciales se ofrecerán los mecanismos necesarios para darse de baja de futuras comunicaciones.
      </p>
    </section>

    <section className="mb-12">
      <h2 className="text-2xl font-semibold mb-4">{t("legal.privacy.sections.15.title")}</h2>
      <p className="mb-4">
        Al navegar por los sitios web de BIVO TRAINING pueden recogerse datos técnicos y de navegación, como la dirección IP, información sobre el dispositivo y navegador, registros sobre la utilización de los servicios y otros datos relacionados con la navegación.
      </p>
      <p className="mb-4">
        Esta información puede utilizarse para administrar los sitios web, garantizar su funcionamiento y seguridad, analizar su utilización y mejorar los servicios.
      </p>
      <p className="mb-4">
        BIVO TRAINING puede utilizar cookies y tecnologías similares de conformidad con la normativa aplicable.
      </p>
      <p className="mb-4">
        El Usuario puede consultar información más detallada sobre las cookies utilizadas, sus finalidades y las opciones para aceptarlas, rechazarlas o configurarlas en la{" "}
        <a href={cookiesPath} className="text-bivo-green hover:underline">Política de Cookies</a>
        {" "}correspondiente.
      </p>
    </section>

    <section className="mb-12">
      <h2 className="text-2xl font-semibold mb-4">{t("legal.privacy.sections.16.title")}</h2>
      <p className="mb-4">
        Los sitios web de BIVO TRAINING podrán utilizar Google Analytics, un servicio de analítica web prestado por Google, para obtener información sobre la utilización de los sitios web y mejorar nuestros servicios.
      </p>
      <p className="mb-4">
        Google Analytics puede utilizar cookies u otras tecnologías para recopilar información relacionada con la navegación y utilización del sitio web.
      </p>
      <p className="mb-4">
        BIVO TRAINING utilizará Google Analytics aplicando, cuando corresponda, mecanismos de consentimiento y las medidas de privacidad exigidas por la normativa aplicable.
      </p>
      <p className="mb-4">
        El Usuario podrá gestionar o rechazar las cookies analíticas mediante las opciones disponibles en el sistema de gestión de cookies de los sitios web.
      </p>
    </section>

    <section className="mb-12">
      <h2 className="text-2xl font-semibold mb-4">{t("legal.privacy.sections.17.title")}</h2>
      <p className="mb-2">El Usuario puede ejercer los derechos que le reconoce la normativa de protección de datos, incluyendo:</p>
      <ul className="list-disc list-inside ml-4 mb-4 space-y-2">
        <li>acceso;</li>
        <li>rectificación;</li>
        <li>supresión;</li>
        <li>oposición;</li>
        <li>limitación del tratamiento;</li>
        <li>portabilidad de los datos.</li>
      </ul>
      <p className="mb-2">Las solicitudes podrán dirigirse a:</p>
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
        BIVO TRAINING podrá solicitar la información o documentación adicional necesaria para confirmar la identidad de la persona que realiza la solicitud.
      </p>
      <p className="mb-4">
        El Usuario también podrá presentar una reclamación ante la Agencia Española de Protección de Datos (AEPD) cuando considere que el tratamiento de sus datos personales no se ajusta a la normativa aplicable.
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

export default PrivacyPolicyContent;
