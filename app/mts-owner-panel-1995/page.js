"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function OwnerPanelIndex() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/mts-owner-panel-1995/dashboard");
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 text-sm font-semibold">
      Redirecting to Dashboard...
    </div>
  );
}
