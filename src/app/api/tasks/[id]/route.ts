import { handleDatabaseUpdate } from "@/utils/handleDatabaseUpdate";
import { Task } from "@/utils/types";

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  return handleDatabaseUpdate<Task>(
    request,
    { params },
    {
      entityName: "deals",
      requiredFields: ["name"],
      uniqueFields: ["name"],
      updateQuery: `
      UPDATE deals SET
               name = ? ,  description = ?, deadline = ?, dealId = ?, executor = ?,  status = ?,  update_at = ?

      WHERE id = ? AND userCompanyKey = ?
    `,
      prepareData: (data: Task, { userCompanyKey }, id) => [
        data.name,
        data.description,
        data.deadline,
        data.dealId,
        data.executor,
        data.status,
        new Date().toISOString(),
        id,
        userCompanyKey,
      ],
    }
  );
}
