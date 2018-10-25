const fs = require('fs');

const oldPath = '../../../public/dist/app.blade.php';
const destPath = '../../views/layouts/app.blade.php';

fs.rename(oldPath, destPath, function(err) {
    if(err) throw err;
    console.info("Moved 'app.blade.php' to resources/views.");
})