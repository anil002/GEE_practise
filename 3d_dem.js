

  
 var dem = ee.Image('UK/EA/ENGLAND_1M_TERRAIN/2022')
    .select('dtm')
    .resample('bilinear')
    
  var utils = require('users/gena/packages:utils')
  var land = ee.Image('users/gena/land_polygons_image').mask()
  
  dem = dem.updateMask(land)
  
  var demStyled = dem.visualize({ 
    min: 0, 
    max: 6000, 
    palette: [
  "#000004",
  "#2C105C",
  "#711F81",
  "#B63679",
  "#EE605E",
  "#FDAE78",
  "#FCFDBF"
]
  })
  
  //Map.addLayer(demStyled, {}, 'dem1', false)
  
  var weight = 2.0
  var extrusion = 500
  var sunAzimuth = 315
  var sunElevation = 25

  var demHillshaded = utils.hillshadeRGB(demStyled, dem, weight, extrusion, 
                                         sunAzimuth, sunElevation)
  
  Map.addLayer(demHillshaded, {}, 'dem', true)
var text = require('users/gena/packages:text')
// Import country features 
//var countries = ee.FeatureCollection('USDOS/LSIB_SIMPLE/2017');

// Define an empty image to paint features to.
var empty = ee.Image().byte();

// Paint country feature edges to the empty image.
var countriesOutline = empty
  .paint({featureCollection: countries, color: 3, width: 2})
  // Convert to an RGB visualization image; set line color to black.
  .visualize({palette: '#ff06f7'});
  Map.addLayer(countriesOutline);

//Map.setOptions('HYBRID')
//Map.addLayer(ee.Image(0), {}, 'dark', true, 0.6)
