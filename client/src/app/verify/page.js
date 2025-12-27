"use client";
import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import api from "../../lib/api";

function VerifyLogic() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");

  const [status, setStatus] = useState("checking");

  useEffect(() => {
    if (!token) {
      setStatus("invalid");
      return;
    }

    const verifyToken = async () => {
      try {
        console.log("TOKEN FROM URL 👉", token);

        const res = await api.post("/api/links/verify", { token });

        console.log("VERIFY RESPONSE 👉", res.data);

        setStatus("valid");

        const redirectUrl = res.data.data.redirectUrl;

        setTimeout(() => {
          router.push(redirectUrl);
        }, 2000);

      } catch (error) {
        console.error("VERIFY ERROR 👉", error.response?.data || error.message);
        setStatus("invalid");
      }
    };

    verifyToken();
  }, [token, router]);

  if (status === "checking") {
    return (
      <div className="relative px-10 py-8 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20
        shadow-[0_0_60px_-10px_rgba(56,189,248,0.5)] text-center">
        <p className="text-2xl font-medium text-cyan-300 animate-pulse">
          Verifying Secure Link
        </p>
        <p className="mt-2 text-sm text-neutral-300">
          Validating authentication token…
        </p>
      </div>
    );
  }

  if (status === "invalid") {
    return (
      <div className="relative px-12 py-10 rounded-3xl bg-white/10 backdrop-blur-xl border border-red-400/30
        shadow-[0_0_70px_-15px_rgba(239,68,68,0.45)] text-center">
        <h2 className="text-3xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-rose-400 mb-3">
          Access Denied
        </h2>
        <p className="text-neutral-300">
          This secure link is expired or invalid. Please request a new access link.
        </p>
      </div>
    );
  }

  return (
    <div className="relative px-12 py-10 rounded-3xl bg-white/10 backdrop-blur-xl border border-green-400/30
      shadow-[0_0_70px_-15px_rgba(34,197,94,0.45)] text-center">
      <h2 className="text-3xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-emerald-400 mb-3">
        Access Granted
      </h2>
      <p className="text-neutral-300">
        Verification successful. Redirecting to the secure resource…
      </p>
    </div>
  );
}

export default function VerifyPage() {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-neutral-950 text-white overflow-hidden">

      {/* Soft Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:32px_32px]" />

      {/* Ambient Light */}
      <div className="absolute w-[450px] h-[450px] bg-cyan-400/25 rounded-full blur-[180px] top-1/3 left-1/3 animate-pulse" />

      <Suspense fallback={
        <div className="text-neutral-400 text-lg animate-pulse">
          Initializing secure verification…
        </div>
      }>
        <VerifyLogic />
      </Suspense>
    </div>
  );
}
