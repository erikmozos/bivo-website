import React, { useEffect } from "react";
import Layout from "@/components/layout/Layout";
import { openCookiePreferences } from "@/components/ConsentBanner";

const CookiePolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    const timer = setTimeout(() => window.scrollTo(0, 0), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
  <Layout>
    <div className="min-h-screen bg-white text-black pt-28 pb-16 px-4 sm:px-6 md:px-8 lg:px-12 w-full min-w-0 box-border">
      <div className="max-w-3xl mx-auto w-full min-w-0 [&_a]:break-all">
        <h1 className="text-3xl font-bold mb-6">POLÍTICA DE COOKIES</h1>

        <p className="mb-4">
          La Política de Cookies forma parte esencial de las normas y políticas de privacidad del
          sitio web de Bivo Training S.L. (en adelante, "BIVO TRAINING"), que en adelante llamaremos
          "Sitio Web". Al acceder o navegar en el Sitio Web, o al utilizar sus servicios, usted está
          aceptando automáticamente los términos y condiciones establecidos en nuestras reglas y
          políticas legales.
        </p>

        <p className="mb-4">
          Para que tu experiencia de navegación en nuestro Sitio Web sea más sencilla y efectiva,
          queremos informarle que BIVO TRAINING, la entidad titular, con número de identificación
          fiscal B-22728117 y sede en Av. des Camp Verd, 4, Centre Bit Menorca (Alaior), Illes
          Balears, España, hace uso de cookies que almacenan y recuperan información de manera
          similar, que llamaremos "cookies" en adelante.
        </p>

        <p className="mb-4">
          En esta línea, y con la intención de proporcionarle toda la información necesaria para que
          pueda navegar con confianza, ponemos a su disposición el siguiente resumen informativo que
          explica qué son las cookies, qué tipos de cookies empleamos en nuestro Sitio Web, y cómo
          puede configurarlas o desactivarlas a su elección.
        </p>

        <p className="mb-8 text-sm text-gray-600">
          La presente política de cookies fue modificada el 13/03/2026.
        </p>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">¿QUÉ ES UNA COOKIE?</h2>
          <p className="mb-4">
            Una cookie es un pequeño fragmento de datos, generalmente en forma de archivos de texto,
            que un sitio web solicita a su navegador para que se almacene en su dispositivo. Estas
            cookies sirven para recordar información sobre usted, como sus preferencias de idioma o
            detalles para iniciar sesión.
          </p>
          <p className="mb-4">
            Las cookies desempeñan un papel fundamental en el funcionamiento de internet al
            proporcionar soluciones técnicas que facilitan la navegación del usuario en diversos
            sitios web. Es importante destacar que no causan daño al equipo o dispositivo del
            usuario. Cuando están habilitadas en la configuración del navegador, también contribuyen
            a identificar y solucionar posibles problemas de funcionamiento en el sitio web. Además
            de su función técnica, las cookies pueden tener aplicaciones en el ámbito publicitario y
            analítico.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">USO DE COOKIES POR PARTE DEL TITULAR DE LA PÁGINA WEB</h2>
          <p className="mb-4">
            BIVO TRAINING emplea tanto cookies propias, que son creadas directamente por nuestro
            dominio, como cookies de terceros, que provienen de sitios web externos no afiliados a
            BIVO TRAINING y son propiedad de terceras empresas. Estas cookies se utilizan para los
            fines específicos que se describen a continuación. En caso de que en el futuro decidamos
            implementar otras cookies con el objetivo de mejorar nuestros servicios, informaremos a
            los usuarios al respecto en la presente política, por lo que le aconsejamos visitar
            periódicamente esta página de Políticas de Cookies.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">COOKIES ESTRICTAMENTE NECESARIAS</h2>
          <p className="mb-4">
            Se trata de aquellas cookies que permiten a los usuarios navegar por una página web,
            plataforma o aplicación y utilizar diversas opciones y servicios disponibles en ella. Por
            ejemplo, estas cookies facilitan el control del tráfico y la transferencia de datos,
            identifican la sesión del usuario, proporcionan acceso a secciones de acceso restringido,
            recuerdan los elementos de un pedido, gestionan el proceso de compra, permiten la
            inscripción en eventos, garantizan la seguridad durante la navegación, almacenan
            contenido multimedia como videos o sonidos, y posibilitan compartir contenido en redes
            sociales.
          </p>
          <p className="mb-4">
            BIVO TRAINING no requiere su consentimiento para instalar en su dispositivo las cookies
            necesarias que activan las funciones que usted utiliza. Su uso se justifica por la
            necesidad de brindar los servicios solicitados. Si decide desactivar o bloquear todas las
            cookies en su navegador, es posible que su experiencia de navegación en el Sitio Web no
            sea óptima y que algunas de las utilidades del Sitio Web no funcionen correctamente.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">COOKIES DE FUNCIONALIDAD</h2>
          <p className="mb-4">
            Se refieren a aquellas cookies que permiten a los usuarios acceder al servicio con
            características generales predefinidas, considerando las circunstancias de su dispositivo
            o elecciones previas. Esto incluye aspectos como el idioma seleccionado, el tipo de
            letra y la disposición de las imágenes según si se accede desde una computadora o un
            dispositivo móvil, entre otros.
          </p>
          <p className="mb-4">
            Las cookies de preferencias se configuran automáticamente cuando visita el Sitio Web o
            realiza elecciones de personalización. Esto asegura que el contenido se adapte a sus
            necesidades específicas. Para el uso de estas cookies, BIVO TRAINING no requiere su
            consentimiento, ya que la información que se recopila no tiene un impacto significativo
            en su privacidad y es esencial para que nuestros contenidos resulten atractivos, lo que
            se basa en nuestro interés legítimo.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">COOKIES DE RENDIMIENTO</h2>
          <p className="mb-4">
            Estas cookies recopilan datos sobre la forma en que los visitantes interactúan con el
            sitio web, como las páginas más visitadas, la detección de mensajes de error en las
            páginas web, las secciones a las que acceden y los botones que seleccionan. Es importante
            destacar que la información obtenida a través de estas cookies no permite identificar a
            los visitantes; se mantiene anónima al estar agregada. La finalidad de estas cookies es
            recopilar estadísticas e informes que sirven para mejorar el rendimiento del sitio web.
          </p>
          <p className="mb-2">
            Asimismo, le informamos que algunas de las cookies analíticas utilizadas las provee
            Google Analytics. Puede encontrar más información sobre las cookies de Google Analytics
            aquí:
          </p>
          <ul className="list-disc list-inside ml-4 mb-2 space-y-2">
            <li>
              <a
                href="https://developers.google.com/analytics/resources/concepts/gaConceptsCookies"
                target="_blank"
                rel="noopener noreferrer"
                className="text-bivo-green hover:underline"
              >
                https://developers.google.com/analytics/resources/concepts/gaConceptsCookies
              </a>
            </li>
          </ul>
          <p className="mb-2">
            Puede evitar la utilización de Google Analytics en relación con su uso en el Sitio Web al
            descargar e instalar el complemento de navegador disponible a través de este enlace:
          </p>
          <ul className="list-disc list-inside ml-4 mb-4 space-y-2">
            <li>
              <a
                href="http://tools.google.com/dlpage/gaoptout?hl=en-GB"
                target="_blank"
                rel="noopener noreferrer"
                className="text-bivo-green hover:underline"
              >
                http://tools.google.com/dlpage/gaoptout?hl=en-GB
              </a>
            </li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">COOKIES DIRIGIDAS</h2>
          <p className="mb-4">
            Estas cookies retienen datos sobre cómo los usuarios se comportan en línea, recopilados
            mediante la observación constante de sus patrones de navegación. Esto posibilita la
            creación de perfiles detallados que se utilizan para personalizar la publicidad, ya sea
            en este Sitio Web o en otros sitios web de terceros.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">LISTA DE COOKIES QUE UTILIZA EL SITIO WEB</h2>
          <p className="mb-6">
            El Sitio Web de BIVO TRAINING, utiliza cookies para los siguientes propósitos:
          </p>

          <div className="mb-10">
            <h3 className="text-xl font-semibold mb-3">COOKIES ESTRICTAMENTE NECESARIAS</h3>
            <p className="mb-4">
              Estas cookies son esenciales para el funcionamiento del sitio web y no pueden
              desactivarse en nuestros sistemas. Por lo general, se ajustan en respuesta a sus
              acciones con el fin de proporcionarle servicios, como personalizar sus preferencias de
              privacidad, iniciar sesión en el sitio o completar formularios. Aunque tiene la opción
              de configurar su navegador para bloquear o recibir alertas sobre estas cookies, es
              importante tener en cuenta que esto podría afectar el rendimiento de ciertas partes del
              sitio web. Si desactiva o bloquea todas las cookies de su navegador, puede que su
              navegación por el Sitio Web no sea óptima y algunas de las utilidades de que dispone
              el Sitio Web no funcionen correctamente.
            </p>
            <p className="mb-4">
              Es importante destacar que estas cookies no almacenan ninguna información personal
              identificable.
            </p>
          </div>

          <div className="mb-10">
            <h3 className="text-xl font-semibold mb-3">COOKIES DE FUNCIONALIDAD</h3>
            <p className="mb-4">
              Estas cookies posibilitan una mayor funcionalidad y personalización del sitio. Pueden
              ser configuradas tanto por nosotros como por terceros cuyos servicios hemos incorporado
              a nuestras páginas. Si opta por no habilitar estas cookies, es posible que algunos de
              nuestros servicios no operen de manera óptima.
            </p>
          </div>

          <div className="mb-10">
            <h3 className="text-xl font-semibold mb-3">COOKIES DE RENDIMIENTO</h3>
            <p className="mb-4">
              Estas cookies nos posibilitan rastrear las visitas y las fuentes de tráfico, lo que nos
              permite evaluar y mejorar el rendimiento de nuestro sitio web. Nos brindan información
              sobre la popularidad relativa de las distintas páginas y el número de personas que
              acceden al sitio. Es importante destacar que la información recopilada por estas
              cookies se agrupa y, por lo tanto, se mantiene anónima. Si decide no permitir estas
              cookies, no podremos determinar cuándo visitó nuestro sitio, lo que limitaría nuestra
              capacidad para analizar su uso.
            </p>
          </div>

          <div className="mb-10">
            <h3 className="text-xl font-semibold mb-3">COOKIES DIRIGIDAS</h3>
            <p className="mb-4">
              Estas cookies pueden estar presentes en todo el sitio web y son instaladas por nuestros
              colaboradores en publicidad. Estas empresas las utilizan para elaborar un perfil de sus
              intereses y presentar anuncios pertinentes en otros sitios. Es importante destacar que
              estas cookies no almacenan información personal directa, sino que se basan en la
              identificación única de su navegador y dispositivo de acceso a Internet. Si decide no
              permitir estas cookies, es probable que reciba menos anuncios personalizados.
            </p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">PLAZOS DE CONSERVACIÓN</h2>
          <p className="mb-4">
            Las cookies empleadas por BIVO TRAINING permanecerán en su dispositivo durante el
            período requerido para cumplir con su propósito original, sin exceder los 2 años. Sin
            embargo, siempre tiene la opción de eliminarlas utilizando las configuraciones de su
            navegador, como se detalla en la sección "CÓMO CONFIGURAR, RECHAZAR O BLOQUEAR COOKIES"
            de esta política.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">TRANSFERENCIAS INTERNACIONALES</h2>
          <p className="mb-4">
            Ciertos datos personales recopilados mediante cookies de terceros pueden ser sujetos a
            transferencias internacionales. En estos casos, queremos asegurarle que se implementarán
            las medidas de seguridad necesarias para preservar la confidencialidad, integridad y
            disponibilidad de dicha información. Para obtener detalles adicionales sobre las
            transferencias internacionales realizadas por cada tercero, le recomendamos consultar las
            políticas de privacidad de los terceros a través de los enlaces proporcionados en el
            panel de configuración.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">CÓMO CONFIGURAR, RECHAZAR O BLOQUEAR COOKIES</h2>
          <p className="mb-4">
            BIVO TRAINING ha habilitado un panel de configuración de las cookies utilizadas en el
            Sitio Web, al que puede acceder a través del siguiente enlace. A través de esta
            herramienta, el usuario tiene la opción de aceptar todas las cookies, rechazarlas todas
            (excepto las técnicas necesarias para el funcionamiento del sitio web) o configurarlas de
            forma gradual.
          </p>
          <p className="mb-4">
            <button
              onClick={openCookiePreferences}
              className="text-bivo-green hover:underline font-medium"
            >
              Configurar cookies
            </button>
          </p>

          <h3 className="text-xl font-semibold mb-3">ENLACE SISTEMA DE CONFIGURACIÓN COOKIES UTILIZADO EN LA WEB</h3>
          <p className="mb-4">
            Tiene la opción de impedir el almacenamiento de cookies utilizando las opciones de
            configuración de su navegador. Asimismo, puede ajustar su navegador para que le notifique
            cuando un servidor intente guardar una cookie.
          </p>
          <ul className="list-disc list-inside ml-4 mb-4 space-y-3">
            <li>
              En Microsoft Internet Explorer, encontrará la opción en el menú Herramientas &gt;
              Opciones de Internet &gt; Privacidad &gt; Configuración. Para saber más, visite:
              <ul className="list-disc list-inside ml-6 mt-2 space-y-1">
                <li>
                  <a
                    href="http://windows.microsoft.com/es-es/windows-vista/block-or-allow-Cookies"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-bivo-green hover:underline"
                  >
                    http://windows.microsoft.com/es-es/windows-vista/block-or-allow-Cookies
                  </a>
                </li>
                <li>
                  <a
                    href="http://windows.microsoft.com/es-es/windows7/how-to-manage-Cookies-in-internet-explorer-9"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-bivo-green hover:underline"
                  >
                    http://windows.microsoft.com/es-es/windows7/how-to-manage-Cookies-in-internet-explorer-9
                  </a>
                </li>
              </ul>
            </li>
            <li>
              En Firefox, encontrará la opción en el menú Herramientas &gt; Opciones &gt; Privacidad &gt; Cookies. Para saber más, visite:{" "}
              <a
                href="https://support.mozilla.org/es/kb/habilitar-y-deshabilitar-cookies-sitios-web-rastrear-preferencias"
                target="_blank"
                rel="noopener noreferrer"
                className="text-bivo-green hover:underline"
              >
                https://support.mozilla.org/es/kb/habilitar-y-deshabilitar-cookies-sitios-web-rastrear-preferencias
              </a>
            </li>
            <li>
              En Chrome, en la sección de Opciones &gt; Opciones avanzadas &gt; Privacidad. Para saber más:{" "}
              <a
                href="https://support.google.com/accounts/answer/61416?hl=es"
                target="_blank"
                rel="noopener noreferrer"
                className="text-bivo-green hover:underline"
              >
                https://support.google.com/accounts/answer/61416?hl=es
              </a>
            </li>
            <li>
              En Opera, en la opción de Seguridad y Privacidad, podrá configurar el navegador. Para saber más visite:{" "}
              <a
                href="http://help.opera.com/Windows/11.50/es-ES/cookies.html"
                target="_blank"
                rel="noopener noreferrer"
                className="text-bivo-green hover:underline"
              >
                http://help.opera.com/Windows/11.50/es-ES/cookies.html
              </a>
            </li>
            <li>
              En Safari encontrará la opción en el menú Preferencias/Privacidad. Para saber más, visite:{" "}
              <a
                href="http://support.apple.com/kb/HT1677?viewlocale=es_ES"
                target="_blank"
                rel="noopener noreferrer"
                className="text-bivo-green hover:underline"
              >
                http://support.apple.com/kb/HT1677?viewlocale=es_ES
              </a>
            </li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">DERECHOS DE LOS USUARIOS</h2>
          <p className="mb-4">
            Consulte nuestra{" "}
            <a href="/privacidad" className="text-bivo-green hover:underline">
              Política de Privacidad
            </a>{" "}
            para obtener más información sobre cómo BIVO TRAINING realiza el tratamiento de sus
            datos.
          </p>
        </section>

        <div className="border-t pt-6">
          <p className="text-sm text-gray-600">
            <strong>Última actualización:</strong> 13 de marzo de 2026
          </p>
          <p className="text-sm text-gray-600 mt-2">
            Para cualquier consulta sobre esta política, contacta con nosotros en:{" "}
            <a href="mailto:hello@bivotraining.com" className="text-bivo-green hover:underline">
              hello@bivotraining.com
            </a>
          </p>
        </div>
      </div>
    </div>
  </Layout>
  );
};

export default CookiePolicy;
