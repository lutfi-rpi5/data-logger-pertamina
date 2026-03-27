// ----------------------------------------------------
// Sidebar toggle
// ----------------------------------------------------
const toggler = document.querySelector(".toggler-btn");
const sidebar = document.querySelector("#sidebar");
const navLinks = document.querySelectorAll(".sidebar a[href]");

function isMobile() {
  return window.matchMedia("(max-width: 991.98px)").matches;
}

toggler.addEventListener("click", function () {
  if (isMobile()) {
    document.body.classList.toggle("mobile-sidebar-open");
    document.body.classList.remove("sidebar-collapsed");
  } else {
    document.body.classList.toggle("sidebar-collapsed");
    document.body.classList.remove("mobile-sidebar-open");
  }

  // Resize chart setelah layout bergeser
  setTimeout(() => {
    if (window.charts && Array.isArray(window.charts)) {
      window.charts.forEach((c) => c.resize());
    }
  }, 260);
});

// Tutup sidebar mobile saat klik menu
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    if (isMobile()) {
      document.body.classList.remove("mobile-sidebar-open");
    }
  });
});

// ----------------------------------------------------
// Back to top
// ----------------------------------------------------
const mybutton = document.getElementById("myBtn");

function scrollFunction() {
  if (document.documentElement.scrollTop > 20) {
    mybutton.style.display = "flex";
  } else {
    mybutton.style.display = "none";
  }
}

window.addEventListener("scroll", scrollFunction);

function topFunction() {
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
}

// ----------------------------------------------------
// Current time
// ----------------------------------------------------
function updateCurrentTime() {
  const now = new Date();
  document.getElementById("current-time").textContent = now.toLocaleString(
    "id-ID",
    {
      dateStyle: "medium",
      timeStyle: "medium",
    },
  );
}

setInterval(updateCurrentTime, 1000);
updateCurrentTime();

// ----------------------------------------------------
// Card mapping
// ----------------------------------------------------
const topicMap = {
  "lutpiii/workshop/voltage/l1": {
    id: "v_l1",
    label: "Voltage: ",
    suffix: " V",
  },
  "lutpiii/workshop/voltage/l2": {
    id: "v_l2",
    label: "Voltage: ",
    suffix: " V",
  },
  "lutpiii/workshop/voltage/l3": {
    id: "v_l3",
    label: "Voltage: ",
    suffix: " V",
  },

  "lutpiii/workshop/current/l1": {
    id: "i_l1",
    label: "Current: ",
    suffix: " A",
  },
  "lutpiii/workshop/current/l2": {
    id: "i_l2",
    label: "Current: ",
    suffix: " A",
  },
  "lutpiii/workshop/current/l3": {
    id: "i_l3",
    label: "Current: ",
    suffix: " A",
  },

  "lutpiii/workshop/frequency/l1": {
    id: "f_l1",
    label: "Frequency: ",
    suffix: " Hz",
  },
  "lutpiii/workshop/frequency/l2": {
    id: "f_l2",
    label: "Frequency: ",
    suffix: " Hz",
  },
  "lutpiii/workshop/frequency/l3": {
    id: "f_l3",
    label: "Frequency: ",
    suffix: " Hz",
  },

  "lutpiii/workshop/apparent_power/l1": {
    id: "va_l1",
    label: "Apparent Power: ",
    suffix: " VA",
  },
  "lutpiii/workshop/apparent_power/l2": {
    id: "va_l2",
    label: "Apparent Power: ",
    suffix: " VA",
  },
  "lutpiii/workshop/apparent_power/l3": {
    id: "va_l3",
    label: "Apparent Power: ",
    suffix: " VA",
  },

  "lutpiii/workshop/reactive_power/l1": {
    id: "var_l1",
    label: "Reactive Power: ",
    suffix: " VAr",
  },
  "lutpiii/workshop/reactive_power/l2": {
    id: "var_l2",
    label: "Reactive Power: ",
    suffix: " VAr",
  },
  "lutpiii/workshop/reactive_power/l3": {
    id: "var_l3",
    label: "Reactive Power: ",
    suffix: " VAr",
  },

  "lutpiii/workshop/active_power/l1": {
    id: "p_l1",
    label: "Active Power: ",
    suffix: " W",
  },
  "lutpiii/workshop/active_power/l2": {
    id: "p_l2",
    label: "Active Power: ",
    suffix: " W",
  },
  "lutpiii/workshop/active_power/l3": {
    id: "p_l3",
    label: "Active Power: ",
    suffix: " W",
  },

  "lutpiii/workshop/power_factor/l1": {
    id: "pf_l1",
    label: "Power Factor: ",
    suffix: "",
  },
  "lutpiii/workshop/power_factor/l2": {
    id: "pf_l2",
    label: "Power Factor: ",
    suffix: "",
  },
  "lutpiii/workshop/power_factor/l3": {
    id: "pf_l3",
    label: "Power Factor: ",
    suffix: "",
  },

  "lutpiii/workshop/active_energy/l1": {
    id: "e_l1",
    label: "Active Energy: ",
    suffix: " Wh",
  },
  "lutpiii/workshop/active_energy/l2": {
    id: "e_l2",
    label: "Active Energy: ",
    suffix: " Wh",
  },
  "lutpiii/workshop/active_energy/l3": {
    id: "e_l3",
    label: "Active Energy: ",
    suffix: " Wh",
  },
};

// ----------------------------------------------------
// Metric definitions
// ----------------------------------------------------
const METRICS = [
  {
    key: "voltage",
    title: "Voltage (V) Trend",
    unit: "V",
    softMin: 80,
    softMax: 300,
  },
  {
    key: "current",
    title: "Current (A) Trend",
    unit: "A",
    softMin: 0,
    softMax: 100,
  },
  {
    key: "frequency",
    title: "Frequency (Hz) Trend",
    unit: "Hz",
    softMin: 45,
    softMax: 55,
  },
  {
    key: "apparent_power",
    title: "Apparent Power (VA) Trend",
    unit: "VA",
    softMin: 0,
    softMax: 20000,
  },
  {
    key: "reactive_power",
    title: "Reactive Power (VAr) Trend",
    unit: "VAr",
    softMin: 0,
    softMax: 10000,
  },
  {
    key: "active_power",
    title: "Active Power (W) Trend",
    unit: "W",
    softMin: 0,
    softMax: 20000,
  },
  {
    key: "power_factor",
    title: "Power Factor Trend",
    unit: "",
    softMin: 0,
    softMax: 1,
  },
  {
    key: "active_energy",
    title: "Energy (Wh) Trend",
    unit: "Wh",
    softMin: 0,
    softMax: 100000,
  },
];

const topicToMetric = {};
["l1", "l2", "l3"].forEach((ph) => {
  topicToMetric[`lutpiii/workshop/voltage/${ph}`] = {
    idx: 0,
    phase: ph.toUpperCase(),
  };
  topicToMetric[`lutpiii/workshop/current/${ph}`] = {
    idx: 1,
    phase: ph.toUpperCase(),
  };
  topicToMetric[`lutpiii/workshop/frequency/${ph}`] = {
    idx: 2,
    phase: ph.toUpperCase(),
  };
  topicToMetric[`lutpiii/workshop/apparent_power/${ph}`] = {
    idx: 3,
    phase: ph.toUpperCase(),
  };
  topicToMetric[`lutpiii/workshop/reactive_power/${ph}`] = {
    idx: 4,
    phase: ph.toUpperCase(),
  };
  topicToMetric[`lutpiii/workshop/active_power/${ph}`] = {
    idx: 5,
    phase: ph.toUpperCase(),
  };
  topicToMetric[`lutpiii/workshop/power_factor/${ph}`] = {
    idx: 6,
    phase: ph.toUpperCase(),
  };
  topicToMetric[`lutpiii/workshop/active_energy/${ph}`] = {
    idx: 7,
    phase: ph.toUpperCase(),
  };
});

const colors = {
  L1: "#d71920",
  L2: "#163b7a",
  L3: "#0b7552",
};

const MAX_POINTS = 60;
const latest = {};
const charts = [];
window.charts = charts;

let lastMqttTime = Date.now();

// ----------------------------------------------------
// Init charts
// ----------------------------------------------------
for (let i = 0; i < METRICS.length; i++) {
  const titleEl = document.getElementById(`title_chart${i + 1}`);
  if (titleEl) titleEl.textContent = METRICS[i].title;

  const chartEl = document.getElementById(`chart${i + 1}`);
  const chart = echarts.init(chartEl);

  const option = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
        label: { backgroundColor: "#6a7985" },
      },
    },
    legend: {
      data: ["L1", "L2", "L3"],
      top: 28,
    },
    title: {
      top: 0,
      left: "center",
      text: METRICS[i].title,
      textStyle: {
        fontFamily: "Inter, sans-serif",
        fontSize: 14,
        fontWeight: 700,
        color: "#152033",
      },
    },
    grid: { left: "3%", right: "3%", top: 62, bottom: 42, containLabel: true },
    toolbox: {
      feature: { saveAsImage: {} },
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: [],
      axisLabel: { fontSize: 10 },
    },
    yAxis: {
      type: "value",
      boundaryGap: [0, "100%"],
      axisLabel: {
        formatter: (val) =>
          METRICS[i].unit ? `${val} ${METRICS[i].unit}` : `${val}`,
      },
      min: (v) => {
        if (isFinite(v.min)) return Math.min(METRICS[i].softMin, v.min * 0.95);
        return METRICS[i].softMin;
      },
      max: (v) => {
        if (isFinite(v.max)) return Math.max(METRICS[i].softMax, v.max * 1.05);
        return METRICS[i].softMax;
      },
    },
    series: [
      {
        name: "L1",
        type: "line",
        smooth: 0.35,
        showSymbol: false,
        data: [],
        z: 3,
        itemStyle: { color: colors.L1 },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: "rgba(215, 25, 32, 0.26)" },
            { offset: 1, color: "rgba(215, 25, 32, 0.02)" },
          ]),
        },
      },
      {
        name: "L2",
        type: "line",
        smooth: 0.35,
        showSymbol: false,
        data: [],
        z: 2,
        itemStyle: { color: colors.L2 },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: "rgba(22, 59, 122, 0.24)" },
            { offset: 1, color: "rgba(22, 59, 122, 0.02)" },
          ]),
        },
      },
      {
        name: "L3",
        type: "line",
        smooth: 0.35,
        showSymbol: false,
        data: [],
        z: 1,
        itemStyle: { color: colors.L3 },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: "rgba(11, 117, 82, 0.24)" },
            { offset: 1, color: "rgba(11, 117, 82, 0.02)" },
          ]),
        },
      },
    ],
  };

  chart.setOption(option);
  charts.push(chart);
}

// ----------------------------------------------------
// Socket IO
// ----------------------------------------------------
const socket = io();

socket.on("mqtt", ({ topic, value }) => {
  lastMqttTime = Date.now();

  const map = topicMap[topic];
  if (map) {
    const el = document.getElementById(map.id);
    if (el) {
      el.textContent = map.label + formatValue(value, map.suffix);
    }
  }

  const m = topicToMetric[topic];
  if (!m) return;

  if (!latest[m.idx]) latest[m.idx] = { L1: null, L2: null, L3: null };
  latest[m.idx][m.phase] = Number.isFinite(value) ? value : null;
});

// ----------------------------------------------------
// Push data to charts every second
// ----------------------------------------------------
setInterval(() => {
  const ts = new Date();
  const label = ts.toLocaleTimeString("id-ID", {
    hour12: false,
  });

  METRICS.forEach((meta, i) => {
    const ch = charts[i];
    const opt = ch.getOption();

    const x = opt.xAxis[0].data;
    x.push(label);
    if (x.length > MAX_POINTS) x.shift();

    const isStale = Date.now() - lastMqttTime > 3000;
    const curr = isStale
      ? { L1: null, L2: null, L3: null }
      : latest[i] || { L1: null, L2: null, L3: null };

    ["L1", "L2", "L3"].forEach((ph, sIdx) => {
      const seriesData = opt.series[sIdx].data;
      seriesData.push(curr[ph]);
      if (seriesData.length > MAX_POINTS) seriesData.shift();
    });

    ch.setOption(opt, { notMerge: false, lazyUpdate: true });
  });
}, 1000);

// ----------------------------------------------------
// Format helper
// ----------------------------------------------------
function formatValue(value, suffix) {
  if (!Number.isFinite(value)) return suffix ? `--${suffix}` : "--";

  let unit = suffix.trim();
  let num = value;

  if (["V", "W", "Wh", "VA", "VAr"].includes(unit) && num >= 1000) {
    num = num / 1000;
    unit = `k${unit}`;
  }

  if (!unit) return num.toFixed(2);
  return `${num.toFixed(2)} ${unit}`;
}

// ----------------------------------------------------
// Resize chart
// ----------------------------------------------------
window.addEventListener("resize", () => {
  charts.forEach((c) => c.resize());
});
