// ESLint v9 flat config
import js from "@eslint/js";
import tsParser from "@typescript-eslint/parser";

export default [
  // Ignorar directorios de build, dependencias y assets externos
  {
    ignores: [
      "dist/**",
      "node_modules/**",
      "coverage/**",
      "public/assets/**", // Ignorar assets externos como Cesium
      "src/assets/**",    // Ignorar assets en src
      "**/*.min.js",      // Ignorar archivos minificados
    ],
  },

  // Reglas base recomendadas de ESLint para JS/TS
  {
    ...js.configs.recommended,
    files: ["**/*.{js,cjs,mjs,ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2024,
      sourceType: "module",
    },
  },

  // Soporte de parser para TypeScript y TSX (sin reglas específicas)
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 2024,
        sourceType: "module",
        ecmaFeatures: { jsx: true },
        project: false,
      },
      // Globals de entorno navegador/DOM para evitar falsos positivos de no-undef
      globals: {
        window: "readonly",
        document: "readonly",
        localStorage: "readonly",
        console: "readonly",
        CustomEvent: "readonly",
        requestAnimationFrame: "readonly",
        ResizeObserver: "readonly",
        HTMLInputElement: "readonly",
        HTMLDivElement: "readonly",
        SpeechSynthesisVoice: "readonly",
        SpeechSynthesisUtterance: "readonly",
        React: "readonly",
        // Cesium.js globals
        setTimeout: "readonly",
        clearTimeout: "readonly",
        setInterval: "readonly",
        clearInterval: "readonly",
        FileReader: "readonly",
        XMLHttpRequest: "readonly",
        WebGLRenderingContext: "readonly",
        Image: "readonly",
        Canvas: "readonly",
        navigator: "readonly",
        location: "readonly",
        history: "readonly",
        performance: "readonly",
        URL: "readonly",
        Blob: "readonly",
        ArrayBuffer: "readonly",
        Uint8Array: "readonly",
        Float32Array: "readonly",
        Float64Array: "readonly",
      },
    },
    rules: {
      // En TS, delegar indefinidos al chequeo de tipos de TypeScript
      "no-undef": "off",
    },
  },

  // Overrides para archivos de test y setup: habilitar globals de Jest
  {
    files: ["**/*.test.ts", "**/*.test.tsx", "src/setupTests.ts"],
    languageOptions: {
      globals: {
        describe: "readonly",
        test: "readonly",
        it: "readonly",
        expect: "readonly",
        beforeEach: "readonly",
        afterEach: "readonly",
        jest: "readonly",
        vi: "readonly",
        window: "readonly",
        document: "readonly",
      },
    },
    rules: {
      "no-undef": "off",
    },
  },

  // Overrides para archivos de configuración CommonJS específicos
  {
    files: ["postcss.config.cjs"],
    languageOptions: {
      sourceType: "commonjs",
      globals: {
        require: "readonly",
        module: "readonly",
        __dirname: "readonly",
        process: "readonly",
        exports: "readonly",
      },
    },
  },

  // Overrides para archivos de mocks
  {
    files: ["src/__mocks__/**"],
    languageOptions: {
      sourceType: "module",
      globals: {
        module: "readonly",
        require: "readonly",
        exports: "readonly",
      },
    },
    rules: {
      "no-undef": "off",
    },
  },

  // Overrides para configs ESM
  {
    files: ["eslint.config.js", "jest.config.js"],
    languageOptions: {
      sourceType: "module",
    },
  },
];


