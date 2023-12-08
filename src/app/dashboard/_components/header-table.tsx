import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { Column } from "@tanstack/react-table";
import { Discipline } from "./columns";

export function HeaderTable({
  column,
  name,
}: {
  column: Column<Discipline, unknown>;
  name: string;
}) {
  return (
    <Button
      variant="ghost"
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      className="p-0"
    >
      {name}
      <ArrowUpDown className="ml-2 h-4 w-4" />
    </Button>
  );
}
