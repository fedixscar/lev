import { QRClient } from "./QRClient";

interface QRPageProps {
  params: Promise<{ token: string }>;
}

export function generateStaticParams() {
  return [
    { token: "sample-token" },
    { token: "cert-2026-or" },
    { token: "cert-2026-olivier" },
  ];
}

export default async function QRProductExperiencePage({ params }: QRPageProps) {
  const resolvedParams = await params;
  return <QRClient token={resolvedParams.token} />;
}
