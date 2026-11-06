import rawJson from "@/data/content.json";
import type {
  ContentRoot,
  SiteTemplate,
  TemplateComponentsConfig,
  PageComponentRef,
  CommonGroundHeader1Data,
  CommonGroundHero1Data,
  CommonGroundAbout1Data,
  CommonGroundCauses1Data,
  TeamSectionData,
  TestimonialSectionData,
  TestimonialItem,
  CommonGroundFAQ1Data,
  ContactSectionData,
  CommonGroundFooter1Data,
  PageMetadataItem,
} from "@/types/content";

export const contentData = rawJson as unknown as ContentRoot;

export function getSiteTemplate(siteKey = "CommonGround"): SiteTemplate {
  const template =
    contentData[siteKey] || contentData.CommonGround || Object.values(contentData)[0];
  if (!template) {
    throw new Error(`Site template '${siteKey}' not found in content.json`);
  }
  return template;
}

export function getTemplateConfig(
  siteKey = "CommonGround",
  templateId = "template-1"
): TemplateComponentsConfig {
  const site = getSiteTemplate(siteKey);
  const config = site.templateComponents[templateId];
  if (!config) {
    throw new Error(`Template configuration '${templateId}' not found`);
  }
  return config;
}

export function getPageComponents(
  pageKey: string,
  siteKey = "CommonGround",
  templateId = "template-1"
): PageComponentRef[] {
  const config = getTemplateConfig(siteKey, templateId);
  const page = config.pages[pageKey];
  return page?.components || [];
}

export function getHomePageComponents(): PageComponentRef[] {
  return getPageComponents("home");
}

export function getSectionData<T>(
  sectionKey: string,
  variantKey?: string,
  siteKey = "CommonGround"
): T {
  const site = getSiteTemplate(siteKey);
  const section = site.sections[sectionKey] as { variants?: Record<string, unknown> } | undefined;
  if (!section || !section.variants) {
    throw new Error(`Section '${sectionKey}' not found in content.json`);
  }

  const selectedVariant = variantKey
    ? section.variants[variantKey]
    : Object.values(section.variants)[0];

  if (!selectedVariant) {
    throw new Error(`Variant '${variantKey}' not found for section '${sectionKey}'`);
  }

  return selectedVariant as T;
}

export function getSharedSectionData<T>(
  sharedKey: "Header" | "Footer",
  siteKey = "CommonGround",
  templateId = "template-1"
): T {
  const config = getTemplateConfig(siteKey, templateId);
  const variantName = config.shared[sharedKey];
  return getSectionData<T>(sharedKey, variantName, siteKey);
}

export function getSiteMetadata(): PageMetadataItem {
  const site = getSiteTemplate();
  return (
    site.metadata?.site || {
      title: "Common Ground | Planting hope, growing change",
      description:
        "A better world starts with us. Seeking justice, nurturing peace, and empowering communities through grassroots action.",
    }
  );
}

export const headerData: CommonGroundHeader1Data =
  getSharedSectionData<CommonGroundHeader1Data>("Header");

export const heroData: CommonGroundHero1Data =
  getSectionData<CommonGroundHero1Data>("Hero", "CommonGroundHero1");

export const aboutData: CommonGroundAbout1Data =
  getSectionData<CommonGroundAbout1Data>("About", "CommonGroundAbout1");

export const causesData: CommonGroundCauses1Data =
  getSectionData<CommonGroundCauses1Data>("Causes", "CommonGroundCauses1");

export const teamSectionData: TeamSectionData =
  getSectionData<TeamSectionData>("TeamSection", "CommonGroundTeam1");

export const testimonialSectionData: TestimonialSectionData =
  getSectionData<TestimonialSectionData>(
    "TestimonialSection",
    "CommonGroundTestimonial1"
  );

export const faqData: CommonGroundFAQ1Data =
  getSectionData<CommonGroundFAQ1Data>("FAQ", "CommonGroundFAQ1");

export const contactSectionData: ContactSectionData =
  getSectionData<ContactSectionData>("ContactSection", "CommonGroundContact1");

export const footerData: CommonGroundFooter1Data =
  getSharedSectionData<CommonGroundFooter1Data>("Footer");

export const homePageComponentsList: PageComponentRef[] =
  getHomePageComponents();
