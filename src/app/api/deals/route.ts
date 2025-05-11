import { handleDatabaseCreate } from "@/utils/handleDatabaseCreate";
import { handleDatabaseQuery } from "@/utils/handleDatabaseQuery";
import { Deal, TokenDataI } from "@/utils/types";
import { NextRequest } from "next/server";

export async function GET() {
  return handleDatabaseQuery("deals");
}

export async function POST(request: NextRequest) {
  return handleDatabaseCreate<Deal>(request, {
    entityName: "deals",
    requiredFields: ["name", "clientId"],
    uniqueFields: ["name"],
    chechIsActive: false,
    insertQuery: `
      INSERT INTO deals (
        name, clientId, amount, status, description, userCompanyKey, authorId, created_at, update_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `,
    prepareData: (data: Deal, { userId, userCompanyKey }: TokenDataI) => [
      data.name,
      data.clientId,
      data.amount,
      data.status,
      data.description,
      userCompanyKey,
      userId,
      new Date().toISOString(),
      new Date().toISOString(),
    ],
  });
}
