import ClientRootLayout from "./ClientRootLayout";
import { getVsatIntakeFromSheet } from "@/lib/vsatSheet";

export const revalidate = 3600;

export default async function RootLayout({ children }) {
  const vsatIntake = await getVsatIntakeFromSheet();

  return (
    <ClientRootLayout vsatIntake={vsatIntake}>{children}</ClientRootLayout>
  );
}
