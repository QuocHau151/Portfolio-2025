import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

interface PDFViewerProps {
  pdfUrl: string;
}

export function PDFViewer({ pdfUrl }: PDFViewerProps) {
  return (
    <div className="relative">
      <div className="">
        <Button
          variant="outline"
          size="sm"
          onClick={() => window.open(pdfUrl, "_blank")}
        >
          <Download className="mr-2 h-4 w-4" />
          Download PDF
        </Button>
      </div>
    </div>
  );
}
