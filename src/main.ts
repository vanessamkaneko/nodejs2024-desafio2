import { ServerApplication } from "./application/server-application";


async function runApplication(): Promise<void> {
  const serverApplication: ServerApplication = ServerApplication.new();
  await serverApplication.run();
}

(async (): Promise<void> => {
  await runApplication();
})();
