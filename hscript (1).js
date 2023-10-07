document.addEventListener('DOMContentLoaded', function () {
  const excelFileInput = document.getElementById('excelFileInput');
  const uploadButton = document.getElementById('uploadButton');

  uploadButton.addEventListener('click', function () {
    const file = excelFileInput.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = function (event) {
        const arrayBuffer = event.target.result;

        // Use the XLSX object directly from the loaded library
        const workbook = XLSX.read(arrayBuffer, { type: 'array' });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        const data = XLSX.utils.sheet_to_json(worksheet);

        // You can handle the extracted data as needed
        console.log(data);
      };

      reader.readAsArrayBuffer(file);
    } else {
      alert('Please select an Excel file to upload.');
    }
  });
});
