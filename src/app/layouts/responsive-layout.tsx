import Header from "@/components/header";
import ColSection from "@/components/col-section";
import SmallHeader from "@/components/small-header";

import Grid from "@/components/grid";
import HBorder from "@/components/h-border";
import GradientBackground from "@/components/gradient-background";
import {
  TextSection,
  TextSectionTitle,
  TextSectionContent,
} from "@/components/text-section";
import { InstagramButton, LinkedInButton } from "@/components/social-button";
import Link from "next/link";

interface FaqItem {
  question: string;
  answer: string;
  hasLink?: boolean;
  linkText?: string;
  linkUrl?: string;
}

type FaqData = Record<string, FaqItem[]>;
import _faqData from "@/data/faq.json";
const faqData: FaqData = _faqData;

const renderFaqAnswer = (faqItem: FaqItem) => {
  if (faqItem.hasLink && faqItem.linkText && faqItem.linkUrl) {
    const parts = faqItem.answer.split(faqItem.linkText);
    return (
      <>
        {parts[0]}
        <Link
          href={faqItem.linkUrl}
          className="text-cyan-300 hover:text-cyan-200 gradient-text"
        >
          {faqItem.linkText}
        </Link>
        {parts[1]}
      </>
    );
  }
  return faqItem.answer;
};

export default function ResponsiveLayout() {
  return (
    <>
      {/* First Screen */}
      <div className="relative">
        <div className="relative flex min-h-screen flex-col">
          {/* Header */}
          <div className="desktop:block hidden">
            <Header />
          </div>
          <div className="desktop:hidden block">
            <SmallHeader />
          </div>

          {/* Background Elements */}
          <div className="-z-20">
            <Grid />
          </div>
          <div className="black-screen" />
          <GradientBackground />

          <HBorder />

          {/* Main Content */}
          <div className="desktop:p-[64px] flex flex-1 flex-col items-start justify-between gap-8 p-6 text-left text-white">
            {/* Desktop Layout */}
            <div className="hidden desktop:flex desktop:flex-col desktop:gap-8 desktop:w-full">
              <img
                src="whitetext.png"
                alt="hack404 big label"
                className="h-auto w-full"
              />
              <div className="flex items-start justify-between self-stretch mb-4">
                <ColSection width={1}>
                  <img src="whitesmall.png" alt="" className="h-auto w-14" />
                </ColSection>
                <ColSection width={2}>
                  <p className="size-5 w-full">
                    A 36-hour hackathon based in Toronto where secondary and
                    post-secondary students, from first-time hackers to seasoned
                    builders, team up to solve real-world problems and shape
                    tomorrow&apos;s technology.
                  </p>
                </ColSection>
                <ColSection width={1} />
                <ColSection width={1}></ColSection>
              </div>
              <div className="flex items-start self-stretch">
                <ColSection width={1} offset="1.5rem">
                  July 4 - 6, 2025
                </ColSection>
                <ColSection
                  width={1}
                  offset="1.5rem"
                  className="hidden tablet:flex"
                >
                  Myhal Centre for Engineering Innovation and Entrepreneurship
                  <br />
                  55 St George St
                  <br />
                  Toronto, Ontario
                </ColSection>
                <ColSection width={1} offset="1.5rem" />
                <ColSection width={1} offset="1.5rem" />
                <ColSection width={1}>
                  <p className="text-right">
                    Presented by <br />
                    Power Unit Youth Organization x UTMIST
                  </p>
                </ColSection>
              </div>
            </div>

            {/* Mobile/Tablet Layout */}
            <div className="desktop:hidden flex flex-col gap-8 w-full">
              <img
                src="whitetext.png"
                alt="hack404 big label"
                className="h-auto w-full"
              />

              <div className="self-stretch">
                <p className="text-justify text-white text-base font-extralight font-['DM_Sans'] leading-none">
                  A 36-hour hackathon based in Toronto where secondary and
                  post-secondary students, from first-time hackers to seasoned
                  builders, team up to solve real-world problems and shape
                  tomorrow&apos;s technology.
                </p>
              </div>

              <div className="self-stretch">
                <p className="text-right text-white text-base font-normal font-['DM_Sans'] leading-none">
                  Presented by
                  <br />
                  Power Unit Youth Organization x UTMIST
                </p>
              </div>

              <div className="self-stretch flex justify-between items-start">
                <div className="flex-1">
                  <p className="text-white text-base font-normal font-['DM_Sans'] leading-none">
                    July 4 - 6, 2025
                  </p>
                </div>
                <div className="flex-1 text-right">
                  <p className="text-white text-base font-normal font-['DM_Sans'] leading-none">
                    Greater Toronto Area
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Banner Image */}
          <div className="relative w-full overflow-hidden h-auto px-6 pb-[70px] desktop:px-16">
            <img
              src="https://images.unsplash.com/photo-1698957921407-bf292bcacf5e"
              alt="Toronto skyline at night"
              className="rounded-lg"
            />
          </div>
        </div>

        {/* Page Divider */}
        <div className="hidden desktop:block absolute top-[100vh] left-0 right-0 bottom-0 bg-background -z-21" />
        <div className="hidden desktop:block h-[1px] w-screen bg-[rgba(48,242,242,0.2)]" />
      </div>

      {/* Second Screen - About & FAQ */}
      <div
        id="about-us"
        className="relative flex min-h-screen flex-col justify-between"
      >
        <div className="flex flex-col items-start justify-between text-left text-white">
          <div className="bg-background absolute inset-0 -z-30" />

          {/* TODO: Merge desktop and tablet layouts with breakpoints */}

          {/* Desktop Layout */}
          <div className="hidden desktop:block w-full">
            {/* What is hack404? */}
            <TextSection titleWidth={1} contentWidth={4}>
              <TextSectionTitle>
                What is <br />
                hack404?
              </TextSectionTitle>
              <TextSectionContent>
                Hack404 is a 36-hour hackathon in Toronto, ON. We&apos;re hoping
                to bring together 200 students who are passionate about learning
                and building to create projects that excite them. We&apos;re
                focused on our three pillars: education, innovation, and
                community.
              </TextSectionContent>
            </TextSection>

            <HBorder />

            {/* FAQ Section */}
            <TextSection
              titleWidth={1}
              contentWidth={4}
              id="faq"
              className="pb-2 tablet:pb-2 desktop:pb-2"
            >
              <TextSectionTitle>FAQ</TextSectionTitle>
            </TextSection>

            {Object.entries(faqData).map(([category, items]) => (
              <div key={category}>
                <TextSection titleWidth={1} contentWidth={4}>
                  <TextSectionTitle className="font-(family-name:--font-heading-light) gradient-text">
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </TextSectionTitle>
                  <TextSectionContent></TextSectionContent>
                </TextSection>

                {items.map((faqItem, index) => (
                  <TextSection
                    key={`${category}-${index}`}
                    titleWidth={1}
                    contentWidth={4}
                    className="py-4 tablet:py-4 desktop:py-4"
                  >
                    <TextSectionTitle className="font-(family-name:--font-heading-light) text-3xl">
                      {faqItem.question}
                    </TextSectionTitle>
                    <TextSectionContent className="text-3xl">
                      {renderFaqAnswer(faqItem)}
                    </TextSectionContent>
                  </TextSection>
                ))}
              </div>
            ))}

            <HBorder />
            <div className="flex px-16 py-[70px] items-center justify-between gap-6">
              <ColSection width={2}>
                <div className="flex flex-col items-start gap-6">
                  <h1 className="font-(family-name:--font-heading) text-5xl leading-[52.80px]">
                    Contact
                  </h1>
                  <a
                    href="mailto:support@hack404.dev"
                    className="text-3xl font-(family-name:--font-heading-light) gradient-text leading-loose hover:opacity-80 transition-opacity"
                  >
                    support@hack404.dev
                  </a>
                </div>
              </ColSection>
              <ColSection width={2}>
                <div className="flex flex-col items-start gap-6">
                  <h1 className="font-(family-name:--font-heading) text-5xl leading-[52.80px]">
                    Link to our socials
                  </h1>
                  <div className="flex gap-6">
                    <InstagramButton url="https://www.instagram.com/hack404.dev/" />
                    <LinkedInButton url="https://www.linkedin.com/company/hack404/" />
                  </div>
                </div>
              </ColSection>
            </div>
          </div>

          {/* Tablet Layout */}
          <div className="hidden tablet:block desktop:hidden w-full">
            {/* What is hack404? */}
            <TextSection titleWidth={1} contentWidth={3}>
              <TextSectionTitle>
                What is <br />
                hack404?
              </TextSectionTitle>
              <TextSectionContent>
                Hack404 is a 36-hour hackathon in Toronto, ON. We&apos;re hoping
                to bring together 200 students who are passionate about learning
                and building to create projects that excite them. We&apos;re
                focused on our three pillars: education, innovation, and
                community.
              </TextSectionContent>
            </TextSection>

            <HBorder />

            {/* FAQ Section */}
            <TextSection
              titleWidth={1}
              contentWidth={3}
              className="pb-2 tablet:pb-2 desktop:pb-2"
            >
              <TextSectionTitle>FAQ</TextSectionTitle>
            </TextSection>

            {Object.entries(faqData).map(([category, items]) => (
              <div key={category}>
                <TextSection titleWidth={1} contentWidth={3}>
                  <TextSectionTitle className="font-(family-name:--font-heading-light) gradient-text break-all">
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </TextSectionTitle>
                  <TextSectionContent></TextSectionContent>
                </TextSection>

                {items.map((faqItem, index) => (
                  <TextSection
                    key={`${category}-${index}`}
                    titleWidth={1}
                    contentWidth={3}
                    className="py-4 tablet:py-4 desktop:py-4"
                  >
                    <TextSectionTitle className="font-(family-name:--font-heading-light) text-3xl">
                      {faqItem.question}
                    </TextSectionTitle>
                    <TextSectionContent className="text-3xl">
                      {renderFaqAnswer(faqItem)}
                    </TextSectionContent>
                  </TextSection>
                ))}
              </div>
            ))}

            <HBorder />
            <div className="flex px-16 py-[70px] items-center justify-between gap-6">
              <ColSection width={2}>
                <div className="flex flex-col items-start gap-6">
                  <h1 className="font-(family-name:--font-heading) text-5xl leading-[52.80px]">
                    Contact
                  </h1>
                  <a
                    href="mailto:support@hack404.dev"
                    className="text-3xl font-(family-name:--font-heading-light) gradient-text leading-loose hover:opacity-80 transition-opacity"
                  >
                    support@hack404.dev
                  </a>
                </div>
              </ColSection>
              <ColSection width={2}>
                <div className="flex flex-col items-start gap-6">
                  <h1 className="font-(family-name:--font-heading) text-5xl leading-[52.80px]">
                    Link to our socials
                  </h1>
                  <div className="flex gap-6">
                    <InstagramButton url="https://www.instagram.com/hack404.dev/" />
                    <LinkedInButton url="https://www.linkedin.com/company/hack404/" />
                  </div>
                </div>
              </ColSection>
            </div>
          </div>

          {/* Mobile Layout */}
          <div className="tablet:hidden w-full">
            {/* What is hack404? */}
            <div className="px-6 py-[70px]">
              <h2 className="font-(family-name:--font-heading) text-5xl leading-[52.80px] mb-6">
                What is <br />
                hack404?
              </h2>
              <p className="text-2xl font-(family-name:--font-heading-light) leading-relaxed">
                Hack404 is a 36-hour hackathon in Toronto, ON. We&apos;re hoping
                to bring together 200 students who are passionate about learning
                and building to create projects that excite them. We&apos;re
                focused on our three pillars: education, innovation, and
                community.
              </p>
            </div>

            <HBorder />

            {/* Event Structure */}
            <div className="flex flex-col gap-6 px-6 py-[70px]">
              <h2 className="font-(family-name:--font-heading) text-5xl leading-[52.80px] mb-6">
                Event Structure
              </h2>
              <div>
                <h3 className="font-(family-name:--font-heading-light) gradient-text text-4xl leading-relaxed mb-6">
                  Beginner stream
                </h3>
                <p className="text-2xl font-(family-name:--font-heading-light) leading-relaxed">
                  Beginner teams will attend 3-5 workshops throughout the
                  weekend, creating &apos;mini-hacks&apos; rather than a single
                  large project. Then, they&apos;ll be judged portfolio-style,
                  where they showcase their top 3 mini-hacks and are evaluated
                  based on their technical execution, creativity, and
                  innovation.
                </p>
              </div>
              <div>
                <h3 className="font-(family-name:--font-heading-light) gradient-text text-4xl leading-relaxed mb-6">
                  Regular stream
                </h3>
                <p className="text-2xl font-(family-name:--font-heading-light) leading-relaxed">
                  Hackers will have 36 hours to create an innovative project in
                  line with our three pillars—education, innovation, and
                  community—and a problem statement that will be announced
                  during opening ceremonies. We&apos;ll also be hosting
                  activities and workshops throughout the weekend!
                </p>
              </div>
            </div>

            <HBorder />

            {/* Who can participate? */}
            <div className="px-6 py-[70px]">
              <h2 className="font-(family-name:--font-heading) text-5xl leading-[52.80px] mb-6">
                Who can participate?
              </h2>
              <p className="text-2xl font-(family-name:--font-heading-light) leading-relaxed">
                Hack404 is for students, by students. Whether you&apos;re a
                beginner hacker or have been to 10+ hackathons, we&apos;d love
                for you to continue to innovate at Hack404. We welcome
                applications from high school and post-secondary students, as
                well as those who graduated in 2025.
              </p>
            </div>

            <HBorder />

            {/* FAQ Section */}
            <div className="flex flex-col px-6 py-[70px] gap-6">
              <h2 className="font-(family-name:--font-heading) text-5xl leading-[52.80px]">
                FAQ
              </h2>

              {Object.entries(faqData).map(([category, items]) => (
                <div key={category} className="flex flex-col gap-6 items-start">
                  <h3 className="font-(family-name:--font-heading-light) gradient-text text-4xl leading-relaxed">
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </h3>

                  {items.map((faqItem, index) => (
                    <div key={`${category}-${index}`}>
                      <h4 className="font-(family-name:--font-heading) text-3xl leading-relaxed">
                        {faqItem.question}
                      </h4>
                      <p className="text-2xl font-(family-name:--font-heading-light) leading-relaxed">
                        {renderFaqAnswer(faqItem)}
                      </p>
                    </div>
                  ))}
                </div>
              ))}
            </div>

            <HBorder />

            {/* Contact Section */}
            <div className="px-6 py-[70px]">
              <h2 className="font-(family-name:--font-heading) text-5xl leading-[52.80px] mb-6">
                Contact
              </h2>
              <a
                href="mailto:support@hack404.dev"
                className="text-2xl font-(family-name:--font-heading-light) gradient-text leading-relaxed hover:opacity-80 transition-opacity block mb-8"
              >
                support@hack404.dev
              </a>

              <a
                href="mailto:info@power-unit.org"
                className="text-2xl font-(family-name:--font-heading-light) gradient-text leading-relaxed hover:opacity-80 transition-opacity block mb-8"
              >
                info@power-unit.org
              </a>

              <h2 className="font-(family-name:--font-heading) text-5xl leading-[52.80px] mb-6">
                Link to our socials
              </h2>
              <div className="flex gap-6">
                <InstagramButton url="https://www.instagram.com/hack404.dev/" />
                <LinkedInButton url="https://www.linkedin.com/company/hack404/" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
