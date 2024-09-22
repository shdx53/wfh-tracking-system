// Component
import ArrangementForm from "@/components/arrangements/form";

export default function NewArrangement() {
  return (
    <div className="mx-auto my-8 flex max-w-lg justify-between gap-8 rounded-lg border p-6 sm:p-8 md:max-w-none">
      <div className="w-full space-y-6 md:w-1/2">
        <h1 className="text-xl font-bold">Create new arrangement</h1>
        <ArrangementForm />
      </div>
      <img
        src="/images/nubelson-fernandes-Y9V-pKSy0fw-unsplash.jpg"
        alt=""
        className="hidden w-1/2 md:block object-cover"
      />
    </div>
  );
}
