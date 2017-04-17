cd BrowserFS
sudo npm install -g browserfs
npm install
cd ../doppio
npm install -f
cd ../extension/res
javac *.java
ln -s ../../doppio/dist/fast-dev/doppio.js .
ln -s ../../doppio/dist/fast-dev/doppio.js.map .
ln -s ../../BrowserFS/dist/browserfs.js .
ln -s ../../BrowserFS/dist/browserfs.js.map .
mkdir vendor
cd vendor
ln -s ../../../doppio/vendor/java_home .

# fix accessibility properties
cd java_home/lib
newacc=$(awk '/^#/{print}' accessibility.properties)
echo "$newacc" > accessibility.properties
printf "\n\n" >> accessibility.properties

cd ../../..
make_xhrfs_index listings.json