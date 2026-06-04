import SiteNav from '../../components/site-nav';
import SiteFooter from '../../components/site-footer';
import GuideContent from '../../components/guide/guide-content';

export default function GuidePage() {
  return (
    <>
      <SiteNav />
      <main>
        <GuideContent />
      </main>
      <SiteFooter />
    </>
  );
}
