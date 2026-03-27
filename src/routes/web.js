const express = require('express');
const router = express.Router();
// const { 
//   addSession,
//   stopSessionButton,
//   getDataLoggingSession,
//   getDataLoggingSessionById,
//   deleteSession
// } = require('../controllers/sessionController')
// const { addLog } = require('../controllers/logController');
// const { addStatistic } = require('../controllers/statisticController');

// halaman utama
router.get('/', (req, res) => {
  res.sendFile('index.html', { root: './src/public' });
  // res.status(200).json({
  //   statusCode: 200,
  //   message: '3-Phase Power Logger PT Bukit Asam Kertapati Port',
  // });
});

router.get('/logging', (req, res) => {
  res.sendFile('logging.html', { root: './src/public/pages'})
})

router.get('/logging_session', (req, res) => {
  res.sendFile('logging_session.html', { root: './src/public/pages'})
})

router.get('/logging_detail/:id', (req, res) => {
  res.sendFile('logging_detail.html', { root: './src/public/pages'})
})

router.get('/device', (req, res) => {
  res.sendFile('device.html', { root: './src/public/pages'})
})

router.get('/report', (req, res) => {
  res.sendFile('report.html', { root: './src/public/pages'})
})

router.get("/about", (req, res) => {
  res.sendFile("about.html", { root: "./src/public/pages" });
});

// router.post('/add_sessions', addSession)

// router.get('/stop_session_button', stopSessionButton)

// router.post('/statistic', addStatistic)

// router.get('/get_data_logging_sesssion', getDataLoggingSession);
// router.get('/get_detail_logging_session/:id', getDataLoggingSessionById);
// router.delete('/delete_session/:id', deleteSession)

// router.post('/add_logs', addLog)

module.exports = router;