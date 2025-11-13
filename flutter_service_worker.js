'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"assets/AssetManifest.bin": "5650bf4f01ea57cf3dbc9d8bb9f328fe",
"assets/AssetManifest.bin.json": "73d2b6696a9cfcfb85ee56d9ef286024",
"assets/AssetManifest.json": "969adf8eb4fc02b1bd62f06953f9bbbc",
"assets/assets/hi.gif": "cad5918d86b6a7e83f1fb4acead70e4c",
"assets/assets/icons/facebook.png": "f0678bc387896fd3470fd4b8ace0a382",
"assets/assets/icons/github.png": "62a346f157cc478e0539d8d58c43b5ef",
"assets/assets/icons/instagram.png": "a7c31773161d5b9c8848e32755f2cf0f",
"assets/assets/icons/linkedin.png": "475b1f2113055e7e69128c4dfbb4d916",
"assets/assets/icons/medium-monogram.png": "90d67518395177aef5996687b3f30e6b",
"assets/assets/icons/twitter.png": "aa9a1ff710452e4f49b775ede9815371",
"assets/assets/photos/app01/black-white.png": "5dbb53221c2ea79ce231a6970f51503b",
"assets/assets/photos/app01/colored.png": "9aa6641f07dd0377623d6676a0d22075",
"assets/assets/photos/app01/mobile.png": "2ddca3d9b0d3cb541ebfff542f6c77b0",
"assets/assets/photos/app02/black-white.png": "009927fb474497027e09151fc9b467ca",
"assets/assets/photos/app02/colored.png": "235ec45d00c54a7bfe118814d4d9415c",
"assets/assets/photos/app02/mobile.png": "bece62a35194b07fa08eba88f6224ba2",
"assets/assets/photos/app03/black-white.png": "c7cd26ff276240f0b70d09e738726105",
"assets/assets/photos/app03/colored.png": "d4c87de06747be2d6773f830bd831b1c",
"assets/assets/photos/app03/mobile.png": "fead7fcc64135e96c0160a0e3cef4b62",
"assets/assets/photos/app04/black-white.png": "aef7761f618478c81b79ee66d4f762e1",
"assets/assets/photos/app04/colored.png": "ee6e1cbb1e61398b790209f885c0a335",
"assets/assets/photos/app04/mobile.png": "881aa5028646180058945dc1c06d9321",
"assets/assets/photos/app05/black-white.png": "c90973bf5ba6280db7c8a1b64a431b95",
"assets/assets/photos/app05/colored.png": "170fca40740bed4064fd1fc1579610ac",
"assets/assets/photos/app05/mobile.png": "480ab21ef1a79233f6fa7495e70ae228",
"assets/assets/photos/black-white.png": "d977be96e66709810e2c35f9789a8198",
"assets/assets/photos/colored.png": "d3d79284d1f309cabac1484feec9d0af",
"assets/assets/photos/mobile.png": "eb625ae96e15795869da11d12ad9e063",
"assets/assets/projects/account.png": "05b953fc275dd366555b043bc1da00c5",
"assets/assets/projects/app01/screenshot-01.jpg": "167b294cb71059d8a65a657cae8e1efd",
"assets/assets/projects/app01/screenshot-02.jpg": "64a69ea45f44684c4fee456bd35e4718",
"assets/assets/projects/app01/screenshot-03.jpg": "8dfe34261e11adc396778d98a89ddf31",
"assets/assets/projects/app01/screenshot-04.jpg": "521fa15ecedd2472c5134c3b73b57658",
"assets/assets/projects/app02/screenshot-01.jpg": "f272bc0373926da3bf69947bfb1d6f65",
"assets/assets/projects/app02/screenshot-02.jpg": "24f8a2aec25e4ba75a7689702bdcbb4c",
"assets/assets/projects/app02/screenshot-03.jpg": "04f84f371ec0a68f56cf81402e51523f",
"assets/assets/projects/app02/screenshot-04.jpg": "8dbca9ee252e31bc86ca4148a4499503",
"assets/assets/projects/app03/screenshot-01.jpg": "66e0c4de08d0b6ce1c63a44433233242",
"assets/assets/projects/app03/screenshot-02.jpg": "167da21436ffd390abde9fac96b32b84",
"assets/assets/projects/app03/screenshot-03.jpg": "360545ea8aabecd7e0e1a3d375e086d6",
"assets/assets/projects/app03/screenshot-04.jpg": "a652d4a2dd89e85c2cd1cafa606784f7",
"assets/assets/projects/app03/screenshot-05.jpg": "98fe790617b4f7727568709d1f33ff23",
"assets/assets/projects/app04/screenshot-01.jpg": "a54f2a405ffbb0cdc1e586bd901fb77a",
"assets/assets/projects/app04/screenshot-02.jpg": "0ea86121f54c30daa528136f83c72c1a",
"assets/assets/projects/app04/screenshot-03.jpg": "c7990e9d021a12202be958f34a60b49b",
"assets/assets/projects/app04/screenshot-04.jpg": "e0d0ca1879fd57f7ba0d5b76f19f9444",
"assets/assets/projects/app05/screenshot-01.jpg": "2de64c13a9e22a68490387a886278812",
"assets/assets/projects/app05/screenshot-02.jpg": "de47a0882a3ef31d31ae60d6d85239c8",
"assets/assets/projects/app05/screenshot-03.jpg": "096dd99bd46f21ca38db30c2299fa4f7",
"assets/assets/projects/app05/screenshot-04.jpg": "2e6ff03ff70a18bc9d4771f75c3b4709",
"assets/assets/projects/login.png": "192e6911dd4f57b7a9c42386243331de",
"assets/assets/projects/pin_point.png": "5a67d173b860ba0e7f7588325c192263",
"assets/assets/projects/play_video.png": "0ffc34a654993cb71db5f7aa842f48d4",
"assets/assets/projects/screenshot-01.jpg": "37d7a29a73b0b4dcfb1d1ecd2498bbeb",
"assets/assets/projects/screenshot-02.jpg": "ccdb09d8c198a8acb5ff5f17e331c095",
"assets/assets/projects/screenshot-03.jpg": "2b9b8b8996069cd122d5e19b729394c9",
"assets/assets/projects/screenshot-04.jpg": "00e44cfeffeb3a0f26395fb02a5994cd",
"assets/assets/projects/screenshot-05.jpg": "3a845472966dcfc5985354c8fd2bcdfc",
"assets/assets/projects/upload.png": "e2d1978b8cefd0c38a4933119704c37a",
"assets/assets/services/albert.png": "374f1b946192f2c93b3e6c7cc0098770",
"assets/assets/services/app_store.png": "6433cd201048617ac7632dca4df47aca",
"assets/assets/services/enric.png": "382b2d26550404c0dc03fc78f2df0f5f",
"assets/assets/services/kio.png": "33a964c89907649b57b8cdcf4243bc44",
"assets/assets/services/open.png": "4a5996597d32b06d91183f0860c29aab",
"assets/assets/services/open_b.png": "b65517dd1a07922b014409bb8dcb1e81",
"assets/assets/services/play_store.png": "39d83405d72ca655e171b2201530c739",
"assets/data.json": "09dfc9eb55819e52c3dc74b0f114dae8",
"assets/FontManifest.json": "9dfe3f6017169d21248b1eb4cd8f5ab9",
"assets/fonts/MaterialIcons-Regular.otf": "06093afa53f46dec5c2b5d175d3e0af5",
"assets/fonts/montserrat/montserrat.ttf": "ee6539921d713482b8ccd4d0d23961bb",
"assets/fonts/poppins/Poppins-Bold.ttf": "a3e0b5f427803a187c1b62c5919196aa",
"assets/fonts/poppins/Poppins-Italic.ttf": "5e956c44060a7b3c0e39819ae390ab15",
"assets/fonts/poppins/Poppins-Light.ttf": "f6ea751e936ade6edcd03a26b8153b4a",
"assets/fonts/poppins/Poppins-Medium.ttf": "f61a4eb27371b7453bf5b12ab3648b9e",
"assets/fonts/poppins/Poppins-Regular.ttf": "8b6af8e5e8324edfd77af8b3b35d7f9c",
"assets/fonts/poppins/Poppins-SemiBold.ttf": "4cdacb8f89d588d69e8570edcbe49507",
"assets/NOTICES": "04894c243c2a17ba1d8da2ba0401215b",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "33b7d9392238c04c131b6ce224e13711",
"assets/packages/font_awesome_flutter/lib/fonts/Font-Awesome-7-Brands-Regular-400.otf": "1fcba7a59e49001aa1b4409a25d425b0",
"assets/packages/font_awesome_flutter/lib/fonts/Font-Awesome-7-Free-Regular-400.otf": "b2703f18eee8303425a5342dba6958db",
"assets/packages/font_awesome_flutter/lib/fonts/Font-Awesome-7-Free-Solid-900.otf": "5b8d20acec3e57711717f61417c1be44",
"assets/shaders/ink_sparkle.frag": "ecc85a2e95f5e9f53123dcaf8cb9b6ce",
"canvaskit/canvaskit.js": "140ccb7d34d0a55065fbd422b843add6",
"canvaskit/canvaskit.js.symbols": "58832fbed59e00d2190aa295c4d70360",
"canvaskit/canvaskit.wasm": "07b9f5853202304d3b0749d9306573cc",
"canvaskit/chromium/canvaskit.js": "5e27aae346eee469027c80af0751d53d",
"canvaskit/chromium/canvaskit.js.symbols": "193deaca1a1424049326d4a91ad1d88d",
"canvaskit/chromium/canvaskit.wasm": "24c77e750a7fa6d474198905249ff506",
"canvaskit/skwasm.js": "1ef3ea3a0fec4569e5d531da25f34095",
"canvaskit/skwasm.js.symbols": "0088242d10d7e7d6d2649d1fe1bda7c1",
"canvaskit/skwasm.wasm": "264db41426307cfc7fa44b95a7772109",
"canvaskit/skwasm_heavy.js": "413f5b2b2d9345f37de148e2544f584f",
"canvaskit/skwasm_heavy.js.symbols": "3c01ec03b5de6d62c34e17014d1decd3",
"canvaskit/skwasm_heavy.wasm": "8034ad26ba2485dab2fd49bdd786837b",
"favicon.png": "c47d95503938f5dc42ece47be823c825",
"flutter.js": "888483df48293866f9f41d3d9274a779",
"flutter_bootstrap.js": "1b107e7dd49a7e79ca1ceb4fbcdc1d55",
"icons/Icon-192.png": "2266802c94848ad70d17639e31e0292d",
"icons/Icon-512.png": "50da9a22c1654441f30850438229489d",
"icons/Icon-maskable-192.png": "513da04deafd8d76b1b981750020c327",
"icons/Icon-maskable-512.png": "c85fb697d6347b580fc1685469cd29eb",
"index.html": "e3f03f94588b2b2b53b0e8f0046a1cda",
"/": "e3f03f94588b2b2b53b0e8f0046a1cda",
"main.dart.js": "7290e662e7e8fba9d45673a8577a82a6",
"manifest.json": "1a2da045f6276ba994c3d8ba34c5fedc",
"version.json": "f8dc9ddcf7cb5d6c06598adc25eb50a3"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"flutter_bootstrap.js",
"assets/AssetManifest.bin.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});
// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        // Claim client to enable caching on first launch
        self.clients.claim();
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      // Claim client to enable caching on first launch
      self.clients.claim();
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});
// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});
self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});
// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
