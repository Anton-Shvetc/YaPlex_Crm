import { handleDatabaseUpdate } from "@/utils/handleDatabaseUpdate";
import { Deal } from "@/utils/types";

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  return handleDatabaseUpdate<Deal>(
    request,
    { params },
    {
      entityName: "deals",
      requiredFields: ["name"],
      uniqueFields: ["name"],
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
    }
  );
}
