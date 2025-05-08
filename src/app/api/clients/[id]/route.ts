import { Client } from "@/utils/types";
import { handleDatabaseUpdate } from "@/utils/handleDatabaseUpdate";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  const { id } = await params;

  return handleDatabaseUpdate<Client>(request, id, {
    entityName: "clients",
    requiredFields: ["name", 'email', 'company'],
    uniqueFields: ["email", "company"],
    updateQuery: `
      UPDATE clients SET
        name = ?,
        email = ?,
        phone = ?,
        website = ?,
        comment = ?,
        company = ?,
        update_at = ?
      WHERE id = ? AND userCompanyKey = ?
    `,
    prepareData: (data: Client, { userCompanyKey }, id) => [
      data.name,
      data.email ?? null,
      data.phone ?? null,
      data.website ?? null,
      data.comment ?? null,
      data.company ?? null,
      new Date().toISOString(),
      id,
      userCompanyKey,
    ],
  });
}
