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
<<<<<<< HEAD
      ) VALUES (?, ?, ?, ?, ?, ?, ?,?, ?)
=======
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
>>>>>>> d6a2b7c53b0e16ba693b69681a9a4db2e2532dac
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
