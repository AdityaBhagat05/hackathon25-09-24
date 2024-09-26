// const fileSelector = document.querySelector("input");
// const start = document.querySelector("button");
// const img = document.querySelector("img");
// const progress = document.querySelector("progress");
// const textarea = document.querySelector("textarea");
// // External array of animal medicines
// const animalMedicines = ["Acriflavine", "Ammonia Detoxifier", "Amoxicillin", "Amphotericin B", "Antibiotic for Rabbits", "Aquarium Salt", "Aquatic Turtle Cleaning Solution", "Aquatic Turtle Treats", "Atopica", "Azithromycin", "Bacterial Infection Treatment", "Buprenorphine", "Calcium Gluconate", "Calcium Powder", "Carprofen", "Cephalexin", "Chloramphenicol", "Clindamycin", "Copper Sulfate", "Dental Chews for Rabbits", "Deracoxib", "Dexamethasone", "Diazepam", "Diphenhydramine", "Doxepin", "Doxycycline", "Ear Cleaner for Rabbits", "Enrofloxacin", "Erythromycin", "Famotidine", "Fenbendazole", "Firocoxib", "Flea Treatment for Rabbits", "Fluconazole", "Furazolidone", "Furosemide", "Gabapentin", "Hydroxyzine", "Itraconazole", "Kanamycin", "Levothyroxine", "Maropitant", "Meloxicam", "Methocarbamol", "Methylene Blue", "Metronidazole", "Nitrofurazone", "Pimobendan", "Praziquantel", "Prednisone", "Probiotics for Rabbits", "Rabbit Anxiety Relief", "Rabbit Calcium Supplement", "Rabbit First Aid Kit", "Rabbit Grooming Brush", "Rabbit Hairball Remedy", "Rabbit Hay", "Rabbit Hay Feeder", "Rabbit Pellets", "Rabbit Vitamin C Supplement", "Rabbit Vitamin Supplement", "Rabbit Wound Care Spray", "Reptile Heat Lamp", "Reptile Multivitamin", "Rimadyl", "Sertraline", "Sulfamethoxazole", "Tetracycline", "Tramadol", "Turtle Vitamin D3 Supplement", "Tylosin", "Vitamin A Supplement"];
// fileSelector.onchange = () => {
//     var file = fileSelector.files[0];
//     var imgUrl = window.URL.createObjectURL(new Blob([file], { type: 'image/jpg' }));
//     img.src = imgUrl;
// };
// start.onclick = () => {
//     textarea.innerHTML = '';
//     const rec = new Tesseract.TesseractWorker();
//     rec.recognize(fileSelector.files[0])
//         .progress(function (response) {
//             if (response.status == 'recognizing text') {
//                 progress.innerHTML = response.status + '   ' + response.progress;
//             } else {
//                 progress.innerHTML = response.status;
//             }
//         })
//         .then(function (data) {
//             const recognizedText = data.text;
//             //textarea.innerHTML = recognizedText;
//             //progress.innerHTML = "Done";
//             // Check if any medicine is present in the recognized text
//             animalMedicines.forEach(medicine => {
//                 if (recognizedText.includes(medicine)) {
//                     textarea.innerHTML =medicine;
//                     progress.innerHTML = "Done";
//                 }
//                 // else{
//                 //     textarea.innerHTML ="Error";
//                 //     progress.innerHTML = "Done";
//                 // }
//             });
//         });
// };
const fileSelector = document.querySelector("input");
const start = document.querySelector("button");
const img = document.querySelector("img");
const progress = document.querySelector("progress");
const textarea = document.querySelector("textarea");

// External array of animal medicines
const animalMedicines = ["Acriflavine", "Ammonia Detoxifier", "Amoxicillin", "Amphotericin B", "Antibiotic for Rabbits", "Aquarium Salt", "Aquatic Turtle Cleaning Solution", "Aquatic Turtle Treats", "Atopica", "Azithromycin", "Bacterial Infection Treatment", "Buprenorphine", "Calcium Gluconate", "Calcium Powder", "Carprofen", "Cephalexin", "Chloramphenicol", "Clindamycin", "Copper Sulfate", "Dental Chews for Rabbits", "Deracoxib", "Dexamethasone", "Diazepam", "Diphenhydramine", "Doxepin", "Doxycycline", "Ear Cleaner for Rabbits", "Enrofloxacin", "Erythromycin", "Famotidine", "Fenbendazole", "Firocoxib", "Flea Treatment for Rabbits", "Fluconazole", "Furazolidone", "Furosemide", "Gabapentin", "Hydroxyzine", "Itraconazole", "Kanamycin", "Levothyroxine", "Maropitant", "Meloxicam", "Methocarbamol", "Methylene Blue", "Metronidazole", "Nitrofurazone", "Pimobendan", "Praziquantel", "Prednisone", "Probiotics for Rabbits", "Rabbit Anxiety Relief", "Rabbit Calcium Supplement", "Rabbit First Aid Kit", "Rabbit Grooming Brush", "Rabbit Hairball Remedy", "Rabbit Hay", "Rabbit Hay Feeder", "Rabbit Pellets", "Rabbit Vitamin C Supplement", "Rabbit Vitamin Supplement", "Rabbit Wound Care Spray", "Reptile Heat Lamp", "Reptile Multivitamin", "Rimadyl", "Sertraline", "Sulfamethoxazole", "Tetracycline", "Tramadol", "Turtle Vitamin D3 Supplement", "Tylosin", "Vitamin A Supplement"];

fileSelector.onchange = () => {
    var file = fileSelector.files[0];
    // Use the file type from the selected file
    var imgUrl = window.URL.createObjectURL(new Blob([file], { type: file.type }));
    img.src = imgUrl;
};

start.onclick = () => {
    textarea.innerHTML = '';
    const rec = new Tesseract.TesseractWorker();
    rec.recognize(fileSelector.files[0])
        .progress(function (response) {
            if (response.status == 'recognizing text') {
                progress.innerHTML = response.status + '   ' + (response.progress * 100).toFixed(2) + '%';
            } else {
                progress.innerHTML = response.status;
            }
        })
        .then(function (data) {
            const recognizedText = data.text;
            let foundMedicines = [];

            // Check if any medicine is present in the recognized text
            animalMedicines.forEach(medicine => {
                if (recognizedText.includes(medicine)) {
                    foundMedicines.push(medicine);
                }
            });

            // Display results in the textarea
            if (foundMedicines.length > 0) {
                textarea.innerHTML = "Detected Medicines:\n" + foundMedicines.join(", ");
            } else {
                textarea.innerHTML = "No animal medicines detected.";
            }

            progress.innerHTML = "Done";
        })
        .catch(err => {
            console.error(err);
            progress.innerHTML = "Error occurred during recognition.";
        });
};
