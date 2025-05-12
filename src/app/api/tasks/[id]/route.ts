import { handleDatabaseUpdate } from "@/utils/handleDatabaseUpdate";
import { Task } from "@/utils/types";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  const { id } = await params;
  return handleDatabaseUpdate<Task>(request, id, {
    entityName: "tasks",
    requiredFields: ["name"],
    // uniqueFields: ["name"],
    chechIsActive: false,
    updateQuery: `
      UPDATE tasks SET
        name = ?,  
        description = ?, 
        deadline = ?, 
        dealId = ?, 
        executor = ?,  
        status = ?,  
        update_at = ?
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
  });
}
