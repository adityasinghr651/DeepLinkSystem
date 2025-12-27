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

        // ✅ FIXED ENDPOINT
        const res = await api.post("/api/links/verify", { token });

        console.log("VERIFY RESPONSE 👉", res.data);

        setStatus("valid");

        // ✅ REAL DEEP LINK REDIRECT
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
    return <div className="text-2xl animate-pulse">🔍 Verifying Secure Link...</div>;
  }

  if (status === "invalid") {
    return (
      <div className="text-center">
        <h2 className="text-3xl text-red-500 mb-2">❌ Link Expired or Invalid</h2>
        <p className="text-gray-400">Please request a new link.</p>
      </div>
    );
  }

  return (
    <div className="text-center">
      <h2 className="text-3xl text-green-500 mb-2">✅ Access Granted</h2>
      <p className="text-gray-400">Redirecting to secure resource...</p>
    </div>
  );
}

export default function VerifyPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <Suspense fallback={<div>Loading...</div>}>
        <VerifyLogic />
      </Suspense>
    </div>
  );
}
