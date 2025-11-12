export default {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "^.+\\.(css|scss|sass|less)$": "identity-obj-proxy",
    "^cesium/Build/Cesium/Widgets/widgets\\.css$": "identity-obj-proxy",
    "^cesium/(.*)$": "<rootDir>/node_modules/cesium/$1",
  },
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
  transform: {
    "^.+\\.(ts|tsx)$": ["ts-jest", {
      useESM: true,
      tsconfig: {
        esModuleInterop: true,
        allowSyntheticDefaultImports: true,
      }
    }],
  },
  extensionsToTreatAsEsm: [".ts", ".tsx"],
  testEnvironmentOptions: {
    customExportConditions: ["node", "node-addons"],
  },
};