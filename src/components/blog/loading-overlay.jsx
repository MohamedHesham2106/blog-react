import React from "react";

import { Loader2 } from "lucide-react";

export const LoadingOverlay = ({ fetching }) =>
  fetching ? (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/10 pointer-events-none">
      <Loader2 className="w-12 h-12 animate-spin text-primary" />
    </div>
  ) : null;
