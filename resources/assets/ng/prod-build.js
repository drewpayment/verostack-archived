const fs = require('fs');

const oldPath = '../../../public/dist/index.php';
const destPath = '../../views/layouts/app.blade.php';

fs.copyFile(oldPath, destPath, function(err) {
    if(err) throw err;
    console.info("Copied 'app.blade.php' to resources/views.");
});