import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles, FlaskConical, Globe2, Cog, Zap, Gauge, Camera,
  ScanLine, Radiation, Orbit, X, Check, Telescope, BookOpen,
  ArrowRight, ExternalLink
} from "lucide-react";

const countries = [
  { flag: "🇩🇪", name: "Alemania", text: "Unificación en 1871, inversión en universidades y liderazgo creciente en física experimental." },
  { flag: "🇫🇷", name: "Francia", text: "Tradición científica, prestigio académico e interés por la electricidad, la radiación y la luminiscencia." },
  { flag: "🇬🇧", name: "Reino Unido", text: "Revolución industrial, desarrollo tecnológico y especial atención a la instrumentación." },
  { flag: "🇺🇸", name: "Estados Unidos", text: "Crecimiento industrial, financiación privada, nuevos laboratorios y aplicaciones prácticas." }
];

const tools = [
  { Icon: Zap, name: "Bobina de Ruhmkorff", text: "Generaba tensiones mucho mayores que las pilas convencionales y producía descargas eléctricas intensas." },
  { Icon: Gauge, name: "Bombas de vacío", text: "Permitieron alcanzar presiones más bajas, esenciales para estudiar las descargas en gases." },
  { Icon: Camera, name: "La fotografía", text: "Registró efectos invisibles para el ojo y convirtió observaciones fugaces en evidencias comparables." }
];

const timeline = [
  { year: "1870–1890", type: "context", eyebrow: "LA PREGUNTA", title: "Tubos de vacío y rayos catódicos", text: "Al aplicar alta tensión a gases a muy baja presión, el vidrio emitía un resplandor. La naturaleza de aquellos rayos seguía abierta a discusión.", evidence: "La combinación de electricidad, vacío y fluorescencia creó un nuevo territorio experimental.", image: "/timeline/01-tubos-crookes.png", alt: "Laboratorio histórico con tubo de Crookes iluminado" },
  { year: "1895", type: "xray", eyebrow: "VER SIN ABRIR", title: "Röntgen descubre los rayos X", text: "Una pantalla fluorescente brilló cerca de un tubo cubierto. Röntgen comprobó que una radiación desconocida atravesaba materiales opacos.", evidence: "La mano de Anna Bertha Röntgen reveló que tejidos, huesos y metales absorbían los rayos de forma diferente.", image: "/timeline/02-rontgen-rayos-x.jpg", alt: "Radiografía de una mano con anillo y equipo de rayos X" },
  { year: "1896", type: "radio", eyebrow: "LA MATERIA EMITE", title: "Becquerel observa una emisión espontánea", text: "Las sales de uranio velaron una placa fotográfica envuelta, incluso sin recibir luz solar. La emisión procedía del propio material.", evidence: "La observación inesperada desafió la relación supuesta entre fluorescencia y rayos X.", image: "/timeline/03-becquerel-uranio.jpg", alt: "Mineral de uranio y placa fotográfica velada" },
  { year: "1898", type: "radio", eyebrow: "MEDIR PARA DESCUBRIR", title: "Marie y Pierre Curie amplían el fenómeno", text: "Las mediciones de la pechblenda condujeron al anuncio del polonio y del radio. Marie Curie acuñó el término radiactividad.", evidence: "La radiactividad comenzó a interpretarse como propiedad del átomo, no como reacción química ordinaria.", image: "/timeline/04-curie-radio.jpg", alt: "Laboratorio histórico dedicado al estudio de la radiactividad" },
  { year: "1896–1908", type: "aurora", eyebrow: "DEL LABORATORIO AL CIELO", title: "Birkeland modeliza las auroras", text: "Con la terrella, una esfera magnetizada en una cámara, Birkeland investigó cómo partículas cargadas podían dirigirse hacia los polos.", evidence: "El modelo conectó descargas, magnetismo y luminiscencia, aunque las auroras no son rayos X ni radiactividad.", image: "/timeline/05-birkeland-auroras.jpg", alt: "Auroras y campo magnético terrestre" },
  { year: "1934", type: "women", eyebrow: "DE OBSERVAR A PRODUCIR", title: "Irène y Frédéric Joliot-Curie crean radiactividad artificial", text: "Tras bombardear elementos estables, obtuvieron núcleos que continuaban emitiendo después de retirar la fuente.", evidence: "El hallazgo abrió la producción controlada de radioisótopos para investigación y medicina.", image: "/timeline/06-joliot-radioactividad.jpg", alt: "Representación de un núcleo sometido a bombardeo de partículas" },
  { year: "1938–1939", type: "women", eyebrow: "EL NÚCLEO SE DIVIDE", title: "Meitner y Frisch explican la fisión", text: "Lise Meitner y Otto Frisch interpretaron los resultados de Hahn y Strassmann como una división del núcleo pesado.", evidence: "Este hito amplió la física nuclear, pero no debe confundirse con el descubrimiento inicial de la radiactividad.", image: "/timeline/07-meitner-fision.jpg", alt: "Representación visual de una transformación nuclear" }
];

const women = [
  { initials: "MC", date: "1898–1911", name: "Marie Skłodowska Curie", lead: "Convirtió una observación en un programa cuantitativo de investigación.", detail: "Acuñó «radiactividad», estudió sistemáticamente minerales y recibió los Nobel de Física de 1903 y Química de 1911." },
  { initials: "IJ", date: "1934–1935", name: "Irène Joliot-Curie", lead: "Demostró que podían producirse radioisótopos en el laboratorio.", detail: "Junto con Frédéric Joliot-Curie descubrió la radiactividad artificial y recibió el Nobel de Química de 1935." },
  { initials: "LM", date: "1938–1939", name: "Lise Meitner", lead: "Explicó físicamente la fisión nuclear.", detail: "Con Otto Frisch interpretó la fragmentación del núcleo y calculó la enorme energía liberada. El Nobel de 1944 fue concedido solo a Otto Hahn." }
];

const myths = [
  { myth: "Toda radiación es artificial", fact: "Existe radiación natural procedente del espacio, el suelo, el aire y radionúclidos presentes en los seres vivos." },
  { myth: "Una radiografía te vuelve radiactivo", fact: "Los rayos X atraviesan el cuerpo durante la exposición, pero no dejan una fuente radiactiva dentro del paciente." },
  { myth: "Rayos X y radiactividad son lo mismo", fact: "Los rayos X son fotones generados principalmente por procesos electrónicos. La radiactividad es una transformación del núcleo." },
  { myth: "Las auroras son reflejos del Sol en el hielo", fact: "Son emisiones de luz de la alta atmósfera tras la excitación de átomos y moléculas por partículas energéticas." }
];

const colors = { context: "#f4bd43", xray: "#58e5ff", radio: "#75ff7a", aurora: "#eb66ff", women: "#ff63a9" };

function TimelineItem({ item, index }) {
  return <motion.article
    initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: .2 }}
    className={`timeline-item ${index % 2 ? "right" : "left"}`}
    style={{ "--node": colors[item.type] }}>
    <div className="timeline-card">
      <div className="timeline-image-wrap"><img src={item.image} alt={item.alt} /><div className="image-tint" /></div>
      <div className="timeline-copy">
        <div className="year">{item.year}</div>
        <div className="timeline-eyebrow">{item.eyebrow}</div>
        <h3>{item.title}</h3>
        <p>{item.text}</p>
        <div className="evidence"><strong>LA EVIDENCIA QUE CAMBIÓ LA HISTORIA</strong><p>{item.evidence}</p></div>
      </div>
    </div>
  </motion.article>;
}

function WomanCard({ item }) {
  const [flipped, setFlipped] = useState(false);
  return <button className="woman-shell" onClick={() => setFlipped(!flipped)} aria-label={`Ampliar información de ${item.name}`}>
    <div className={`woman-card ${flipped ? "flipped" : ""}`}>
      <div className="woman-face front"><span>{item.date}</span><div className="portrait">{item.initials}</div><h3>{item.name}</h3><p>{item.lead}</p><b>GIRAR PARA AMPLIAR</b></div>
      <div className="woman-face back"><span>APORTACIÓN</span><h3>{item.name}</h3><p>{item.detail}</p><b>VOLVER</b></div>
    </div>
  </button>;
}

export default function App() {
  const [openMyth, setOpenMyth] = useState(null);
  return <main>
    <nav className="topnav"><a className="brand" href="#inicio">EI</a><div><a href="#contexto">Contexto</a><a href="#historia">Historia</a><a href="#mujeres">Científicas</a><a href="#mitos">Mitos</a><a href="#cosmos">Cosmos</a></div></nav>

    <section id="inicio" className="hero">
      <img src="/hero-espectro.png" alt="Composición sobre rayos X, radiactividad y auroras" />
      <div className="hero-overlay" />
      <div className="hero-copy"><p className="overline"><Sparkles size={17}/> HISTORIA DE LA CIENCIA · 4.º ESO</p><h1>El espectro<br/><em>invisible</em></h1><h2>Rayos X, radiactividad y el fuego del cielo</h2><p>Una historia de instrumentos nuevos, placas veladas, luz en la oscuridad y evidencias que transformaron nuestra idea de la materia.</p><a className="cta" href="#contexto">Iniciar el recorrido <ArrowRight size={18}/></a></div>
      <div className="legend"><span className="cyan">RAYOS X</span><span className="green">RADIACTIVIDAD</span><span className="magenta">AURORAS</span></div>
    </section>

    <section id="contexto" className="context-section">
      <div className="context-intro"><div><p className="gold-label"><FlaskConical/> EL CONTEXTO HISTÓRICO</p><h2>Cuando el laboratorio<br/>comenzó a brillar</h2></div><p>A finales del siglo XIX, la electricidad, el vacío y la fotografía ampliaron los sentidos de la ciencia. Los rayos catódicos abrieron una puerta a fenómenos invisibles, pero no condujeron a una explicación única: rayos X, radiactividad y auroras tienen conexiones históricas, aunque su origen físico es diferente.</p></div>
      <div className="context-grid">
        <article className="context-panel countries"><div className="panel-title"><Globe2/><div><h3>UN MUNDO EN TRANSFORMACIÓN</h3><p>La situación de varios países condicionó las preguntas, instituciones y recursos disponibles.</p></div></div><div className="country-grid">{countries.map(c => <div className="country" key={c.name}><div className="flag">{c.flag}</div><h4>{c.name}</h4><p>{c.text}</p></div>)}</div></article>
        <article className="context-panel tools"><div className="panel-title"><Cog/><div><h3>NUEVAS HERRAMIENTAS, NUEVAS PREGUNTAS</h3><p>Los avances instrumentales permitieron explorar fenómenos antes inaccesibles.</p></div></div><div className="tool-grid">{tools.map(({Icon, name, text}) => <div className="tool" key={name}><div className="tool-icon"><Icon/></div><h4>{name}</h4><p>{text}</p></div>)}</div></article>
      </div>
      <div className="context-result"><strong>UN TERRENO FÉRTIL PARA GRANDES DESCUBRIMIENTOS</strong><p>Nuevos laboratorios, instrumentos más potentes, redes internacionales y preguntas sin respuesta crearon el contexto adecuado para investigar la radiación.</p></div>
    </section>

    <section id="historia" className="history-section"><div className="section-heading"><p>1870–1939</p><h2>La carrera por desvelar lo invisible</h2><span>Una línea temporal visual: cada hito muestra experimento, hallazgo y cambio conceptual sin ocultar información.</span></div><div className="timeline"><div className="beam" />{timeline.map((item, i) => <TimelineItem key={item.year + item.title} item={item} index={i}/>)}</div></section>

    <section className="compare-section"><div className="section-heading"><p>LA FRONTERA CLAVE</p><h2>Parecidos en sus efectos, distintos en su origen</h2></div><div className="compare-grid"><article className="xray-panel"><ScanLine/><small>CIAN · PROCESOS ELECTRÓNICOS</small><h3>Rayos X</h3><p>Radiación electromagnética producida cuando electrones rápidos se frenan o cuando se reorganizan electrones internos de los átomos.</p><b>La máquina se apaga → cesa la emisión.</b></article><div className="not-same"><div>e⁻</div><strong>NO SON<br/>LO MISMO</strong><div>α β γ</div></div><article className="radio-panel"><Radiation/><small>VERDE · PROCESOS NUCLEARES</small><h3>Radiactividad</h3><p>Transformación espontánea de núcleos inestables, acompañada por emisión de partículas alfa o beta y/o radiación gamma.</p><b>La fuente emite mientras queden núcleos radiactivos.</b></article></div></section>

    <section id="mujeres" className="women-section"><div className="section-heading"><p>PERSPECTIVA DE GÉNERO</p><h2>Arquitectas de la era nuclear</h2><span>Formularon conceptos, midieron, interpretaron y abrieron nuevas líneas de investigación.</span></div><div className="women-grid">{women.map(item => <WomanCard item={item} key={item.name}/>)}</div></section>

    <section id="mitos" className="myths-section"><div className="section-heading"><p>CAMBIO CONCEPTUAL</p><h2>Romper mitos con evidencias</h2><span>Estas tarjetas sí conservan la interacción: piensa primero y después comprueba.</span></div><div className="myths-grid">{myths.map((item, i) => <button key={item.myth} onClick={() => setOpenMyth(openMyth === i ? null : i)} className={openMyth === i ? "active" : ""}><div className="myth-title"><X/><h3>“{item.myth}”</h3></div><AnimatePresence>{openMyth === i && <motion.div className="fact" initial={{height:0,opacity:0}} animate={{height:"auto",opacity:1}} exit={{height:0,opacity:0}}><Check/><p>{item.fact}</p></motion.div>}</AnimatePresence></button>)}</div></section>

    <section id="cosmos" className="cosmos-section"><div className="cosmos-art"><Orbit/><div className="earth">TIERRA</div><span>PARTÍCULAS<br/>SOLARES</span></div><div><p className="overline">EL VÍNCULO CÓSMICO</p><h2>Del tubo de cristal al cielo polar</h2><p>Los tubos de descarga y las auroras comparten una idea: partículas cargadas transfieren energía a la materia y pueden producir luz. El campo magnético terrestre guía parte de esas partículas hacia regiones polares, donde excitan gases de la alta atmósfera.</p><div className="warning"><Telescope/><p><strong>Analogía, no identidad.</strong> La Tierra no es literalmente un tubo de vacío. Las auroras no son radiactividad ni rayos X.</p></div></div></section>

    <section className="final-section"><div><p className="overline">LA IDEA QUE DEBE QUEDAR</p><h2>La ciencia avanza cuando aprende a distinguir.</h2><p>Los primeros efectos parecían semejantes: fluorescencia, placas fotográficas y luz. Nuevas pruebas permitieron separar fenómenos diferentes y construir explicaciones más precisas.</p></div><div className="challenge"><BookOpen/><small>RETO FINAL</small><h3>“No quiero una radiografía porque después emitiré radiactividad”.</h3><p>Responde en 80 palabras usando correctamente: <b>rayos X, irradiación, contaminación y radiactividad</b>.</p></div></section>

    <section className="sources"><h2>Fuentes y créditos</h2><p>Enlaces iniciales para documentar la cronología y elaborar la bibliografía en APA 7.</p><div className="source-links"><a href="https://www.nobelprize.org/prizes/physics/1901/summary/" target="_blank" rel="noreferrer">Röntgen y los rayos X <ExternalLink/></a><a href="https://www.nobelprize.org/prizes/physics/1903/summary/" target="_blank" rel="noreferrer">Becquerel y los Curie <ExternalLink/></a><a href="https://museovirtual.csic.es/coleccion/radiactividad/radio5.htm" target="_blank" rel="noreferrer">Historia de la radiactividad, CSIC <ExternalLink/></a></div><p className="credit">Visuales elaborados con Microsoft Copilot y adaptados para este recurso. Diseño y composición: elaboración propia.</p></section>
    <footer>El espectro invisible · V3 · Infografía web interactiva</footer>
  </main>;
}
