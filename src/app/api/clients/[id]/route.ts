import { Client } from "@/utils/types";
import { handleDatabaseUpdate } from "@/utils/handleDatabaseUpdate";

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  return handleDatabaseUpdate<Client>(request, { params }, {
    entityName: "clients",
    requiredFields: ["name"],
    uniqueFields: ["email"],
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