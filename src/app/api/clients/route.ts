import { handleDatabaseQuery } from "@/utils/handleDatabaseQuery";
import { TokenDataI } from "@/utils/types";

import { Client } from "@/utils/types";
import { handleDatabaseCreate } from "@/utils/handleDatabaseCreate";

export async function GET() {
  return handleDatabaseQuery("clients");
}

export async function POST(request: Request) {
  return handleDatabaseCreate<Client>(request, {
    entityName: "clients",
    requiredFields: ["name", "email"],
    uniqueFields: ["email"],
    insertQuery: `
        INSERT INTO clients (
          name,  email, phone, website, comment,  company, userCompanyKey,  authorId, created_at, update_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `,
    prepareData: (data: Client, { userId, userCompanyKey }: TokenDataI) => [
      data.name,
      data.email,
      data.phone,
      data.website,
      data.comment,
      data.company,
      userCompanyKey,
      userId,
      new Date().toISOString(),
      new Date().toISOString(),
    ],
  });
}
