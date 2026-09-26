import fs from 'fs-extra';
import path from 'path';
import archiver from 'archiver';

async function prepare() {
  console.log("Preparing deployment bundle...");
  const srcDir = path.join(process.cwd(), '.next', 'standalone');
  const destZip = path.join(process.cwd(), 'deploy.zip');

  // Copy public and static files
  console.log("Copying public folder...");
  await fs.copy(path.join(process.cwd(), 'public'), path.join(srcDir, 'public'));
  
  console.log("Copying static files...");
  const staticDest = path.join(srcDir, '.next', 'static');
  await fs.ensureDir(staticDest);
  await fs.copy(path.join(process.cwd(), '.next', 'static'), staticDest);
  
  // Copy .env
  console.log("Copying .env file...");
  if (fs.existsSync(path.join(process.cwd(), '.env'))) {
    await fs.copy(path.join(process.cwd(), '.env'), path.join(srcDir, '.env'));
  }

  console.log("Zipping contents...");
  const output = fs.createWriteStream(destZip);
  const archive = archiver('zip', { zlib: { level: 9 } });

  output.on('close', function() {
    console.log(archive.pointer() + ' total bytes');
    console.log('archiver has been finalized and the output file descriptor has closed.');
  });

  archive.on('error', function(err) {
    throw err;
  });

  archive.pipe(output);
  // Zip the contents of the standalone directory, NOT the standalone folder itself
  archive.directory(srcDir, false);
  await archive.finalize();
}

prepare().catch(console.error);
