import React from "react";
import { useTranslation } from "react-i18next";
import { useLegalPath } from "@/hooks/useLegalPath";

const TermsConditionsContent = () => {
  const { t } = useTranslation();
  const { privacyPath, cookiesPath } = useLegalPath();

  const sectionTitle = (index: number) => {
    const number = t(`legal.terms.sections.${index}.number`);
    const title = t(`legal.terms.sections.${index}.title`);
    return `${number}. ${title}`;
  };

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
      <h3 className="text-xl font-semibold mb-3">2.1 Alta y registro como Usuario</h3>
      <p className="mb-4">
        Podrán utilizar la Plataforma las personas físicas mayores de 18 años con capacidad legal suficiente, así como las personas jurídicas debidamente representadas. Los menores de edad podrán acceder y utilizar los servicios de BIVO TRAINING conforme a lo establecido en el apartado “Menores de edad” de los presentes Términos y Condiciones, respetando en todo caso los requisitos de edad y demás disposiciones previstas por la normativa aplicable.
      </p>
      <p className="mb-4">
        La información aportada al registrarse debe ser exacta, completa y actualizada. El titular de la cuenta es responsable de custodiar sus credenciales y de toda actividad realizada desde su cuenta, debiendo notificar de inmediato accesos no autorizados o brechas de seguridad.
      </p>
      <p className="mb-2">Para ser Usuario de la Plataforma es indispensable:</p>
      <ul className="list-disc list-inside ml-4 mb-4 space-y-2">
        <li>Cumplimentar de manera veraz los campos obligatorios del formulario de registro.</li>
        <li>
          Aceptar los presentes Términos y Condiciones, así como la{" "}
          <a href={privacyPath} className="text-bivo-green hover:underline">Política de Privacidad</a>
          {" "}y, cuando corresponda, la{" "}
          <a href={cookiesPath} className="text-bivo-green hover:underline">Política de Cookies</a>
          , y completar el proceso de alta.
        </li>
      </ul>
      <p className="mb-4">
        Para darse de alta como Usuario, la persona interesada deberá facilitar una dirección de correo electrónico válida y completar los datos solicitados en el formulario de registro, que podrán incluir información identificativa, de contacto y cualquier otra necesaria para la correcta prestación del servicio.
      </p>
      <p className="mb-4">
        BIVO TRAINING podrá modificar, actualizar o ampliar los datos requeridos en el proceso de registro con el fin de mejorar el servicio, adaptar la Plataforma a nuevas funcionalidades o cumplir con obligaciones legales.
      </p>
      <p className="mb-4">
        Es posible registrarse utilizando la cuenta de Usuario en otras plataformas como Google o similares. Al utilizar dichas cuentas, los datos personales serán tratados conforme a las respectivas políticas de privacidad.
      </p>
      <p className="mb-4">
        Tras completar de forma veraz los campos obligatorios del formulario de registro, el Usuario podrá ser requerido, en su caso, para verificar la titularidad del correo electrónico u otros datos facilitados mediante los mecanismos técnicos que BIVO TRAINING determine en cada momento.
      </p>
      <p className="mb-4">
        El Usuario garantiza que todos los datos sobre su identidad facilitados a BIVO TRAINING son veraces, exactos y completos y se compromete a mantenerlos actualizados.
      </p>
      <p className="mb-4">
        En el supuesto de que el Usuario facilite cualquier dato falso, inexacto o incompleto, o si BIVO TRAINING considera que existen motivos fundados para dudar de su veracidad, exactitud o integridad, BIVO TRAINING podrá denegar el acceso y uso presente o futuro de la Plataforma o de cualquiera de sus contenidos y/o servicios, así como dar de baja al Usuario y cancelar su cuenta.
      </p>
      <p className="mb-4">
        El Usuario se compromete a no divulgar su contraseña ni hacerla accesible a terceros. Puesto que BIVO TRAINING no puede garantizar la identidad de los Usuarios registrados, el Usuario será responsable en caso de uso de la contraseña por terceros.
      </p>
      <p className="mb-4">
        Los Usuarios se obligan a poner inmediatamente en conocimiento de BIVO TRAINING la sustracción, divulgación, pérdida o utilización no autorizada de sus credenciales mediante comunicación a{" "}
        <a href="mailto:hello@bivotraining.com" className="text-bivo-green hover:underline">
          hello@bivotraining.com
        </a>
        .
      </p>
      <p className="mb-6">
        Una vez completado el proceso de registro correspondiente y, en su caso, verificados los datos facilitados, BIVO TRAINING habilitará el acceso a las funcionalidades que correspondan según el tipo de registro, canal utilizado —web, aplicación móvil o tiendas de aplicaciones— y nivel de servicio contratado o disponible.
      </p>

      <h3 className="text-xl font-semibold mb-3">2.2 Acceso a la Plataforma</h3>
      <p className="mb-4">
        El acceso se ofrece mediante un modelo de suscripción o en planes de pago. Las cuotas y características de cada plan serán informadas al Usuario con carácter previo al inicio de la relación comercial entre las partes y pueden modificarse, informándose con antelación razonable antes de su renovación.
      </p>
      <p className="mb-4">
        Las suscripciones, en su caso, podrán tener carácter periódico con renovación automática por períodos sucesivos hasta su cancelación por parte del Usuario antes del inicio del siguiente ciclo de facturación.
      </p>
      <p className="mb-4">
        Cuando la contratación se realice a través de tiendas de aplicaciones, como Apple App Store o Google Play, la gestión del cobro, moneda aplicable, impuestos, renovaciones, cancelaciones y condiciones de facturación se regirá por las políticas y condiciones propias de la plataforma correspondiente.
      </p>
      <p className="mb-4">
        En los demás casos, los precios se mostrarán en la moneda indicada e incluirán o no los impuestos aplicables según se especifique en cada momento. Los cambios de plan podrán implicar ajustes prorrateados conforme a la política vigente.
      </p>
    </section>

    <section className="mb-12">
      <h2 className="text-2xl font-semibold mb-4">{sectionTitle(2)}</h2>
      <p className="mb-4">
        BIVO TRAINING actúa, con carácter general, como proveedor de servicios de la sociedad de la información que pone a disposición de los Usuarios una infraestructura tecnológica mediante la cual pueden acceder a entrenamientos diseñados por preparadores físicos especializados en deportes de raqueta, adaptados a su nivel y objetivos.
      </p>
    </section>

    <section className="mb-12">
      <h2 className="text-2xl font-semibold mb-4">{sectionTitle(3)}</h2>
      <p className="mb-4">
        BIVO COACH es el servicio de Bivo Training S.L. destinado a clubes deportivos, academias, federaciones, gimnasios, entrenadores personales y otros profesionales o entidades deportivas (en adelante, la “Entidad”), que permite gestionar y realizar el seguimiento de sus deportistas, clientes, alumnos, usuarios o federados.
      </p>
      <p className="mb-4">
        La Entidad podrá utilizar BIVO COACH para crear y gestionar perfiles, vincular deportistas, asignar o realizar el seguimiento de entrenamientos, consultar información sobre su actividad y progreso y utilizar las demás funcionalidades disponibles en cada momento.
      </p>
      <p className="mb-4">
        La Entidad se compromete a utilizar BIVO COACH exclusivamente para finalidades legítimas relacionadas con su actividad y será responsable de la veracidad, licitud y adecuada utilización de la información que introduzca o gestione en la Plataforma.
      </p>
      <p className="mb-4">
        Cuando la Entidad incorpore, gestione o facilite datos personales de deportistas, clientes, alumnos, usuarios, federados u otras personas, deberá disponer de una base jurídica válida para hacerlo y cumplir las obligaciones que le correspondan conforme a la normativa de protección de datos. Cuando resulte necesario, deberá haber obtenido previamente las autorizaciones o consentimientos correspondientes.
      </p>
      <p className="mb-4">
        La Entidad será responsable de gestionar adecuadamente las altas, bajas y permisos de acceso de sus entrenadores, técnicos, empleados o colaboradores, así como de retirar dichos accesos cuando dejen de estar autorizados para utilizar BIVO COACH en su nombre.
      </p>
      <p className="mb-4">
        La información accesible a través de BIVO COACH deberá utilizarse exclusivamente para las finalidades deportivas, de gestión y seguimiento vinculadas a la relación existente entre la Entidad o profesional y el deportista, cliente, alumno, usuario o federado, quedando prohibido cualquier uso no autorizado o ajeno a dichas finalidades.
      </p>
      <p className="mb-4">
        Cuando finalice la relación entre la Entidad y un deportista, cliente, alumno, usuario o federado, la Entidad deberá dejar de acceder a su información a través de BIVO COACH cuando ya no exista una base legítima para dicho acceso, sin perjuicio de los plazos de conservación que resulten legalmente aplicables.
      </p>
      <p className="mb-4">
        Bivo Training S.L. prestará BIVO COACH conforme a las funcionalidades contratadas o habilitadas y tratará la información de acuerdo con las finalidades, instrucciones y responsabilidades que correspondan en cada caso.
      </p>
      <p className="mb-4">
        Las condiciones económicas, número de usuarios o licencias, duración, funcionalidades contratadas y demás condiciones particulares del servicio podrán establecerse en la correspondiente oferta, pedido, contrato o acuerdo comercial, que complementará los presentes Términos y Condiciones.
      </p>
    </section>

    <section className="mb-12">
      <h2 className="text-2xl font-semibold mb-4">{sectionTitle(4)}</h2>
      <p className="mb-4">
        BIVO TRAINING podrá ser utilizado por menores de edad directamente o mediante su vinculación con clubes deportivos, academias, federaciones, gimnasios, entrenadores personales y otros profesionales o entidades deportivas.
      </p>
      <p className="mb-4">
        El acceso y registro de menores podrá estar sujeto a requisitos o restricciones de edad en función del país de residencia y de la normativa aplicable.
      </p>
      <p className="mb-4">
        Cuando conforme a la legislación aplicable resulte necesaria la intervención, autorización o consentimiento del padre, madre o tutor legal, el uso de la Plataforma y el tratamiento de los datos del menor deberán contar con dicha autorización.
      </p>
      <p className="mb-4">
        Cuando el menor acceda o sea incorporado a BIVO TRAINING a través de una Entidad, corresponderá a dicha Entidad disponer de la legitimación necesaria para incorporar y gestionar al menor y obtener de sus representantes legales las autorizaciones que resulten exigibles, incluyendo las relacionadas con el tratamiento y comunicación de sus datos personales.
      </p>
      <p className="mb-4">
        La Entidad deberá informar adecuadamente al menor y, cuando corresponda, a sus representantes legales sobre el uso de BIVO TRAINING en el marco de los servicios deportivos que presta.
      </p>
      <p className="mb-4">
        El uso de los entrenamientos y contenidos deportivos por menores deberá realizarse teniendo en cuenta su edad, condición física, nivel deportivo y estado de salud, y bajo la supervisión que resulte adecuada atendiendo a su edad y circunstancias.
      </p>
      <p className="mb-4">
        BIVO TRAINING no sustituye la valoración o supervisión de profesionales médicos o sanitarios. Cuando el menor presente lesiones, patologías, problemas cardíacos, antecedentes cardiovasculares, epilepsia, limitaciones físicas u otras condiciones que puedan verse afectadas por la práctica de actividad física, deberá consultarse con un profesional sanitario cualificado antes de realizar los entrenamientos.
      </p>
    </section>

    <section className="mb-12">
      <h2 className="text-2xl font-semibold mb-4">{sectionTitle(5)}</h2>
      <p className="mb-4">
        El Usuario puede solicitar en cualquier momento la eliminación de su perfil y cuenta mediante los mecanismos disponibles en la Plataforma o aplicación o remitiendo un correo electrónico desde su dirección registrada a{" "}
        <a href="mailto:hello@bivotraining.com" className="text-bivo-green hover:underline">
          hello@bivotraining.com
        </a>
        , indicando los datos necesarios para identificar la cuenta.
      </p>
      <p className="mb-4">
        Tras la eliminación de la cuenta, los datos personales serán tratados conforme a lo establecido en la{" "}
        <a href={privacyPath} className="text-bivo-green hover:underline">Política de Privacidad</a>
        .
      </p>
      <p className="mb-4">
        BIVO TRAINING puede suspender o dar de baja a un Usuario y, por lo tanto, suspender o resolver la relación contractual, en caso de incumplimiento de cualquiera de las obligaciones establecidas en los presentes Términos y Condiciones.
      </p>
    </section>

    <section className="mb-12">
      <h2 className="text-2xl font-semibold mb-4">{sectionTitle(6)}</h2>
      <p className="mb-4">
        La Plataforma BIVO TRAINING pone a disposición de sus Usuarios un conjunto de herramientas tecnológicas orientadas a la mejora de la condición física y el rendimiento deportivo en pádel, tenis, pickleball y cualesquiera otros deportes de raqueta que puedan incorporarse en el futuro, con especial enfoque en el entrenamiento, la preparación física y el desarrollo deportivo.
      </p>
      <p className="mb-4">
        BIVO TRAINING es una plataforma digital de entrenamiento y mejora del rendimiento deportivo accesible principalmente a través de su aplicación móvil. El sitio web facilita asimismo información, registro, acceso y otras funcionalidades relacionadas con el servicio que puedan estar disponibles en cada momento.
      </p>
      <p className="mb-4">
        BIVO TRAINING se reserva el derecho de ampliar, modificar, limitar o suprimir funcionalidades, contenidos o servicios de la Plataforma con el fin de mejorar su funcionamiento, adaptarse a las necesidades del mercado o incorporar nuevas tecnologías.
      </p>
      <p className="mb-4">
        Dichas actualizaciones podrán implementarse de forma automática o ser comunicadas al Usuario a través de los canales oficiales, incluyendo el sitio web, la aplicación móvil o el correo electrónico.
      </p>
    </section>

    <section className="mb-12">
      <h2 className="text-2xl font-semibold mb-4">{sectionTitle(7)}</h2>
      <p className="mb-4">
        Los Usuarios son responsables del acceso y correcto uso de su perfil y funcionalidades de la Plataforma, con sujeción a la legalidad vigente, sea nacional o internacional, así como a los principios de buena fe, moral, buenas costumbres y orden público.
      </p>
      <p className="mb-2">En particular y a título enunciativo y no limitativo, los Usuarios se comprometen a:</p>
      <ul className="list-disc list-inside ml-4 mb-4 space-y-2">
        <li>Facilitar información veraz y actualizada en cualquier comunicación con BIVO TRAINING.</li>
        <li>No emplear datos personales, propios o de terceros, que contengan información sensible relativa a personas identificables o identificadas, salvo cuando su tratamiento esté permitido conforme a la normativa aplicable y a las funcionalidades de la Plataforma.</li>
        <li>No utilizar identidades falsas ni suplantar la identidad de terceros.</li>
        <li>No crear, utilizar o mantener perfiles falsos, ficticios o simulados ni utilizar la Plataforma mediante identidad encubierta con fines de análisis, monitorización, pruebas encubiertas, “mystery shopper”, ingeniería inversa, recopilación de datos, benchmarking competitivo, espionaje industrial o cualquier finalidad comercial, profesional o estratégica no autorizada expresamente por BIVO TRAINING.</li>
        <li>No obtener, recopilar, extraer, reproducir, explotar o utilizar información técnica, funcional, comercial o estratégica de la Plataforma sin autorización previa y por escrito de BIVO TRAINING.</li>
        <li>No utilizar la Plataforma para fines ilegales o no autorizados.</li>
        <li>No alojar, almacenar, divulgar, publicar, distribuir o compartir contenidos que vulneren derechos fundamentales al honor, imagen o intimidad personal y familiar de terceros y, especialmente, de menores de edad.</li>
        <li>No alterar o modificar total o parcialmente la Plataforma ni eludir, desactivar o manipular sus funciones o servicios.</li>
        <li>
          Cumplir con la{" "}
          <a href={privacyPath} className="text-bivo-green hover:underline">Política de Privacidad</a>
          {" "}y la normativa sobre protección de datos personales.
        </li>
        <li>No introducir, almacenar o difundir contenidos que infrinjan derechos de propiedad intelectual o industrial o información confidencial de terceros.</li>
        <li>No utilizar la Plataforma para injuriar, difamar, intimidar, acosar o vulnerar los derechos de otros Usuarios.</li>
        <li>No acceder a cuentas de otros Usuarios.</li>
        <li>No introducir, almacenar o difundir programas, datos, códigos, virus, archivos defectuosos u otros elementos susceptibles de provocar daños o alteraciones en los sistemas de BIVO TRAINING, otros Usuarios o terceros.</li>
        <li>No destruir, alterar, inutilizar o dañar datos, informaciones, programas o documentos electrónicos de BIVO TRAINING, sus Usuarios o terceros.</li>
      </ul>
      <p className="mb-4">
        BIVO TRAINING se reserva el derecho de investigar, suspender, bloquear o eliminar cualquier cuenta respecto de la cual existan indicios razonables de identidad no auténtica, uso fraudulento o utilización de la Plataforma con fines distintos a los previstos en estos Términos, así como ejercer las acciones legales que correspondan para la defensa de sus intereses legítimos, incluyendo la protección de su tecnología, información confidencial, modelo de negocio y secretos empresariales.
      </p>
      <p className="mb-4">
        Quienes incumplan estas obligaciones responderán de los perjuicios o daños que ocasionen. En la máxima medida permitida por la legislación aplicable, BIVO TRAINING no responderá de las consecuencias, daños o perjuicios derivados del acceso o uso ilícito de la Plataforma por terceros.
      </p>
      <p className="mb-4">
        Asimismo, cualquier Usuario deberá cumplir con las respectivas obligaciones fiscales y tributarias que le resulten aplicables.
      </p>
    </section>

    <section className="mb-12">
      <h2 className="text-2xl font-semibold mb-4">{sectionTitle(8)}</h2>
      <p className="mb-4">
        La creación de un perfil de Usuario puede ser necesaria para la prestación de determinados servicios ofrecidos por BIVO TRAINING. Durante el proceso de registro, el Usuario deberá aceptar la{" "}
        <a href={privacyPath} className="text-bivo-green hover:underline">Política de Privacidad</a>
        {" "}y el tratamiento de sus datos conforme a la misma.
      </p>
      <p className="mb-4">
        Cuando el Usuario otorgue expresamente su consentimiento mediante los mecanismos habilitados al efecto, BIVO TRAINING podrá enviar comunicaciones comerciales, promocionales o informativas relacionadas con sus productos, servicios o novedades.
      </p>
      <p className="mb-4">
        El Usuario podrá revocar este consentimiento en cualquier momento a través de los mecanismos habilitados en la Plataforma o mediante comunicación a BIVO TRAINING, sin que ello afecte a la prestación del servicio.
      </p>
    </section>

    <section className="mb-12">
      <h2 className="text-2xl font-semibold mb-4">{sectionTitle(9)}</h2>
      <p className="mb-4">
        Determinadas funcionalidades de la Plataforma podrán requerir acceso a permisos del dispositivo del Usuario, como la cámara, fotografías o galería y notificaciones.
      </p>
      <p className="mb-4">
        Cuando resulte necesario, dicho acceso se solicitará previamente mediante los correspondientes permisos del sistema operativo y únicamente se producirá cuando el Usuario lo autorice.
      </p>
      <p className="mb-4">
        Cuando el uso de dichos permisos implique tratamiento de datos personales, BIVO TRAINING informará sobre las finalidades y demás aspectos exigidos por la normativa aplicable de acuerdo con su{" "}
        <a href={privacyPath} className="text-bivo-green hover:underline">Política de Privacidad</a>
        .
      </p>
      <p className="mb-4">
        El Usuario podrá denegar o revocar estos permisos en cualquier momento desde la configuración de su dispositivo o navegador, si bien dicha decisión podrá afectar a la disponibilidad o correcto funcionamiento de determinadas funcionalidades de la Plataforma.
      </p>
    </section>

    <section className="mb-12">
      <h2 className="text-2xl font-semibold mb-4">{sectionTitle(10)}</h2>
      <p className="mb-4">
        BIVO TRAINING es titular o licenciataria de todos los derechos de propiedad intelectual e industrial incluidos en la Plataforma y sobre los contenidos accesibles a través de la misma, especialmente, pero no únicamente, textos, imágenes, fotografías, vídeos, entrenamientos, diseño gráfico, estructura de navegación, información, tecnología, código fuente, bases de datos y cualesquiera otros contenidos.
      </p>
      <p className="mb-4">
        La autorización al Usuario para acceder y utilizar la Plataforma y los servicios ofrecidos no supone ninguna cesión de derechos de propiedad intelectual o industrial.
      </p>
      <p className="mb-4">
        BIVO TRAINING concede al Usuario una licencia limitada para acceder y hacer uso personal de la Plataforma y los servicios ofrecidos. Dicha licencia es no exclusiva, para todo el mundo y limitada a la duración de la relación contractual del Usuario con BIVO TRAINING conforme a estos Términos y Condiciones.
      </p>
    </section>

    <section className="mb-12">
      <h2 className="text-2xl font-semibold mb-4">{sectionTitle(11)}</h2>
      <p className="mb-4">
        BIVO TRAINING cumplirá con la normativa aplicable en materia de Inteligencia Artificial.
      </p>
      <p className="mb-4">
        Los sistemas de Inteligencia Artificial que puedan utilizarse para la prestación de los servicios tendrán carácter técnico y funcional y podrán utilizarse, entre otras finalidades, para analizar el uso de la Plataforma, personalizar entrenamientos, generar recomendaciones deportivas y mejorar el servicio.
      </p>
      <p className="mb-4">
        Las imágenes, vídeos, grabaciones o materiales que, en su caso, el Usuario suba a la Plataforma podrán ser almacenados y tratados para permitir el análisis técnico, seguimiento del progreso deportivo y mejora del servicio, pudiendo intervenir sistemas automatizados o de inteligencia artificial.
      </p>
      <p className="mb-4">
        Dichos tratamientos no tienen carácter médico ni constituyen diagnóstico sanitario.
      </p>
      <p className="mb-4">
        Cuando resulte exigible, el tratamiento se realizará sobre la base jurídica correspondiente conforme a la normativa de protección de datos.
      </p>
    </section>

    <section className="mb-12">
      <h2 className="text-2xl font-semibold mb-4">{sectionTitle(12)}</h2>
      <p className="mb-4">
        En la Plataforma el Usuario podrá encontrar enlaces a sitios web, aplicaciones o recursos gestionados por terceros. El establecimiento de enlaces, reenvíos o asociaciones desde la Plataforma no implica la existencia de relación, colaboración o dependencia entre BIVO TRAINING y el titular del sitio o recurso enlazado, salvo que se indique expresamente.
      </p>
      <p className="mb-4">
        BIVO TRAINING no asume responsabilidad sobre los contenidos, información, servicios, condiciones legales, políticas de privacidad o prácticas de terceros ni garantiza su disponibilidad, veracidad, exactitud o legalidad.
      </p>
      <p className="mb-4">
        El acceso a dichos sitios o recursos externos se realiza bajo la responsabilidad del Usuario.
      </p>
      <p className="mb-4">
        Cuando la Plataforma incluya enlaces a colaboradores, partners o terceros relacionados con los servicios ofrecidos, dichos enlaces podrán reflejar la existencia de acuerdos de colaboración, integración o relación comercial cuando así se indique expresamente.
      </p>
    </section>

    <section className="mb-12">
      <h2 className="text-2xl font-semibold mb-4">{sectionTitle(13)}</h2>
      <p className="mb-4">
        La responsabilidad de BIVO TRAINING, como prestador de servicios telemáticos a través de una plataforma digital, se limita a la puesta a disposición de dicha Plataforma para que los Usuarios puedan utilizar los servicios contratados.
      </p>
      <p className="mb-4">
        BIVO TRAINING tiene la obligación y responsabilidad de mantener la Plataforma en buen estado de funcionamiento, realizando el mantenimiento y actualizaciones oportunas durante la vigencia de la relación comercial.
      </p>
      <p className="mb-4">
        BIVO TRAINING realizará esfuerzos razonables para mantener el correcto funcionamiento del servicio, aunque no garantiza la ausencia absoluta de interrupciones, errores o fallos técnicos.
      </p>
      <p className="mb-4">
        En caso de detectarse un error crítico, BIVO TRAINING realizará las tareas de mantenimiento necesarias para subsanarlo en el menor tiempo posible y sin demoras indebidas.
      </p>
      <p className="mb-4">
        BIVO TRAINING no será responsable de daños indirectos, incluyendo, entre otros, pérdida de ingresos, beneficios o datos, excepto cuando dichos daños sean causados por negligencia grave o dolo de BIVO TRAINING.
      </p>
    </section>

    <section className="mb-12">
      <h2 className="text-2xl font-semibold mb-4">{sectionTitle(14)}</h2>
      <p className="mb-4">
        Los servicios ofrecidos por BIVO TRAINING están orientados a la mejora de la condición física y el rendimiento deportivo y no constituyen en ningún caso servicios médicos, sanitarios, fisioterapéuticos ni de diagnóstico clínico.
      </p>
      <p className="mb-4">
        El Usuario reconoce y acepta que la práctica de actividad física conlleva riesgos inherentes, incluyendo, entre otros, lesiones musculares, articulares, cardiovasculares o de cualquier otra naturaleza.
      </p>
      <p className="mb-4">
        En consecuencia, el Usuario es responsable de evaluar su estado de salud antes de utilizar los servicios ofrecidos por la Plataforma y deberá consultar con un profesional sanitario cualificado cuando padezca o sospeche que pueda padecer lesiones, patologías, problemas cardíacos, antecedentes cardiovasculares, epilepsia, limitaciones físicas u otras condiciones médicas que puedan verse afectadas por la actividad física.
      </p>
      <p className="mb-4">
        El Usuario será responsable del uso que haga de los entrenamientos, ejercicios, recomendaciones o contenidos ofrecidos por la Plataforma, especialmente en caso de encontrarse lesionado, en proceso de recuperación o bajo cualquier condición física que pudiera verse afectada por la actividad deportiva.
      </p>
      <p className="mb-4">
        BIVO TRAINING no será responsable de lesiones, daños físicos, problemas de salud, episodios cardiovasculares o cualquier otra consecuencia derivada del uso de la Plataforma, salvo en los casos en que la normativa aplicable establezca expresamente lo contrario.
      </p>
      <p className="mb-4">
        El uso de la Plataforma por menores de edad deberá realizarse con la supervisión adecuada atendiendo a su edad y circunstancias. Esta supervisión podrá corresponder a sus padres, madres o tutores legales y, cuando el menor utilice BIVO TRAINING a través de BIVO COACH, podrá complementarse con la supervisión deportiva de clubes, academias, federaciones, gimnasios, entrenadores personales u otros profesionales o entidades deportivas que tengan al menor bajo su tutela o seguimiento deportivo.
      </p>
      <p className="mb-4">
        En todo caso, serán asimismo aplicables las condiciones establecidas en el apartado “Menores de edad” de los presentes Términos y Condiciones.
      </p>
      <p className="mb-4">
        Los resultados deportivos o mejoras físicas que puedan derivarse del uso de BIVO TRAINING dependen de múltiples factores personales, entre ellos la condición física, constancia en el entrenamiento, estado de salud, alimentación, descanso y otros factores externos. Por ello, BIVO TRAINING no garantiza la obtención de resultados deportivos, mejoras físicas concretas o un rendimiento determinado.
      </p>
    </section>

    <section className="mb-12">
      <h2 className="text-2xl font-semibold mb-4">{sectionTitle(15)}</h2>
      <p className="mb-4">
        Si cualquiera de las cláusulas de los presentes Términos y Condiciones fuera nula de pleno derecho o anulable, se tendrá por no puesta.
      </p>
      <p className="mb-4">
        Dicha declaración de nulidad no invalidará el resto de los Términos y Condiciones, que mantendrán su vigencia y eficacia.
      </p>
    </section>

    <section className="mb-12">
      <h2 className="text-2xl font-semibold mb-4">{sectionTitle(16)}</h2>
      <p className="mb-4">
        BIVO TRAINING se reserva el derecho de modificar, actualizar o mejorar la estructura, configuración, diseño, funcionalidades y contenidos del sitio web, aplicación o Plataforma.
      </p>
      <p className="mb-4">
        Asimismo, podrá modificar los presentes Términos y Condiciones y la{" "}
        <a href={privacyPath} className="text-bivo-green hover:underline">Política de Privacidad</a>
        {" "}conforme a la legislación aplicable.
      </p>
      <p className="mb-4">
        Las versiones actualizadas estarán disponibles de forma permanente a través de la Plataforma.
      </p>
      <p className="mb-4">
        BIVO TRAINING no garantiza la inexistencia absoluta de interrupciones o errores en el acceso a la Plataforma o a sus contenidos. No obstante, realizará, cuando resulte razonablemente posible, las actuaciones necesarias para subsanar errores, restablecer comunicaciones y mantener actualizados sus servicios.
      </p>
    </section>

    <section className="mb-12">
      <h2 className="text-2xl font-semibold mb-4">{sectionTitle(17)}</h2>
      <p className="mb-4">
        La validez, ejecución e interpretación de los presentes Términos y Condiciones serán reguladas en todos sus aspectos por las leyes españolas.
      </p>
      <p className="mb-4">
        En el supuesto de que surja cualquier conflicto o discrepancia en la interpretación o aplicación de los presentes Términos y Condiciones, se someterá a los Juzgados y Tribunales de Palma de Mallorca (Islas Baleares, España), salvo que la normativa aplicable en materia de consumidores y usuarios establezca otro fuero imperativo.
      </p>
    </section>

    <section className="mb-12">
      <h2 className="text-2xl font-semibold mb-4">{sectionTitle(18)}</h2>
      <p className="mb-4">
        BIVO TRAINING se reserva el derecho a modificar los presentes Términos y Condiciones para adaptarlos a novedades legislativas o jurisprudenciales, cambios en sus servicios, nuevas funcionalidades o mejoras de la Plataforma.
      </p>
      <p className="mb-4">
        Cuando corresponda conforme a la normativa aplicable, las modificaciones serán comunicadas a los Usuarios.
      </p>
    </section>

    <div className="border-t pt-6">
      <p className="text-sm text-gray-600">
        <strong>{t("legal.terms.lastUpdate")}</strong>
      </p>
      <p className="text-sm text-gray-600 mt-2">
        {t("legal.terms.contact")}{" "}
        <a href="mailto:hello@bivotraining.com" className="text-bivo-green hover:underline">
          hello@bivotraining.com
        </a>
      </p>
    </div>
  </div>
  );
};

export default TermsConditionsContent;
