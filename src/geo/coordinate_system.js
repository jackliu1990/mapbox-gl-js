/**
 * Created by liufeng on 2019/9/26.
 */
import Config from '../util/config';

function p(t, e, r) {
    return Math.min(r, Math.max(e, t));
}

const cs = {
    "EPSG:3857": {
        zoomOffset: 0,
        yFromLat: function (t) {
            return (180 - 180 / Math.PI * Math.log(Math.tan(Math.PI / 4 + t * Math.PI / 360))) / 360;
        },
        latFromY: function (t) {
            var e = 180 - 360 * t;
            return 360 / Math.PI * Math.atan(Math.exp(e * Math.PI / 180)) - 90;
        },
        getMaxLat: function () {
            return 85.051129;
        },
        project: function (t, e, r, n, i) {
            var a = 180 - 360 * (e + n) / i;
            return [360 * (t + r) / i - 180, 360 / Math.PI * Math.atan(Math.exp(a * Math.PI / 180)) - 90];
        },
        projectY: function (t) {
            const e = Math.sin(t * Math.PI / 180);
            const r = .5 - .25 * Math.log((1 + e) / (1 - e)) / Math.PI;
            return r < 0 ? 0 : r > 1 ? 1 : r;
        }
    },
    "EPSG:4490": {
        zoomOffset: -1,
        yFromLat: function (t) {
            return (90 - t) / 360;
        },
        latFromY: function (t) {
            return p(90 - 360 * t, -90, 90);
        },
        getMaxLat: function () {
            return 90;
        },
        project: function (t, e, r, n, i) {
            return [360 * (t + r) / i - 180, 90 - 360 * (e + n) / i];
        },
        projectY: function (t) {
            const e = .25 - t / 360;
            return e < 0 ? 0 : e > .5 ? .5 : e;
        }
    },
    "EPSG:4326": {
        zoomOffset: -1,
        yFromLat: function (t) {
            return (90 - t) / 360;
        },
        latFromY: function (t) {
            return p(90 - 360 * t, -90, 90);
        },
        getMaxLat: function () {
            return 90;
        },
        project: function (t, e, r, n, i) {
            return [360 * (t + r) / i - 180, 90 - 360 * (e + n) / i];
        },
        projectY: function (t) {
            const e = .25 - t / 360;
            return e < 0 ? 0 : e > .5 ? .5 : e;
        }
    }
}
export const hs = {
    getProjection: function (t) {
        return cs[t];
    }
};

export function getMaxLat() {
    return hs.getProjection(Config.CRS).getMaxLat();
}

export function getDefaultZoomOffset () {
    return hs.getProjection(Config.CRS).zoomOffset;
}

export function fs(t) {
    return hs.getProjection(Config.CRS).latFromY(t);
}

export function ys(t, e, r, n, i) {
    return hs.getProjection(Config.CRS).project(t, e, r, n, i);
}

export function ds(t, e) {
    return hs.getProjection(e).projectY(t);
}

export function ms(t) {
    for (var e, r, n = 0, i = 0, a = t.length, o = a - 1; i < a; o = i++)
        e = t[i],
            n += ((r = t[o]).x - e.x) * (e.y + r.y);
    return n;
}
