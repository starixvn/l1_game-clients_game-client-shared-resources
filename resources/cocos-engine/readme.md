please put all cocos engine resource here

### How to create a version of cocos engine

- Step 1: Build project.
- Step 2: Copy folder "cocos-js" from folder "build/web-mobile"
- Steo 3: Rename folder by version name
- Step 4: Create the import-map file following this content

```
{
  "imports": {
    "cc": "./cc.js?v=1"
  }
}
```

- Step 5: Update version:

```
node .\resources\cocos-engine\version.js .\resources\cocos-engine\3.8.6 <version>
```
