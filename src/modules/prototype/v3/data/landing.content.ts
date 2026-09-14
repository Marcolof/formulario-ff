import bannerPaqar from '@/assets/img/banner-1.webp'
import bannerPaqarAlt from '@/assets/img/banner-2.webp'
import bannerDigitales from '@/assets/img/banner-3.webp'
import bannerTitlePaqar from '@/assets/img/banner-title-1.webp'
import bannerTitleDigitales from '@/assets/img/banner-title-2.webp'
import serviceImage1 from '@/assets/img/horizontal-card-image-1.svg'
import serviceImage2 from '@/assets/img/horizontal-card-image-2.svg'
import serviceImage3 from '@/assets/img/horizontal-card-image-3.svg'
import serviceImage4 from '@/assets/img/horizontal-card-image-4.svg'
import serviceImage5 from '@/assets/img/horizontal-card-image-5.svg'
import serviceImageFulfillment from '@/assets/img/fulfillment-card.jpg'
import shortcutIconTracking from '@/assets/icons/landing-icon-1.svg'
import shortcutIconBranches from '@/assets/icons/landing-icon-2.svg'
import whyIconPrice from '@/assets/icons/landing-icon-3.svg'
import whyIconCoverage from '@/assets/icons/landing-icon-4.svg'
import whyIconSimple from '@/assets/icons/landing-icon-5.svg'
import whyIconSupport from '@/assets/icons/landing-icon-6.svg'
import iconFacebook from '@/assets/icons/icon-social-facebook.svg'
import iconInstagram from '@/assets/icons/icon-social-instagram.svg'
import iconLinkedin from '@/assets/icons/icon-social-linkedin.svg'
import iconTiktok from '@/assets/icons/icon-social-tiktok.svg'
import iconTwitter from '@/assets/icons/icon-social-twitter.svg'
import iconYoutube from '@/assets/icons/icon-social-youtube.svg'
import logoDigitales from '@/assets/logos/mis_comunicaciones_digitales.png'
import logoOficios from '@/assets/logos/logo-oficios-judiciales.svg'
import logoPaqar from '@/assets/logos/logo-paqar.svg'
import logoPuntoCorreo from '@/assets/logos/logo-punto-correo.svg'
import logoRotulador from '@/assets/logos/logo-rotulador.svg'

export const navLinks = [
  { label: 'Integraciones', href: 'https://www.correoargentino.com.ar/MiCorreo/public/primeros-pasos' },
  { label: 'Iniciar sesión', href: '/landing' },
  { label: 'Registrarme', href: '/register' },
]

/** Los anchos máximos difieren entre escritorio y mobile en la landing original. */
export const heroSlides = [
  {
    background: bannerPaqar,
    logo: logoPaqar,
    logoWidth: 200,
    logoWidthMobile: 97,
    title: bannerTitlePaqar,
    titleWidth: 330,
    titleWidthMobile: 296,
  },
  {
    background: bannerPaqarAlt,
    logo: logoPaqar,
    logoWidth: 200,
    logoWidthMobile: 97,
    title: bannerTitlePaqar,
    titleWidth: 330,
    titleWidthMobile: 296,
  },
  {
    background: bannerDigitales,
    logo: logoDigitales,
    logoWidth: 633,
    logoWidthMobile: 300,
    title: bannerTitleDigitales,
    titleWidth: 492,
    titleWidthMobile: 330,
  },
]

export type ServiceId =
  | 'paqar'
  | 'mis-comunicaciones-digitales'
  | 'punto-correo'
  | 'rotulador'
  | 'oficios-judiciales'
  | 'fulfillment'

type Service = {
  /** Identificador estable: la v2 lo usa para tomar el enlace de acá sin copiarlo. */
  id: ServiceId
  /** Logo del producto. Fulfillment todavía no tiene uno y usa `logoText`. */
  logo?: string
  logoText?: string
  /** Sólo para logos con imagen: el lockup tipográfico se ajusta al texto. */
  logoWidth?: number
  image: string
  body: string
  cta: string
  href: string
  /** Rutas dentro del prototipo: navegan con el router en vez de salir del sitio. */
  internal?: boolean
}

export const services: Service[] = [
  {
    id: 'paqar',
    logo: logoPaqar,
    logoWidth: 141,
    image: serviceImage1,
    body: 'Paq.ar es la solución logística que potencia tu eCommerce. Simplificá tus envíos y enfocate en vender con los precios más convenientes del mercado.',
    cta: 'Ingresá',
    href: '#scroll-container',
  },
  {
    id: 'mis-comunicaciones-digitales',
    logo: logoDigitales,
    logoWidth: 430,
    image: serviceImage2,
    body: 'Hacé, pagá y enviá online tus envíos postales de forma rápida y segura. Mis Comunicaciones Digitales es una plataforma de imposición electrónica con acceso web seguro que permite a los usuarios registrados imponer virtualmente sus envíos postales.',
    cta: 'Ingresá',
    href: 'https://miscomunicacionesdigitales.com.ar/',
  },
  {
    id: 'punto-correo',
    logo: logoPuntoCorreo,
    logoWidth: 211,
    image: serviceImage3,
    body: 'Transformate en un Punto Correo y mejorá tus ingresos. Sumáte a nuestra red para admitir y entregar paquetería eCommerce.',
    cta: 'Conocer más',
    href: 'https://www.correoargentino.com.ar/MiCorreo/public/puntopaqar',
  },
  {
    id: 'rotulador',
    logo: logoRotulador,
    logoWidth: 186,
    image: serviceImage4,
    body: 'Ahorrá tiempo y esfuerzo confeccionando tus etiquetas de manera rápida, precisa y profesional para luego abonarlas en cualquiera de nuestras sucursales.',
    cta: 'Generar rótulo',
    href: 'https://www.correoargentino.com.ar/MiCorreo/public/regisadic',
  },
  {
    id: 'oficios-judiciales',
    logo: logoOficios,
    logoWidth: 274,
    image: serviceImage5,
    body: 'Realizá el pago de tus Oficios Judiciales completamente online de forma simple y segura.',
    cta: 'Ingresá',
    href: 'https://www.correoargentino.com.ar/MiCorreo/public/oficiosJudiciales',
  },
  {
    id: 'fulfillment',
    // Todavía no hay logo oficial de Fulfillment: se resuelve con un lockup
    // tipográfico que replica el tratamiento de los logos existentes, hasta que
    // el cliente entregue el asset.
    logoText: 'Fulfillment',
    image: serviceImageFulfillment,
    body: 'Solución integral de almacenamiento y distribución para tu eCommerce. Nos ocupamos de todo: vos enfocate en hacer crecer tu negocio.',
    cta: 'Conocer más',
    href: '/prototipo/v3/fulfillment',
    internal: true,
  },
]

export const shortcuts = [
  {
    title: 'Seguimiento de envíos',
    icon: shortcutIconTracking,
    iconWidth: 69,
    body: 'Hacé el seguimiento de tus envíos de forma práctica y ágil.',
    cta: 'Buscar envíos',
    href: 'https://www.correoargentino.com.ar/formularios/e-commerce',
  },
  {
    title: 'Sucursales',
    icon: shortcutIconBranches,
    iconWidth: 69,
    body: 'Buscá tu sucursal más cercana y conocé todos sus servicios.',
    cta: 'Buscar sucursales',
    href: 'https://www.correoargentino.com.ar/formularios/sucursales',
  },
]

export const reasons = [
  { body: 'Tenemos el precio más bajo.', icon: whyIconPrice, width: 63, height: 98 },
  { body: '¡Llegamos a dónde los demás no llegan!', icon: whyIconCoverage, width: 87, height: 87 },
  { body: 'Simple, rápido y cómodo', icon: whyIconSimple, width: 103, height: 83 },
  { body: 'Atención personalizada.', icon: whyIconSupport, width: 70, height: 70 },
]

export const footerColumns = [
  {
    title: 'ACCESOS',
    links: [
      { label: 'Preguntas frecuentes', href: 'https://www.correoargentino.com.ar/MiCorreo/public/faqs' },
      { label: 'Términos y condiciones', href: 'https://www.correoargentino.com.ar/MiCorreo/public/terminosycondiciones' },
      { label: 'Sitio web institucional', href: 'https://www.correoargentino.com.ar' },
    ],
  },
  {
    title: 'CONTACTO',
    links: [
      { label: 'Atención al cliente', href: 'https://www.correoargentino.com.ar/MiCorreo/public/contacto' },
    ],
  },
]

export const socialLinks = [
  { label: 'Facebook', icon: iconFacebook, href: 'https://www.facebook.com/CorreoOficialSA' },
  { label: 'Instagram', icon: iconInstagram, href: 'https://www.instagram.com/correooficialsa' },
  { label: 'Twitter', icon: iconTwitter, href: 'https://x.com/CorreoOficialSA' },
  { label: 'TikTok', icon: iconTiktok, href: 'https://www.tiktok.com/@correooficialsa' },
  { label: 'YouTube', icon: iconYoutube, href: 'https://www.youtube.com/c/CorreoOficialSA' },
  { label: 'Linkedin', icon: iconLinkedin, href: 'https://www.linkedin.com/company/correo-argentino' },
]
