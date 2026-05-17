import Image from "next/image";

const IMAGE_WIDTH = 1242;
const IMAGE_HEIGHT = 1086;
const TABLET_DESKTOP_MAX_WIDTH = 621; // IMAGE_WIDTH / 2

export function IntroPhotoSection() {
  return (
    <section className="relative isolate w-full overflow-hidden">
      <div className="mx-auto flex w-full justify-center">
        <div
          className="relative w-full max-w-full tablet:mx-auto tablet:max-w-[621px] desktop:mx-auto desktop:max-w-[621px]"
          style={{ aspectRatio: `${IMAGE_WIDTH} / ${IMAGE_HEIGHT}` }}
        >
          <Image
            src="/GenieStory/GenieStory1Txt.PNG"
            alt="지니 커뮤니티"
            fill
            priority
            className="object-contain"
            sizes={`(max-width: 767px) 100vw, ${TABLET_DESKTOP_MAX_WIDTH}px`}
          />
        </div>
      </div>
    </section>
  );
}
