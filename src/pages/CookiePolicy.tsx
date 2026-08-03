import React, { useEffect } from "react";
import { useTranslation, Trans } from "react-i18next";
import { useLegalPath } from "@/hooks/useLegalPath";
import Layout from "@/components/layout/Layout";
import { openCookiePreferences } from "@/components/ConsentBanner";

const CookiePolicy = () => {
  const { t } = useTranslation();
  const { privacyPath } = useLegalPath();

  useEffect(() => {
    window.scrollTo(0, 0);
    const timer = setTimeout(() => window.scrollTo(0, 0), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
  <Layout>
    <div className="min-h-screen bg-white text-black pt-28 pb-16 px-4 sm:px-6 md:px-8 lg:px-12 w-full min-w-0 box-border">
      <div className="max-w-3xl mx-auto w-full min-w-0 [&_a]:break-all">
        <h1 className="text-3xl font-bold mb-6">{t("legal.cookies.heading")}</h1>

        <p className="mb-4">{t("legal.cookies.intro")}</p>

        <p className="mb-4">{t("legal.cookies.description")}</p>

        <p className="mb-4">{t("legal.cookies.summaryNote")}</p>

        <p className="mb-8 text-sm text-gray-600">{t("legal.cookies.lastModified")}</p>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">{t("legal.cookies.sections.0.title")}</h2>
          <p className="mb-4">{t("legal.cookies.sections.0.content.0")}</p>
          <p className="mb-4">{t("legal.cookies.sections.0.content.1")}</p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">{t("legal.cookies.sections.1.title")}</h2>
          <p className="mb-4">{t("legal.cookies.sections.1.content")}</p>
          <p className="mb-4">
            En caso de que en el futuro decidamos implementar otras cookies con el objetivo de mejorar nuestros servicios, informaremos a los usuarios al respecto en la presente política, por lo que le aconsejamos visitar periódicamente esta página de Políticas de Cookies.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">{t("legal.cookies.sections.2.title")}</h2>
          <p className="mb-4">{t("legal.cookies.sections.2.content")}</p>
          <p className="mb-4">
            BIVO TRAINING no requiere su consentimiento para instalar en su dispositivo las cookies necesarias que activan las funciones que usted utiliza. Su uso se justifica por la necesidad de brindar los servicios solicitados. Si decide desactivar o bloquear todas las cookies en su navegador, es posible que su experiencia de navegación en el Sitio Web no sea óptima y que algunas de las utilidades del Sitio Web no funcionen correctamente.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">{t("legal.cookies.sections.3.title")}</h2>
          <p className="mb-4">{t("legal.cookies.sections.3.content")}</p>
          <p className="mb-4">
            Las cookies de preferencias se configuran automáticamente cuando visita el Sitio Web o realiza elecciones de personalización. Esto asegura que el contenido se adapte a sus necesidades específicas. Para el uso de estas cookies, BIVO TRAINING no requiere su consentimiento, ya que la información que se recopila no tiene un impacto significativo en su privacidad y es esencial para que nuestros contenidos resulten atractivos, lo que se basa en nuestro interés legítimo.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">{t("legal.cookies.sections.4.title")}</h2>
          <p className="mb-4">{t("legal.cookies.sections.4.content")}</p>
          <p className="mb-2">
            Asimismo, le informamos que algunas de las cookies analíticas utilizadas las provee Google Analytics. Puede encontrar más información sobre las cookies de Google Analytics aquí:
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
            Puede evitar la utilización de Google Analytics en relación con su uso en el Sitio Web al descargar e instalar el complemento de navegador disponible a través de este enlace:
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
          <h2 className="text-2xl font-semibold mb-4">{t("legal.cookies.sections.5.title")}</h2>
          <p className="mb-4">{t("legal.cookies.sections.5.content")}</p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">{t("legal.cookies.sections.6.title")}</h2>
          <p className="mb-6">
            El Sitio Web de BIVO TRAINING, utiliza cookies para los siguientes propósitos:
          </p>

          <div className="mb-10">
            <h3 className="text-xl font-semibold mb-3">{t("legal.cookies.sections.2.title")}</h3>
            <p className="mb-4">
              Estas cookies son esenciales para el funcionamiento del sitio web y no pueden desactivarse en nuestros sistemas. Por lo general, se ajustan en respuesta a sus acciones con el fin de proporcionarle servicios, como personalizar sus preferencias de privacidad, iniciar sesión en el sitio o completar formularios. Aunque tiene la opción de configurar su navegador para bloquear o recibir alertas sobre estas cookies, es importante tener en cuenta que esto podría afectar el rendimiento de ciertas partes del sitio web. Si desactiva o bloquea todas las cookies de su navegador, puede que su navegación por el Sitio Web no sea óptima y algunas de las utilidades de que dispone el Sitio Web no funcionen correctamente.
            </p>
            <p className="mb-4">
              Es importante destacar que estas cookies no almacenan ninguna información personal identificable.
            </p>
          </div>

          <div className="mb-10">
            <h3 className="text-xl font-semibold mb-3">{t("legal.cookies.sections.3.title")}</h3>
            <p className="mb-4">
              Estas cookies posibilitan una mayor funcionalidad y personalización del sitio. Pueden ser configuradas tanto por nosotros como por terceros cuyos servicios hemos incorporado a nuestras páginas. Si opta por no habilitar estas cookies, es posible que algunos de nuestros servicios no operen de manera óptima.
            </p>
          </div>

          <div className="mb-10">
            <h3 className="text-xl font-semibold mb-3">{t("legal.cookies.sections.4.title")}</h3>
            <p className="mb-4">
              Estas cookies nos posibilitan rastrear las visitas y las fuentes de tráfico, lo que nos permite evaluar y mejorar el rendimiento de nuestro sitio web. Nos brindan información sobre la popularidad relativa de las distintas páginas y el número de personas que acceden al sitio. Es importante destacar que la información recopilada por estas cookies se agrupa y, por lo tanto, se mantiene anónima. Si decide no permitir estas cookies, no podremos determinar cuándo visitó nuestro sitio, lo que limitaría nuestra capacidad para analizar su uso.
            </p>
          </div>

          <div className="mb-10">
            <h3 className="text-xl font-semibold mb-3">{t("legal.cookies.sections.5.title")}</h3>
            <p className="mb-4">
              Estas cookies pueden estar presentes en todo el sitio web y son instaladas por nuestros colaboradores en publicidad. Estas empresas las utilizan para elaborar un perfil de sus intereses y presentar anuncios pertinentes en otros sitios. Es importante destacar que estas cookies no almacenan información personal directa, sino que se basan en la identificación única de su navegador y dispositivo de acceso a Internet. Si decide no permitir estas cookies, es probable que reciba menos anuncios personalizados.
            </p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">{t("legal.cookies.sections.7.title")}</h2>
          <p className="mb-4">{t("legal.cookies.sections.7.content")}</p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">{t("legal.cookies.sections.8.title")}</h2>
          <p className="mb-4">{t("legal.cookies.sections.8.content")}</p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">{t("legal.cookies.sections.9.title")}</h2>
          <p className="mb-4">{t("legal.cookies.sections.9.content")}</p>
          <p className="mb-4">
            <button
              onClick={openCookiePreferences}
              className="text-bivo-green hover:underline font-medium"
            >
              {t("legal.cookies.sections.9.configureButton")}
            </button>
          </p>

          <h3 className="text-xl font-semibold mb-3">ENLACE SISTEMA DE CONFIGURACIÓN COOKIES UTILIZADO EN LA WEB</h3>
          <p className="mb-4">
            Tiene la opción de impedir el almacenamiento de cookies utilizando las opciones de configuración de su navegador. Asimismo, puede ajustar su navegador para que le notifique cuando un servidor intente guardar una cookie.
          </p>
          <ul className="list-disc list-inside ml-4 mb-4 space-y-3">
            <li>
              {t("legal.cookies.sections.9.browserInstructions.ie")}
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
              {t("legal.cookies.sections.9.browserInstructions.firefox")}{" "}
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
              {t("legal.cookies.sections.9.browserInstructions.chrome")}{" "}
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
              {t("legal.cookies.sections.9.browserInstructions.opera")}{" "}
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
              {t("legal.cookies.sections.9.browserInstructions.safari")}{" "}
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
          <h2 className="text-2xl font-semibold mb-4">{t("legal.cookies.sections.10.title")}</h2>
          <p className="mb-4">
            <Trans
              i18nKey="legal.cookies.sections.10.content"
              components={{ link: <a href={privacyPath} className="text-bivo-green hover:underline" /> }}
            />
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
    </div>
  </Layout>
  );
};

export default CookiePolicy;
