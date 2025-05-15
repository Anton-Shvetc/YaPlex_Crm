import { handleDatabaseUpdate } from "@/utils/handleDatabaseUpdate";
import { Deal } from "@/utils/types";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  const { id } = await params;
  return handleDatabaseUpdate<Deal>(request, id, {
    entityName: "deals",
    requiredFields: ["name"],
    uniqueFields: ["name"],
    chechIsActive: false,
    updateQuery: `
      UPDATE deals SET
        name = ?,
        clientId = ?,
        amount = ?,
        status = ?,
        description = ?,
        update_at = ?
      WHERE id = ? AND userCompanyKey = ?
    `,
    prepareData: (data: Deal, { userCompanyKey }, id) => [
      data.name,
      data.clientId,
      data.amount,
      data.status,
      data.description,
      new Date().toISOString(),
      id,
      userCompanyKey,
    ],
  });
}
