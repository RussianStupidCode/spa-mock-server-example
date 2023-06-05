import { createRoot } from "react-dom/client";
import { axiosInstance } from "src/shared/api";
import App from "src/app";

const preInitialApp = async () => {
  // при проде vite выкенет этот кусок кода и импорта не будет =>
  // фейковый бэк не пойдет в прод (весит он не так много можно, можно и кастомными флагами импортить)
  if (import.meta.env.DEV) {
    const { MockServer, mockRoutes } = await import("src/fake-server");

    const mockServer = new MockServer(axiosInstance, { delayResponse: 300 });

    mockRoutes(mockServer);
  }
};

const startApp = async () => {
  await preInitialApp();
  const root = createRoot(document.querySelector("#root") as HTMLElement);

  root.render(<App></App>);
};

startApp();
