import type { Metadata, Viewport } from "next";

import AuthTokenProvider from "@/components/providers/auth-token";
import Provider from "@/components/providers/main";
import { getLocaleMessages } from "@/i18n/i18n-helpers";
import type { IPageComponentProps, IPageProps } from "@/types/types";
import { baseMetadata } from "@/utils/base-metadata";

import { auth } from "../authentication/auth";

export async function generateMetadata({
  params,
}: IPageComponentProps): Promise<Metadata> {
  const { locale } = await params;
  const commonMessages = await getLocaleMessages(locale, "common");

  return baseMetadata(locale, {
    title: commonMessages.name,
    description: commonMessages["document-management-system"],
  });
}

export function generateViewport(): Viewport {
  return {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  };
}

export default async function Layout({ children, params }: IPageProps) {
  const session = await auth();

  const resolvedParams = await params;
  const { locale } = resolvedParams;

  return (
    <Provider locale={locale}>
      <AuthTokenProvider token={session?.token || ""}>
        <div className="flex">
          <div className="flex-1 p-6"> {children}</div>
        </div>
      </AuthTokenProvider>
    </Provider>
  );
}
