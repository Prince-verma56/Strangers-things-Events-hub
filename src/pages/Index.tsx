import { useEffect, lazy, Suspense } from 'react';
import useGsapScroll from '@/hooks/useGsapScroll';
import CircularNav from '@/components/sections/CircularNav';
import { LenisProvider } from '@/context/LenisContext';

// Lazy load heavy visual effects - reduces initial bundle size
const CustomCursor = lazy(() => import('@/components/effects/CustomCursor'));
const ParticleField = lazy(() => import('@/components/effects/ParticleField'));
const FogOverlay = lazy(() => import('@/components/effects/FogOverlay'));
const FilmGrain = lazy(() => import('@/components/effects/FilmGrain'));
const LightningFlash = lazy(() => import('@/components/effects/LightningFlash'));

// Lazy load sections (some contain heavy animations/3D)
const HeroSection = lazy(() => import('@/components/sections/HeroSection'));
const FeaturedEventsSection = lazy(() => import('@/components/sections/FeaturedEventsSection'));
const AboutSection = lazy(() => import('@/components/sections/AboutSection'));
const WhyJoinSection = lazy(() => import('@/components/sections/WhyJoinSection'));
const TracksSection = lazy(() => import('@/components/sections/TracksSection'));
const RewardsSection = lazy(() => import('@/components/sections/RewardsSection'));
const JudgesSection = lazy(() => import('@/components/sections/JudgesSection'));
const SponsorsSection = lazy(() => import('@/components/sections/SponsorsSection'));
const RegisterSection = lazy(() => import('@/components/sections/RegisterSection'));
const FooterSection = lazy(() => import('@/components/sections/FooterSection'));

// Minimal loading fallback to prevent layout shift
const SectionFallback = () => (
  <div className="min-h-screen w-full flex items-center justify-center bg-background">
    <div className="w-12 h-12 border-2 border-crimson/30 border-t-crimson rounded-full animate-spin" />
  </div>
);

const EffectFallback = () => null; // Effects can load silently

const IndexContent = () => {
  // Initialize GSAP animations
  useGsapScroll();

  useEffect(() => {
    // Add dark class to html for dark theme
    document.documentElement.classList.add('dark');
  }, []);

  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Global Effects - Lazy loaded */}
      <Suspense fallback={<EffectFallback />}>
        <CustomCursor />
        <ParticleField />
        <FogOverlay />
        {/* <FilmGrain /> */}
        <LightningFlash />
      </Suspense>

      {/* Main Content */}
      <main>
        <CircularNav />

        {/* Hero loads immediately (critical for LCP) */}
        <Suspense fallback={<SectionFallback />}>
          <HeroSection />
        </Suspense>

        {/* Other sections lazy load as user scrolls */}
        <Suspense fallback={<SectionFallback />}>
          <AboutSection />
        </Suspense>

        <Suspense fallback={<SectionFallback />}>
          <WhyJoinSection />
        </Suspense>

        <Suspense fallback={<SectionFallback />}>
          <TracksSection />
        </Suspense>

        <Suspense fallback={<SectionFallback />}>
          <RewardsSection />
        </Suspense>

        <Suspense fallback={<SectionFallback />}>
          <JudgesSection />
        </Suspense>

        <Suspense fallback={<SectionFallback />}>
          <SponsorsSection />
        </Suspense>

        <Suspense fallback={<SectionFallback />}>
          <RegisterSection />
        </Suspense>

        <Suspense fallback={<SectionFallback />}>
          <FooterSection />
        </Suspense>
      </main>
    </div>
  );
};

const Index = () => {
  return (
    <LenisProvider>
      <IndexContent />
    </LenisProvider>
  );
};

export default Index;

