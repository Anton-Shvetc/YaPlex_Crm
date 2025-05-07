import { handleDatabaseCreate } from "@/utils/handleDatabaseCreate";
import { handleDatabaseQuery } from "@/utils/handleDatabaseQuery";
import { Deal } from "@/utils/types";

interface TokenDataI {
  userId: string;
  userCompanyKey: string;
}

export async function GET() {
  return handleDatabaseQuery("deals");
}

export async function POST(request: Request) {
  return handleDatabaseCreate<Deal>(request, {
    entityName: "deals",
    requiredFields: ["name", "clientId"],
    uniqueFields: ['name'],
    insertQuery: `
      INSERT INTO deals (
        name, clientId, amount, status, userCompanyKey, authorId, created_at, update_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `,
    prepareData: (data: Deal, { userId, userCompanyKey }: TokenDataI) => [
      data.name,
      data.clientId,
      data.amount,
      data.status,

      userCompanyKey,
      userId,
      new Date().toISOString(),
      new Date().toISOString(),
    ],
  });
}
