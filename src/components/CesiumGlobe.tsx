import { useEffect, useRef } from 'react';
import * as Cesium from 'cesium';
import 'cesium/Build/Cesium/Widgets/widgets.css';

interface CesiumGlobeProps {
  kmlUrl?: string;
}

export default function CesiumGlobe({ kmlUrl = '/assets/earth/globo-terraqueo.kml' }: CesiumGlobeProps) {
  const cesiumContainer = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<Cesium.Viewer | null>(null);
  const doubleClickHandlerRef = useRef<Cesium.ScreenSpaceEventHandler | null>(null);
  const buildModuleUrl = Cesium.buildModuleUrl as typeof Cesium.buildModuleUrl & {
    setBaseUrl?: (baseUrl: string) => void;
  };

  useEffect(() => {
    if (!cesiumContainer.current) return undefined;

    let isDisposed = false;

    (window as any).CESIUM_BASE_URL = '/assets/cesium';
    if (typeof buildModuleUrl.setBaseUrl === 'function') {
      buildModuleUrl.setBaseUrl('/assets/cesium/');
    }
    Cesium.Ion.defaultAccessToken = undefined as unknown as string;

    const viewer = new Cesium.Viewer(cesiumContainer.current, {
      terrainProvider: undefined,
      baseLayerPicker: false,
      geocoder: true,
      homeButton: true,
      sceneModePicker: false,
      navigationHelpButton: false,
      animation: false,
      timeline: false,
      fullscreenButton: true,
      vrButton: false
    });

    const enhanceScene = () => {
      if (viewer.scene.globe) {
        viewer.scene.globe.enableLighting = true;
        viewer.scene.globe.dynamicAtmosphereLighting = true;
        viewer.scene.globe.dynamicAtmosphereLightingFromSun = true;
        viewer.scene.globe.maximumScreenSpaceError = 1.0;
      }

      if (viewer.scene.sun) viewer.scene.sun.show = true;
      if (viewer.scene.moon) viewer.scene.moon.show = true;
      if (viewer.scene.skyBox) viewer.scene.skyBox.show = true;
      if (viewer.scene.skyAtmosphere) viewer.scene.skyAtmosphere.show = true;
      if (viewer.scene.fog) viewer.scene.fog.enabled = false;

      viewer.scene.backgroundColor = Cesium.Color.BLACK;
      if (viewer.scene.postProcessStages?.fxaa) {
        viewer.scene.postProcessStages.fxaa.enabled = true;
      }
    };

    enhanceScene();

    const enableCinematicFlights = () => {
      if (!viewer.scene?.canvas) return;

      viewer.cesiumWidget?.screenSpaceEventHandler?.removeInputAction(
        Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK
      );

      const handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
      doubleClickHandlerRef.current = handler;

      handler.setInputAction(
        (click: Cesium.ScreenSpaceEventHandler.PositionedEvent) => {
          if (!click?.position) return;
          const ellipsoid = viewer.scene.globe?.ellipsoid ?? Cesium.Ellipsoid.WGS84;
          const cartesian = viewer.camera.pickEllipsoid?.(click.position, ellipsoid);
          if (!cartesian) return;

          const cartographic = Cesium.Ellipsoid.WGS84.cartesianToCartographic(cartesian);
          if (!cartographic) return;

          viewer.camera.flyTo({
            destination: Cesium.Cartesian3.fromRadians(
              cartographic.longitude,
              cartographic.latitude,
              1200000
            ),
            orientation: {
              heading: viewer.camera.heading,
              pitch: Cesium.Math.toRadians(-30),
              roll: 0
            },
            duration: 2.5
          });
        },
        Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK
      );
    };

    enableCinematicFlights();

    const loadDefaultImagery = async () => {
      try {
        const arcgisProvider = await Cesium.ArcGisMapServerImageryProvider.fromUrl(
          'https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer',
          { enablePickFeatures: false }
        );

        if (isDisposed || viewer.isDestroyed()) return;

        viewer.imageryLayers.removeAll();
        const baseLayer = viewer.imageryLayers.addImageryProvider(arcgisProvider);
        baseLayer.brightness = 1.2;
        baseLayer.contrast = 1.15;
      } catch (error) {
        console.error('Error cargando la textura en alta resolución:', error);
        try {
          const fallbackProvider = await Cesium.TileMapServiceImageryProvider.fromUrl(
            buildModuleUrl('Assets/Textures/NaturalEarthII')
          );

          if (isDisposed || viewer.isDestroyed()) return;

          viewer.imageryLayers.removeAll();
          viewer.imageryLayers.addImageryProvider(fallbackProvider);
        } catch (fallbackError) {
          console.error('Error cargando la textura de respaldo:', fallbackError);
        }
      }
    };

    loadDefaultImagery();

    // Prevent zooming inside the Earth
    viewer.scene.screenSpaceCameraController.minimumZoomDistance = 1000000; // 1 million meters
    viewer.scene.screenSpaceCameraController.maximumZoomDistance = 40000000; // 40 million meters

    // Set initial camera view (centered on Earth, global view)
    viewer.camera.setView({
      destination: Cesium.Cartesian3.fromDegrees(0.0, 20.0, 15000000) // Africa central, global view
    });

    viewerRef.current = viewer;

    // Load KML file
    const loadKML = async () => {
      try {
        const kmlDataSource = await Cesium.KmlDataSource.load(kmlUrl, {
          camera: viewer.scene.camera,
          canvas: viewer.scene.canvas
        });

        if (isDisposed || viewer.isDestroyed()) return;

        viewer.dataSources.removeAll();
        await viewer.dataSources.add(kmlDataSource);

        console.log('KML cargado exitosamente');
      } catch (error) {
        console.error('Error cargando el archivo KML:', error);
      }
    };

    loadKML();

    // Cleanup
    return () => {
      isDisposed = true;
      if (doubleClickHandlerRef.current) {
        doubleClickHandlerRef.current.destroy();
        doubleClickHandlerRef.current = null;
      }
      if (viewerRef.current) {
        viewerRef.current.destroy();
        viewerRef.current = null;
      }
    };
  }, [kmlUrl]);

  return (
    <div 
      ref={cesiumContainer} 
      className="w-full h-full"
      style={{ minHeight: '600px' }}
    />
  );
}
