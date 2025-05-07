import { handleDatabaseQuery } from "@/utils/handleDatabaseQuery";

export async function GET() {
  return handleDatabaseQuery("tasks");
}
