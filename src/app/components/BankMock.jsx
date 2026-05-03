import React from "react";

const BankMock = () => {
  return (
    <div className="w-full my-10 mt-14">
      <div className="relative w-full h-full bg-gradient-to-r from-gray-900 via-black to-gray-900 overflow-hidden border border-emerald-500/50 shadow-[0_0_30px_rgba(16,185,129,0.4)] hover:shadow-[0_0_50px_rgba(16,185,129,0.6)] transition-all duration-500">
        {/* Animated gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 via-cyan-500/10 to-emerald-500/10 animate-[gradient_8s_ease_infinite] bg-[length:200%_100%]"></div>
        
        {/* Animated accent glows */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        
        {/* Floating particles */}
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-emerald-400/40 rounded-full animate-[float_6s_ease-in-out_infinite]"></div>
        <div className="absolute top-1/2 right-1/3 w-1.5 h-1.5 bg-cyan-400/40 rounded-full animate-[float_8s_ease-in-out_infinite]" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-1/3 left-1/2 w-1 h-1 bg-emerald-300/30 rounded-full animate-[float_7s_ease-in-out_infinite]" style={{ animationDelay: '4s' }}></div>
        
        <div className="relative h-full flex items-center justify-between py-8 p-10">
          {/* Left Content */}
          <div className="flex-1 space-y-3">
            <div className="flex items-center gap-3 group">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-emerald-500/30">
                <span className="text-xl animate-[bounce_2s_ease-in-out_infinite]">🏦</span>
              </div>
              <h1 className="text-4xl font-bold">
                <span className="text-white">Bank</span>
                <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent animate-[shimmer_3s_ease-in-out_infinite] bg-[length:200%_100%]">Core</span>
              </h1>
            </div>
            
            <p className="text-gray-400 text-sm max-w-md animate-[fadeIn_1s_ease-in]">
              Take mock tests for banking exams like SBI PO and IBPS.
            </p>

            <div className="flex items-center gap-4 pt-1">
              <button
                onClick={() => window.open("https://bankcore.vercel.app", "_blank")}
                className="px-2 py-2 bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-white font-semibold rounded-lg transition-all text-[12px] hover:scale-105 hover:shadow-lg hover:shadow-emerald-500/50 active:scale-95"
              >
                Start Testing
              </button>
              <div className="flex items-center gap-4 text-[10px] text-gray-500">
                <div className="flex border-1 border-gray-100/40 p-1 rounded-md items-center gap-1 hover:border-emerald-500/40 hover:bg-emerald-500/5 transition-all duration-300">
                  <span className="text-emerald-400 animate-[ping_2s_ease-in-out_infinite]">✓</span>
                  <span>10K+ Questions</span>
                </div>
                <div className="flex border-1 border-gray-100/40 p-1 rounded-md items-center gap-1 hover:border-cyan-500/40 hover:bg-cyan-500/5 transition-all duration-300">
                  <span className="text-emerald-400 animate-[ping_2s_ease-in-out_infinite]" style={{ animationDelay: '1s' }}>✓</span>
                  <span>Real-time Analysis</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Animated bottom accent line */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent animate-[shimmer_3s_ease-in-out_infinite] bg-[length:200%_100%]"></div>
      </div>

      <style jsx>{`
        @keyframes gradient {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        
        @keyframes shimmer {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) translateX(0px);
            opacity: 0.3;
          }
          50% {
            transform: translateY(-20px) translateX(10px);
            opacity: 0.6;
          }
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default BankMock;