const SHEET_SOAL = "Soal_Jawaban";
const SHEET_RIWAYAT = "Riwayat_Hasil";

function doGet(e) {
  if (e && e.parameter && e.parameter.action) {
    return handleApiRequests(e.parameter.action, e.parameter);
  }
  
  initDatabase();

  return HtmlService.createTemplateFromFile('Index')
    .evaluate()
    .setTitle('Family 100 - Kuis TV Show SMP')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function doPost(e) {
  try {
    const payload = JSON.parse(e.postData.contents);
    const action = payload.action;
    
    let responseData = { success: false };

    if (action === "saveQuestion") {
      responseData = saveQuestionData(payload.data);
    } else if (action === "deleteQuestion") {
      responseData = deleteQuestionData(payload.id);
    } else if (action === "saveGameHistory") {
      responseData = saveGameHistoryData(payload.data);
    }

    return ContentService.createTextOutput(JSON.stringify(responseData))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ success: false, error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function handleApiRequests(action, params) {
  let result = {};
  switch (action) {
    case "getQuestions":
      result = getQuestionsData();
      break;
    case "initDb":
      result = initDatabase();
      break;
    default:
      result = { error: "Action tidak dikenal" };
  }
  return ContentService.createTextOutput(JSON.stringify(result))
    .setMimeType(ContentService.MimeType.JSON);
}

function initDatabase() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  
  let sheetSoal = ss.getSheetByName(SHEET_SOAL);
  if (!sheetSoal) {
    sheetSoal = ss.insertSheet(SHEET_SOAL);
  }
  
  if (sheetSoal.getLastRow() === 0) {
    const headersSoal = ["ID_Soal", "Pertanyaan"];
    for (let i = 1; i <= 10; i++) {
      headersSoal.push("Jwb_" + i, "Poin_" + i);
    }
    sheetSoal.appendRow(headersSoal);

    const dummyData = [
      [
        1, "Negara yang bergabung di ASEAN berdasarkan jumlah penduduk terbanyak",
        "Indonesia", 40, "Filipina", 17, "Vietnam", 14, "Thailand", 10, "Myanmar", 8,
        "Malaysia", 5, "Kamboja", 3, "Laos", 1, "Singapura", 1, "Brunei Darussalam", 1
      ],
      [
        2, "Perangkat komputer atau elektronik yang sering ada di sekolah",
        "Speaker", 30, "Tablet", 25, "Komputer", 20, "Smart Board", 12, "Laptop", 10,
        "CCTV", 7, "Wi Fi", 4, "Proyektor", 2, "", "", "", ""
      ],
      [
        3, "Perangkat komputer yang termasuk kategori input",
        "Keyboard", 40, "Mouse", 30, "Scanner", 20, "Microphone", 15, "Webcam", 10,
        "Touchscreen", 5, "", "", "", "", "", ""
      ],
      [
        4, "Perangkat komputer yang termasuk kategori output",
        "Monitor", 45, "Printer", 35, "Speaker", 25, "Proyektor", 15, "Headphone", 10,
        "", "", "", "", "", "", "", ""
      ],
      [
        5, "Landasan berpikir komputasional atau langkah-langkahnya",
        "Algoritma", 50, "Abstraksi", 40, "Pengenalan Pola", 35, "Dekomposisi", 25,
        "", "", "", "", "", "", "", "", "", ""
      ]
    ];

    dummyData.forEach(row => sheetSoal.appendRow(row));
  }

  let sheetRiwayat = ss.getSheetByName(SHEET_RIWAYAT);
  if (!sheetRiwayat) {
    sheetRiwayat = ss.insertSheet(SHEET_RIWAYAT);
  }
  if (sheetRiwayat.getLastRow() === 0) {
    sheetRiwayat.appendRow([
      "ID_Sesi", "Tanggal_Main", "Nama_Tim_1", "Skor_Tim_1", "Nama_Tim_2", "Skor_Tim_2", "Tim_Pemenang"
    ]);
  }

  return { success: true, message: "Database siap digunakan." };
}

function getQuestionsData() {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName(SHEET_SOAL);
    if (!sheet) return [];
    
    const data = sheet.getDataRange().getValues();
    if (data.length <= 1) return [];

    const questions = [];
    for (let i = 1; i < data.length; i++) {
      const row = data[i];
      const id = row[0];
      const pertanyaan = row[1];
      const jawaban = [];

      for (let j = 2; j < row.length; j += 2) {
        const teks = row[j];
        const poin = row[j + 1];
        if (teks !== "" && teks !== null && teks !== undefined) {
          jawaban.push({
            teks: String(teks).trim(),
            poin: Number(poin) || 0
          });
        }
      }

      questions.push({
        id: id,
        pertanyaan: pertanyaan,
        jawaban: jawaban
      });
    }
    return questions;
  } catch (err) {
    return { error: err.toString() };
  }
}

function saveQuestionData(dataObj) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName(SHEET_SOAL);
    const rows = sheet.getDataRange().getValues();
    
    const rowToSave = [
      dataObj.id || (rows.length > 1 ? Math.max(...rows.slice(1).map(r => r[0])) + 1 : 1),
      dataObj.pertanyaan
    ];

    for (let i = 0; i < 10; i++) {
      if (dataObj.jawaban && dataObj.jawaban[i]) {
        rowToSave.push(dataObj.jawaban[i].teks, dataObj.jawaban[i].poin);
      } else {
        rowToSave.push("", "");
      }
    }

    let existingRowIndex = -1;
    for (let i = 1; i < rows.length; i++) {
      if (rows[i][0] == dataObj.id) {
        existingRowIndex = i + 1;
        break;
      }
    }

    if (existingRowIndex > 0) {
      sheet.getRange(existingRowIndex, 1, 1, rowToSave.length).setValues([rowToSave]);
    } else {
      sheet.appendRow(rowToSave);
    }

    return { success: true };
  } catch (err) {
    return { success: false, error: err.toString() };
  }
}

function deleteQuestionData(id) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName(SHEET_SOAL);
    const rows = sheet.getDataRange().getValues();

    for (let i = 1; i < rows.length; i++) {
      if (rows[i][0] == id) {
        sheet.deleteRow(i + 1);
        return { success: true };
      }
    }
    return { success: false, message: "ID Soal tidak ditemukan." };
  } catch (err) {
    return { success: false, error: err.toString() };
  }
}

function saveGameHistoryData(historyObj) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(SHEET_RIWAYAT);
    if (!sheet) {
      initDatabase();
      sheet = ss.getSheetByName(SHEET_RIWAYAT);
    }

    const idSesi = "SESI-" + Date.now();
    const tanggal = new Date().toLocaleString("id-ID");

    sheet.appendRow([
      idSesi,
      tanggal,
      historyObj.namaTim1,
      historyObj.skorTim1,
      historyObj.namaTim2,
      historyObj.skorTim2,
      historyObj.pemenang
    ]);

    return { success: true };
  } catch (err) {
    return { success: false, error: err.toString() };
  }
}