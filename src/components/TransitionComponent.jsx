"use client";

import { useEffect } from "react";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { useRouter } from "next/navigation";

export default function PageTransition() {
  const router = useRouter();

  useEffect(() => {
    const handleStart = () => NProgress.start();
    const handleComplete = () => NProgress.done();

    // Tambahkan event listener untuk perubahan halaman
    router.events?.on("routeChangeStart", handleStart);
    router.events?.on("routeChangeComplete", handleComplete);
    router.events?.on("routeChangeError", handleComplete);

    return () => {
      // Bersihkan event listener ketika komponen di-unmount
      router.events?.off("routeChangeStart", handleStart);
      router.events?.off("routeChangeComplete", handleComplete);
      router.events?.off("routeChangeError", handleComplete);
    };
  }, [router]);

  return null; // Komponen ini tidak perlu render apa pun
}
