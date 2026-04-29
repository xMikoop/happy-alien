import JumpingAliens from "@/components/JumpingAliens";

export default function DevOpsPage() {
  return (
    <div className="container mx-auto px-4 py-20 min-h-screen flex flex-col items-center justify-center gap-10">
      <div className="max-w-2xl bg-space-800 p-10 border-4 border-white rounded-3xl shadow-[10px_10px_50px_rgba(255,255,255,0.1)]">
        <h1 className="font-display text-2xl text-walszak mb-6">DevOps - zaklęcie, które nie działa</h1>
        <p className="text-zinc-300 leading-relaxed font-mono">
          DevOps to magiczne zaklęcie, które ma ożywić papugę. 
          Automatyzacja to rytuał, który wykonuje się, mimo że nikt nie wie, co on robi. 
          'To działa na moim komputerze', mrużący się DevOp zauważa, a papuga znów umiera. 
          Wszystkiemu towarzyszy niepokojący świst inkwizycji.
        </p>
      </div>
      <JumpingAliens />
    </div>
  );
}
