diff --git a/leaflet.drupal.js b/leaflet.drupal.js
index 383a6c9..75c1f70 100644
--- a/leaflet.drupal.js
+++ b/leaflet.drupal.js
@@ -6,7 +6,7 @@
       $(settings.leaflet).each(function () {
         // skip to the next iteration if the map already exists
         var container = L.DomUtil.get(this.mapId);
-        if (!container || container._leaflet_id) {
+        if (!container || container._leaflet_id || container._leaflet) {
           return;
         }