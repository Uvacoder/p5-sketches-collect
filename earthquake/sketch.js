/** Preloaded data: earthquakes and map image */
let data;
let mapimg;

/** Variables */
let zoom = 1;
let clon = 0;
let clat = 0;
let w = 1024;
let h = 512;

/** Loading data */
/** All data from https://earthquake.usgs.gov/earthquakes/feed/v1.0/csv.php */
function preload() {
    data = loadStrings('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.csv');
    mapimg = loadImage('https://api.mapbox.com/styles/v1/mapbox/dark-v9/static/'+clon+','+clat+','+zoom+'/'+w+'x'+h+'?access_token=pk.eyJ1IjoiY29kaW5ndHJhaW4iLCJhIjoiY2l6MGl4bXhsMDRpNzJxcDh0a2NhNDExbCJ9.awIfnl6ngyHoB3Xztkzarw');
}

/** Setting up canvas */
function setup() {

    /** Translating and drawing the map */
    createCanvas(w, h);
    translate(w / 2, h / 2);
    imageMode(CENTER);
    image(mapimg, 0, 0);

    /** Calculating center coordinates and maximum magnitude */
    let cx = netmercatorX(clon);
    let cy = netmercatorY(clat);

    /** Drawing all earthquakes */
    for (let i = 1; i < data.length; i++) {

        /** Getting relevant quake data */
        let quake = data[i].split(/,/);
        let lat = quake[1]; // Latitude
        let lon = quake[2]; // Longitude
        let dep = quake[3]; // Depth
        let mag = quake[4]; // Magnitude

        /** Transforming latitude and longitude into web mercator x,y coordinates */
        /** Source: https://en.wikipedia.org/wiki/Web_Mercator_projection */
        let x = netmercatorX(lon) - cx;
        let y = netmercatorY(lat) - cy;
        if (x < -0.5 * w) { x += w; }
        else if (x > 0.5 * w) { x -= w; }

        /** Drawing each earthquake according to its magnitude and depth */
        strokeWeight(sqrt(mag));
        stroke(40 * mag, 10 * mag, 40 * (10 - mag), 25 * mag);
        point(x, y);
    }

    /** Text */
    noStroke();
    textSize(10);
    textAlign(LEFT);
    fill(120);
    translate(- w / 2, - h / 2);
    text('Showing all earthquakes from the past month', 10, h - 60);
    text('Source on earthquakes: earthquake.usgs.gov', 10, h - 60 + 14);
    text('Inspired by Daniel Shiffman', 10, h - 60 + 28);
    textAlign(CENTER);
    text('Magnitude', w - 150, h - 80);

    /** Drawing magnitude color reference */
    for (let m = 0.0; m < 10.0; m += 0.01) {
        let x = (20 * m) + (w - 250);
        strokeWeight(0.1);
        stroke(40 * m, 10 * m, 40 * (10 - m), 25 * m);
        line(x, h - 40, x, h - 60);
    }
    noStroke();
    textSize(8);
    for (let m = 0; m < 11; m += 2) {
        let x = (20 * m) + (w - 250);
        text(m, x, h - 65);
    }
}

/** Functions to convert longitude and latitude to net mercator x, y coordinates */
function netmercatorX(l) {
    return (256 / PI) * pow(2, zoom) * (PI + radians(l));
}
function netmercatorY(l) {
    return (256 / PI) * pow(2, zoom) * (PI - log(tan(PI/4 + radians(l) / 2)));
}