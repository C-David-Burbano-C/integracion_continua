import { useEffect, useRef } from 'react';
import * as Cesium from 'cesium';
import 'cesium/Build/Cesium/Widgets/widgets.css';

interface CesiumGlobeProps {
  kmlUrl?: string;
}

export default function CesiumGlobe({ kmlUrl = '/assets/earth/globo-terraqueo.kml' }: CesiumGlobeProps) {
  const cesiumContainer = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<Cesium.Viewer | null>(null);

  useEffect(() => {
    if (!cesiumContainer.current) return;

    // Set Cesium base URL for assets
    (window as any).CESIUM_BASE_URL = '/assets/cesium';
    
    // Disable Cesium Ion token requirement
    Cesium.Ion.defaultAccessToken = '';

    // Create the Cesium Viewer with high quality settings
    const viewer = new Cesium.Viewer(cesiumContainer.current, {
      terrainProvider: undefined, // No terrain to avoid token issues
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

    // Set OpenStreetMap as the imagery provider for better quality
    viewer.imageryLayers.removeAll();
    viewer.imageryLayers.addImageryProvider(
      new Cesium.OpenStreetMapImageryProvider({
        url: 'https://a.tile.openstreetmap.org/'
      })
    );

    // Prevent zooming inside the Earth
    viewer.scene.screenSpaceCameraController.minimumZoomDistance = 1000000; // 1 million meters
    viewer.scene.screenSpaceCameraController.maximumZoomDistance = 40000000; // 40 million meters

    // Set initial camera view (centered on Earth, global view)
    viewer.camera.setView({
      destination: Cesium.Cartesian3.fromDegrees(0.0, 20.0, 15000000) // Africa central, global view
    });

    // Enhance visual quality
    viewer.scene.globe.enableLighting = true; // Simulate real sunlight
    if (viewer.scene.skyBox) {
      viewer.scene.skyBox.show = true; // Show stars
    }
    if (viewer.scene.skyAtmosphere) {
      viewer.scene.skyAtmosphere.show = true; // Add blue atmosphere
    }
    viewer.scene.highDynamicRange = true; // More realistic colors

    viewerRef.current = viewer;

    // Load KML file
    const loadKML = async () => {
      try {
        const kmlDataSource = await Cesium.KmlDataSource.load(kmlUrl, {
          camera: viewer.scene.camera,
          canvas: viewer.scene.canvas
        });

        await viewer.dataSources.add(kmlDataSource);
        await viewer.flyTo(kmlDataSource);

        console.log('KML cargado exitosamente');
      } catch (error) {
        console.error('Error cargando el archivo KML:', error);
        
        // Fallback: fly to a default location (Colombia)
        viewer.camera.flyTo({
          destination: Cesium.Cartesian3.fromDegrees(-74.0721, 4.7110, 20000000)
        });
      }
    };

    loadKML();

    // Cleanup
    return () => {
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
