"use client";

import React, { FormEvent, useState } from "react";
import {
  Anchor,
  ArrowRight,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  ShieldCheck,
  User,
  Waves,
} from "lucide-react";

import Grainient from "@/components/Gradient";
import Navbar from "@/components/Navbar";
import { apiRequest, API_ENDPOINTS } from "@/lib/api";

/* ============================================================= */
/* TYPES                                                          */
/* ============================================================= */

type AuthResponse = {
  message?: string;
  token?: string;
  access_token?: string;
  user?: {
    id?: string;
    name?: string;
    email?: string;
  };
};

/* ============================================================= */
/* FISH                                                          */
/* ============================================================= */

function MarineFish({
  className = "",
  flip = false,
}: {
  className?: string;
  flip?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 260 120"
      className={`${className} ${flip ? "scale-x-[-1]" : ""}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* tail */}
      <path
        d="M42 61C27 43 10 35 4 38C13 51 14 69 4 82C16 86 31 79 43 67"
        fill="currentColor"
        opacity="0.65"
      />

      {/* body */}
      <path
        d="M45 61C66 25 117 10 170 27C196 35 217 49 231 61C217 73 196 87 170 95C117 112 66 97 45 61Z"
        fill="currentColor"
        opacity="0.82"
      />

      {/* dorsal fin */}
      <path
        d="M91 27C98 10 117 3 136 8C132 19 126 28 117 35"
        fill="currentColor"
        opacity="0.7"
      />

      {/* lower fin */}
      <path
        d="M105 92C113 106 130 114 145 110C143 101 136 94 127 89"
        fill="currentColor"
        opacity="0.62"
      />

      {/* eye */}
      <circle cx="180" cy="48" r="11" fill="#DDF9FF" opacity="0.9" />
      <circle cx="183" cy="46" r="4.5" fill="#063B52" />

      {/* gill */}
      <path
        d="M143 38C131 50 131 72 144 84"
        stroke="#DDF9FF"
        strokeWidth="5"
        strokeLinecap="round"
        opacity="0.45"
      />

      {/* highlight */}
      <path
        d="M70 48C89 30 117 25 140 29"
        stroke="#E9FEFF"
        strokeWidth="4"
        strokeLinecap="round"
        opacity="0.32"
      />
    </svg>
  );
}

/* ============================================================= */
/* CORAL                                                         */
/* ============================================================= */

function Coral({
  className = "",
  variant = 1,
}: {
  className?: string;
  variant?: 1 | 2 | 3;
}) {
  const colors =
    variant === 1
      ? {
          main: "#EF8FA0",
          light: "#FFBAC5",
          dark: "#C66179",
        }
      : variant === 2
        ? {
            main: "#EFA86E",
            light: "#FFD09C",
            dark: "#B96B3E",
          }
        : {
            main: "#C38BD5",
            light: "#E0B5EC",
            dark: "#895A9B",
          };

  return (
    <svg
      viewBox="0 0 220 220"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <g strokeLinecap="round" fill="none">
        {/* branches */}
        <path
          d="M106 214C105 178 109 147 94 117C87 103 77 94 67 82"
          stroke={colors.dark}
          strokeWidth="18"
        />
        <path
          d="M108 183C121 159 132 143 148 128C159 117 169 108 181 101"
          stroke={colors.main}
          strokeWidth="15"
        />
        <path
          d="M103 151C87 133 78 115 76 96C75 82 69 69 60 57"
          stroke={colors.main}
          strokeWidth="14"
        />
        <path
          d="M116 132C120 109 119 92 113 74C109 62 112 48 121 36"
          stroke={colors.light}
          strokeWidth="13"
        />
        <path
          d="M140 137C148 117 162 99 175 84"
          stroke={colors.light}
          strokeWidth="11"
        />

        {/* small branches */}
        <path
          d="M79 99C62 93 53 82 50 67"
          stroke={colors.light}
          strokeWidth="9"
        />
        <path
          d="M148 128C163 130 174 123 184 113"
          stroke={colors.dark}
          strokeWidth="9"
        />
        <path
          d="M114 75C99 69 89 59 87 47"
          stroke={colors.light}
          strokeWidth="8"
        />
      </g>

      {/* sea-floor shadow */}
      <ellipse
        cx="108"
        cy="215"
        rx="78"
        ry="10"
        fill="#021F34"
        opacity="0.45"
      />
    </svg>
  );
}

/* ============================================================= */
/* SEAWEED                                                        */
/* ============================================================= */

function Seaweed({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 160 220"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <g
        fill="none"
        strokeLinecap="round"
        className="origin-bottom animate-[seaweedSway_5s_ease-in-out_infinite]"
      >
        <path
          d="M80 220C75 171 77 119 56 66C50 51 48 37 52 23"
          stroke="#35B89A"
          strokeWidth="13"
        />
        <path
          d="M84 220C96 163 101 121 123 79C129 67 130 52 126 39"
          stroke="#72D1A8"
          strokeWidth="10"
        />
        <path
          d="M67 220C54 174 40 138 25 111C18 98 15 83 19 69"
          stroke="#20937F"
          strokeWidth="9"
        />
        <path
          d="M91 220C85 165 77 126 84 90C88 70 95 55 107 41"
          stroke="#4EC29F"
          strokeWidth="8"
        />
      </g>

      <ellipse cx="80" cy="218" rx="58" ry="9" fill="#062D3C" opacity="0.6" />
    </svg>
  );
}

/* ============================================================= */
/* MAIN PAGE                                                       */
/* ============================================================= */

export default function LoginPage() {
  const [isSignup, setIsSignup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [signupName, setSignupName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error">(
    "success"
  );

  const showError = (text: string) => {
    setMessageType("error");
    setMessage(text);
  };

  const showSuccess = (text: string) => {
    setMessageType("success");
    setMessage(text);
  };

  /* =========================================================== */
  /* LOGIN                                                        */
  /* =========================================================== */

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setMessage("");

    if (!loginEmail.trim() || !loginPassword) {
      showError("Please enter your email and password.");
      return;
    }

    try {
      setLoading(true);

      const response = await apiRequest<AuthResponse>(
        API_ENDPOINTS.login,
        {
          method: "POST",
          body: {
            email: loginEmail.trim(),
            password: loginPassword,
          },
        }
      );

      const token = response.access_token || response.token;

      if (token) {
        localStorage.setItem("arova_access_token", token);
      }

      if (response.user) {
        localStorage.setItem(
          "arova_user",
          JSON.stringify(response.user)
        );
      }

      showSuccess(
        response.message || "Login successful. Welcome back to AROVA."
      );
    } catch (error) {
      showError(
        error instanceof Error
          ? error.message
          : "Unable to connect to the authentication server."
      );
    } finally {
      setLoading(false);
    }
  };

  /* =========================================================== */
  /* SIGNUP                                                       */
  /* =========================================================== */

  const handleSignup = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setMessage("");

    if (
      !signupName.trim() ||
      !signupEmail.trim() ||
      !signupPassword
    ) {
      showError("Please complete all sign-up fields.");
      return;
    }

    if (signupPassword.length < 6) {
      showError("Password must contain at least 6 characters.");
      return;
    }

    try {
      setLoading(true);

      const response = await apiRequest<AuthResponse>(
        API_ENDPOINTS.signup,
        {
          method: "POST",
          body: {
            name: signupName.trim(),
            email: signupEmail.trim(),
            password: signupPassword,
          },
        }
      );

      const token = response.access_token || response.token;

      if (token) {
        localStorage.setItem("arova_access_token", token);
      }

      if (response.user) {
        localStorage.setItem(
          "arova_user",
          JSON.stringify(response.user)
        );
      }

      showSuccess(
        response.message ||
          "Account created successfully. Welcome aboard AROVA."
      );
    } catch (error) {
      showError(
        error instanceof Error
          ? error.message
          : "Unable to connect to the authentication server."
      );
    } finally {
      setLoading(false);
    }
  };

  const switchMode = () => {
    setMessage("");
    setShowPassword(false);
    setIsSignup((current) => !current);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#03045E] text-white">

      {/* ======================================================= */}
      {/* AROVA OCEAN                                             */}
      {/* ======================================================= */}

      <div className="fixed inset-0 z-0">
        <Grainient
          color1="#03045E"
          color2="#0077B6"
          color3="#90E0EF"
          timeSpeed={0.18}
          className="h-full w-full opacity-95"
        />

        {/* Deeper underwater layer */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#03045E]/15 via-[#0077B6]/10 to-[#021F34]/65" />

        {/* Water depth */}
        <div className="absolute inset-x-0 bottom-0 h-[38%] bg-gradient-to-t from-[#021D30]/90 via-[#023B50]/35 to-transparent" />
      </div>

      {/* ======================================================= */}
      {/* CAUSTIC LIGHT                                            */}
      {/* ======================================================= */}

      <div className="pointer-events-none fixed inset-0 z-[1] overflow-hidden">

        <div className="absolute left-[8%] top-[15%] h-[320px] w-[200px] rotate-[18deg] bg-[#90E0EF]/10 blur-3xl animate-[waterLight_8s_ease-in-out_infinite]" />

        <div className="absolute left-[40%] top-[8%] h-[250px] w-[180px] rotate-[-12deg] bg-[#CAF0F8]/10 blur-3xl animate-[waterLight_10s_ease-in-out_infinite_reverse]" />

        <div className="absolute right-[10%] top-[22%] h-[380px] w-[220px] rotate-[24deg] bg-[#00B4D8]/10 blur-3xl animate-[waterLight_9s_ease-in-out_infinite]" />

        {/* soft underwater haze */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_25%,rgba(0,22,38,0.35)_100%)]" />

      </div>

      {/* ======================================================= */}
      {/* MARINE LIFE                                              */}
      {/* ======================================================= */}

      <div className="pointer-events-none fixed inset-0 z-[2] overflow-hidden">

        {/* Fish 1 */}
        <div className="absolute left-[-180px] top-[25%] w-[130px] text-[#90E0EF]/35 animate-[fishSwim1_24s_linear_infinite]">
          <MarineFish />
        </div>

        {/* Fish 2 */}
        <div className="absolute left-[-220px] top-[48%] w-[95px] text-[#CAF0F8]/30 animate-[fishSwim2_31s_linear_infinite]">
          <MarineFish />
        </div>

        {/* Fish 3 */}
        <div className="absolute right-[-180px] top-[35%] w-[150px] text-[#7DD8E4]/30 animate-[fishSwim3_28s_linear_infinite]">
          <MarineFish flip />
        </div>

        {/* Fish 4 */}
        <div className="absolute right-[-150px] top-[62%] w-[80px] text-[#90E0EF]/25 animate-[fishSwim4_22s_linear_infinite]">
          <MarineFish flip />
        </div>

        {/* Bubbles */}
        <span className="absolute left-[18%] top-[75%] h-3 w-3 rounded-full border border-[#CAF0F8]/30 animate-[bubbleRise_9s_linear_infinite]" />

        <span className="absolute left-[27%] top-[68%] h-2 w-2 rounded-full bg-[#CAF0F8]/25 animate-[bubbleRise_7s_linear_infinite_1s]" />

        <span className="absolute right-[18%] top-[72%] h-3 w-3 rounded-full border border-[#CAF0F8]/25 animate-[bubbleRise_11s_linear_infinite_2s]" />

        <span className="absolute right-[30%] top-[65%] h-2 w-2 rounded-full bg-[#CAF0F8]/25 animate-[bubbleRise_8s_linear_infinite_3s]" />

        <span className="absolute left-[45%] top-[70%] h-2 w-2 rounded-full border border-[#CAF0F8]/20 animate-[bubbleRise_10s_linear_infinite_1.5s]" />

      </div>

      {/* ======================================================= */}
      {/* SEABED                                                   */}
      {/* ======================================================= */}

      <div className="pointer-events-none fixed bottom-0 left-0 right-0 z-[3] h-[145px]">

        {/* Sand / seabed */}
        <div className="absolute inset-x-0 bottom-0 h-[75px] bg-gradient-to-t from-[#06293A] via-[#073A4A] to-transparent" />

        {/* seabed texture */}
        <div className="absolute inset-x-0 bottom-0 h-[90px] opacity-40 [background-image:radial-gradient(circle_at_10%_20%,rgba(144,224,239,0.18)_0_2px,transparent_3px),radial-gradient(circle_at_30%_60%,rgba(144,224,239,0.15)_0_2px,transparent_3px),radial-gradient(circle_at_60%_35%,rgba(144,224,239,0.16)_0_2px,transparent_3px),radial-gradient(circle_at_80%_65%,rgba(144,224,239,0.15)_0_2px,transparent_3px)] [background-size:120px_70px]" />

        {/* Coral */}
        <Coral
          variant={1}
          className="absolute bottom-[-35px] left-[3%] h-[170px] w-[170px] opacity-70 animate-[coralSway_6s_ease-in-out_infinite]"
        />

        <Coral
          variant={2}
          className="absolute bottom-[-28px] left-[15%] h-[130px] w-[130px] opacity-45 animate-[coralSway_7s_ease-in-out_infinite_reverse]"
        />

        <Coral
          variant={3}
          className="absolute bottom-[-45px] right-[7%] h-[180px] w-[180px] opacity-60 animate-[coralSway_8s_ease-in-out_infinite]"
        />

        <Coral
          variant={2}
          className="absolute bottom-[-38px] right-[20%] h-[125px] w-[125px] opacity-40 animate-[coralSway_6.5s_ease-in-out_infinite_reverse]"
        />

        {/* Seaweed */}
        <Seaweed className="absolute bottom-[-20px] left-[23%] h-[160px] w-[110px] opacity-50" />

        <Seaweed className="absolute bottom-[-25px] right-[28%] h-[150px] w-[100px] scale-x-[-1] opacity-45" />

      </div>

      {/* ======================================================= */}
      {/* NAVBAR                                                   */}
      {/* ======================================================= */}

      <div className="relative z-20">
        <Navbar />
      </div>

      {/* ======================================================= */}
      {/* MAIN                                                     */}
      {/* ======================================================= */}

      <main className="relative z-10 flex min-h-[calc(100vh-76px)] items-center justify-center px-5 py-10">

        <div className="w-full max-w-6xl">

          {/* =================================================== */}
          {/* HEADER                                               */}
          {/* =================================================== */}

          <div className="mb-8 text-center">

            <h1 className="mt-4 text-3xl font-black tracking-tight md:text-5xl">
              {isSignup
                ? "Join the AROVA community."
                : "Welcome back to the sea."}
            </h1>

            <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-[#CAF0F8]/75 md:text-base">
              {isSignup
                ? "Create your account and enter the AROVA marine intelligence workspace."
                : "Access your marine intelligence workspace and continue exploring the ocean with AROVA."}
            </p>

          </div>

          {/* =================================================== */}
          {/* FLIP CARD                                             */}
          {/* =================================================== */}

          <div className="mx-auto w-full max-w-md [perspective:1400px]">

            <div
              className={`relative min-h-[590px] w-full transition-transform duration-700 [transform-style:preserve-3d] ${
                isSignup ? "[transform:rotateY(180deg)]" : ""
              }`}
            >

              {/* ================================================= */}
              {/* LOGIN SIDE                                         */}
              {/* ================================================= */}

              <div className="absolute inset-0 [backface-visibility:hidden]">

                <div className="relative h-full overflow-hidden rounded-[2rem] border border-[#00B4D8]/45 bg-[#021B36]/72 p-7 shadow-[0_25px_80px_rgba(0,0,0,0.42)] backdrop-blur-xl md:p-9">

                  {/* card shine */}
                  <div className="pointer-events-none absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-transparent via-[#90E0EF] to-transparent" />

                  <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[#00B4D8]/10 blur-3xl" />

                  <div className="relative z-10">

                    <div className="mb-8 flex items-center justify-between">

                      <div>

                        <p className="text-xs font-black uppercase tracking-[0.2em] text-[#90E0EF]">
                          Sign in
                        </p>

                        <h2 className="mt-2 text-3xl font-black">
                          Enter AROVA
                        </h2>

                      </div>

                      <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#0077B6]/50 bg-[#0077B6]/20">
                        <Waves className="h-6 w-6 text-[#90E0EF]" />
                      </div>

                    </div>

                    <form onSubmit={handleLogin} className="space-y-5">

                      {/* Email */}
                      <div>

                        <label
                          htmlFor="login-email"
                          className="mb-2 block text-sm font-bold text-[#CAF0F8]"
                        >
                          Email address
                        </label>

                        <div className="relative">

                          <Mail className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#90E0EF]/65" />

                          <input
                            id="login-email"
                            type="email"
                            value={loginEmail}
                            onChange={(event) =>
                              setLoginEmail(event.target.value)
                            }
                            placeholder="you@example.com"
                            disabled={loading}
                            className="w-full rounded-2xl border border-[#0077B6]/55 bg-[#020F2B]/65 py-3.5 pl-12 pr-4 text-sm text-white outline-none placeholder:text-[#90E0EF]/35 transition-all focus:border-[#00B4D8] focus:bg-[#020F2B]/80 focus:ring-2 focus:ring-[#00B4D8]/20 disabled:opacity-60"
                          />

                        </div>

                      </div>

                      {/* Password */}
                      <div>

                        <div className="mb-2 flex items-center justify-between">

                          <label
                            htmlFor="login-password"
                            className="text-sm font-bold text-[#CAF0F8]"
                          >
                            Password
                          </label>

                          <button
                            type="button"
                            disabled={loading}
                            onClick={() =>
                              showError(
                                "Password recovery will be connected to the backend."
                              )
                            }
                            className="text-xs font-bold text-[#90E0EF] transition hover:text-white"
                          >
                            Forgot password?
                          </button>

                        </div>

                        <div className="relative">

                          <LockKeyhole className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#90E0EF]/65" />

                          <input
                            id="login-password"
                            type={showPassword ? "text" : "password"}
                            value={loginPassword}
                            onChange={(event) =>
                              setLoginPassword(event.target.value)
                            }
                            placeholder="Enter your password"
                            disabled={loading}
                            className="w-full rounded-2xl border border-[#0077B6]/55 bg-[#020F2B]/65 py-3.5 pl-12 pr-12 text-sm text-white outline-none placeholder:text-[#90E0EF]/35 transition-all focus:border-[#00B4D8] focus:bg-[#020F2B]/80 focus:ring-2 focus:ring-[#00B4D8]/20 disabled:opacity-60"
                          />

                          <button
                            type="button"
                            aria-label={
                              showPassword
                                ? "Hide password"
                                : "Show password"
                            }
                            onClick={() =>
                              setShowPassword((current) => !current)
                            }
                            disabled={loading}
                            className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-xl text-[#90E0EF] transition hover:bg-[#0077B6]/20 hover:text-white"
                          >
                            {showPassword ? (
                              <EyeOff className="h-5 w-5" />
                            ) : (
                              <Eye className="h-5 w-5" />
                            )}
                          </button>

                        </div>

                      </div>

                      {/* Remember */}
                      <label className="flex cursor-pointer items-center gap-3 text-sm text-[#CAF0F8]/70">

                        <input
                          type="checkbox"
                          disabled={loading}
                          className="h-4 w-4 rounded border-[#0077B6]/50 bg-[#020F2B] accent-[#00B4D8]"
                        />

                        Remember me

                      </label>

                      {/* Submit */}
                      <button
                        type="submit"
                        disabled={loading}
                        className="group flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#0077B6] to-[#00B4D8] px-5 py-3.5 text-sm font-black text-white shadow-[0_10px_30px_rgba(0,180,216,0.22)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_15px_40px_rgba(0,180,216,0.32)] disabled:opacity-60"
                      >
                        {loading ? "Connecting..." : "Sign In"}

                        {!loading && (
                          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        )}
                      </button>

                    </form>

                    {/* Message */}
                    {message && (
                      <div
                        className={`mt-5 rounded-xl border px-4 py-3 text-center text-xs font-semibold ${
                          messageType === "error"
                            ? "border-red-400/30 bg-red-500/10 text-red-200"
                            : "border-[#00B4D8]/30 bg-[#0077B6]/10 text-[#CAF0F8]"
                        }`}
                      >
                        {message}
                      </div>
                    )}

                    {/* Signup */}
                    <div className="my-7 flex items-center gap-4">

                      <div className="h-px flex-1 bg-[#0077B6]/30" />

                      <span className="text-xs font-bold uppercase tracking-wider text-[#90E0EF]/50">
                        New here?
                      </span>

                      <div className="h-px flex-1 bg-[#0077B6]/30" />

                    </div>

                    <button
                      type="button"
                      disabled={loading}
                      onClick={switchMode}
                      className="w-full rounded-2xl border border-[#00B4D8]/40 bg-[#0077B6]/10 px-5 py-3.5 text-sm font-black text-[#CAF0F8] transition-all duration-300 hover:border-[#90E0EF]/60 hover:bg-[#00B4D8]/15 disabled:opacity-50"
                    >
                      Create an AROVA account
                    </button>

                    <div className="mt-6 flex items-center justify-center gap-2 text-xs text-[#CAF0F8]/45">
                      <ShieldCheck className="h-4 w-4" />
                      Secure marine intelligence access
                    </div>

                  </div>
                </div>
              </div>

              {/* ================================================= */}
              {/* SIGNUP SIDE                                       */}
              {/* ================================================= */}

              <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)]">

                <div className="relative h-full overflow-hidden rounded-[2rem] border border-[#00B4D8]/45 bg-[#021B36]/72 p-7 shadow-[0_25px_80px_rgba(0,0,0,0.42)] backdrop-blur-xl md:p-9">

                  <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-transparent via-[#90E0EF] to-transparent" />

                  <div className="relative z-10">

                    <div className="mb-8 flex items-center justify-between">

                      <div>

                        <p className="text-xs font-black uppercase tracking-[0.2em] text-[#90E0EF]">
                          Create account
                        </p>

                        <h2 className="mt-2 text-3xl font-black">
                          Join AROVA
                        </h2>

                      </div>

                      <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#0077B6]/50 bg-[#0077B6]/20">
                        <User className="h-6 w-6 text-[#90E0EF]" />
                      </div>

                    </div>

                    <form onSubmit={handleSignup} className="space-y-5">

                      {/* Name */}
                      <div>

                        <label
                          htmlFor="signup-name"
                          className="mb-2 block text-sm font-bold text-[#CAF0F8]"
                        >
                          Full name
                        </label>

                        <div className="relative">

                          <User className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#90E0EF]/65" />

                          <input
                            id="signup-name"
                            type="text"
                            value={signupName}
                            onChange={(event) =>
                              setSignupName(event.target.value)
                            }
                            placeholder="Your full name"
                            disabled={loading}
                            className="w-full rounded-2xl border border-[#0077B6]/55 bg-[#020F2B]/65 py-3.5 pl-12 pr-4 text-sm text-white outline-none placeholder:text-[#90E0EF]/35 transition-all focus:border-[#00B4D8] focus:bg-[#020F2B]/80 focus:ring-2 focus:ring-[#00B4D8]/20 disabled:opacity-60"
                          />

                        </div>
                      </div>

                      {/* Email */}
                      <div>

                        <label
                          htmlFor="signup-email"
                          className="mb-2 block text-sm font-bold text-[#CAF0F8]"
                        >
                          Email address
                        </label>

                        <div className="relative">

                          <Mail className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#90E0EF]/65" />

                          <input
                            id="signup-email"
                            type="email"
                            value={signupEmail}
                            onChange={(event) =>
                              setSignupEmail(event.target.value)
                            }
                            placeholder="you@example.com"
                            disabled={loading}
                            className="w-full rounded-2xl border border-[#0077B6]/55 bg-[#020F2B]/65 py-3.5 pl-12 pr-4 text-sm text-white outline-none placeholder:text-[#90E0EF]/35 transition-all focus:border-[#00B4D8] focus:bg-[#020F2B]/80 focus:ring-2 focus:ring-[#00B4D8]/20 disabled:opacity-60"
                          />

                        </div>
                      </div>

                      {/* Password */}
                      <div>

                        <label
                          htmlFor="signup-password"
                          className="mb-2 block text-sm font-bold text-[#CAF0F8]"
                        >
                          Create password
                        </label>

                        <div className="relative">

                          <LockKeyhole className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#90E0EF]/65" />

                          <input
                            id="signup-password"
                            type={showPassword ? "text" : "password"}
                            value={signupPassword}
                            onChange={(event) =>
                              setSignupPassword(event.target.value)
                            }
                            placeholder="Create a password"
                            disabled={loading}
                            className="w-full rounded-2xl border border-[#0077B6]/55 bg-[#020F2B]/65 py-3.5 pl-12 pr-12 text-sm text-white outline-none placeholder:text-[#90E0EF]/35 transition-all focus:border-[#00B4D8] focus:bg-[#020F2B]/80 focus:ring-2 focus:ring-[#00B4D8]/20 disabled:opacity-60"
                          />

                          <button
                            type="button"
                            aria-label={
                              showPassword
                                ? "Hide password"
                                : "Show password"
                            }
                            onClick={() =>
                              setShowPassword((current) => !current)
                            }
                            disabled={loading}
                            className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-xl text-[#90E0EF] transition hover:bg-[#0077B6]/20 hover:text-white"
                          >
                            {showPassword ? (
                              <EyeOff className="h-5 w-5" />
                            ) : (
                              <Eye className="h-5 w-5" />
                            )}
                          </button>

                        </div>
                      </div>

                      {/* Terms */}
                      <label className="flex cursor-pointer items-start gap-3 text-xs leading-relaxed text-[#CAF0F8]/55">

                        <input
                          type="checkbox"
                          required
                          disabled={loading}
                          className="mt-0.5 h-4 w-4 rounded border-[#0077B6]/50 bg-[#020F2B] accent-[#00B4D8]"
                        />

                        <span>
                          I agree to the AROVA platform terms and acknowledge
                          the intended use of marine decision-support
                          information.
                        </span>

                      </label>

                      {/* Submit */}
                      <button
                        type="submit"
                        disabled={loading}
                        className="group flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#0077B6] to-[#00B4D8] px-5 py-3.5 text-sm font-black text-white shadow-[0_10px_30px_rgba(0,180,216,0.22)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_15px_40px_rgba(0,180,216,0.32)] disabled:opacity-60"
                      >
                        {loading ? "Creating..." : "Create Account"}

                        {!loading && (
                          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        )}
                      </button>

                    </form>

                    {/* Message */}
                    {message && (
                      <div
                        className={`mt-5 rounded-xl border px-4 py-3 text-center text-xs font-semibold ${
                          messageType === "error"
                            ? "border-red-400/30 bg-red-500/10 text-red-200"
                            : "border-[#00B4D8]/30 bg-[#0077B6]/10 text-[#CAF0F8]"
                        }`}
                      >
                        {message}
                      </div>
                    )}

                    <div className="mt-7 text-center">

                      <button
                        type="button"
                        disabled={loading}
                        onClick={switchMode}
                        className="text-sm font-bold text-[#90E0EF] transition hover:text-white"
                      >
                        Already have an account? Sign in
                      </button>

                    </div>

                    <div className="mt-6 flex items-center justify-center gap-2 text-xs text-[#CAF0F8]/45">
                      <Waves className="h-4 w-4" />
                      Welcome aboard AROVA
                    </div>

                  </div>
                </div>
              </div>

            </div>
          </div>

          <div className="mt-7 text-center">
            <p className="text-xs text-[#CAF0F8]/35">
              AROVA • Marine Intelligence • Smart India Hackathon 2026
            </p>
          </div>

        </div>
      </main>

      {/* ======================================================= */}
      {/* ANIMATIONS                                                */}
      {/* ======================================================= */}

      <style jsx global>{`
        @keyframes fishSwim1 {
          0% {
            transform: translateX(0) translateY(0);
          }

          25% {
            transform: translateX(28vw) translateY(-18px);
          }

          50% {
            transform: translateX(57vw) translateY(12px);
          }

          75% {
            transform: translateX(83vw) translateY(-15px);
          }

          100% {
            transform: translateX(118vw) translateY(5px);
          }
        }

        @keyframes fishSwim2 {
          0% {
            transform: translateX(0) translateY(0);
          }

          30% {
            transform: translateX(25vw) translateY(16px);
          }

          55% {
            transform: translateX(50vw) translateY(-10px);
          }

          80% {
            transform: translateX(82vw) translateY(14px);
          }

          100% {
            transform: translateX(120vw) translateY(-4px);
          }
        }

        @keyframes fishSwim3 {
          0% {
            transform: translateX(0) translateY(0);
          }

          25% {
            transform: translateX(-25vw) translateY(14px);
          }

          50% {
            transform: translateX(-52vw) translateY(-12px);
          }

          75% {
            transform: translateX(-80vw) translateY(16px);
          }

          100% {
            transform: translateX(-120vw) translateY(0);
          }
        }

        @keyframes fishSwim4 {
          0% {
            transform: translateX(0) translateY(0);
          }

          30% {
            transform: translateX(-25vw) translateY(-15px);
          }

          60% {
            transform: translateX(-56vw) translateY(10px);
          }

          100% {
            transform: translateX(-120vw) translateY(-5px);
          }
        }

        @keyframes bubbleRise {
          0% {
            transform: translateY(30px) scale(0.7);
            opacity: 0;
          }

          15% {
            opacity: 0.45;
          }

          50% {
            transform: translateY(-120px) scale(1);
            opacity: 0.3;
          }

          100% {
            transform: translateY(-260px) scale(1.15);
            opacity: 0;
          }
        }

        @keyframes waterLight {
          0% {
            transform: translate3d(0, 0, 0) rotate(12deg);
            opacity: 0.15;
          }

          50% {
            transform: translate3d(40px, 20px, 0) rotate(25deg);
            opacity: 0.3;
          }

          100% {
            transform: translate3d(-20px, -10px, 0) rotate(8deg);
            opacity: 0.15;
          }
        }

        @keyframes coralSway {
          0% {
            transform: rotate(-1deg);
          }

          50% {
            transform: rotate(2deg);
          }

          100% {
            transform: rotate(-1deg);
          }
        }

        @keyframes seaweedSway {
          0% {
            transform: rotate(-3deg);
          }

          50% {
            transform: rotate(4deg);
          }

          100% {
            transform: rotate(-3deg);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          *,
          *::before,
          *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
            scroll-behavior: auto !important;
          }
        }
      `}</style>
    </div>
  );
}