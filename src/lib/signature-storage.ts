const SIGNATURES_BUCKET = "signatures";

/** signature 공개 URL에서 스토리지 객체 경로만 뽑아낸다 (버킷 바깥 URL이면 null) */
export function extractSignaturePath(url: string | null | undefined): string | null {
  if (!url) return null;
  const marker = `/storage/v1/object/public/${SIGNATURES_BUCKET}/`;
  const idx = url.indexOf(marker);
  if (idx === -1) return null;
  try {
    return decodeURIComponent(url.slice(idx + marker.length));
  } catch {
    return null;
  }
}

type StorageClient = {
  storage: {
    from: (bucket: string) => { remove: (paths: string[]) => Promise<unknown> };
  };
};

/** participant/int_interviews 삭제 시 딸려있는 서명 이미지를 함께 지운다 (best-effort). */
export async function deleteSignatureFiles(
  client: StorageClient,
  urls: (string | null | undefined)[],
): Promise<void> {
  const paths = urls.map(extractSignaturePath).filter((p): p is string => Boolean(p));
  if (paths.length === 0) return;

  try {
    await client.storage.from(SIGNATURES_BUCKET).remove(paths);
  } catch {
    // DB 행은 이미 지워졌으므로 스토리지 정리 실패로 요청 전체를 실패시키지 않는다.
  }
}
