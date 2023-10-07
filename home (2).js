// home.js
document.addEventListener('DOMContentLoaded', function () {
  const excelFileInput = document.getElementById('excelFileInput');
  const uploadButton = document.getElementById('uploadButton');

  uploadButton.addEventListener('click', function () {
    const file = excelFileInput.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = function (event) {
        const arrayBuffer = event.target.result;

        const XLSX = window.XLSX; // Use the global XLSX object provided by the script tag
        const workbook = XLSX.read(arrayBuffer, { type: 'array' });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        const data = XLSX.utils.sheet_to_json(worksheet);

        const Traffic = data.map(entry => entry.Traffic);
        const Sales_Record = data.map(entry => entry.Sales_Record);

        const queryParams = `?traffic=${encodeURIComponent(JSON.stringify(Traffic))}&sales=${encodeURIComponent(JSON.stringify(Sales_Record))}`;
        window.location.href = `output.html${queryParams}`;
      };

      reader.readAsArrayBuffer(file);
    } else {
      alert('Please select an Excel file to upload.');
    }
  });
});
