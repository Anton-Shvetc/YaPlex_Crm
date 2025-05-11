import { handleDatabaseCreate } from "@/utils/handleDatabaseCreate";
import { handleDatabaseQuery } from "@/utils/handleDatabaseQuery";
import { Task, TokenDataI } from "@/utils/types";
import { NextRequest } from "next/server";

export async function GET() {
  return handleDatabaseQuery("tasks");
}

export async function POST(request: NextRequest) {
  return handleDatabaseCreate<Task>(request, {
    entityName: "tasks",
    requiredFields: ["name", "dealId", "executor"],
    chechIsActive: false,
    // uniqueFields: ["email"],
    insertQuery: `
        INSERT INTO tasks (
          name,  description, deadline, dealId, executor,  status, userCompanyKey,  authorId, created_at, update_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
    prepareData: (data: Task, { userId, userCompanyKey }: TokenDataI) => [
      data.name,
      data.description,
      data.deadline,
      data.dealId,
      data.executor,
      data.status,
      userCompanyKey,
      userId,
      new Date().toISOString(),
      new Date().toISOString(),
    ],
  });
}
