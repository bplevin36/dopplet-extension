cd BrowserFS
npm install -g browserfs
npm install
cd ../doppio
npm install -f
cd ../extension/res
ln -s ../../doppio/dist/fast-dev/doppio.js .
ln -s ../../doppio/dist/fast-dev/doppio.js.map .
ln -s ../../BrowserFS/dist/browserfs.js .
ln -s ../../BrowserFS/dist/browserfs.js.map .
mkdir vendor
cd vendor
ln -s ../../../doppio/vendor/java_home .
cd ..
make_xhrfs_index listings.json