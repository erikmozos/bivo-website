import { ReactNode } from "react";
import { X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import PrivacyPolicyContent from "./PrivacyPolicyContent";
import TermsConditionsContent from "./TermsConditionsContent";

type LegalDialogType = "privacy" | "terms";

interface LegalDialogProps {
  type: LegalDialogType;
  children: ReactNode;
}

const LegalDialog = ({ type, children }: LegalDialogProps) => {
  const title =
    type === "privacy" ? "Política de Privacidad" : "Términos y Condiciones";
  const description =
    type === "privacy"
      ? "Información sobre el tratamiento de tus datos personales por Bivo Training S.L."
      : "Información legal y condiciones de uso del sitio web y de la app Bivo Training.";

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent
        className="max-w-3xl w-[95vw] sm:w-full max-h-[85vh] p-0 gap-0 overflow-hidden rounded-lg border-2 border-bivo-green/30 bg-white sm:rounded-lg [&>button.absolute]:hidden"
      >
        <div className="flex items-center justify-between gap-4 border-b border-gray-200 bg-black px-6 py-4">
          <DialogTitle className="text-white font-round text-lg sm:text-xl font-semibold">
            <span className="text-bivo-green">Bivo</span> · {title}
          </DialogTitle>
          <DialogClose
            aria-label="Cerrar"
            className="inline-flex items-center justify-center rounded-md p-1.5 text-white opacity-90 transition hover:opacity-100 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-bivo-green focus:ring-offset-2 focus:ring-offset-black"
          >
            <X className="h-5 w-5" strokeWidth={2.5} />
            <span className="sr-only">Cerrar</span>
          </DialogClose>
        </div>
        <DialogDescription className="sr-only">{description}</DialogDescription>
        <div className="overflow-y-auto px-4 sm:px-6 py-6 max-h-[calc(85vh-64px)] bg-white text-black">
          {type === "privacy" ? (
            <PrivacyPolicyContent />
          ) : (
            <TermsConditionsContent />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LegalDialog;
