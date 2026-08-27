import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
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

  const sectionTitle = (index: number) => {
    const number = t(`legal.cookies.sections.${index}.number`);
    const title = t(`legal.cookies.sections.${index}.title`);
    return `${number}. ${title}`;
  };

  return (
  <Layout>
    <div className="min-h-screen bg-white text-black pt-28 pb-16 px-4 sm:px-6 md:px-8 lg:px-12 w-full min-w-0 box-border">
      <div className="max-w-3xl mx-auto w-full min-w-0 [&_a]:break-all">
        <h1 className="text-3xl font-bold mb-6">{t("legal.cookies.heading")}</h1>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">{sectionTitle(0)}</h2>
          <p className="mb-4">
            La presente Política de Cookies forma parte de los textos legales de Bivo Training S.L. y regula el uso de cookies y tecnologías similares en los sitios web y plataformas web titularidad de Bivo Training S.L. (en adelante, conjuntamente, los “Sitios Web”), incluyendo el sitio web general de BIVO TRAINING, las webs específicas asociadas a los diferentes deportes y la plataforma web BIVO COACH.
          </p>
          <p className="mb-4">
            El objetivo de esta Política es informar al Usuario de forma clara y transparente sobre qué son las cookies, qué tipos de cookies pueden utilizarse, con qué finalidad y cómo puede gestionarlas.
          </p>
          <p className="mb-4">
            La utilización de cookies y tecnologías similares se realizará conforme a la normativa aplicable y a las preferencias manifestadas por el Usuario a través del correspondiente panel de configuración de cookies.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">{sectionTitle(1)}</h2>
          <p className="mb-4">
            Las cookies son pequeños archivos que se descargan y almacenan en el dispositivo del Usuario cuando accede a determinados sitios web.
          </p>
          <p className="mb-4">
            Las cookies permiten, entre otras finalidades, recordar información sobre los hábitos de navegación del Usuario o de su dispositivo y, dependiendo de la información que contengan y de la forma en que se utilice el dispositivo, pueden utilizarse para reconocer al Usuario.
          </p>
          <p className="mb-4">
            Las cookies pueden ser propias, cuando son gestionadas directamente por Bivo Training S.L., o de terceros, cuando son gestionadas por proveedores externos.
          </p>
          <p className="mb-4">
            Asimismo, pueden ser cookies de sesión, que se eliminan al cerrar el navegador, o persistentes, que permanecen almacenadas durante un periodo determinado.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">{sectionTitle(2)}</h2>
          <p className="mb-4">
            Los Sitios Web podrán utilizar las siguientes categorías de cookies:
          </p>

          <h3 className="text-xl font-semibold mb-3">Cookies estrictamente necesarias</h3>
          <p className="mb-4">
            Son aquellas necesarias para el correcto funcionamiento de los Sitios Web y para permitir al Usuario navegar y utilizar sus funcionalidades.
          </p>
          <p className="mb-4">
            Estas cookies pueden utilizarse, entre otras finalidades, para gestionar sesiones, garantizar la seguridad, recordar determinadas configuraciones o gestionar las preferencias de consentimiento del Usuario.
          </p>
          <p className="mb-6">
            Al ser necesarias para el funcionamiento de los Sitios Web, no requieren consentimiento cuando concurran los requisitos establecidos por la normativa aplicable.
          </p>

          <h3 className="text-xl font-semibold mb-3">Cookies de funcionalidad</h3>
          <p className="mb-4">
            Permiten recordar determinadas preferencias del Usuario y mejorar la funcionalidad y personalización de los Sitios Web.
          </p>
          <p className="mb-4">
            Estas cookies pueden utilizarse, por ejemplo, para recordar configuraciones, preferencias o determinadas opciones seleccionadas previamente por el Usuario.
          </p>
          <p className="mb-6">
            Cuando conforme a la normativa aplicable resulte necesario obtener el consentimiento para su utilización, dichas cookies únicamente se instalarán después de que el Usuario haya prestado dicho consentimiento.
          </p>

          <h3 className="text-xl font-semibold mb-3">Cookies de análisis o rendimiento</h3>
          <p className="mb-4">
            Permiten analizar cómo utilizan los Usuarios los Sitios Web y obtener información estadística sobre su funcionamiento.
          </p>
          <p className="mb-4">
            La información obtenida permite conocer, entre otros aspectos, qué secciones son más utilizadas, cómo interactúan los Usuarios con los Sitios Web y detectar posibles errores o áreas de mejora.
          </p>
          <p className="mb-4">
            Bivo Training S.L. podrá utilizar para estas finalidades servicios de terceros, como Google Analytics u otras herramientas equivalentes.
          </p>
          <p className="mb-6">
            Cuando estas cookies requieran consentimiento conforme a la normativa aplicable, únicamente se utilizarán después de que el Usuario haya prestado dicho consentimiento.
          </p>

          <h3 className="text-xl font-semibold mb-3">Cookies de publicidad y medición</h3>
          <p className="mb-4">
            Estas cookies permiten medir la eficacia de campañas publicitarias y, cuando corresponda, mostrar publicidad adaptada a los intereses del Usuario.
          </p>
          <p className="mb-4">
            Bivo Training S.L. podrá utilizar herramientas de terceros, como las proporcionadas por Meta Platforms u otros proveedores equivalentes, para analizar conversiones, medir campañas publicitarias o realizar otras funcionalidades relacionadas con publicidad y marketing.
          </p>
          <p className="mb-4">
            Estas cookies únicamente se utilizarán cuando exista una base jurídica válida y, cuando resulte necesario, después de haber obtenido el consentimiento del Usuario.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">{sectionTitle(3)}</h2>
          <p className="mb-4">
            Los Sitios Web podrán utilizar, entre otras, las siguientes cookies y tecnologías:
          </p>

          <h3 className="text-xl font-semibold mb-3">Google Analytics</h3>
          <ul className="list-disc list-inside ml-4 mb-4 space-y-1">
            <li>_ga</li>
            <li>_ga_*</li>
            <li>_gid</li>
          </ul>
          <p className="mb-6">
            Estas cookies permiten obtener información estadística sobre el uso de los Sitios Web y analizar la interacción de los Usuarios con los mismos.
          </p>

          <h3 className="text-xl font-semibold mb-3">Meta</h3>
          <ul className="list-disc list-inside ml-4 mb-4 space-y-1">
            <li>_fbp</li>
            <li>_fbc</li>
            <li>fr</li>
          </ul>
          <p className="mb-6">
            Estas cookies pueden utilizarse para medir la eficacia de campañas publicitarias, analizar conversiones y realizar funciones relacionadas con publicidad y marketing.
          </p>

          <h3 className="text-xl font-semibold mb-3">Gestión del consentimiento</h3>
          <p className="mb-4">
            Los Sitios Web podrán utilizar almacenamiento local del navegador (localStorage) u otras tecnologías equivalentes para guardar las preferencias del Usuario respecto al uso de cookies.
          </p>
          <p className="mb-4">
            La utilización concreta de estas cookies o tecnologías podrá variar en función del Sitio Web, las funcionalidades disponibles y los proveedores tecnológicos utilizados en cada momento.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">{sectionTitle(4)}</h2>
          <p className="mb-4">
            Las cookies serán conservadas durante el periodo necesario para cumplir con las finalidades para las que fueron instaladas.
          </p>
          <p className="mb-4">
            La duración podrá variar dependiendo de si se trata de cookies de sesión o persistentes y de las características de cada proveedor.
          </p>
          <p className="mb-4">
            Las cookies de sesión se eliminan normalmente cuando el Usuario cierra el navegador, mientras que las cookies persistentes pueden permanecer almacenadas durante el periodo establecido para cada una de ellas.
          </p>
          <p className="mb-4">
            El Usuario podrá eliminar las cookies en cualquier momento desde la configuración de su navegador.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">{sectionTitle(5)}</h2>
          <p className="mb-4">
            Determinadas cookies utilizadas en los Sitios Web pueden ser gestionadas por terceros que prestan servicios tecnológicos, analíticos o publicitarios a Bivo Training S.L.
          </p>
          <p className="mb-4">
            Cuando estos proveedores traten datos fuera del Espacio Económico Europeo (EEE), las transferencias internacionales de datos se realizarán conforme a las garantías previstas por la normativa aplicable en materia de protección de datos.
          </p>
          <p className="mb-4">
            Estas garantías podrán incluir decisiones de adecuación de la Comisión Europea, cláusulas contractuales tipo u otros mecanismos legalmente reconocidos.
          </p>
          <p className="mb-4">
            Para obtener información adicional sobre el tratamiento de datos realizado por estos proveedores, el Usuario podrá consultar sus respectivas políticas de privacidad y cookies.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">{sectionTitle(6)}</h2>
          <p className="mb-4">
            Al acceder a los Sitios Web, el Usuario podrá gestionar sus preferencias sobre cookies mediante el correspondiente banner o panel de configuración.
          </p>
          <p className="mb-2">Cuando resulte aplicable, el Usuario podrá:</p>
          <ul className="list-disc list-inside ml-4 mb-4 space-y-2">
            <li>aceptar todas las cookies;</li>
            <li>rechazar las cookies no necesarias;</li>
            <li>configurar sus preferencias por categorías;</li>
            <li>modificar posteriormente las preferencias seleccionadas.</li>
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
            La retirada del consentimiento no afectará a la licitud del tratamiento realizado previamente.
          </p>
          <p className="mb-4">
            Las cookies estrictamente necesarias para el funcionamiento de los Sitios Web podrán permanecer activas cuando no requieran consentimiento conforme a la normativa aplicable.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">{sectionTitle(7)}</h2>
          <p className="mb-4">
            El Usuario también puede permitir, bloquear o eliminar las cookies instaladas en su dispositivo mediante la configuración del navegador utilizado.
          </p>
          <p className="mb-4">
            La desactivación de determinadas cookies puede provocar que algunas funcionalidades de los Sitios Web no estén disponibles o no funcionen correctamente.
          </p>
          <p className="mb-4">
            Los procedimientos para gestionar las cookies pueden variar dependiendo del navegador y dispositivo utilizado.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">{sectionTitle(8)}</h2>
          <p className="mb-4">
            Cuando la utilización de cookies o tecnologías similares implique el tratamiento de datos personales, dicho tratamiento se realizará conforme a lo establecido en la{" "}
            <a href={privacyPath} className="text-bivo-green hover:underline">Política de Privacidad</a>
            {" "}de Bivo Training S.L.
          </p>
          <p className="mb-4">
            El Usuario podrá ejercer los derechos reconocidos por la normativa aplicable en materia de protección de datos mediante los procedimientos establecidos en dicha Política de Privacidad.
          </p>
          <p className="mb-2">Para cualquier cuestión relacionada con el uso de cookies o el tratamiento de datos personales puede contactar con:</p>
          <p className="mb-4">
            <strong>Bivo Training S.L.</strong>
            <br />
            NIF: B-22728117
            <br />
            Av. des Camp Verd, 4
            <br />
            Centre Bit Menorca (Alaior)
            <br />
            Illes Balears, España
            <br />
            <a href="mailto:hello@bivotraining.com" className="text-bivo-green hover:underline">
              hello@bivotraining.com
            </a>
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">{sectionTitle(9)}</h2>
          <p className="mb-4">
            Bivo Training S.L. podrá modificar la presente Política de Cookies para adaptarla a cambios legislativos, jurisprudenciales, técnicos o relacionados con los servicios ofrecidos.
          </p>
          <p className="mb-4">
            Cuando los cambios sean relevantes, se informará al Usuario por los medios que resulten adecuados conforme a la normativa aplicable.
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
