import packageJson from '../../package.json';

export function FooterBanner() {
  return (
    <footer className="bg-genie-lavender py-6 text-center max-[390px]:py-5">
      <div className="mx-auto flex max-w-content flex-col items-center gap-2 px-4 text-sm text-genie-purple tablet:flex-row tablet:justify-center tablet:gap-3 tablet:px-6 desktop:px-8">
        <span className="text-xl" aria-hidden>
          🚲
        </span>
        <p className="font-medium max-[390px]:text-xs">
          가까운 동네에서 시작하는 취향 여정 — 플레이그라운드 genie
        </p>
        <span className="text-xs text-genie-purple/60">v{packageJson.version}</span>
      </div>
    </footer>
  );
}
