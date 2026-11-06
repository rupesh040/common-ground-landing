export interface NavLink {
  name: string;
  href: string;
  active?: boolean;
}

export interface ButtonLink {
  text: string;
  href: string;
}

export interface TextLink {
  text: string;
  href: string;
}

export interface HeaderLogo {
  name: string;
  dot: string;
  subtitle?: string;
  image?: string;
}

export interface CommonGroundHeader1Data {
  logo: HeaderLogo;
  navLinks: NavLink[];
  button: ButtonLink;
}

export interface CircularBadgeData {
  curvedText: string;
  icon: string;
  badgeText?: string;
}

export interface CommonGroundHero1Data {
  bgColor?: string;
  breadcrumb?: string;
  eyebrow?: string;
  headingPart1: string;
  headingPart2: string;
  description?: string;
  primaryButton: ButtonLink;
  secondaryButton?: ButtonLink;
  image: string;
  circularBadge: CircularBadgeData;
}

export interface AboutCardItem {
  id?: string;
  tag: string;
  stepNumber?: string;
  icon?: string;
  title: string;
  description: string;
  bottomTag?: string;
  badges?: string[];
  href?: string;
}

export interface CommonGroundAbout1Data {
  id?: string;
  breadcrumb?: string;
  eyebrow?: string;
  tagline?: string;
  missionTag?: string;
  headingPart1: string;
  headingPart2?: string;
  headingItalic?: string;
  cards?: AboutCardItem[];
  bgColor?: string;
  paragraphs?: string[];
}

export interface CauseItem {
  id: string;
  category: string;
  title: string;
  description: string;
  image: string;
  linkText: string;
  href: string;
  tagIcon?: string;
}

export interface CommonGroundCauses1Data {
  eyebrow: string;
  headingPart1: string;
  headingItalic: string;
  items: CauseItem[];
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface CommonGroundFAQ1Data {
  eyebrow: string;
  headingPart1: string;
  headingItalic: string;
  items: FAQItem[];
}

export interface FooterColumn {
  title: string;
  links: NavLink[];
}

export interface SocialLink {
  name: string;
  href: string;
  icon: string;
}

export interface FooterContactData {
  title?: string;
  email: string;
  phone: string;
  address: string;
}

export interface CommonGroundFooter1Data {
  logo: {
    name: string;
    dot: string;
    tagline?: string;
    image?: string;
  };
  columns: FooterColumn[];
  contact?: FooterContactData;
  social: SocialLink[];
  copyright: string;
  backToTopText: string;
}

export interface TeamMemberRole {
  id: string;
  name?: string;
  position?: string;
  initials: string;
  roleTag: string;
  title: string;
  bgVariant: "sage" | "olive" | "cream";
  image?: string;
}

export interface TeamSectionData {
  eyebrow: string;
  headingPart1: string;
  headingItalic: string;
  subtitleNote: string;
  roles: TeamMemberRole[];
  calloutCard?: {
    eyebrow: string;
    headingPart1: string;
    headingItalic: string;
    description: string;
    button: ButtonLink;
    sideQuotePart1: string;
    sideQuoteItalic: string;
  };
}

export interface GalleryItem {
  id: string;
  category?: string;
  title?: string;
  subtitle?: string;
  image: string;
}

export interface GallerySectionData {
  eyebrow?: string;
  headingPart1?: string;
  headingItalic?: string;
  subtitle?: string;
  items: GalleryItem[];
}

export interface ContactDetailInfo {
  icon?: string;
  label: string;
  value: string;
  href?: string;
  note?: string;
}

export interface ContactSectionData {
  leftEyebrow: string;
  leftHeadingPart1: string;
  leftHeadingItalic: string;
  leftDescription: string;
  contactDetails?: ContactDetailInfo[];
  formEyebrow: string;
  formHeadingPart1: string;
  formHeadingItalic: string;
  formNotice: string;
  formSubjects: string[];
  submitButtonText: string;
}

export interface SectionVariants {
  Header: {
    variants: {
      CommonGroundHeader1: CommonGroundHeader1Data;
      [key: string]: unknown;
    };
  };
  Hero: {
    variants: {
      CommonGroundHero1: CommonGroundHero1Data;
      [key: string]: unknown;
    };
  };
  About: {
    variants: {
      CommonGroundAbout1: CommonGroundAbout1Data;
      [key: string]: unknown;
    };
  };
  Causes: {
    variants: {
      CommonGroundCauses1: CommonGroundCauses1Data;
      [key: string]: unknown;
    };
  };
  TeamSection?: {
    variants: {
      CommonGroundTeam1: TeamSectionData;
      [key: string]: unknown;
    };
  };
  GallerySection?: {
    variants: {
      CommonGroundGallery1: GallerySectionData;
      [key: string]: unknown;
    };
  };
  FAQ: {
    variants: {
      CommonGroundFAQ1: CommonGroundFAQ1Data;
      [key: string]: unknown;
    };
  };
  ContactSection?: {
    variants: {
      CommonGroundContact1: ContactSectionData;
      [key: string]: unknown;
    };
  };
  Footer: {
    variants: {
      CommonGroundFooter1: CommonGroundFooter1Data;
      [key: string]: unknown;
    };
  };
  [key: string]: unknown;
}

export interface PageComponentRef {
  key: string;
  component: string;
}

export interface TemplatePageConfig {
  components: PageComponentRef[];
}

export interface SharedComponentsConfig {
  Header: string;
  Footer: string;
  [key: string]: string;
}

export interface TemplateComponentsConfig {
  shared: SharedComponentsConfig;
  pages: {
    home: TemplatePageConfig;
    [pageKey: string]: TemplatePageConfig | undefined;
  };
}

export interface PageMetadataItem {
  title: string;
  description: string;
}

export interface SiteMetadataConfig {
  site: PageMetadataItem;
  pages?: Record<string, PageMetadataItem>;
}

export interface SiteTemplate {
  templateComponents: {
    "template-1": TemplateComponentsConfig;
    [templateKey: string]: TemplateComponentsConfig;
  };
  metadata?: SiteMetadataConfig;
  sections: SectionVariants;
}

export interface ContentRoot {
  CommonGround?: SiteTemplate;
  [siteKey: string]: SiteTemplate | undefined;
}
