import Image from "next/image";
import { assetUrl } from "@/lib/site";

export function PageBanner({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="relative mb-10 flex min-h-40 items-center overflow-hidden bg-brand-footer text-white">
      <Image
        src={assetUrl("/banners/sub-banner-1.jpg")}
        alt=""
        fill
        className="object-cover opacity-35"
        priority={false}
      />
      <div className="relative mx-auto w-full max-w-7xl px-4 py-10 lg:px-6">
        <h1 className="text-3xl font-bold md:text-4xl">{title}</h1>
        {subtitle ? <p className="mt-2 max-w-2xl text-white/90">{subtitle}</p> : null}
      </div>
    </div>
  );
}