// Este archivo extiende el entorno de prueba de Jest.

import "@testing-library/jest-dom";
import { TextEncoder, TextDecoder } from "util";

// Polyfill para TextEncoder/TextDecoder
if (typeof global.TextEncoder === "undefined") {
  (global as any).TextEncoder = TextEncoder;
}

if (typeof global.TextDecoder === "undefined") {
  (global as any).TextDecoder = TextDecoder;
}

// Polyfill para ResizeObserver
global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  }),
});

Object.defineProperty(window, "localStorage", {
  value: {
    getItem: jest.fn(() => null),
    setItem: jest.fn(),
    clear: jest.fn(),
    removeItem: jest.fn(),
  },
  writable: true,
});

Object.defineProperty(document, "documentElement", {
  value: {
    classList: {
      toggle: jest.fn(),
      add: jest.fn(),
      remove: jest.fn(),
    },
  },
  writable: true,
});

Object.defineProperty(document, "dispatchEvent", {
  value: jest.fn(),
});

// Mock para Cesium
jest.mock('cesium', () => ({
  Ion: {
    defaultAccessToken: '',
  },
  buildModuleUrl: jest.fn((relativePath: string) => relativePath),
  TileMapServiceImageryProvider: {
    fromUrl: jest.fn().mockResolvedValue({}),
  },
  ArcGisMapServerImageryProvider: {
    fromUrl: jest.fn().mockResolvedValue({}),
  },
  ScreenSpaceEventType: {
    LEFT_DOUBLE_CLICK: 'LEFT_DOUBLE_CLICK',
  },
  ScreenSpaceEventHandler: jest.fn().mockImplementation(() => ({
    setInputAction: jest.fn(),
    destroy: jest.fn(),
  })),
  Ellipsoid: {
    WGS84: {
      cartesianToCartographic: jest.fn().mockReturnValue({
        longitude: 0,
        latitude: 0,
      }),
    },
  },
  Math: {
    toRadians: (degrees: number) => (degrees * Math.PI) / 180,
  },
  Viewer: jest.fn().mockImplementation(() => ({
    destroy: jest.fn(),
    isDestroyed: jest.fn().mockReturnValue(false),
    cesiumWidget: {
      screenSpaceEventHandler: {
        removeInputAction: jest.fn(),
      },
    },
    scene: {
      globe: {
        enableLighting: true,
        dynamicAtmosphereLighting: true,
        dynamicAtmosphereLightingFromSun: true,
        maximumScreenSpaceError: 1.0,
        ellipsoid: {},
      },
      sun: { show: true },
      moon: { show: true },
      skyBox: { show: true },
      skyAtmosphere: { show: true },
      fog: { enabled: false },
      backgroundColor: {},
      screenSpaceCameraController: {
        minimumZoomDistance: 1000000,
        maximumZoomDistance: 40000000,
      },
      camera: {
        setView: jest.fn(),
        flyTo: jest.fn(),
        pickEllipsoid: jest.fn().mockReturnValue({}),
      },
      canvas: {},
      postProcessStages: {
        fxaa: { enabled: true },
      },
    },
    camera: {
      setView: jest.fn(),
      flyTo: jest.fn(),
      heading: 0,
      pickEllipsoid: jest.fn().mockReturnValue({}),
    },
    entities: {
      add: jest.fn(),
    },
    dataSources: {
      add: jest.fn(),
      removeAll: jest.fn(),
    },
    flyTo: jest.fn(),
    imageryLayers: {
      removeAll: jest.fn(),
      addImageryProvider: jest.fn().mockReturnValue({
        brightness: 1,
        contrast: 1,
      }),
    },
  })),
  Cartesian3: {
    fromDegrees: jest.fn(),
    fromRadians: jest.fn(),
  },
  Color: {
    RED: {},
    BLUE: {},
    BLACK: {},
  },
  CallbackProperty: jest.fn(),
  Entity: jest.fn(),
  LabelGraphics: jest.fn(),
  PointGraphics: jest.fn(),
  OpenStreetMapImageryProvider: jest.fn().mockImplementation(() => ({})),
  createWorldImageryAsync: jest.fn().mockResolvedValue({}),
  KmlDataSource: {
    load: jest.fn().mockResolvedValue({
      entities: { values: [] },
    }),
  },
}));
